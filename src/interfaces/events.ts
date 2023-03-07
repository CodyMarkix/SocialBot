import { Client, CommandInteraction, GuildMember, Message } from "discord.js";

export interface ClientEvent {
    name: string;
    once: boolean;
    execute(client: Client): void
}

export interface InteractionEvent {
    name: string;
    once: boolean;
    execute(interaction: CommandInteraction, client: Client): void
}

export interface MemberEvent {
    name: string;
    once: boolean;
    execute(member: GuildMember): void
}

export interface MessageEvent {
    name: string;
    once: boolean;
    execute(message: Message): void
}