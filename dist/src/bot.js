"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Define Requirements
require("dotenv").config();
const discord_js_1 = require("discord.js");
const mongoose_1 = __importDefault(require("mongoose"));
const eventHandler_1 = __importDefault(require("./handlers/eventHandler"));
// Define 'bot'
const bot = new discord_js_1.Client({
    intents: [
        discord_js_1.IntentsBitField.Flags.Guilds,
        discord_js_1.IntentsBitField.Flags.GuildModeration,
        discord_js_1.IntentsBitField.Flags.GuildEmojisAndStickers,
        discord_js_1.IntentsBitField.Flags.GuildIntegrations,
        discord_js_1.IntentsBitField.Flags.GuildWebhooks,
        discord_js_1.IntentsBitField.Flags.GuildInvites,
        discord_js_1.IntentsBitField.Flags.GuildVoiceStates,
        discord_js_1.IntentsBitField.Flags.GuildMessageReactions,
        discord_js_1.IntentsBitField.Flags.GuildMessageTyping,
        discord_js_1.IntentsBitField.Flags.DirectMessages,
        discord_js_1.IntentsBitField.Flags.DirectMessageReactions,
        discord_js_1.IntentsBitField.Flags.DirectMessageTyping,
        discord_js_1.IntentsBitField.Flags.GuildScheduledEvents,
        discord_js_1.IntentsBitField.Flags.AutoModerationConfiguration,
        discord_js_1.IntentsBitField.Flags.AutoModerationExecution,
        discord_js_1.IntentsBitField.Flags.GuildMessagePolls,
        discord_js_1.IntentsBitField.Flags.DirectMessagePolls,
        discord_js_1.IntentsBitField.Flags.GuildMembers,
        discord_js_1.IntentsBitField.Flags.GuildMessages,
        discord_js_1.IntentsBitField.Flags.MessageContent,
        discord_js_1.IntentsBitField.Flags.GuildPresences,
    ],
});
const MongoDBToken = process.env.MONGODB_URI + "/the_system";
const DiscordToken = process.env.TOKEN;
// Connect to DB and Discord.
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(MongoDBToken);
        console.log("Connected to DB.");
        (0, eventHandler_1.default)(bot);
        bot.login(DiscordToken);
    }
    catch (error) {
        console.log(`Index Error: ${error}`);
    }
}))();