"use strict";
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
module.exports = async (bot, message) => {
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
        const level = await userDatabaseSchema_1.default.findOne(query);
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
                await level.save();
                const botMessage = await message.reply({
                    content: `Hello, <@${message.member.id}>! you have leveled up!\nPlease check your status menu for your new stats!`,
                });
                setTimeout(() => {
                    botMessage.delete();
                }, 60 * 1000);
            }
            // save new userData(aka level), if it fails, log error
            await level.save().catch((e) => {
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
            await newUser.save();
            cooldowns.add(message.author.id);
            setTimeout(() => {
                cooldowns.delete(message.author.id);
            }, 60000);
        }
    }
    catch (error) {
        console.log(`Error giving Exp: ${error}`);
    }
};
