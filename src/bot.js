// Define Requirements
require("dotenv").config();
const { Client, IntentsBitField } = require("discord.js");
const mongoose = require("mongoose");
const eventHandler = require("./handlers/eventHandler");

// Define 'bot'
const bot = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildModeration,
    IntentsBitField.Flags.GuildEmojisAndStickers,
    IntentsBitField.Flags.GuildIntegrations,
    IntentsBitField.Flags.GuildWebhooks,
    IntentsBitField.Flags.GuildInvites,
    IntentsBitField.Flags.GuildVoiceStates,
    IntentsBitField.Flags.GuildMessageReactions,
    IntentsBitField.Flags.GuildMessageTyping,
    IntentsBitField.Flags.DirectMessages,
    IntentsBitField.Flags.DirectMessageReactions,
    IntentsBitField.Flags.DirectMessageTyping,
    IntentsBitField.Flags.GuildScheduledEvents,
    IntentsBitField.Flags.AutoModerationConfiguration,
    IntentsBitField.Flags.AutoModerationExecution,
    IntentsBitField.Flags.GuildMessagePolls,
    IntentsBitField.Flags.DirectMessagePolls,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildPresences,
  ],
});

const MongoDBToken = process.env.MONGODB_URI + "/the_system";
const DiscordToken = process.env.TOKEN;
// Connect to DB and Discord.
(async () => {
  try {
    await mongoose.connect(MongoDBToken);
    console.log("Connected to DB.");

    eventHandler(bot);

    bot.login(DiscordToken);
  } catch (error) {
    console.log(`Index Error: ${error}`);
  }
})();
