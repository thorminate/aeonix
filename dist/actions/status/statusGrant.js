"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const statusEffectDatabaseSchema_1 = __importDefault(require("../../models/statusEffectDatabaseSchema"));
const userDatabaseSchema_1 = __importDefault(require("../../models/userDatabaseSchema"));
exports.default = async (interaction, options) => {
    const { statusEffectName, targetId } = options;
    const statusEffectData = await statusEffectDatabaseSchema_1.default.findOne({
        name: statusEffectName,
    });
    if (!statusEffectData) {
        await interaction.reply({
            content: "Status effect not found, make sure it exists in the database",
            ephemeral: true,
        });
        return;
    }
    const targetData = await userDatabaseSchema_1.default.findOne({
        id: targetId,
        guild: interaction.guild.id,
    });
    if (!targetData) {
        await interaction.reply({
            content: "User not found!",
            ephemeral: true,
        });
        return;
    }
    targetData.statusEffects.push({
        name: statusEffectData.name,
        timestamp: Date.now() + statusEffectData.duration,
    });
    statusEffectData.users.push(targetId);
    await statusEffectData.save();
    await targetData.save();
    await interaction.reply({
        content: `Successfully granted status effect ${statusEffectName} to <@${targetId}>. With a duration of ${statusEffectData.duration}ms`,
        ephemeral: true,
    });
    setInterval(async () => {
        const userData = await userDatabaseSchema_1.default.findOne({
            id: targetId,
            guild: interaction.guild.id,
        });
        console.log(userData);
        if (!userData)
            return;
        const statusEffect = userData.statusEffects.find((statusEffect) => {
            return statusEffect.name === statusEffectName;
        });
        console.log(statusEffect);
        if (!statusEffect)
            return;
        if (statusEffect.timestamp < Date.now()) {
            console.log("Status Effect Expired");
            userData.statusEffects = userData.statusEffects.filter((statusEffect) => statusEffect.name !== statusEffectName);
            const statusEffectData = await statusEffectDatabaseSchema_1.default.findOne({
                name: statusEffectName,
            });
            statusEffectData.users.filter((user) => {
                user !== targetId;
            });
            await userData.save();
            await statusEffectData.save();
            return;
        }
    }, 2000);
};
