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
Object.defineProperty(exports, "__esModule", { value: true });
const userData = require("../../models/userDatabaseSchema");
const { ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ButtonBuilder, ButtonStyle, } = require("discord.js");
const selectedValues = [];
module.exports = (bot, interaction) => __awaiter(void 0, void 0, void 0, function* () {
    if (!interaction.isStringSelectMenu())
        return;
    switch (interaction.customId) {
        case "species-select":
            let user = yield userData.findOne({ userId: interaction.user.id });
            if (!user) {
                const newUser = new userData({
                    userId: interaction.user.id,
                    guildId: interaction.guild.id,
                });
                user = newUser;
            }
            yield interaction.values.forEach((value) => __awaiter(void 0, void 0, void 0, function* () {
                user.species = value;
                if (value === "Human") {
                    user.strengthMultiplier = 1.1;
                    user.willMultiplier = 1.1;
                    user.cognitionMultiplier = 1.1;
                }
                else if (value === "Elf") {
                    user.strengthMultiplier = 0.9;
                    user.willMultiplier = 1.3;
                    user.cognitionMultiplier = 1.1;
                }
                else if (value === "Dwarf") {
                    user.strengthMultiplier = 1.1;
                    user.willMultiplier = 0.9;
                    user.cognitionMultiplier = 1.3;
                }
                else if (value === "Orc") {
                    user.strengthMultiplier = 1.3;
                    user.willMultiplier = 1.1;
                    user.cognitionMultiplier = 0.9;
                }
                yield user.save();
                const classMenu = new StringSelectMenuBuilder()
                    .setCustomId("class-select")
                    .setPlaceholder("Select your class!")
                    .addOptions(new StringSelectMenuOptionBuilder()
                    .setLabel("Warrior")
                    .setDescription("Warriors are the most common and versatile class.")
                    .setEmoji("⚔️")
                    .setValue("Warrior"), new StringSelectMenuOptionBuilder()
                    .setLabel("Ranger")
                    .setDescription("Rangers are known for their quick and stealthy moves.")
                    .setEmoji("🏹")
                    .setValue("Ranger"), new StringSelectMenuOptionBuilder()
                    .setLabel("Rogue")
                    .setDescription("Rogues are known for their sneaky and stealthy moves.")
                    .setEmoji("🗡️")
                    .setValue("Rogue"));
                const classRow = new ActionRowBuilder().addComponents(classMenu);
                interaction.reply({
                    content: "Perfect! Now select your class!",
                    components: [classRow],
                    ephemeral: true,
                });
            }));
            break;
        case "class-select":
            const selectedClass = interaction.values[0];
            const userClass = yield userData.findOne({ userId: interaction.user.id });
            if (userClass) {
                userClass.class = selectedClass;
                userClass.isOnboard = true;
                yield userClass.save();
                interaction.reply({
                    content: "Your class has been set! Welcome aboard, player.",
                    ephemeral: true,
                });
                const onboardingChannel = interaction.guild.channels.cache.get("1270790941892153404");
                const messages = yield onboardingChannel.messages.fetch({ limit: 1 });
                const message = messages.first();
                const resetButton = new ButtonBuilder()
                    .setCustomId("welcome-channel-begin-onboarding")
                    .setLabel("Begin Onboarding")
                    .setStyle(ButtonStyle.Success)
                    .setDisabled(false);
                const resetRow = new ActionRowBuilder().addComponents(resetButton);
                yield message.edit({
                    components: [resetRow],
                });
                setTimeout(() => {
                    interaction.member.roles.add("1270791621289578607");
                }, 4000);
            }
            break;
    }
});
