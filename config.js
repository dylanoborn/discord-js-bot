
module.exports = {
  OWNER_IDS: [""],
  SUPPORT_SERVER: "",

  PREFIX_COMMANDS: {
    ENABLED: true,
    DEFAULT_PREFIX: ".",
  },

  INTERACTIONS: {
    SLASH: false,
    CONTEXT: false,
    GLOBAL: false,
    TEST_GUILD_ID: "xxxxxxxxxxx",
  },

  EMBED_COLORS: {
    BOT_EMBED: "#5865F2",
    INFO: "#5865F2",
    TRANSPARENT: "#36393F",
    SUCCESS: "#2ECC71",
    ERROR: "#ED4245",
    WARNING: "#F1C40F",
    GAMBLING: "#E67E22",
  },

  CACHE_SIZE: {
    GUILDS: 100,
    USERS: 10000,
    MEMBERS: 10000,
  },

  MESSAGES: {
    API_ERROR: "An unexpected error occurred. Please try again.",
  },

  AUTOMOD: {
    ENABLED: false,
    LOG_EMBED: "#F1C40F",
    DM_EMBED: "#F1C40F",
  },

  DASHBOARD: {
    enabled: false,
    baseURL: "http://localhost:8080",
    failureURL: "http://localhost:8080",
    port: "8080",
  },

  ECONOMY: {
    ENABLED: false,
    CURRENCY: "🪙",
    DAILY_COINS: 100,
    MIN_BEG_AMOUNT: 100,
    MAX_BEG_AMOUNT: 2500,
  },

  MUSIC: {
    ENABLED: false,
    IDLE_TIME: 60,
    MAX_SEARCH_RESULTS: 5,
    DEFAULT_SOURCE: "SC",
    LAVALINK_NODES: [
      {
        host: "localhost",
        port: 2333,
        password: "youshallnotpass",
        id: "Local Node",
        secure: false,
      },
    ],
  },

  GIVEAWAYS: {
    ENABLED: false,
    REACTION: "🎁",
    START_EMBED: "#5865F2",
    END_EMBED: "#2ECC71",
  },

  IMAGE: {
    ENABLED: false,
    BASE_API: "https://strangeapi.hostz.me/api",
  },

  INVITE: {
    ENABLED: false,
  },

  MODERATION: {
    ENABLED: false,
    EMBED_COLORS: {
      TIMEOUT: "#F1C40F",
      UNTIMEOUT: "#2ECC71",
      KICK: "#ED4245",
      SOFTBAN: "#ED4245",
      BAN: "#ED4245",
      UNBAN: "#2ECC71",
      VMUTE: "#F1C40F",
      VUNMUTE: "#2ECC71",
      DEAFEN: "#F1C40F",
      UNDEAFEN: "#2ECC71",
      DISCONNECT: "#F1C40F",
      MOVE: "#5865F2",
    },
  },

  PRESENCE: {
    ENABLED: false,
    STATUS: "online",
    TYPE: "WATCHING",
    MESSAGE: [".help | Ticck"],
  },

  STATS: {
    ENABLED: false,
    XP_COOLDOWN: 5,
    DEFAULT_LVL_UP_MSG: "{member:tag}, you reached level {level}!",
  },

  SUGGESTIONS: {
    ENABLED: false,
    EMOJI: {
      UP_VOTE: "⬆️",
      DOWN_VOTE: "⬇️",
    },
    DEFAULT_EMBED: "#5865F2",
    APPROVED_EMBED: "#2ECC71",
    DENIED_EMBED: "#ED4245",
  },

  TICKET: {
    ENABLED: false,
    CREATE_EMBED: "#5865F2",
    CLOSE_EMBED: "#ED4245",
  },
};
