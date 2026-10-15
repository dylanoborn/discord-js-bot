
const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} = require("discord.js");

const {
  EMBED_COLORS,
  SUPPORT_SERVER,
  DASHBOARD
} = require("@root/config");

module.exports = {
  name: "botinvite",
  description: "Invite Ticck to your Discord server.",
  category: "INFORMATION",

  botPermissions: ["EmbedLinks"],

  command: {
    enabled: true,
    aliases: ["invite", "inviteme"],
    usage: ""
  },

  async messageRun(message) {
    const client = message.client;

    const embed = new EmbedBuilder()
      .setColor(EMBED_COLORS.INFO)
      .setTitle("🤖 Invite Ticck")
      .setThumbnail(client.user.displayAvatarURL())
      .setDescription(
        "Thank you for choosing **Ticck!** 💙\n\n" +
        "Bring Ticck to your server and enjoy:\n\n" +
        "🛡️ Moderation & Security\n" +
        "🎫 Tickets & Support\n" +
        "💰 Economy & Banking\n" +
        "🎰 Games & Casino\n" +
        "🎵 Music & Entertainment\n" +
        "🎉 Giveaways & Community\n" +
        "⭐ XP & Levelling\n" +
        "⚙️ Server Management\n\n" +
        "**Click the button below to invite Ticck!**"
      )
      .addFields({
        name: "📚 Need Help?",
        value: "Use `.help` to explore Ticck's 13 help pages."
      })
      .setFooter({
        text: "Ticck • Your All-in-One Discord Bot"
      })
      .setTimestamp();

    const buttons = [
      new ButtonBuilder()
        .setLabel("Invite Ticck")
        .setEmoji("🤖")
        .setURL(client.getInvite())
        .setStyle(ButtonStyle.Link)
    ];

    if (
      SUPPORT_SERVER &&
      /^https?:\/\//.test(SUPPORT_SERVER)
    ) {
      buttons.push(
        new ButtonBuilder()
          .setLabel("Support Server")
          .setEmoji("🎫")
          .setURL(SUPPORT_SERVER)
          .setStyle(ButtonStyle.Link)
      );
    }

    if (
      DASHBOARD.enabled &&
      /^https?:\/\//.test(DASHBOARD.baseURL)
    ) {
      buttons.push(
        new ButtonBuilder()
          .setLabel("Dashboard")
          .setEmoji("⚙️")
          .setURL(DASHBOARD.baseURL)
          .setStyle(ButtonStyle.Link)
      );
    }

    const row = new ActionRowBuilder()
      .addComponents(buttons);

    const response = {
      embeds: [embed],
      components: [row]
    };

    // Display the invitation in the server.
    await message.safeReply(response);

    // Also try to send the invitation privately.
    // Closed DMs will not stop the command.
    await message.author.send(response).catch(() => {});
  }
};
