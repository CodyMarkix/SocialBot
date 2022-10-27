import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import { Command } from '../interfaces/commands';
import { User } from '../models/user';

const getusers: Command = {
    data: new SlashCommandBuilder()
        .setName("getusers")
        .setDescription("db"),

    async execute(interaction: CommandInteraction) {
        interaction.reply(`${User.getTableName()}`)
    }
}

module.exports = getusers;