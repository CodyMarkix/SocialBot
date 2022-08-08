import { ApplicationCommandDataResolvable, Client, Collection, TimestampStyles } from 'discord.js';
import { CommandType } from '../typings/Commands';

export class ExtendedClient extends Client {
    commands: Collection<string, CommandType> = new Collection();

    constructor() {
        super({ intents: 32767 });
    };

    start() {
        this.registerModules()
        this.login(process.env.botToken);
    };

    async importFile(filePath: string) {
        return (await import(filePath))?.default;
    }

    async registerModules() {
        // Commands
        const slashCommands: ApplicationCommandDataResolvable[] = [];
        const commandFiles = await globPromise(
            `${__dirname}/../commands/*/*{.ts,.js}`
        );
        console.log({commandFiles});
        commandFiles.forEach(async (filePath) => {
            const command: CommandType = await this.importFile(filePath);
            if (!command.name) return;

            this.commands.set(command.name, command)
        });
    }
}