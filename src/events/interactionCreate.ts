import { Client, CommandInteraction } from "discord.js"
import { InteractionEvent } from '../interfaces/events';

const ready: InteractionEvent = {
    name: 'interactionCreate',
    once: false,
    async execute(interaction: CommandInteraction, client: Client) {
        if (!interaction.isChatInputCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);
    
        if (!command) return;
    
        try {
            await command.execute(interaction, client);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }
};

module.exports = ready;