
const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} = require("discord.js");

const { EMBED_COLORS } = require("@root/config");

module.exports = (member) => {
  const user = member.user;

  const avatar = user.displayAvatarURL({
    extension: "png",
    size: 1024
  });

  const serverAvatar = member.displayAvatarURL({
    extension: "png",
    size: 512
  });

  const roles = [...member.roles.cache.values()]
    .filter(role => role.id !== member.guild.id)
    .sort((a, b) => b.position - a.position);

  const visibleRoles = roles
    .slice(0, 15)
    .map(role => `<@&${role.id}>`)
    .join(" ") || "No roles";

  const remainingRoles = Math.max(0, roles.length - 15);

  const created = Math.floor(
    user.createdTimestamp / 1000
  );

  const joined = member.joinedTimestamp
    ? Math.floor(member.joinedTimestamp / 1000)
    : null;

  const highestRole = roles[0]
    ? `<@&${roles[0].id}>`
    : "No additional roles";

  const owner = member.guild.ownerId === member.id;

  const embed = new EmbedBuilder()
    .setColor(EMBED_COLORS.INFO)
    .setTitle("👤 Ticck — User Information")
    .setThumbnail(serverAvatar)
    .setDescription(
      `Viewing information for **${member.displayName}**`
    )
    .addFields(
      {
        name: "👤 Username",
        value: user.username,
        inline: true
      },
      {
        name: "🏷️ Display Name",
        value: member.displayName,
        inline: true
      },
      {
        name: "🆔 User ID",
        value: `\`${user.id}\``,
        inline: false
      },
      {
        name: "🤖 Account Type",
        value: user.bot ? "Bot" : "Human",
        inline: true
      },
      {
        name: "👑 Server Owner",
        value: owner ? "Yes" : "No",
        inline: true
      },
      {
        name: "📅 Account Created",
        value: `<t:${created}:F>\n<t:${created}:R>`,
        inline: false
      },
      {
        name: "📥 Joined Server",
        value: joined
          ? `<t:${joined}:F>\n<t:${joined}:R>`
          : "Unknown",
        inline: false
      },
      {
        name: "🏆 Highest Role",
        value: highestRole,
        inline: false
      },
      {
        name: `🎭 Roles (${roles.length})`,
        value:
          visibleRoles +
          (remainingRoles
            ? `\nAnd ${remainingRoles} more roles.`
            : ""),
        inline: false
      },
      {
        name: "💎 Server Booster",
        value: member.premiumSinceTimestamp
          ? "✅ Boosting this server"
          : "❌ Not boosting",
        inline: true
      }
    )
    .setFooter({
      text: "Ticck • User Information"
    })
    .setTimestamp();

  const buttons = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setLabel("View Avatar")
        .setEmoji("🖼️")
        .setStyle(ButtonStyle.Link)
        .setURL(avatar)
    );

  return {
    embeds: [embed],
    components: [buttons]
  };
};
