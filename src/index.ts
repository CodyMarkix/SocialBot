// Importing libraries
import Discord, { Client, Collection, IntentsBitField, TextChannel } from 'discord.js';
import env from 'dotenv';
import * as fs from 'fs';
import path from 'path';
import { Sequelize } from 'sequelize';
import { exec } from 'child_process';
import { User } from './models/user';
import { WebServer } from './server/server';

// Initializing the bot's configuration
import { configObject } from './config/botConfig';

// Registering environment variables
env.config({
    path: `${__dirname}/../.env`
});

// Initializing the client, database and creating a command collection
const client = new Discord.Client({
    intents: [
        // IDK why but Discord changed Intents to IntentsBitField
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildMembers
    ]
});

// The database instance
const sequelize: Sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: `${__dirname}/../db.sqlite3`
});

// The Dashboard
const dashboard = new WebServer(client);
dashboard.registerRoutes();
dashboard.startServer(8080);
console.log("Dashboard API ready!")

// Command collection
client.commands = new Collection();

// Event handling
const eventFiles = fs.readdirSync(`${__dirname}/events`).filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
    // Have to use commonjs import here, don't ask questions
    if (!file.endsWith('.map')) {
        const event = require(`./events/${file}`);

        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args));
        } else {
            client.on(event.name, (...args) => event.execute(...args));
        };
    } else {
        continue
    };
};

// Command handler
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

// For every command file in src/commands...
for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath); // ...import it...  

    client.commands.set(command.data.name, command); // ...and add it to the bot
    // kind of weird that this is still a thing, I imagine 
}

try {
    // Create the database if it doesn't exist
    if (!fs.existsSync(`${__dirname}/../db.sqlite3`)) {
        fs.writeFileSync(`${__dirname}/../db.sqlite3`, '');
    }

    // Look for all models and declare them
    const modelsList = fs.readdirSync(path.join(__dirname, 'models'));
    for (const modelFile of modelsList) {
        if (modelFile.endsWith('.js') && !modelFile.endsWith('.map')) {
            const model = require(path.join(path.join(__dirname, 'models'), modelFile));
            model.declareModel(sequelize)
            console.log(`${modelFile.split('.')[0]} ready!`) // *MAYBE* I am gonna write a fancier logger, or just commit npm
        } else {
            continue
        }
    }

    // Log into the database
    sequelize.authenticate();
    (async () => {
        await sequelize.sync();
        await console.log(`Database ${sequelize.getDatabaseName()} ready!`);
    })() // Idk why this works but it does, please don't change it
} catch (err) {
    console.log('Initializing the database failed!', err)
}

// Log into the Discord client
client.login(process.env.DISCORD_TOKEN);