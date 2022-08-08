import { ChatInputApplicationCommandData, CommandInteraction, CommandInteractionOptionResolver, PermissionResolvable } from "discord.js";
import { ExtendedClient } from "../structures/Client";

interface RunOptions {
    client: ExtendedClient,
    interaction: CommandInteraction,
    args: CommandInteractionOptionResolver
}

type RunFunction = (options: RunFunction) => any;

export type CommandType = {
    userPermissions?: PermissionResolvable[];
    run: Function;
} & ChatInputApplicationCommandData;