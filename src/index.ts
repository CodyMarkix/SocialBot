// Importing libraries
import Discord, { Client, Collection, IntentsBitField } from 'discord.js';
import env from 'dotenv';
import * as fs from 'fs';
import path from 'path';
import { Sequelize } from 'sequelize';
import { exec } from 'child_process';

// Registering environment variables
env.config({
    path: `${__dirname}/../.env`
});

function isProductionEnv() {
    let command = exec("grep -i PRETTY_NAME /etc/os-release");
    if (command.stderr) {
        return false
    } else if (command.stdout?.read() == "PRETTY_NAME=\"Debian GNU/Linux 11 (bullseye)\"") {
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
        IntentsBitField.Flags.GuildMessages
    ]
});

const dbhost = isProductionEnv() ? 'localhost' : '192.168.0.100';
export const sequelize = new Sequelize({
    dialect: 'mysql',
    host: '192.168.0.100',
    port: 3306,
    username: 'root',
    password: 'root19857',
    database: `socialbot_${process.env.DBTYPE}`
});

client.commands = new Collection();

// Event handling
const eventFiles = fs.readdirSync(`${__dirname}/events`).filter(file => file.endsWith('js'));
for (const file of eventFiles) {
    // For some reason, import can't be used here
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
    sequelize.authenticate();
    (async () => {
        await sequelize.sync({ force: true});
    })() // Idk why this works but it does, please don't change it
    console.log(`Database ${sequelize.getDatabaseName()} ready!`);
} catch (err) {
    console.error('Connecting to the database failed!', err)
}
client.login(process.env.DISCORD_TOKEN);