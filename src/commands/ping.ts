import { SlashCommandBuilder } from '@discordjs/builders';
import { BaseInteraction, Interaction, InteractionType } from 'discord.js';

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Ping příkaz! 🏓"),

    async execute(interaction: any) {
        interaction.reply("Pong! :ping_pong:")
    }
}