"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skillDatabaseSchema_1 = __importDefault(require("../../models/skillDatabaseSchema"));
const userDatabaseSchema_1 = __importDefault(require("../../models/userDatabaseSchema"));
/**
 * Revokes a skill from a target user.
 * @param {ModalSubmitInteraction} interaction The interaction that ran the command.
 * @param {Options} options The name of the skill to be revoked and the target user's ID.
 * @returns {Promise<void>}
 */
exports.default = async (interaction, options) => {
    const { skillName, targetId } = options;
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
    const target = await userDatabaseSchema_1.default.findOne({
        id: targetId,
        guild: interaction.guild.id,
    });
    if (!target) {
        await interaction.reply({
            content: "Target user not found. Make sure you entered a valid user ID.",
            ephemeral: true,
        });
        return;
    }
    // check if the user has the skill
    if (target.skills.includes(skill.name)) {
        target.skills = target.skills.filter((skillName) => skillName !== skill.name);
        skill.users = skill.users.filter((user) => user !== target.id);
        await skill.save();
        await target.save();
        await interaction.reply({
            content: `Successfully revoked skill ${skillName} from <@${targetId}>.`,
            ephemeral: true,
        });
    }
    else {
        await interaction.reply({
            content: `User does not have skill ${skillName}.`,
            ephemeral: true,
        });
    }
};
