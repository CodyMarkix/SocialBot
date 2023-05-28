import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import { Command } from '../interfaces/commands';
import { User } from '../models/user';

const getusers = {
    data: new SlashCommandBuilder()
        .setName("adduser")
        .setDescription("db thing")
		.addStringOption(option =>
			option
				.setName('jmeno')
				.setDescription('uzivatel')
				.setRequired(true))
		.addNumberOption(option =>
			option
				.setName('id')
				.setDescription('id'))
        .addNumberOption(option =>
            option
                .setName('xp')
                .setDescription('xp')),

    async execute(interaction: CommandInteraction) {
        const newuser = await User.create({ userName: `${interaction.options.get('jmeno')?.value}`, userId: interaction.options.get('id')?.value, xp: interaction.options.get('xp')?.value });
        interaction.reply(`Users: ${await User.findAll()}`)
    }
}

module.exports = getusers;