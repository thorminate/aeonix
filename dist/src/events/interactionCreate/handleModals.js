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
const discord_js_1 = require("discord.js");
const buttonWrapper = require("../../utils/buttonWrapper");
const userData = require("../../models/userDatabaseSchema");
const skillData = require("../../models/skillDatabaseSchema");
const itemData = require("../../models/itemDatabaseSchema");
const statusEffectData = require("../../models/statusEffectDatabaseSchema");
const ms_1 = __importDefault(require("ms"));
module.exports = (bot, modalInteraction) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        if (!modalInteraction.isModalSubmit())
            return;
        switch (modalInteraction.customId) {
            // Stat Modals
            case "stats-giver-modal":
                // get input values
                const statAmount = parseInt(modalInteraction.fields.getTextInputValue("stats-giver-input"));
                const statsTargetUserInput = modalInteraction.fields.getTextInputValue("stats-giver-target-input");
                const variant = modalInteraction.fields.getTextInputValue("stats-giver-variant-input");
                const modifier = modalInteraction.fields.getTextInputValue("stats-giver-modifier-input");
                // Validate the inputs
                if (isNaN(statAmount) ||
                    statAmount < 0 ||
                    !modalInteraction.guild.members.cache.has(statsTargetUserInput)) {
                    yield modalInteraction.reply({
                        content: "Please enter a valid positive number for the stat amount and a valid user ID.",
                        ephemeral: true,
                    });
                    return;
                }
                if (variant !== "strength" &&
                    variant !== "will" &&
                    variant !== "cognition" &&
                    variant !== "level" &&
                    variant !== "exp") {
                    yield modalInteraction.reply({
                        content: "Please enter a valid variant. Valid variants are 'strength', 'will', 'cognition', 'level', and 'exp'.",
                        ephemeral: true,
                    });
                    return;
                }
                if (modifier !== "add" && modifier !== "remove" && modifier !== "set") {
                    yield modalInteraction.reply({
                        content: "Please enter a valid modifier. Valid modifiers are 'add', 'remove', and 'set'.",
                        ephemeral: true,
                    });
                    return;
                }
                // Fetch the target user and update their stats
                const statsTargetUserObj = yield modalInteraction.guild.members.fetch(statsTargetUserInput);
                const statsTargetUserData = yield userData.findOne({
                    userId: statsTargetUserObj.user.id,
                    guildId: modalInteraction.guild.id,
                });
                if (!statsTargetUserData) {
                    yield modalInteraction.reply({
                        content: "User not found in the database. Please make sure the user has at least sent one message before running this command.",
                        ephemeral: true,
                    });
                    return;
                }
                if (modifier === "add") {
                    if (variant === "strength") {
                        statsTargetUserData.strength =
                            statsTargetUserData.strength + statAmount;
                    }
                    else if (variant === "will") {
                        statsTargetUserData.will = statsTargetUserData.will + statAmount;
                    }
                    else if (variant === "cognition") {
                        statsTargetUserData.cognition =
                            statsTargetUserData.cognition + statAmount;
                    }
                    else if (variant === "level") {
                        statsTargetUserData.level = statsTargetUserData.level + statAmount;
                    }
                    else if (variant === "exp") {
                        statsTargetUserData.exp = statsTargetUserData.exp + statAmount;
                    }
                    yield statsTargetUserData.save();
                    yield modalInteraction.reply({
                        content: `Successfully gave <@${statsTargetUserObj.user.id}> **${statAmount}** stat point(s) to the ${variant} variant!`,
                        ephemeral: true,
                    });
                }
                if (modifier === "remove") {
                    if (variant === "strength") {
                        statsTargetUserData.strength =
                            statsTargetUserData.strength - statAmount;
                    }
                    else if (variant === "will") {
                        statsTargetUserData.will = statsTargetUserData.will - statAmount;
                    }
                    else if (variant === "cognition") {
                        statsTargetUserData.cognition =
                            statsTargetUserData.cognition - statAmount;
                    }
                    else if (variant === "level") {
                        statsTargetUserData.level = statsTargetUserData.level - statAmount;
                    }
                    else if (variant === "exp") {
                        statsTargetUserData.exp = statsTargetUserData.exp - statAmount;
                    }
                    if (statsTargetUserData.strength < 0) {
                        statsTargetUserData.strength = 0;
                    }
                    if (statsTargetUserData.will < 0) {
                        statsTargetUserData.will = 0;
                    }
                    if (statsTargetUserData.cognition < 0) {
                        statsTargetUserData.cognition = 0;
                    }
                    yield statsTargetUserData.save();
                    yield modalInteraction.reply({
                        content: `Successfully took <@${statsTargetUserObj.user.id}> **${statAmount}** stat point(s) from ${variant}!`,
                        ephemeral: true,
                    });
                }
                if (modifier === "set") {
                    if (variant === "strength") {
                        statsTargetUserData.strength = statAmount;
                    }
                    else if (variant === "will") {
                        statsTargetUserData.will = statAmount;
                    }
                    else if (variant === "cognition") {
                        statsTargetUserData.cognition = statAmount;
                    }
                    else if (variant === "level") {
                        statsTargetUserData.level = statAmount;
                    }
                    else if (variant === "exp") {
                        statsTargetUserData.exp = statAmount;
                    }
                    yield statsTargetUserData.save();
                    yield modalInteraction.reply({
                        content: `Successfully set <@${statsTargetUserObj.user.id}>'s ${variant} to **${statAmount}!**`,
                        ephemeral: true,
                    });
                }
                break;
            // Skill Modals
            case "create-skill-modal":
                // get input values
                const createSkillName = modalInteraction.fields
                    .getTextInputValue("create-skill-name-input")
                    .toLowerCase();
                const createSkillDescription = modalInteraction.fields.getTextInputValue("create-skill-description-input");
                const createSkillAction = modalInteraction.fields.getTextInputValue("create-skill-action-input");
                const createSkillCooldown = parseInt(modalInteraction.fields.getTextInputValue("create-skill-cooldown-input"));
                const createSkillWill = parseInt(modalInteraction.fields.getTextInputValue("create-skill-will-input"));
                // Validate the inputs
                if (createSkillName === "" ||
                    createSkillDescription === "" ||
                    createSkillAction === "" ||
                    isNaN(createSkillCooldown) ||
                    isNaN(createSkillWill)) {
                    yield modalInteraction.reply({
                        content: "Please fill in all the required fields correctly. Cooldown and Will must be numbers.",
                        ephemeral: true,
                    });
                    return;
                }
                // check if skill already exists
                if (yield skillData.findOne({ skillName: createSkillName })) {
                    yield modalInteraction.reply({
                        content: "Skill already exists. Please choose a different name.",
                        ephemeral: true,
                    });
                    return;
                }
                // create a new skill and store it in the database
                const newSkill = new skillData({
                    skillName: createSkillName,
                    skillDescription: createSkillDescription,
                    skillAction: createSkillAction,
                    skillCooldown: createSkillCooldown,
                    skillWill: createSkillWill,
                });
                yield newSkill.save();
                yield modalInteraction.reply({
                    content: `Successfully created skill ${createSkillName}.`,
                    ephemeral: true,
                });
                break;
            case "delete-skill-modal":
                // get input values
                const deleteSkillName = modalInteraction.fields
                    .getTextInputValue("delete-skill-name-input")
                    .toLowerCase();
                // Validate the inputs
                if (deleteSkillName === "") {
                    yield modalInteraction.reply({
                        content: "Please fill in the required field.",
                        ephemeral: true,
                    });
                    return;
                }
                // first delete the skill from all users that have it
                const skillUsers = yield userData.find({
                    skills: { $elemMatch: { skillName: deleteSkillName } },
                });
                for (const skillUser of skillUsers) {
                    skillUser.skills = skillUser.skills.filter((skill) => skill.skillName !== deleteSkillName);
                    if (skillUser.skills.length === 0) {
                        skillUser.skills = [];
                    }
                    yield skillUser.save();
                }
                // delete the skill from the database
                const deletedSkill = yield skillData.deleteOne({
                    skillName: deleteSkillName,
                });
                if (deletedSkill.deletedCount === 0) {
                    yield modalInteraction.reply({
                        content: `Failed to delete skill ${deleteSkillName}. Please check if the skill exists.`,
                        ephemeral: true,
                    });
                }
                else {
                    yield modalInteraction.reply({
                        content: `Successfully deleted skill ${deleteSkillName}.`,
                        ephemeral: true,
                    });
                }
                break;
            case "grant-skill-modal":
                // get input values
                const grantSkillName = modalInteraction.fields
                    .getTextInputValue("grant-skill-name-input")
                    .toLowerCase();
                const grantSkillTarget = modalInteraction.fields.getTextInputValue("grant-skill-target-input");
                // Validate the inputs
                if (grantSkillName === "") {
                    yield modalInteraction.reply({
                        content: "Please fill in the required fields.",
                        ephemeral: true,
                    });
                    return;
                }
                // grant the skill to the target user
                const grantSkillTargetUserData = yield userData.findOne({
                    userId: grantSkillTarget,
                });
                if (!grantSkillTargetUserData) {
                    yield modalInteraction.reply({
                        content: "Target user not found. Make sure you entered a valid user ID.",
                        ephemeral: true,
                    });
                    return;
                }
                const grantSkillSkill = yield skillData.findOne({
                    skillName: grantSkillName,
                });
                if (!grantSkillSkill) {
                    yield modalInteraction.reply({
                        content: `Skill ${grantSkillName} not found. Make sure you entered a valid skill name. Or create a new skill.`,
                        ephemeral: true,
                    });
                    return;
                }
                // check if the user already has the skill
                if (grantSkillTargetUserData.skills.some((skill) => skill === grantSkillName)) {
                    yield modalInteraction.reply({
                        content: `User already has skill ${grantSkillName}.`,
                        ephemeral: true,
                    });
                    return;
                }
                grantSkillSkill.skillUsers.push(grantSkillTargetUserData.userId);
                yield grantSkillSkill.save();
                grantSkillTargetUserData.skills.push(grantSkillSkill.skillName);
                yield grantSkillTargetUserData.save();
                yield modalInteraction.reply({
                    content: `Successfully granted skill ${grantSkillName} to <@${grantSkillTarget}>.`,
                    ephemeral: true,
                });
                break;
            case "revoke-skill-modal":
                // get input values
                const revokeSkillName = modalInteraction.fields
                    .getTextInputValue("revoke-skill-name-input")
                    .toLowerCase();
                const revokeSkillTarget = modalInteraction.fields.getTextInputValue("revoke-skill-target-input");
                // Validate the inputs
                const revokeSkillData = yield skillData.findOne({
                    skillName: revokeSkillName,
                });
                if (!revokeSkillData) {
                    yield modalInteraction.reply({
                        content: `Skill ${revokeSkillName} not found. Make sure you entered a valid skill name. Or create a new skill.`,
                        ephemeral: true,
                    });
                    return;
                }
                const revokeSkillTargetData = yield userData.findOne({
                    userId: revokeSkillTarget,
                    guildId: modalInteraction.guild.id,
                });
                if (!revokeSkillTargetData) {
                    yield modalInteraction.reply({
                        content: "Target user not found. Make sure you entered a valid user ID.",
                        ephemeral: true,
                    });
                    return;
                }
                // check if the user has the skill
                if (revokeSkillTargetData.skills.includes(revokeSkillName)) {
                    revokeSkillTargetData.skills = revokeSkillTargetData.skills.filter((skill) => skill !== revokeSkillName);
                    yield revokeSkillTargetData.save();
                    yield modalInteraction.reply({
                        content: `Successfully revoked skill ${revokeSkillName} from <@${revokeSkillTarget}>.`,
                        ephemeral: true,
                    });
                }
                else {
                    yield modalInteraction.reply({
                        content: `User does not have skill ${revokeSkillName}.`,
                        ephemeral: true,
                    });
                }
                break;
            // Item Modals
            case "create-item-modal":
                // get input values
                const itemName = modalInteraction.fields
                    .getTextInputValue("create-item-name-input")
                    .toLowerCase();
                const itemDescription = modalInteraction.fields.getTextInputValue("create-item-description-input");
                const itemActionable = modalInteraction.fields
                    .getTextInputValue("create-item-actionable-input")
                    .toLowerCase();
                const itemAction = modalInteraction.fields.getTextInputValue("create-item-action-input");
                function checkItemActionSyntax(actionString) {
                    if (actionString === "none")
                        return true;
                    const actionParts = actionString.split(",");
                    const validOperators = ["+", "-"];
                    const validStats = ["STRENGTH", "WILL", "COGNITION"];
                    for (const action of actionParts) {
                        const [stat, operator, value] = action.trim().split(" ");
                        if (!validStats.includes(stat)) {
                            return false; // invalid stat
                        }
                        if (!validOperators.includes(operator)) {
                            return false; // invalid operator
                        }
                        if (isNaN(parseInt(value))) {
                            return false; // invalid value
                        }
                    }
                    return true; // syntax is correct
                }
                /*
              
              // the code to execute the item action using correct syntax
        
              function executeItemAction(actionString, userData) {
                if (actionString === "none") return;
                const actionParts = actionString.split(",");
                const operators = {
                  "+": (a, b) => a + b,
                  "-": (a, b) => a - b,
                };
        
                for (const action of actionParts) {
                  const [stat, operator, value] = action.trim().split(" ");
                  const statName = stat.toLowerCase();
                  const statValue = parseInt(value);
                  userData[statName] = operators[operator](
                    userData[statName],
                    statValue
                  );
                }
              }
              */
                // Validate the inputs
                if (itemActionable !== "interact" &&
                    itemActionable !== "consume" &&
                    itemActionable !== "use") {
                    modalInteraction.reply({
                        content: "The third field must be either 'interact', 'consume' or 'use'.",
                        ephemeral: true,
                    });
                    return;
                }
                if (checkItemActionSyntax(itemAction) === false) {
                    modalInteraction.reply({
                        content: "The fourth field must be a valid action syntax or 'none'.\nExample: COGNITION + 10, WILL - 5\nThey must be separated by a comma and a space. The operator must be either '+' or '-'. The stat must be either 'STRENGTH', 'WILL' or 'COGNITION'. The value must be a number. Each action must be separated by a space. so COGNITION+10, WILL-5 in invalid syntax.",
                        ephemeral: true,
                    });
                    return;
                }
                const existingItem = yield itemData.findOne({
                    itemName: itemName,
                });
                if (existingItem) {
                    modalInteraction.reply({
                        content: "An item with that name already exists. You can skip this step.",
                        ephemeral: true,
                    });
                    return;
                }
                const newItem = new itemData({
                    itemName: itemName,
                    itemDescription: itemDescription,
                    itemActionable: itemActionable,
                    itemAction: itemAction,
                });
                yield newItem.save();
                yield modalInteraction.reply({
                    content: `Successfully created item ${itemName}.`,
                    ephemeral: true,
                });
                break;
            case "give-item-modal":
                // get input values
                const giveItemName = modalInteraction.fields
                    .getTextInputValue("give-item-name-input")
                    .toLowerCase();
                const giveItemTarget = modalInteraction.fields.getTextInputValue("give-item-target-input");
                const giveItemAmount = parseInt(modalInteraction.fields.getTextInputValue("give-item-amount-input"));
                if (isNaN(giveItemAmount)) {
                    yield modalInteraction.reply({
                        content: "Amount must be a number.",
                        ephemeral: true,
                    });
                    return;
                }
                const giveItemTargetData = yield userData.findOne({
                    userId: giveItemTarget,
                    guildId: modalInteraction.guild.id,
                });
                if (!giveItemTargetData) {
                    yield modalInteraction.reply({
                        content: "User not found, make sure they exist in the database.",
                        ephemeral: true,
                    });
                }
                const giveItemData = yield itemData.findOne({
                    itemName: giveItemName,
                });
                if (!giveItemData) {
                    yield modalInteraction.reply({
                        content: "Item not found, make sure it exist in the database",
                        ephemeral: true,
                    });
                }
                const giveItemIndex = giveItemTargetData.inventory.findIndex((item) => item.itemName === giveItemData.itemName);
                if (giveItemIndex === -1) {
                    const inventoryObject = {
                        itemName: giveItemData.itemName,
                        itemAmount: giveItemAmount,
                    };
                    giveItemTargetData.inventory.push(inventoryObject);
                    yield giveItemTargetData.save();
                }
                else {
                    giveItemTargetData.inventory[giveItemIndex].itemAmount +=
                        giveItemAmount;
                    yield giveItemTargetData.save();
                }
                giveItemData.itemUsers.push(giveItemTarget);
                yield giveItemData.save();
                yield modalInteraction.reply({
                    content: `Successfully gave ${giveItemAmount}x ${giveItemName} to <@${giveItemTarget}>.`,
                    ephemeral: true,
                });
                break;
            case "remove-item-modal":
                // get input values
                const removeItemName = modalInteraction.fields
                    .getTextInputValue("remove-item-name-input")
                    .toLowerCase();
                const removeItemTarget = modalInteraction.fields.getTextInputValue("remove-item-target-input");
                // Validate the inputs
                const removeItemData = yield itemData.findOne({
                    itemName: removeItemName,
                });
                if (!removeItemData) {
                    yield modalInteraction.reply({
                        content: "Item not found, make sure it exist in the database",
                        ephemeral: true,
                    });
                    return;
                }
                const removeItemTargetData = yield userData.findOne({
                    userId: removeItemTarget,
                    guildId: modalInteraction.guild.id,
                });
                if (!removeItemTargetData) {
                    yield modalInteraction.reply({
                        content: "User not found, make sure they are in the server.",
                        ephemeral: true,
                    });
                    return;
                }
                const removeItemIndex = removeItemTargetData.inventory.findIndex((item) => item.itemName === removeItemData.itemName);
                if (removeItemIndex > -1) {
                    removeItemTargetData.inventory.splice(removeItemIndex, 1);
                    yield removeItemTargetData.save();
                    yield modalInteraction.reply({
                        content: `Successfully removed item ${removeItemName} from <@${removeItemTarget}>'s inventory.`,
                        ephemeral: true,
                    });
                }
                else {
                    yield modalInteraction.reply({
                        content: "User does not have the item in their inventory.",
                        ephemeral: true,
                    });
                    return;
                }
                break;
            case "delete-item-modal":
                // get input values
                const deleteItemName = modalInteraction.fields
                    .getTextInputValue("delete-item-name-input")
                    .toLowerCase();
                // Validate the inputs
                const deleteItemData = yield itemData.findOne({
                    itemName: deleteItemName,
                });
                if (!deleteItemData) {
                    yield modalInteraction.reply({
                        content: "Item not found, make sure it exist in the database",
                        ephemeral: true,
                    });
                    return;
                }
                const deleteItemUsers = deleteItemData.itemUsers;
                for (const user of deleteItemUsers) {
                    const deleteItemUserData = yield userData.findOne({
                        userId: user,
                        guildId: modalInteraction.guild.id,
                    });
                    const deleteItemIndex = deleteItemUserData.inventory.findIndex((item) => item.itemName === deleteItemName);
                    if (deleteItemIndex > -1) {
                        userData.inventory.splice(deleteItemIndex, 1);
                        yield userData.save();
                    }
                }
                itemData.deleteOne({ itemName: deleteItemName });
                yield modalInteraction.reply({
                    content: `Successfully deleted item ${deleteItemName}.`,
                    ephemeral: true,
                });
                break;
            // Status Effect Modals
            case "create-status-effect-modal":
                // get input values
                const statusEffectName = modalInteraction.fields
                    .getTextInputValue("create-status-effect-name-input")
                    .toLowerCase();
                const statusEffectDuration = modalInteraction.fields
                    .getTextInputValue("create-status-effect-duration-input")
                    .toLowerCase();
                const statusEffectDescription = modalInteraction.fields.getTextInputValue("create-status-effect-description-input");
                const statusEffectAction = modalInteraction.fields.getTextInputValue("create-status-effect-action-input");
                // Validate the inputs
                if (statusEffectName === "" ||
                    statusEffectDuration === "" ||
                    statusEffectDescription === "" ||
                    statusEffectAction === "") {
                    yield modalInteraction.reply({
                        content: "Please fill in the required fields.",
                        ephemeral: true,
                    });
                    return;
                }
                if (!checkItemActionSyntax(statusEffectAction)) {
                    yield modalInteraction.reply({
                        content: "Invalid status effect action syntax. Use 'none' for no action.",
                        ephemeral: true,
                    });
                    return;
                }
                // check if status effect already exists
                const statusEffectExistingData = yield statusEffectData.findOne({
                    statusEffectName: statusEffectName,
                });
                if (statusEffectExistingData) {
                    yield modalInteraction.reply({
                        content: "Status effect already exists. Check database for more information.",
                        ephemeral: true,
                    });
                    return;
                }
                const statusEffectDurationMs = (0, ms_1.default)(statusEffectDuration);
                if (statusEffectDurationMs < 0 ||
                    statusEffectDurationMs > 86400000 ||
                    isNaN(statusEffectDurationMs)) {
                    yield modalInteraction.reply({
                        content: "Status effect duration invalid!",
                        ephemeral: true,
                    });
                    return;
                }
                // create status effect
                const statusEffectNew = new statusEffectData({
                    statusEffectName: statusEffectName,
                    statusEffectDuration: statusEffectDurationMs,
                    statusEffectDescription: statusEffectDescription,
                    statusEffectAction: statusEffectAction,
                });
                yield statusEffectNew.save();
                yield modalInteraction.reply({
                    content: `Successfully created status effect ${statusEffectName}.`,
                    ephemeral: true,
                });
                break;
            case "delete-status-effect-modal":
                // get input values
                const deleteStatusEffectName = modalInteraction.fields
                    .getTextInputValue("delete-status-effect-name-input")
                    .toLowerCase();
                // Validate the inputs
                const deleteStatusEffectData = yield statusEffectData.findOne({
                    statusEffectName: deleteStatusEffectName,
                });
                if (!deleteStatusEffectData) {
                    yield modalInteraction.reply({
                        content: "Status effect not found, make sure it exist in the database",
                        ephemeral: true,
                    });
                    return;
                }
                // delete status effect from all users
                deleteStatusEffectData.statusEffectUsers.forEach((user) => __awaiter(void 0, void 0, void 0, function* () {
                    yield userData.findOne({ userId: user }).then((user) => {
                        if (user) {
                            user.statusEffects = user.statusEffects.filter((effect) => effect.statusEffectName !== deleteStatusEffectName);
                        }
                    });
                }));
                yield statusEffectData.deleteOne({
                    statusEffectName: deleteStatusEffectName,
                });
                yield modalInteraction.reply({
                    content: `Successfully deleted status effect ${deleteStatusEffectName}.`,
                    ephemeral: true,
                });
                break;
            // Moderation Modals
            case "ban-user-modal":
                // get input values
                const banUserId = modalInteraction.fields.getTextInputValue("ban-user-target-input");
                const banUserReason = modalInteraction.fields.getTextInputValue("ban-user-reason-input");
                // Validate the inputs
                if (banUserId === "") {
                    yield modalInteraction.reply({
                        content: "Please fill in the required fields.",
                        ephemeral: true,
                    });
                    return;
                }
                const buttonConfirm = new discord_js_1.ButtonBuilder()
                    .setCustomId("ban-user-confirm")
                    .setLabel("Confirm")
                    .setStyle(discord_js_1.ButtonStyle.Danger)
                    .setDisabled(false);
                const buttonCancel = new discord_js_1.ButtonBuilder()
                    .setCustomId("ban-user-cancel")
                    .setLabel("Cancel")
                    .setStyle(discord_js_1.ButtonStyle.Success)
                    .setDisabled(false);
                yield modalInteraction.reply({
                    content: "Are you sure you want to ban this user?",
                    ephemeral: true,
                    components: yield buttonWrapper([buttonConfirm, buttonCancel]),
                });
                const collector = modalInteraction.channel.createMessageComponentCollector({
                    filter: (m) => m.user.id === modalInteraction.user.id,
                    max: 1,
                });
                collector.on("collect", (i) => __awaiter(void 0, void 0, void 0, function* () {
                    if (i.customId === "ban-user-confirm") {
                    }
                }));
                break;
            case "kick-user-modal":
                // get input values
                const kickUserId = modalInteraction.fields.getTextInputValue("kick-user-target-input");
                const kickUserReason = modalInteraction.fields.getTextInputValue("kick-user-reason-input") ||
                    "No reason provided";
                // get the target user object
                const kickUser = yield ((_a = modalInteraction.guild.members
                    .fetch(kickUserId)) === null || _a === void 0 ? void 0 : _a.catch(() => null));
                // check if the target user exists, else edit the reply and return
                if (!kickUser) {
                    yield modalInteraction.reply({
                        content: "That user doesn't exist in this server.",
                        ephemeral: true,
                    });
                    return;
                }
                // check if the target user is a bot
                if (kickUser.user.bot) {
                    yield modalInteraction.reply({
                        content: "You cannot kick a bot.",
                        ephemeral: true,
                    });
                    return;
                }
                // check if the target user is the owner of the server
                if (kickUser.id === modalInteraction.guild.ownerId) {
                    yield modalInteraction.reply({
                        content: "I cannot kick my creator.",
                        ephemeral: true,
                    });
                    return;
                }
                // define the target user role position and request user role position
                const kickUserRolePosition = kickUser.roles.highest.position;
                const kickUserRequesterRolePosition = modalInteraction.member.roles.highest.position;
                const kickUserBotRolePosition = modalInteraction.guild.members.me.roles.highest.position;
                // check if the target user is of a higher position than the request user
                if (kickUserRolePosition >= kickUserRequesterRolePosition) {
                    yield modalInteraction.reply({
                        content: "That user is of a higher position of the power hierarchy than you. Therefore you cannot kick them.",
                        ephemeral: true,
                    });
                    return;
                }
                // check if the target user is of a higher position than the bot
                if (kickUserRolePosition >= kickUserBotRolePosition) {
                    yield modalInteraction.reply({
                        content: "That user is of a higher position of the power hierarchy than me. Therefore i cannot kick them.",
                        ephemeral: true,
                    });
                    return;
                }
                // kick the user
                try {
                    yield kickUser.kick(kickUserReason);
                    yield modalInteraction.reply({
                        content: `The user <@${kickUser.user.id}> has been kicked successfully.\n${kickUserReason}`,
                        ephemeral: true,
                    });
                }
                catch (error) {
                    console.error("Error kicking user: ", error);
                }
                break;
            case "timeout-user-modal":
                // get input values
                const timeoutUserId = modalInteraction.fields.getTextInputValue("timeout-user-target-input");
                let timeoutUserDuration = modalInteraction.fields.getTextInputValue("timeout-user-duration-input");
                const timeoutUserReason = modalInteraction.fields.getTextInputValue("timeout-user-reason-input") || "No reason provided";
                // get the target user object
                const timeoutUser = yield ((_b = modalInteraction.guild.members
                    .fetch(timeoutUserId)) === null || _b === void 0 ? void 0 : _b.catch(() => null));
                // check if the target user exists, else edit the reply and return
                if (!timeoutUser) {
                    yield modalInteraction.reply({
                        content: `That user doesn't exist in this server.\n${timeoutUserReason}`,
                        ephemeral: true,
                    });
                    return;
                }
                // check if the target user is a bot
                if (timeoutUser.user.bot) {
                    yield modalInteraction.reply({
                        content: "You cannot timeout a bot.",
                        ephemeral: true,
                    });
                    return;
                }
                // check if the target user is the owner of the server
                if (timeoutUser.id === modalInteraction.guild.ownerId) {
                    yield modalInteraction.reply({
                        content: "I cannot timeout my creator.",
                        ephemeral: true,
                    });
                    return;
                }
                //get duration in ms
                const timeoutUserDurationMs = (0, ms_1.default)(timeoutUserDuration);
                //check if duration is valid
                if (isNaN(timeoutUserDurationMs)) {
                    yield modalInteraction.reply({
                        content: "Invalid duration. Please enter a valid duration.",
                        ephemeral: true,
                    });
                    return;
                }
                //check if the duration is below 5 seconds or above 28 days
                if (timeoutUserDurationMs < 5000 ||
                    timeoutUserDurationMs > 28 * 24 * 60 * 60 * 1000) {
                    yield modalInteraction.reply({
                        content: "Invalid duration. Please enter a duration between 5 seconds and 28 days.",
                        ephemeral: true,
                    });
                    return;
                }
                // define role positions
                const timeoutUserRolePosition = timeoutUser.roles.highest.position;
                const timeoutUserRequesterRolePosition = modalInteraction.member.roles.highest.position;
                const timeoutUserBotRolePosition = modalInteraction.guild.members.me.roles.highest.position;
                // check if the target user is of a higher position than the request user
                if (timeoutUserRolePosition >= timeoutUserRequesterRolePosition) {
                    yield modalInteraction.reply({
                        content: "That user is of a higher position of the power hierarchy than you. Therefore you cannot timeout them.",
                        ephemeral: true,
                    });
                    return;
                }
                // check if the target user is of a higher position than the bot
                if (timeoutUserRolePosition >= timeoutUserBotRolePosition) {
                    yield modalInteraction.reply({
                        content: "That user is of a higher position of the power hierarchy than me. Therefore i cannot timeout them.",
                        ephemeral: true,
                    });
                    return;
                }
                // timeout the user
                try {
                    yield timeoutUser.timeout(timeoutUserDuration, timeoutUserReason);
                    yield modalInteraction.reply({
                        content: `The user <@${timeoutUser.user.id}> has been timed out successfully.\n${timeoutUserReason}`,
                        ephemeral: true,
                    });
                }
                catch (error) {
                    console.error("Error timing out user: ", error);
                }
                break;
        }
    }
    catch (error) {
        console.error("Error handling modal submission:", error);
    }
});
