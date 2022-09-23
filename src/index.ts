// EN: Importing libraries
// CZ: Importování knihoven
import Discord, { Client, Collection, IntentsBitField } from 'discord.js';
import env from 'dotenv';
import * as fs from 'fs';

// EN: Registering environment variables
// CZ: Registrace promněných v prostředí
env.config({
    path: '../.env'
});

// EN: Initializing the client and creating a command collection
// CZ: Inicializace klientu a vytváření kolekce příkazů
const client = new Discord.Client({
    intents: [
        // EN: IDK why but Discord changed Intents to IntentsBitField
        // CZ: Nevim proč, ale Discord změnil Intents na IntentsBitField
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages
    ]
});
client.commands = new Collection();

// EN: Event handling
// CZ: Zpracování eventů
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('js'));
for (const file of eventFiles) {
    const event = require(`./events/${file}`);

    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

client.login(process.env.DISCORD_TOKEN);