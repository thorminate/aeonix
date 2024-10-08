"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skillDatabaseSchema_1 = __importDefault(require("../../models/skillDatabaseSchema"));
const userDatabaseSchema_1 = __importDefault(require("../../models/userDatabaseSchema"));
/**
 * Grants a skill to a target user.
 * @param {ModalSubmitInteraction} interaction The interaction that ran the command.
 * @param {Options} options
 * @returns {Promise<void>}
 */
exports.default = async (interaction, options) => {
    const { skillName, targetId } = options;
    const targetData = await userDatabaseSchema_1.default.findOne({
        id: targetId,
    });
    if (!targetData) {
        await interaction.reply({
            content: "Target user not found. Make sure you entered a valid user ID.",
            ephemeral: true,
        });
        return;
    }
    const skillData = await skillDatabaseSchema_1.default.findOne({
        name: skillName,
    });
    if (!skillData) {
        await interaction.reply({
            content: `Skill ${skillName} not found. Make sure you entered a valid skill name. Or create a new skill.`,
            ephemeral: true,
        });
        return;
    }
    // check if the user already has the skill
    if (targetData.skills.some((skill) => skill === skillData.name)) {
        await interaction.reply({
            content: `User already has skill ${skillName}.`,
            ephemeral: true,
        });
        return;
    }
    skillData.users.push(targetData.id);
    await skillData.save();
    targetData.skills.push(skillData.name);
    await targetData.save();
    await interaction.reply({
        content: `Successfully granted skill ${skillName} to <@${targetId}>.`,
        ephemeral: true,
    });
};