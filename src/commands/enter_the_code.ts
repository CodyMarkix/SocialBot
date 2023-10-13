import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import { Command } from '../interfaces/commands';

const enter_the_code: Command = {
    data: new SlashCommandBuilder()
        .setName("ENteR tHe coDE")
        .setDescription("lol no")
        
    async execute(interaction: CommandInteraction) {
        interaction.reply("https://argserver--loph2546.repl.co");
    }
                
}

module.exports = enter_the_code;