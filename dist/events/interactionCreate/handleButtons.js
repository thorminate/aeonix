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
const userDatabaseSchema_1 = __importDefault(require("../../models/userDatabaseSchema"));
module.exports = (bot, interaction) => __awaiter(void 0, void 0, void 0, function* () {
    if (!interaction.isButton())
        return;
    if (interaction.customId === "welcome-channel-begin-onboarding") {
        let user = yield userDatabaseSchema_1.default.findOne({
            userId: interaction.user.id,
            guildId: interaction.guild.id,
        });
        const userDiscord = yield interaction.guild.members.fetch(interaction.user.id);
        if (!user) {
            const newUser = new userDatabaseSchema_1.default({
                userId: interaction.user.id,
                guildId: interaction.guild.id,
                isOnboard: false,
            });
            user = newUser;
            yield user.save();
        }
        if (user.isOnboard && !userDiscord.roles.cache.has("1270791621289578607")) {
            yield interaction.reply({
                content: "You have already completed the onboarding process, but you don't have the player role. Fixing...",
                ephemeral: true,
            });
            setTimeout(() => {
                interaction.member.roles.add(interaction.guild.roles.cache.find((role) => role.id === "1270791621289578607"));
            }, 2000);
            return;
        }
        else if (user.isOnboard) {
            yield interaction.reply({
                content: "You have already completed the onboarding process.",
                ephemeral: true,
            });
            return;
        }
        const onboardingChannel = interaction.guild.channels.cache.get("1270790941892153404");
        const messages = yield onboardingChannel.messages.fetch({ limit: 1 });
        const message = messages.first();
        // Ensure the message has components
        if (!message || !message.components || message.components.length === 0) {
            console.error("No components found in the message.");
            return;
        }
        const actionRow = message.components[0];
        const beginOnboardingButtonData = actionRow.components[0].data;
        // Recreate the button using ButtonBuilder
        const beginOnboardingButton = new discord_js_1.ButtonBuilder()
            .setCustomId(beginOnboardingButtonData.custom_id)
            .setLabel("Onboarding player...")
            .setStyle(beginOnboardingButtonData.style)
            .setDisabled(true);
        const row = new discord_js_1.ActionRowBuilder().addComponents(beginOnboardingButton);
        yield message.edit({
            components: [row],
        });
        // Set a timeout to reset the button after 15 minutes (15 * 60 * 1000 ms)
        const resetTimeout = setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
            yield resetButton();
        }), 2 * 60 * 1000);
        // Function to reset the button
        const resetButton = () => __awaiter(void 0, void 0, void 0, function* () {
            const resetButton = new discord_js_1.ButtonBuilder()
                .setCustomId(beginOnboardingButtonData.custom_id)
                .setLabel("Begin Onboarding")
                .setStyle(discord_js_1.ButtonStyle.Success)
                .setDisabled(false);
            const resetRow = new discord_js_1.ActionRowBuilder().addComponents(resetButton);
            yield message.edit({
                components: [resetRow],
            });
        });
        if (user.isOnboard) {
            clearTimeout(resetTimeout);
            yield resetButton();
        }
        const speciesMenu = new discord_js_1.StringSelectMenuBuilder()
            .setCustomId("species-select")
            .setPlaceholder("Select your species!")
            .addOptions(new discord_js_1.StringSelectMenuOptionBuilder()
            .setLabel("Human")
            .setDescription("Humans are the most common and versatile species.")
            .setEmoji("👨")
            .setValue("Human"), new discord_js_1.StringSelectMenuOptionBuilder()
            .setLabel("Elf")
            .setDescription("Elves are known for their tall build and attunement to nature.")
            .setEmoji("🧝")
            .setValue("Elf"), new discord_js_1.StringSelectMenuOptionBuilder()
            .setLabel("Dwarf")
            .setDescription("Dwarves are known for their dexterity and smarts.")
            .setEmoji("🧙")
            .setValue("Dwarf"), new discord_js_1.StringSelectMenuOptionBuilder()
            .setLabel("Orc")
            .setDescription("Orcs are known for their brutish strength and resilience.")
            .setEmoji("🧟")
            .setValue("orc"));
        const speciesRow = new discord_js_1.ActionRowBuilder().addComponents(speciesMenu);
        interaction.reply({
            content: "First off, select your species!",
            components: [speciesRow],
            ephemeral: true,
        });
    }
});