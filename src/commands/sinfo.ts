import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, EmbedBuilder } from 'discord.js';
import { Command } from '../interfaces/commands';

const sinfo: Command = {
    data: new SlashCommandBuilder()
        .setName("sinfo")
        .setDescription("Informace o serveru 📋"),

    async execute(interaction: CommandInteraction) {
        const serverInfoEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setAuthor({
                name: "Social Townhall",
                iconURL: "https://cdn.discordapp.com/icons/775761665786511370/555695e1a070108decd20d2ff6d91ed1.webp?size=1024"
            })
            .setTitle('Server Info')
            .addFields(
                {
                    name: "Server",
                    value: `${interaction.guild?.name}`,
                    inline: true
                },
                {
                    name: "Počet členů",
                    value: `${interaction.guild?.memberCount}`,
                    inline: true
                },
                {
                    name: "Počet boostů",
                    value: `${interaction.guild?.premiumSubscriptionCount}`,
                    inline: true
                }
            );

        interaction.reply({ embeds: [serverInfoEmbed] });
    }
}

module.exports = sinfo;