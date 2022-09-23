import { Client, CommandInteraction } from "discord.js";

export interface ClientEvent {
    name: string;
    once: boolean;
    execute(client: Client): void
}

export interface InteractionEvent {
    name: string;
    once: boolean;
    execute(interaction: CommandInteraction): void
}