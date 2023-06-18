// Importing libraries
import Discord, { Client, Collection, IntentsBitField, TextChannel } from 'discord.js';
import env from 'dotenv';
import * as fs from 'fs';
import path from 'path';
import { Sequelize } from 'sequelize';
import { exec } from 'child_process';
import { User } from './models/user';
import { WebServer } from './server/server';

// Registering environment variables
env.config({
    path: `${__dirname}/../.env`
});

function isProductionEnv() {
    let command = exec("grep -i PRETTY_NAME /etc/os-release");
    // Thank Markix's brother for the one-line if statements
    if (command.stderr) return false
    if (command.stdout?.read() == "PRETTY_NAME=\"Debian GNU/Linux 11 (bullseye)\"") {
        console.log(command.stdout)
        return true
    } else {
        return false
    }
}

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
dashboard.startServer(3001);
console.log("Dashboard API ready!")

// Command collection
client.commands = new Collection();

// Event handling
const eventFiles = fs.readdirSync(`${__dirname}/events`).filter(file => file.endsWith('js'));
for (const file of eventFiles) {
    // Have to use commonjs import here, don't ask questions
    const event = require(`./events/${file}`);
    
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    client.commands.set(command.data.name, command);
}

try {
    if (!fs.existsSync(`${__dirname}/../db.sqlite3`)) {
        fs.writeFileSync(`${__dirname}/../db.sqlite3`, '');
    }

    const modelsList = fs.readdirSync(path.join(__dirname, 'models'));
    for (const modelFile of modelsList) {
        const model = require(path.join(path.join(__dirname, 'models'), modelFile));
        model.declareModel(sequelize)
        console.log(`${modelFile.split('.')[0]} ready!`)
    }

    sequelize.authenticate();
    (async () => {
        await sequelize.sync();
        await console.log(`Database ${sequelize.getDatabaseName()} ready!`);
    })() // Idk why this works but it does, please don't change it
} catch (err) {
    console.log('Initializing the database failed!', err)
}

client.login(process.env.DISCORD_TOKEN);