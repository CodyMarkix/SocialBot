// @ts-nocheck
import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { joinVoiceChannel, createAudioPlayer, getVoiceConnections, StreamType, AudioPlayerStatus } from "@discordjs/voice";
import { createAudioResource } from "@discordjs/voice";
import ytdl from 'ytdl-core';
import { createReadStream } from 'fs';
import { join } from 'path';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Play příkaz')
        .addStringOption(option => 
            option
                .setName("link")
                .setDescription("Youtube link!")
                .setRequired(false)
        ),

    // async execute(interaction: CommandInteraction, client: Client) {
    //     // const connection = joinVoiceChannel({
    //     //     channelId: "775815628619251743",
    //     //     guildId: "775761665786511370",
    //     //     adapterCreator: interaction.guild?.voiceAdapterCreator,
    //     //     selfDeaf?: false,
    //     //     selfMute?: false
    //     // });

    //     // const link = interaction.options.get("link")?.value?.toString()
    //     // if (link) {
    //     //     connection.setSpeaking(true);
            
    //     //     let youtubeaudio = ytdl(`${link}`, { filter: 'audioonly' })
    //     //     console.log(youtubeaudio)
            
    //     //     let audio = createAudioResource(youtubeaudio, { inputType: StreamType.Opus })
    //     //     const player = createAudioPlayer();
    //     //     player.play(audio);
    //     //     connection.subscribe();
    
    //     //     interaction.reply(`Playing ${link}`);
    //     // } else {
    //     //     interaction.reply("link ya dumbass");
    //     // }
    // }

    // async execute(interaction) {
    //     const song = interaction.options.getString('link');
    //     const voiceChannel = interaction.member.voice.channel;

    //     if (!voiceChannel) {
    //         return interaction.reply({ content: 'You must be in a voice channel to play music!', ephemeral: true });
    //     }

    //     const connection = joinVoiceChannel({
    //         channelId: voiceChannel.id,
    //         guildId: voiceChannel.guild.id,
    //         adapterCreator: voiceChannel.guild.voiceAdapterCreator
    //     });

    //     try {
    //         const stream = await ytdl(song, { filter: 'audioonly' });
    //         const resource = createAudioResource(stream);
    //         const player = createAudioPlayer();
    //         player.play(resource);
    //         connection.subscribe(player);

    //         player.on(AudioPlayerStatus.Idle, async () => {
    //             if (player.state.status === AudioPlayerStatus.Idle) {
    //                 const connection = getVoiceConnection(voiceChannel.guild.id);
    //                 if (connection) {
    //                     connection.destroy();
    //                 }
    //             }
    //         });

    //         interaction.reply({ content: `Now playing: ${song}`, ephemeral: true });
    //     } catch (error) {
    //         console.error(error);
    //         interaction.reply({ content: 'An error occurred while trying to play the song!', ephemeral: true });
    //     }
    // }

    async execute(interaction: CommandInteraction) {
        const link = interaction.options.get('link')?.value?.toString();
        const player = createAudioPlayer();

        player.on('error', error => {
            console.log(error);
        })

        const download = ytdl(`${link}`);
        const resource = createAudioResource(createReadStream(join(__dirname, 'limbocut.ogg')), { inputType: StreamType.OggOpus });

        player.play(resource);

        const connection = joinVoiceChannel({
            channelId: "775815628619251743",
            guildId: "775761665786511370",
            adapterCreator: interaction.guild?.voiceAdapterCreator,
            selfMute?: false,
            selfDeaf: false
        });

        const subscription = connection.subscribe(player);
        interaction.reply(`Now playing: ${link}`);
    }
}