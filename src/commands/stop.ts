import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { joinVoiceChannel, createAudioPlayer, getVoiceConnection } from "@discordjs/voice";
import ytdl from 'ytdl-core';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Stop příkaz'),

    async execute(interaction: CommandInteraction) {
        const connection = getVoiceConnection("826444819299565610")
        connection?.disconnect()
        interaction.reply("shit")
    }
}