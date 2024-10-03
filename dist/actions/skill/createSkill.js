"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skillDatabaseSchema_1 = __importDefault(require("../../models/skillDatabaseSchema"));
/**
 * Creates a new skill in the database.
 * @param {ModalSubmitInteraction} interaction The interaction that ran the command.
 * @param {Options} options The name, description, action, cooldown, and will of the skill.
 * @returns {Promise<void>}
 */
exports.default = async (interaction, options) => {
    // Validate the inputs
    // check if skill already exists
    if (await skillDatabaseSchema_1.default.findOne({ name: options.name })) {
        await interaction.reply({
            content: "Skill already exists. Please choose a different name.",
            ephemeral: true,
        });
        return;
    }
    // create a new skill and store it in the database
    const newSkill = new skillDatabaseSchema_1.default({
        name: options.name,
        description: options.description,
        action: options.action,
        cooldown: options.cooldown,
        will: options.will,
    });
    await newSkill.save();
    await interaction.reply({
        content: `Successfully created skill ${options.name}.`,
        ephemeral: true,
    });
};
