import { GuildMember, TextChannel } from "discord.js"
import { MemberEvent } from '../interfaces/events';
import { User } from '../models/user';

const guildMemberAdd: MemberEvent = {
    name: 'guildMemberAdd',
    once: false,
    async execute(member: GuildMember) {
        console.log("Here!");
        let channel = member.guild.channels.cache.get('👋-vítej-a-nazdar') as TextChannel;
        channel.send(`Ahoj ${member.displayName}! Vitej na social townhall!`);

        const newuser = await User.create({ userName: `${member.user.username}`, userId: parseInt(member.user.discriminator), xp: 0.0 });
    }
}