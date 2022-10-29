import { CommandInteraction, SlashCommandBuilder } from "discord.js";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Play příkaz'),

    async execute(interaction: CommandInteraction) {
        interaction.reply(`${interaction.client.channels.cache.get("📻 Rádio 1")}`)
    }
}