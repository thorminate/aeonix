// Define Requirements
import { Client, IntentsBitField } from "discord.js";
import mongoose from "mongoose";
import eventHandler from "./handlers/eventHandler";

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
    console.log("Attempting to connect to DB...");
    await mongoose.connect(MongoDBToken).then(() => console.log("OK"));

    console.log("Setting up events...");
    eventHandler(bot);
    console.log("OK");

    console.log("Connecting to Discord...");
    await bot.login(DiscordToken).then(() => console.log("OK"));
  } catch (error) {
    console.log(`Index Error: ${error}`);
  }
})();
