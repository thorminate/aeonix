"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const statusEffectDatabaseSchema_1 = __importDefault(require("../../models/statusEffectDatabaseSchema"));
const userDatabaseSchema_1 = __importDefault(require("../../models/userDatabaseSchema"));
/**
 * Deletes a status effect from the database.
 * @param {ModalSubmitInteraction} interaction The interaction that ran the command.
 * @param {string} name The name of the status effect to be deleted.
 */
exports.default = async (interaction, name) => {
    const statusEffectData = await statusEffectDatabaseSchema_1.default.findOne({
        name,
    });
    if (!statusEffectData) {
        await interaction.reply({
            content: "Status effect not found, make sure it exist in the database",
            ephemeral: true,
        });
        return;
    }
    // delete status effect from all users
    statusEffectData.users.forEach(async (user) => {
        await userDatabaseSchema_1.default.findOne({ id: user }).then((user) => {
            if (user) {
                user.statusEffects = user.statusEffects.filter((effect) => effect.statusEffectName !== name);
            }
        });
    });
    await statusEffectData.deleteOne();
    await interaction.reply({
        content: `Successfully deleted status effect ${name}.`,
        ephemeral: true,
    });
};
