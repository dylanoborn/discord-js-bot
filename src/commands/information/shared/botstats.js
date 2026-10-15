
const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} = require("discord.js");

const os = require("node:os");

const {
  EMBED_COLORS,
  SUPPORT_SERVER,
  DASHBOARD,
  PREFIX_COMMANDS,
  INTERACTIONS
} = require("@root/config");

const { timeformat } = require("@helpers/Utils");

module.exports = (client) => {

  const servers = client.guilds.cache.size;
  const channels = client.channels.cache.size;

  const members = client.guilds.cache.reduce(
    (total, guild) => total + guild.memberCount,
    0
  );

  const commands = client.commands || [];

  const aliases = commands.reduce(
    (total, cmd) =>
      total + (cmd.command?.aliases?.length || 0),
    0
  );

  const slashCommands = INTERACTIONS.SLASH
    ? client.slashCommands.size
    : 0;

  const ping = Math.round(client.ws.ping);

  const botRam = (
    process.memoryUsage().heapUsed / 1024 / 1024
  ).toFixed(2);

  const totalRam = (
    os.totalmem() / 1024 / 1024 / 1024
  ).toFixed(2);

  const usedRam = (
    (os.totalmem() - os.freemem()) /
    1024 / 1024 / 1024
  ).toFixed(2);

  const cpuTime = (
    process.cpuUsage().user / 1000000
  ).toFixed(2);

  const uptime = timeformat(process.uptime());

  const prefix = PREFIX_COMMANDS.DEFAULT_PREFIX;

  const embed = new EmbedBuilder()
    .setColor(EMBED_COLORS.INFO)
    .setTitle("🤖 Ticck — Bot Information")
    .setThumbnail(client.user.displayAvatarURL())
    .setDescription(
      "**Welcome to Ticck!**\n\n" +
      "Your all-in-one Discord bot for moderation, " +
      "economy, music, games, tickets and more.\n\n" +
      `**Prefix:** \`${prefix}\`\n` +
      "**Planned Commands:** 550"
    )

    .addFields(
      {
        name: "📊 Bot Statistics",
        value:
          `**Servers:** ${servers}\n` +
          `**Members:** ${members.toLocaleString()}\n` +
          `**Channels:** ${channels}\n` +
          `**Ping:** ${ping}ms`,
        inline: true
      },
      {
        name: "📚 Command Statistics",
        value:
          `**Loaded Commands:** ${commands.length}\n` +
          `**Slash Commands:** ${slashCommands}\n` +
          `**Aliases:** ${aliases}\n` +
          `**Help Pages:** 13`,
        inline: true
      },
      {
        name: "🖥️ System Information",
        value:
          `**Operating System:** ${os.platform()}\n` +
          `**Architecture:** ${os.arch()}\n` +
          `**CPU Cores:** ${os.cpus().length}\n` +
          `**CPU User Time:** ${cpuTime}s`,
        inline: false
      },
      {
        name: "💾 Memory Usage",
        value:
          `**Bot Heap RAM:** ${botRam} MB\n` +
          `**System Used RAM:** ${usedRam} GB\n` +
          `**System Total RAM:** ${totalRam} GB`,
        inline: true
      },
      {
        name: "⏰ Uptime",
        value: `${uptime}`,
        inline: true
      },
      {
        name: "⚙️ Runtime",
        value: `Node.js ${process.version}`,
        inline: false
      },
      {
        name: "📖 Help",
        value:
          "Use `.help` to view all 13 help pages.\n" +
          "Use `.ping` to check Ticck's connection.",
        inline: false
      }
    )
    .setFooter({
      text: "Ticck • All-in-One Discord Bot"
    })
    .setTimestamp();

  // Link buttons
  const buttons = [];

  buttons.push(
    new ButtonBuilder()
      .setLabel("Invite Ticck")
      .setEmoji("🤖")
      .setURL(client.getInvite())
      .setStyle(ButtonStyle.Link)
  );

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

  return {
    embeds: [embed],
    components: [row]
  };
};
