import { Client, GatewayIntentBits, version, ClientUser } from 'discord.js'; // import je v podstatě nový a lepší require()
const { token } = require('./config.json');

const client: Client = new Client({ intents: [GatewayIntentBits.Guilds]});

client.once('ready', () => {
    console.log(`Bot is ready! Running on:\n\nDiscord.js version: ${version}`);
    client.user?.setStatus('dnd')
});

client.login(token);