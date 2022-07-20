const { EmbedBuilder } = require("discord.js");
const consts = require("./constants");

/**
 * Send an embed, footer is preset
 * @param {string} title Title of the embed.
 * @param {string} description Description.
 * @param {"info"|"warn"|"error"|"wordle"} type Type of the embed.
 * */
module.exports = (title, description, type) => {
	return new EmbedBuilder()
		.setTitle(
			type === "warn"
				? `⚠️ ${title}`
				: type === "error"
				? `🚫 ${title}`
				: title
		)
		.setDescription(description)
		.setColor(consts.EMBED[type])
		.setFooter({
			text: "Wordle#4527",
			iconURL: consts.PFP,
		});
};
