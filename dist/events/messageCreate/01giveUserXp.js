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
const userDatabaseSchema_1 = __importDefault(require("../../models/userDatabaseSchema"));
const calculateLevelExp_1 = __importDefault(require("../../utils/calculateLevelExp"));
const cooldowns = new Set();
// gets random number based on set parameters min and max
function getRandomExp(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
// enables intellisense on bot and message object
/**
 *
 * @param {Client} bot
 * @param {Message} message
 */
module.exports = (bot, message) => __awaiter(void 0, void 0, void 0, function* () {
    // if message was not made in a guild, author was a bot or the cooldown is active, return
    if (!message.inGuild() ||
        message.author.bot ||
        cooldowns.has(message.author.id))
        return;
    // gets random number based on set parameters min and max
    const expToGive = getRandomExp(5, 15);
    // defines queries for database user
    const query = {
        userId: message.author.id,
        guildId: message.guild.id,
    };
    try {
        // gets userData(aka level) from database based on query
        const level = yield userDatabaseSchema_1.default.findOne(query);
        // if userData(aka level) exists in database, give exp to user.
        if (level) {
            level.exp += expToGive;
            // if user has gained enough exp to level up, level up and say so to user.
            if (level.exp > (0, calculateLevelExp_1.default)(level.level)) {
                const strengthMultiplied = 12 * level.strengthMultiplier;
                const willMultiplied = 12 * level.willMultiplier;
                const cognitionMultiplied = 12 * level.cognitionMultiplier;
                level.exp = 0;
                level.level += 1;
                level.strength += strengthMultiplied;
                level.will += willMultiplied;
                level.cognition += cognitionMultiplied;
                // then round the values
                level.strength = Math.round(level.strength);
                level.will = Math.round(level.will);
                level.cognition = Math.round(level.cognition);
                yield level.save();
                const botMessage = yield message.channel.send({
                    content: `Hello, <@${message.member.id}>! you have leveled up!\nPlease check your status menu for your new stats!`,
                    ephemeral: true,
                });
                setTimeout(() => {
                    botMessage.delete();
                }, 60 * 1000);
            }
            // save new userData(aka level), if it fails, log error
            yield level.save().catch((e) => {
                console.log(`Error saving level: ${e}`);
                return;
            });
            // set cooldown to 60 seconds
            cooldowns.add(message.author.id);
            setTimeout(() => {
                cooldowns.delete(message.author.id);
            }, 100);
            // if userData(aka level) doesn't exist in database, create it and give exp to user.
        }
        else {
            const newUser = new userDatabaseSchema_1.default({
                userId: message.author.id,
                guildId: message.guild.id,
                exp: expToGive,
            });
            // then send a notice that the persona was not saved in the database.
            if (message.member.roles.cache.has("1270791621289578607")) {
                message.channel.send(`Hello, ${message.member} your persona was not saved in the database. This has now been fixed, please go to <#1270790941892153404> to correct your persona! If your stats are incorrect, please contact <@539166043009056794>!`);
            }
            // save new userData(aka level)
            yield newUser.save();
            cooldowns.add(message.author.id);
            setTimeout(() => {
                cooldowns.delete(message.author.id);
            }, 60000);
        }
    }
    catch (error) {
        console.log(`Error giving Exp: ${error}`);
    }
});
