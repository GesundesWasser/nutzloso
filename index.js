require('dotenv').config();

const { Client, GatewayIntentBits } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates]
});

client.once('ready', async () => {
    console.log(`Logged in as ${client.user.tag}`);

    const guild = await client.guilds.fetch(process.env.GUILD_ID);
    const channel = await guild.channels.fetch(process.env.VOICE_CHANNEL_ID);

    if (!channel || channel.type !== 2) {
        console.log('Not a valid voice channel');
        return;
    }

    joinVoiceChannel({
        channelId: channel.id,
        guildId: guild.id,
        adapterCreator: guild.voiceAdapterCreator
    });

    console.log('Joined voice channel and doing nothing 😎');
});

client.login(process.env.BOT_TOKEN);
