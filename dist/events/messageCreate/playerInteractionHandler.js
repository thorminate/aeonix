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
const skillDatabaseSchema_1 = __importDefault(require("../../models/skillDatabaseSchema"));
const itemDatabaseSchema_1 = __importDefault(require("../../models/itemDatabaseSchema"));
module.exports = (bot, message) => __awaiter(void 0, void 0, void 0, function* () {
    // if message was not made in a guild, author was a bot or the cooldown is active, return
    if (!message.inGuild() || message.author.bot)
        return;
    function consumeItem(message, itemName) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = message.author.id;
            const user = yield userDatabaseSchema_1.default.findOne({ userId: userId });
            if (user) {
                const itemIndex = Array.prototype.findIndex.call(user.inventory, (item) => item && item.itemName === itemName);
                const itemDataConsume = yield itemDatabaseSchema_1.default.findOne({ itemName: itemName });
                if (itemIndex > -1) {
                    if (!itemDataConsume)
                        return;
                    if (itemDataConsume.itemActionable === "consume" &&
                        user.inventory[itemIndex].Amount > 1) {
                        user.inventory[itemIndex].Amount--;
                        yield user.save();
                    }
                    else if (itemDataConsume.itemActionable === "consume") {
                        user.inventory.splice(itemIndex, 1); // Remove the item from the inventory
                        yield user.save();
                    }
                    // the code to execute the item action using correct syntax
                    function executeItemAction(actionString, userData) {
                        return __awaiter(this, void 0, void 0, function* () {
                            if (actionString === "none")
                                return;
                            const actionParts = actionString.split(",");
                            const operators = {
                                "+": (a, b) => a + b,
                                "-": (a, b) => a - b,
                            };
                            for (const action of actionParts) {
                                const [stat, operator, value] = action.trim().split(" ");
                                const statName = stat.toLowerCase();
                                const statValue = parseInt(value);
                                userData[statName] = operators[operator](userData[statName], statValue);
                                yield userData.save();
                            }
                        });
                    }
                    executeItemAction(itemDataConsume.itemAction, user);
                    yield message.reply(`Item ${itemName} consumed.`);
                }
                else {
                    yield message.reply(`Item ${itemName} not found in your inventory.`);
                }
            }
            else {
                yield message.reply("You are not registered in the system.");
            }
        });
    }
    function useSkill(message, skillName) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = message.author.id;
            const user = yield userDatabaseSchema_1.default.findOne({ userId: userId });
            if (user) {
                if (user.skills.includes(skillName)) {
                    const skill = yield skillDatabaseSchema_1.default.findOne({ skillName: skillName });
                    if (skill) {
                        // Perform the skill action here
                        const skillAction = skill.skillAction;
                        yield message.reply(skillAction);
                    }
                    else if (skillName === undefined) {
                        yield message.reply({
                            content: "Please specify a skill to use.",
                            ephemeral: true,
                        });
                    }
                    else {
                        yield message.reply(`Skill ${skillName} not found.`);
                    }
                }
                else {
                    yield message.reply(`Skill ${skillName} not found.`);
                }
            }
            else {
                yield message.reply("You are not registered in the system.");
            }
        });
    }
    const content = message.content.trim();
    const bracketContent = content.match(/\[(.*?)\]/g);
    if (bracketContent) {
        const bracketTexts = bracketContent.map((x) => x.slice(1, -1));
        for (const text of bracketTexts) {
            if (text.toLowerCase().includes("consume")) {
                const itemName = text.split(" ")[1];
                yield consumeItem(message, itemName);
            }
            else {
                const skillName = text.toLowerCase();
                yield useSkill(message, skillName);
            }
        }
    }
});
