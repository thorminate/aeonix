"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const statusEffectDatabaseSchema_1 = __importDefault(require("../../models/statusEffectDatabaseSchema"));
const ms_1 = __importDefault(require("ms"));
exports.default = async (interaction, options) => {
    if (await statusEffectDatabaseSchema_1.default.findOne({
        name: options.name,
    })) {
        await interaction.reply({
            content: "Status effect already exists. Check database for more information.",
            ephemeral: true,
        });
        return;
    }
    const durationMs = parseInt((0, ms_1.default)(options.duration));
    if (durationMs < 0 || durationMs > 86400000 || isNaN(durationMs)) {
        await interaction.reply({
            content: "Status effect duration invalid!",
            ephemeral: true,
        });
        return;
    }
    // create status effect
    const statusEffectNew = new statusEffectDatabaseSchema_1.default({
        statusEffectName: options.name,
        statusEffectDuration: durationMs,
        statusEffectDescription: options.description,
    });
    await statusEffectNew.save();
    await interaction.reply({
        content: `Successfully created status effect ${options.name}.`,
        ephemeral: true,
    });
};
