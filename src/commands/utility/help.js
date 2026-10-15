
const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  MessageFlags,
  ApplicationCommandOptionType,
} = require("discord.js");

const { EMBED_COLORS, INTERACTIONS } =
  require("@root/config");

const {
  getCommandUsage,
  getSlashUsage,
} = require("@handlers/command");

// Pages 2 to 13
const PAGES = [
  {
    title: "🛡️ Moderation",
    categories: ["MODERATION"],
  },
  {
    title: "🖥️ Server & Roles",
    categories: ["ADMIN", "INVITE"],
  },
  {
    title: "🔒 Security & AutoMod",
    categories: ["AUTOMOD"],
  },
  {
    title: "🎫 Tickets & Support",
    categories: ["TICKET"],
  },
  {
    title: "🎉 Community & Giveaways",
    categories: ["GIVEAWAY", "SUGGESTION"],
  },
  {
    title: "💰 Economy & Banking",
    categories: ["ECONOMY"],
  },
  {
    title: "🏢 Businesses & Shop",
    categories: ["BUSINESS", "SHOP", "JOBS"],
  },
  {
    title: "⭐ XP & Levels",
    categories: ["STATS", "LEVELS"],
  },
  {
    title: "🎰 Games & Casino",
    categories: ["FUN", "GAMBLING", "CASINO"],
  },
  {
    title: "👤 Social & Information",
    categories: [
      "SOCIAL",
      "ANIME",
      "IMAGE",
      "INFORMATION",
    ],
  },
  {
    title: "🎵 Music",
    categories: ["MUSIC"],
  },
  {
    title: "👑 Owner & Utilities",
    categories: ["OWNER", "UTILITY"],
  },
];

const TOTAL_PAGES = PAGES.length + 1;
const COLOR =
  EMBED_COLORS.INFO || EMBED_COLORS.BOT_EMBED;

function pageFor(category) {
  const index = PAGES.findIndex(p =>
    p.categories.includes(category)
  );
  return index < 0 ? TOTAL_PAGES - 1 : index + 1;
}

function getCounts(client) {
  const commands = client.commands || [];

  const aliases = commands.reduce(
    (total, cmd) =>
      total + (cmd.command?.aliases?.length || 0),
    0
  );

  return {
    prefix: commands.length,
    aliases,
    slash: INTERACTIONS.SLASH
      ? client.slashCommands.size
      : 0,
  };
}

function pageEmbed(client, page, prefix) {
  const embed = new EmbedBuilder()
    .setColor(COLOR)
    .setFooter({
      text: `Ticck • Page ${page + 1} of ${TOTAL_PAGES}`,
    })
    .setTimestamp();

  // Page 1: Home
  if (page === 0) {
    const counts = getCounts(client);

    return embed
      .setTitle("🏠 Ticck — Help Centre")
      .setDescription(
        `Welcome to **Ticck**, your all-in-one Discord bot!\n\n` +
        `**Prefix:** \`${prefix}\`\n` +
        `**Help pages:** ${TOTAL_PAGES}\n\n` +
        "Use the buttons below to explore each category."
      )
      .addFields(
        {
          name: "📚 Planned Commands",
          value: "**550**",
          inline: true,
        },
        {
          name: "✅ Loaded Prefix Commands",
          value: `**${counts.prefix}**`,
          inline: true,
        },
        {
          name: "⚡ Enabled Slash Commands",
          value: `**${counts.slash}**`,
          inline: true,
        },
        {
          name: "🔗 Aliases",
          value: `**${counts.aliases}**`,
          inline: true,
        },
        {
          name: "📖 Command Details",
          value: `Try \`${prefix}help ban\` for command information.`,
        }
      );
  }

  // Pages 2 to 13
  const section = PAGES[page - 1];

  const list = (client.commands || [])
    .filter(cmd => pageFor(cmd.category) === page)
    .sort((a, b) => a.name.localeCompare(b.name));

  const names = list.map(
    cmd => `\`${prefix}${cmd.name}\``
  );

  let description = names.join("  ");

  if (!description) {
    description =
      "No prefix commands loaded in this category yet.";
  }

  if (description.length > 3800) {
    description =
      description.slice(0, 3700) +
      "\n…Additional commands are loaded but not shown here.";
  }

  return embed
    .setTitle(section.title)
    .setDescription(description)
    .addFields({
      name: "✅ Loaded in this category",
      value: String(list.length),
      inline: true,
    });
}

