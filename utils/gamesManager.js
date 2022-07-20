const embed = require("./embed.js");
const consts = require("./constants.js");
const Discord = require("discord.js");

/**
 * @type {Game[]}
 */
const games = [];

class Game {
	static channelName = `${consts.CHANNELS.games}`;

	/**
	 * @type {Discord.Guild}
	 */
	guild = null;
	#_status = "won";

	/**
	 * @param {Discord.Guild} guild
	 */
	contructor(guild) {
		this.guild = guild;
	}

	/**
	 * @param {"won"|"lost"|"ingame"} status
	 */
	setStatus(status) {
		this.#_status = status; // private var with " # "
	}
	
	/**
	 * @return {string} status
	 */
	getStatus() {
		return #_status;
	}
}

function startGame(guild) {
	// Check if the game already started
	if (games.contains(guild)) {
		return embed("Error", "A game is already running", "error");
	}
	games.push(new Game(guild));
}

/**
 * @return {Game} game
 */
function findGame(guild) {
	return games.find(g => g.guild.id===inter.guildId);
}

/**
 * @param {Discord.CommandInteraction} inter // for intellisense
 */
function handleWordleCommand(inter) {}

module.exports = {
	startGame,
	handleWordleCommand,
	games,
	findGame
};
