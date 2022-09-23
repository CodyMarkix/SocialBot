const fs = require('fs');
const path = require('path');
const { Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
const readline = require('readline');
require('dotenv').config();

const commands = [];
const commandsPath = path.join(__dirname, 'dist', 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

if (process.argv[2] === 'deploy') {
	rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);
};

if (process.argv[2] === 'rm') {
	try {
		rest.get(Routes.applicationCommands(process.env.CLIENT_ID))
		.then(data => {
			const promises = [];
			for (const command of data) {
				const deleteUrl = `${Routes.applicationCommands(process.env.CLIENT_ID)}/${command.id}`;
				promises.push(rest.delete(deleteUrl));
			}
			return Promise.all(promises);
		});
		
		rest.get(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.SERVER_ID))
		.then(data => {
			const promises = [];
			for (const command of data) {
				const deleteUrl = `${Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.SERVER_ID)}/${command.id}`;
				promises.push(rest.delete(deleteUrl));
			}
			return Promise.all(promises);
		});
	} catch (err) {
		console.error(err);
	}
};
