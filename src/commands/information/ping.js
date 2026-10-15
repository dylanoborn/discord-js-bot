
const { EmbedBuilder } = require("discord.js");
const { EMBED_COLORS } = require("@root/config");

module.exports = {
  name: "ping",
  description: "Check Ticck's latency and connection.",
  category: "INFORMATION",

  command: {
    enabled: true,
    aliases: ["latency"],
    usage: "",
  },

  slashCommand: {
    enabled: true,
    ephemeral: true,
    options: [],
  },

  async messageRun(message) {
    const ping = Math.round(message.client.ws.ping);

    const embed = new EmbedBuilder()
      .setColor(EMBED_COLORS.INFO)
      .setTitle("🏓 Ticck — Pong!")
      .setDescription("✅ Ticck is responding!")
      .addFields(
        {
          name: "🌐 Discord API Latency",
          value: `${ping}ms`,
          inline: true,
        },
        {
          name: "🤖 Bot Status",
          value: "🟢 Online",
          inline: true,
        }
      )
      .setFooter({
        text: "Ticck • Information & Help",
      })
      .setTimestamp();

    await message.safeReply({
      embeds: [embed],
    });
  },

  async interactionRun(interaction) {
    const ping = Math.round(interaction.client.ws.ping);

    const embed = new EmbedBuilder()
      .setColor(EMBED_COLORS.INFO)
      .setTitle("🏓 Ticck — Pong!")
      .setDescription("✅ Ticck is responding!")
      .addFields(
        {
          name: "🌐 Discord API Latency",
          value: `${ping}ms`,
          inline: true,
        },
        {
          name: "🤖 Bot Status",
          value: "🟢 Online",
          inline: true,
        }
      )
      .setFooter({
        text: "Ticck • Information & Help",
      })
      .setTimestamp();

    await interaction.followUp({
      embeds: [embed],
    });
  },
};