// Navigation buttons
function buttonRow(page) {
  return new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId("ticck_help_first")
      .setLabel("⏮ First")
      .setStyle(ButtonStyle.Secondary)
      .setDisabled(page === 0),

    new ButtonBuilder()
      .setCustomId("ticck_help_prev")
      .setLabel("◀ Previous")
      .setStyle(ButtonStyle.Primary)
      .setDisabled(page === 0),

    new ButtonBuilder()
      .setCustomId("ticck_help_next")
      .setLabel("Next ▶")
      .setStyle(ButtonStyle.Primary)
      .setDisabled(page === TOTAL_PAGES - 1),

    new ButtonBuilder()
      .setCustomId("ticck_help_last")
      .setLabel("Last ⏭")
      .setStyle(ButtonStyle.Secondary)
      .setDisabled(page === TOTAL_PAGES - 1)
  );
}

// Button handler
async function openMenu(sent, client, userId, prefix) {
  if (!sent) return;

  let page = 0;

  const collector = sent.createMessageComponentCollector({
    time: 120000,
  });

  collector.on("collect", async interaction => {
    if (!interaction.customId.startsWith("ticck_help_")) {
      return;
    }

    if (interaction.user.id !== userId) {
      return interaction.reply({
        content: "❌ This help menu belongs to another user.",
        flags: MessageFlags.Ephemeral,
      });
    }

    switch (interaction.customId) {
      case "ticck_help_first":
        page = 0;
        break;

      case "ticck_help_prev":
        page = Math.max(0, page - 1);
        break;

      case "ticck_help_next":
        page = Math.min(TOTAL_PAGES - 1, page + 1);
        break;

      case "ticck_help_last":
        page = TOTAL_PAGES - 1;
        break;
    }

    await interaction.update({
      embeds: [pageEmbed(client, page, prefix)],
      components: [buttonRow(page)],
    });
  });

  collector.on("end", async () => {
    await sent.edit({ components: [] }).catch(() => {});
  });
}

// Ticck command
module.exports = {
  name: "help",
  description: "Open the 13-page Ticck help centre.",
  category: "UTILITY",

  botPermissions: ["EmbedLinks"],

  command: {
    enabled: true,
    aliases: ["h"],
    usage: "[command]",
  },

  slashCommand: {
    enabled: true,
    options: [
      {
        name: "command",
        description: "Command to look up",
        required: false,
        type: ApplicationCommandOptionType.String,
      },
    ],
  },

  // .help
  async messageRun(message, args, data) {
    const name = args[0]
      ?.replace(/^\./, "")
      .toLowerCase();

    if (name) {
      const cmd = message.client.getCommand(name);

      if (!cmd) {
        return message.safeReply({
          embeds: [
            new EmbedBuilder()
              .setColor(EMBED_COLORS.ERROR)
              .setTitle("❌ Command not found")
              .setDescription(
                `\`${data.prefix}${name}\` is not currently loaded.`
              ),
          ],
        });
      }

      return message.safeReply({
        embeds: [
          getCommandUsage(cmd, data.prefix, name),
        ],
      });
    }

    const sent = await message.safeReply({
      embeds: [
        pageEmbed(message.client, 0, data.prefix),
      ],
      components: [buttonRow(0)],
    });

    await openMenu(
      sent,
      message.client,
      message.author.id,
      data.prefix
    );
  },

  // /help
  async interactionRun(interaction, data) {
    const name = interaction.options
      .getString("command")
      ?.replace(/^\./, "")
      .toLowerCase();

    if (name) {
      const cmd = interaction.client.slashCommands.get(name);

      if (!cmd) {
        return interaction.followUp({
          embeds: [
            new EmbedBuilder()
              .setColor(EMBED_COLORS.ERROR)
              .setTitle("❌ Command not found")
              .setDescription(
                `\`/${name}\` is not currently loaded.`
              ),
          ],
        });
      }

      return interaction.followUp({
        embeds: [getSlashUsage(cmd)],
      });
    }

    const prefix = data.settings?.prefix || ".";

    const sent = await interaction.followUp({
      embeds: [
        pageEmbed(interaction.client, 0, prefix),
      ],
      components: [buttonRow(0)],
    });

    await openMenu(
      sent,
      interaction.client,
      interaction.user.id,
      prefix
    );
  },
};
