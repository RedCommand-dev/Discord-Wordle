const {
	Client,
	GatewayIntentBits,
	Partials,
	SlashCommandBuilder,
	SlashCommandStringOption,
	ApplicationCommand,
	ModalBuilder,
	TextInputBuilder,
	TextInputStyle,
	ActionRowBuilder,
} = require("discord.js");
const dotenv = require("dotenv");
dotenv.config();

const embed = require("./utils/embed");
const manager = require("./utils/gamesManager");
const consts = require("./utils/constants");

const client = new Client({
	intents: [
		Partials.Channel,
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildMessageReactions,
	],
});
client.login(process.env.TOKEN);

//  ------------------------------------------------------

client.on("ready", async () => {
	console.log(`>> 🤖 Logged in as ${client.user.tag}!`);
	client.user.setPresence({
		activities: [
			{
				name: "your live bedroom",
				type: 3,
				url: "http://cool_button.farted.net",
			},
			{ name: "the battle of the wits", type: 5 }, // hehehehar
		],
		status: "idle",
	});

	client.application?.commands.set([
		new SlashCommandBuilder()
			.setName("ping")
			.setDescription("Send a ping of the bot")
			.toJSON(),

		new SlashCommandBuilder()
			.setName("guess")
			.setDescription("submit a word for wordle")
			.addStringOption((option) => {
				option
					.setName("word")
					.setDescription("The word to guess")
					.setRequired(true)
					.toJSON();
				return option;
			})
			.toJSON(),
	]);
});

//  ------------------------------------------------------

client.on("interactionCreate", async (inter) => {
	if (!inter.isChatInputCommand()) return;
	const command = inter.commandName;
	if (command === "ping") {
		const ping = client.ws.ping;
		inter.reply({ embeds: [embed("🏓 Pong!", `${ping}ms`, "info")] });
	}

	// ------------------------------------------------------
	// Wordle Command
	// ------------------------------------------------------
	if (command === "guess") {
		const word = inter.options.getString("word", true);
		if (inter.channel.name !== `${consts.CHANNELS.games}`)
			return inter.reply({
				embeds: [
					embed(
						"Error",
						`This needs to be in <#${
							client.channels.cache.find(
								(c) =>
									c.name == consts.CHANNELS.games &&
									c.guildId == inter.guildId
							).id
						}>`,
						"error"
					),
				],
			});
		const guild = manager.findGame(inter.guild);
		if (guild.getStatus() !== consts.STATUS.ingame) {
			const status = guild.getStatus();
			return inter.reply({
				embeds: [
					embed(
						"Game finished!",
						`This server has ${
							status === consts.STATUS.won ? "won" : "lost"
						} this day's game.`
					),
				],
			});
		}
		if (word.length != 5)
			return inter.reply({
				embeds: [
					embed("Error", "The word must be 5 letters long", "error"),
				],
				ephemeral: true,
			});
	}
});
