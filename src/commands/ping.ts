import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import { Command } from '../interfaces/commands';

const ping: Command = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Ping příkaz! 🏓"),

    async execute(interaction: CommandInteraction) {
        interaction.reply("Pong! :ping_pong:");
    }
}

module.exports = ping;