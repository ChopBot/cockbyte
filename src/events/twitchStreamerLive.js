const { Event } = require('klasa');
const { MessageEmbed } = require('discord.js');
const { Colors } = require('../lib/util/constants');

module.exports = class extends Event {

	constructor(...args) {
		super(...args, { event: 'twitchStreamerLive' });
	}

	async run(guild, streamer, streamerPic, streamTitle, streamThumbnail, streamViewers, startedAt) {
		if (!guild) return;

		if (guild.settings.get('twitch.twitchNotifsChannel')) await this.announceStream(guild, streamer, streamerPic, streamTitle, streamThumbnail, streamViewers, startedAt);

		return;
	}

	async announceStream(guild, streamer, streamerPic, streamTitle, streamThumbnail, streamViewers, startedAt) {
		const embed = new MessageEmbed()
			.setAuthor(streamer, 'https://rtbyte.xyz/img/liveIcon.png')
			.setColor(Colors.purple)
			.setTitle(streamTitle)
			.setDescription(guild.language.get('NOTIFICATION_TWITCH_LINK', streamer))
			.setThumbnail(streamerPic)
			.addField(guild.language.get('NOTIFICATION_TWITCH_VIEWERS'), streamViewers)
			.setImage(streamThumbnail)
			.setTimestamp(startedAt)
			.setFooter('twitch.tv', 'https://rtbyte.xyz/img/twitchLogo.png');

		// Unused for now
		/* const role = await guild.roles.get(guild.settings.get('twitch.twitchNotifsRole')); */
		const twitchNotifsChannel = await this.client.channels.cache.get(guild.settings.get('twitch.twitchNotifsChannel'));
		if (twitchNotifsChannel) await twitchNotifsChannel.send('@everyone', { disableMentions: 'none', embed: embed });

		return;
	}

};
