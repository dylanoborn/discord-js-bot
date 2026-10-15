
const { EmbedBuilder } = require("discord.js");
const { EMBED_COLORS } = require("@root/config");

module.exports = {
  name: "uptime",
  description: "See how long Ticck has been online.",
  category: "INFORMATION",

  botPermissions: ["EmbedLinks"],

  command: {
    enabled: true,
    aliases: ["onlinefor"],
    usage: "",
  },

  slashCommand: {
    enabled: true,
    ephemeral: false,
    options: [],
  },

  async messageRun(message) {
    const embed = createUptimeEmbed(message.client);
    await message.safeReply({ embeds: [embed] });
  },

  async interactionRun(interaction) {
    const embed = createUptimeEmbed(interaction.client);
    await interaction.followUp({ embeds: [embed] });
  },
};

function createUptimeEmbed(client) {
  const seconds = Math.floor(process.uptime());

  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const started = Math.floor(client.readyTimestamp / 1000);

  return new EmbedBuilder()
    .setColor(EMBED_COLORS.INFO)
    .setTitle("⏰ Ticck — Uptime")
    .setThumbnail(client.user.displayAvatarURL())
    .setDescription(
      "✅ **Ticck is currently online!**\n\n" +
      "Here's how long the bot has been running."
    )
    .addFields(
      {
        name: "📅 Days",
        value: `${days}`,
        inline: true,
      },
      {
        name: "🕒 Hours",
        value: `${hours}`,
        inline: true,
      },
      {
        name: "⏱️ Minutes",
        value: `${minutes}`,
        inline: true,
      },
      {
        name: "⌛ Seconds",
        value: `${secs}`,
        inline: true,
      },
      {
        name: "🚀 Bot Connected",
        value: `<t:${started}:R>`,
        inline: false,
      },
      {
        name: "🌐 Discord Latency",
        value: `${Math.round(client.ws.ping)}ms`,
        inline: true,
      },
      {
        name: "📡 Connection Status",
        value: "🟢 Online",
        inline: true,
      }
    )
    .setFooter({
      text: "Ticck • Information & Help",
    })
    .setTimestamp();
}
