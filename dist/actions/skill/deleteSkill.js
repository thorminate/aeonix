"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skillDatabaseSchema_1 = __importDefault(require("../../models/skillDatabaseSchema"));
const userDatabaseSchema_1 = __importDefault(require("../../models/userDatabaseSchema"));
/**
 * Deletes a skill from the database.
 * @param {ModalSubmitInteraction} interaction The interaction that ran the command.
 * @param {string} skillName The name of the skill to be deleted.
 * @returns {Promise<void>}
 */
exports.default = async (interaction, skillName) => {
    const skill = await skillDatabaseSchema_1.default.findOne({
        name: skillName,
    });
    if (!skill) {
        await interaction.reply({
            content: `Skill ${skillName} not found. Make sure you entered a valid skill name. Or create a new skill.`,
            ephemeral: true,
        });
        return;
    }
    // first delete the skill from all users that have it
    const skillUsers = await userDatabaseSchema_1.default.find({
        id: { $in: skill.users },
    });
    skillUsers.forEach(async (skillUser) => {
        skillUser.skills = skillUser.skills.filter((skill) => skill !== skillName);
        await skillUser.save();
    });
    // delete the skill from the database
    await skill.deleteOne();
    await interaction.reply({
        content: `Successfully deleted skill ${skillName}.`,
        ephemeral: true,
    });
};