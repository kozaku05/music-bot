const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");
const searchSong = require("./search");
const dotenv = require("dotenv");
dotenv.config();
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});
client.once("ready", () => {
  console.log("Bot is ready");
});
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  if (interaction.commandName === "lyrics") {
    const song = interaction.options.getString("song");
    const ephemeral = interaction.options.getBoolean("ephemeral");
    let lyrics = await searchSong(song);
    if (lyrics === null || lyrics === undefined) {
      await interaction.editReply("曲が見つかりませんでした");
      return;
    }
    if (lyrics.lyrics.length > 2000) {
      lyrics.lyrics = lyrics.lyrics.slice(0, 2000) + "...(以下略)";
    }
    const embed = new EmbedBuilder()
      .setTitle(lyrics.title)
      .setURL(lyrics.url)
      .setDescription(lyrics.lyrics)
      .setColor("Blue");
    if (ephemeral === true) {
      await interaction.reply({ embeds: [embed], ephemeral: true });
    } else {
      await interaction.reply({ embeds: [embed] });
    }
  }
});
client.login(process.env.TOKEN);
