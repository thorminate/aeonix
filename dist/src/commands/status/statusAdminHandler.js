"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
module.exports = {
    handleStatsGiverModal: async (interaction) => {
        try {
            // Set up the Stats Giver modal
            const statsGiverModal = new discord_js_1.ModalBuilder()
                .setCustomId("stats-giver-modal")
                .setTitle("Stat Giver");
            const statsGiverModifierInput = new discord_js_1.TextInputBuilder()
                .setCustomId("stats-giver-modifier-input")
                .setLabel("Modifier of stats to give")
                .setStyle(discord_js_1.TextInputStyle.Short)
                .setRequired(true)
                .setMinLength(1);
            const statsGiverVariantInput = new discord_js_1.TextInputBuilder()
                .setCustomId("stats-giver-variant-input")
                .setLabel("Variant of stats to give")
                .setStyle(discord_js_1.TextInputStyle.Short)
                .setRequired(true)
                .setMinLength(1);
            const statsGiverInput = new discord_js_1.TextInputBuilder()
                .setCustomId("stats-giver-input")
                .setLabel("Amount of stat points to give, remove or set")
                .setStyle(discord_js_1.TextInputStyle.Short)
                .setRequired(true)
                .setMinLength(1);
            const statsGiverTargetInput = new discord_js_1.TextInputBuilder()
                .setCustomId("stats-giver-target-input")
                .setLabel("Target user ID")
                .setStyle(discord_js_1.TextInputStyle.Short)
                .setRequired(true)
                .setMinLength(18);
            const statsGiverRow = new discord_js_1.ActionRowBuilder().addComponents(statsGiverInput);
            const statsGiverVariantRow = new discord_js_1.ActionRowBuilder().addComponents(statsGiverVariantInput);
            const statsGiverTargetRow = new discord_js_1.ActionRowBuilder().addComponents(statsGiverTargetInput);
            const statsGiverModifierRow = new discord_js_1.ActionRowBuilder().addComponents(statsGiverModifierInput);
            statsGiverModal.addComponents(statsGiverRow, statsGiverVariantRow, statsGiverTargetRow, statsGiverModifierRow);
            // Show the modal
            await interaction.showModal(statsGiverModal);
        }
        catch (error) {
            console.log("Error handling Stats Giver modal:", error);
        }
    },
    handleCreateSkillModal: async (interaction) => {
        try {
            // Set up the Create Skill modal
            const createSkillModal = new discord_js_1.ModalBuilder()
                .setCustomId("create-skill-modal")
                .setTitle("Create Skill");
            const createSkillNameInput = new discord_js_1.TextInputBuilder()
                .setCustomId("create-skill-name-input")
                .setLabel("Skill name, no special characters!")
                .setStyle(discord_js_1.TextInputStyle.Short)
                .setRequired(true);
            const createSkillDescriptionInput = new discord_js_1.TextInputBuilder()
                .setCustomId("create-skill-description-input")
                .setLabel("Skill description")
                .setStyle(discord_js_1.TextInputStyle.Paragraph)
                .setRequired(true);
            const createSkillActionInput = new discord_js_1.TextInputBuilder()
                .setCustomId("create-skill-action-input")
                .setLabel("What the system says when the skill is used")
                .setStyle(discord_js_1.TextInputStyle.Paragraph)
                .setRequired(true);
            const createSkillCooldownInput = new discord_js_1.TextInputBuilder()
                .setCustomId("create-skill-cooldown-input")
                .setLabel("Skill cooldown")
                .setStyle(discord_js_1.TextInputStyle.Short)
                .setRequired(true);
            const createSkillWillInput = new discord_js_1.TextInputBuilder()
                .setCustomId("create-skill-will-input")
                .setLabel("Will requirement")
                .setStyle(discord_js_1.TextInputStyle.Short)
                .setRequired(true);
            const createSkillWillRow = new discord_js_1.ActionRowBuilder().addComponents(createSkillWillInput);
            const createSkillCooldownRow = new discord_js_1.ActionRowBuilder().addComponents(createSkillCooldownInput);
            const createSkillActionRow = new discord_js_1.ActionRowBuilder().addComponents(createSkillActionInput);
            const createSkillDescriptionRow = new discord_js_1.ActionRowBuilder().addComponents(createSkillDescriptionInput);
            const createSkillNameRow = new discord_js_1.ActionRowBuilder().addComponents(createSkillNameInput);
            createSkillModal.addComponents(createSkillNameRow, createSkillDescriptionRow, createSkillActionRow, createSkillCooldownRow, createSkillWillRow);
            // Show the modal
            await interaction.showModal(createSkillModal);
        }
        catch (error) {
            console.log("Error handling Create Skill modal:", error);
        }
    },
    handleDeleteSkillModal: async (interaction) => {
        try {
            // Set up the Delete Skill modal
            const deleteSkillModal = new discord_js_1.ModalBuilder()
                .setCustomId("delete-skill-modal")
                .setTitle("Delete Skill");
            const deleteSkillNameInput = new discord_js_1.TextInputBuilder()
                .setCustomId("delete-skill-name-input")
                .setLabel("Skill name")
                .setStyle(discord_js_1.TextInputStyle.Short)
                .setRequired(true);
            const deleteSkillNameRow = new discord_js_1.ActionRowBuilder().addComponents(deleteSkillNameInput);
            deleteSkillModal.addComponents(deleteSkillNameRow);
            // Show the modal
            await interaction.showModal(deleteSkillModal);
        }
        catch (error) {
            console.log("Error handling Delete Skill modal:", error);
        }
    },
    handleGrantSkillModal: async (interaction) => {
        try {
            // Set up the Grant Skill modal
            const grantSkillModal = new discord_js_1.ModalBuilder()
                .setCustomId("grant-skill-modal")
                .setTitle("Grant Skill");
            const grantSkillNameInput = new discord_js_1.TextInputBuilder()
                .setCustomId("grant-skill-name-input")
                .setLabel("Skill name")
                .setStyle(discord_js_1.TextInputStyle.Short)
                .setRequired(true);
            const grantSkillTargetInput = new discord_js_1.TextInputBuilder()
                .setCustomId("grant-skill-target-input")
                .setLabel("Target user ID")
                .setStyle(discord_js_1.TextInputStyle.Short)
                .setRequired(true)
                .setMinLength(18);
            const grantSkillTargetRow = new discord_js_1.ActionRowBuilder().addComponents(grantSkillTargetInput);
            const grantSkillNameRow = new discord_js_1.ActionRowBuilder().addComponents(grantSkillNameInput);
            grantSkillModal.addComponents(grantSkillNameRow, grantSkillTargetRow);
            // Show the modal
            await interaction.showModal(grantSkillModal);
        }
        catch (error) {
            console.log("Error handling Grant Skill modal:", error);
        }
    },
    handleRevokeSkillModal: async (interaction) => {
        try {
            // Set up the Revoke Skill modal
            const revokeSkillModal = new discord_js_1.ModalBuilder()
                .setCustomId("revoke-skill-modal")
                .setTitle("Revoke Skill");
            const revokeSkillTargetInput = new discord_js_1.TextInputBuilder()
                .setCustomId("revoke-skill-target-input")
                .setLabel("The user who's skill you want to revoke")
                .setStyle(discord_js_1.TextInputStyle.Short)
                .setRequired(true)
                .setMinLength(18);
            const revokeSkillNameInput = new discord_js_1.TextInputBuilder()
                .setCustomId("revoke-skill-name-input")
                .setLabel("The Name of the skill you want to revoke")
                .setStyle(discord_js_1.TextInputStyle.Short)
                .setRequired(true);
            const revokeSkillTargetRow = new discord_js_1.ActionRowBuilder().addComponents(revokeSkillTargetInput);
            const revokeSkillNameRow = new discord_js_1.ActionRowBuilder().addComponents(revokeSkillNameInput);
            revokeSkillModal.addComponents(revokeSkillNameRow, revokeSkillTargetRow);
            // Show the modal
            await interaction.showModal(revokeSkillModal);
        }
        catch (error) {
            console.log("Error handling Revoke Skill modal:", error);
        }
    },
    handleCreateItemModal: async (interaction) => {
        try {
            // Set up the Create Item modal
            const createItemModal = new discord_js_1.ModalBuilder()
                .setCustomId("create-item-modal")
                .setTitle("Create Item");
            const createItemNameInput = new discord_js_1.TextInputBuilder()
                .setCustomId("create-item-name-input")
                .setLabel("Item Descriptor/Name")
                .setStyle(discord_js_1.TextInputStyle.Short)
                .setRequired(true);
            const createItemDescriptionInput = new discord_js_1.TextInputBuilder()
                .setCustomId("create-item-description-input")
                .setLabel("Item Description")
                .setStyle(discord_js_1.TextInputStyle.Paragraph)
                .setRequired(true);
            const createItemActionableInput = new discord_js_1.TextInputBuilder()
                .setCustomId("create-item-actionable-input")
                .setLabel("What the item does, use/consume/interact")
                .setStyle(discord_js_1.TextInputStyle.Short)
                .setRequired(true);
            const createItemActionInput = new discord_js_1.TextInputBuilder()
                .setCustomId("create-item-action-input")
                .setLabel("What happens when you interact?")
                .setStyle(discord_js_1.TextInputStyle.Paragraph)
                .setRequired(true);
            const createItemNameRow = new discord_js_1.ActionRowBuilder().addComponents(createItemNameInput);
            const createItemDescriptionRow = new discord_js_1.ActionRowBuilder().addComponents(createItemDescriptionInput);
            const createItemActionableRow = new discord_js_1.ActionRowBuilder().addComponents(createItemActionableInput);
            const createItemActionRow = new discord_js_1.ActionRowBuilder().addComponents(createItemActionInput);
            createItemModal.addComponents(createItemNameRow, createItemDescriptionRow, createItemActionableRow, createItemActionRow);
            // Show the modal
            await interaction.showModal(createItemModal);
        }
        catch (error) {
            console.log("Error handling Create Item modal:", error);
        }
    },
    handleGiveItemModal: async (interaction) => {
        try {
            // Set up the Give Item modal
            const giveItemModal = new discord_js_1.ModalBuilder()
                .setCustomId("give-item-modal")
                .setTitle("Give Item");
            const giveItemTargetInput = new discord_js_1.TextInputBuilder()
                .setCustomId("give-item-target-input")
                .setLabel("Target user ID")
                .setStyle(discord_js_1.TextInputStyle.Short)
                .setRequired(true)
                .setMinLength(18);
            const giveItemNameInput = new discord_js_1.TextInputBuilder()
                .setCustomId("give-item-name-input")
                .setLabel("Item Descriptor/Name")
                .setStyle(discord_js_1.TextInputStyle.Short)
                .setRequired(true);
            const giveItemAmountInput = new discord_js_1.TextInputBuilder()
                .setCustomId("give-item-amount-input")
                .setLabel("Amount")
                .setStyle(discord_js_1.TextInputStyle.Short)
                .setRequired(true)
                .setMinLength(1);
            const giveItemTargetRow = new discord_js_1.ActionRowBuilder().addComponents(giveItemTargetInput);
            const giveItemNameRow = new discord_js_1.ActionRowBuilder().addComponents(giveItemNameInput);
            const giveItemAmountRow = new discord_js_1.ActionRowBuilder().addComponents(giveItemAmountInput);
            giveItemModal.addComponents(giveItemNameRow, giveItemTargetRow, giveItemAmountRow);
            // Show the modal
            await interaction.showModal(giveItemModal);
        }
        catch (error) {
            console.log("Error handling Give Item modal:", error);
        }
    },
    handleRemoveItemModal: async (interaction) => {
        try {
            // Set up the Remove Item modal
            const removeItemModal = new discord_js_1.ModalBuilder()
                .setCustomId("remove-item-modal")
                .setTitle("Remove Item");
            const removeItemTargetInput = new discord_js_1.TextInputBuilder()
                .setCustomId("remove-item-target-input")
                .setLabel("Target user ID")
                .setStyle(discord_js_1.TextInputStyle.Short)
                .setRequired(true)
                .setMinLength(18);
            const removeItemNameInput = new discord_js_1.TextInputBuilder()
                .setCustomId("remove-item-name-input")
                .setLabel("Item Descriptor/Name")
                .setStyle(discord_js_1.TextInputStyle.Short)
                .setRequired(true);
            const removeItemTargetRow = new discord_js_1.ActionRowBuilder().addComponents(removeItemTargetInput);
            const removeItemNameRow = new discord_js_1.ActionRowBuilder().addComponents(removeItemNameInput);
            removeItemModal.addComponents(removeItemNameRow, removeItemTargetRow);
            // Show the modal
            await interaction.showModal(removeItemModal);
        }
        catch (error) {
            console.log("Error handling Remove Item modal:", error);
        }
    },
    handleDeleteItemModal: async (interaction) => {
        try {
            // Set up the Delete Item modal
            const deleteItemModal = new discord_js_1.ModalBuilder()
                .setCustomId("delete-item-modal")
                .setTitle("Delete Item");
            const deleteItemNameInput = new discord_js_1.TextInputBuilder()
                .setCustomId("delete-item-name-input")
                .setLabel("Item Descriptor/Name")
                .setStyle(discord_js_1.TextInputStyle.Short)
                .setRequired(true);
            const deleteItemNameRow = new discord_js_1.ActionRowBuilder().addComponents(deleteItemNameInput);
            deleteItemModal.addComponents(deleteItemNameRow);
            // Show the modal
            await interaction.showModal(deleteItemModal);
        }
        catch (error) {
            console.log("Error handling Delete Item modal:", error);
        }
    },
    handleCreateStatusEffectModal: async (interaction) => {
        try {
            // Set up the Create Status Effect modal
            const createStatusEffectModal = new discord_js_1.ModalBuilder()
                .setCustomId("create-status-effect-modal")
                .setTitle("Create Status Effect");
            const createStatusEffectNameInput = new discord_js_1.TextInputBuilder()
                .setCustomId("create-status-effect-name-input")
                .setLabel("Status Effect name, no special characters!")
                .setStyle(discord_js_1.TextInputStyle.Short)
                .setRequired(true);
            const createStatusEffectDescriptionInput = new discord_js_1.TextInputBuilder()
                .setCustomId("create-status-effect-description-input")
                .setLabel("Status Effect description")
                .setStyle(discord_js_1.TextInputStyle.Paragraph)
                .setRequired(true);
            const createStatusEffectActionInput = new discord_js_1.TextInputBuilder()
                .setCustomId("create-status-effect-action-input")
                .setLabel("What the system does when applied")
                .setStyle(discord_js_1.TextInputStyle.Paragraph)
                .setRequired(true);
            const createStatusEffectDurationInput = new discord_js_1.TextInputBuilder()
                .setCustomId("create-status-effect-duration-input")
                .setLabel("Status Effect duration")
                .setStyle(discord_js_1.TextInputStyle.Short)
                .setRequired(true);
            const createStatusEffectNameRow = new discord_js_1.ActionRowBuilder().addComponents(createStatusEffectNameInput);
            const createStatusEffectDescriptionRow = new discord_js_1.ActionRowBuilder().addComponents(createStatusEffectDescriptionInput);
            const createStatusEffectActionRow = new discord_js_1.ActionRowBuilder().addComponents(createStatusEffectActionInput);
            const createStatusEffectDurationRow = new discord_js_1.ActionRowBuilder().addComponents(createStatusEffectDurationInput);
            createStatusEffectModal.addComponents(createStatusEffectNameRow, createStatusEffectDescriptionRow, createStatusEffectActionRow, createStatusEffectDurationRow);
            // Show the modal
            await interaction.showModal(createStatusEffectModal);
        }
        catch (error) {
            console.log("Error handling Create Status Effect modal:", error);
        }
    },
    handleDeleteStatusEffectModal: async (interaction) => {
        try {
            // Set up the Delete Status Effect modal
            const deleteStatusEffectModal = new discord_js_1.ModalBuilder()
                .setCustomId("delete-status-effect-modal")
                .setTitle("Delete Status Effect");
            const deleteStatusEffectNameInput = new discord_js_1.TextInputBuilder()
                .setCustomId("delete-status-effect-name-input")
                .setLabel("Status Effect name")
                .setStyle(discord_js_1.TextInputStyle.Short)
                .setRequired(true);
            const deleteStatusEffectNameRow = new discord_js_1.ActionRowBuilder().addComponents(deleteStatusEffectNameInput);
            deleteStatusEffectModal.addComponents(deleteStatusEffectNameRow);
            // Show the modal
            await interaction.showModal(deleteStatusEffectModal);
        }
        catch (error) {
            console.log("Error handling Delete Status Effect modal:", error);
        }
    },
    handleGrantStatusEffectModal: async (interaction) => {
        try {
            // Set up the Grant Status Effect modal
            const grantStatusEffectModal = new discord_js_1.ModalBuilder()
                .setCustomId("grant-status-effect-modal")
                .setTitle("Grant Status Effect");
            const grantStatusEffectNameInput = new discord_js_1.TextInputBuilder()
                .setCustomId("grant-status-effect-name-input")
                .setLabel("Status Effect name")
                .setStyle(discord_js_1.TextInputStyle.Short)
                .setRequired(true);
            const grantStatusEffectTargetInput = new discord_js_1.TextInputBuilder()
                .setCustomId("grant-status-effect-target-input")
                .setLabel("Target user ID")
                .setStyle(discord_js_1.TextInputStyle.Short)
                .setRequired(true)
                .setMinLength(18);
            const grantStatusEffectNameRow = new discord_js_1.ActionRowBuilder().addComponents(grantStatusEffectNameInput);
            const grantStatusEffectTargetRow = new discord_js_1.ActionRowBuilder().addComponents(grantStatusEffectTargetInput);
            grantStatusEffectModal.addComponents(grantStatusEffectNameRow, grantStatusEffectTargetRow);
            // Show the modal
            await interaction.showModal(grantStatusEffectModal);
        }
        catch (error) {
            console.log("Error handling Grant Status Effect modal:", error);
        }
    },
    handleRevokeStatusEffectModal: async (interaction) => {
        try {
            // Set up the Revoke Status Effect modal
            const revokeStatusEffectModal = new discord_js_1.ModalBuilder()
                .setCustomId("revoke-status-effect-modal")
                .setTitle("Revoke Status Effect");
            const revokeStatusEffectNameInput = new discord_js_1.TextInputBuilder()
                .setCustomId("revoke-status-effect-name-input")
                .setLabel("Status Effect name")
                .setStyle(discord_js_1.TextInputStyle.Short)
                .setRequired(true);
            const revokeStatusEffectTargetInput = new discord_js_1.TextInputBuilder()
                .setCustomId("revoke-status-effect-target-input")
                .setLabel("Target user ID")
                .setStyle(discord_js_1.TextInputStyle.Short)
                .setRequired(true)
                .setMinLength(18);
            const revokeStatusEffectNameRow = new discord_js_1.ActionRowBuilder().addComponents(revokeStatusEffectNameInput);
            const revokeStatusEffectTargetRow = new discord_js_1.ActionRowBuilder().addComponents(revokeStatusEffectTargetInput);
            revokeStatusEffectModal.addComponents(revokeStatusEffectNameRow, revokeStatusEffectTargetRow);
            // Show the modal
            await interaction.showModal(revokeStatusEffectModal);
        }
        catch (error) {
            console.log("Error handling Revoke Status Effect modal:", error);
        }
    },
    handleSendMessageModal: async (interaction) => {
        try {
            // Set up the Send Message modal
            const sendMessageModal = new discord_js_1.ModalBuilder()
                .setCustomId("send-message-modal")
                .setTitle("Send Message");
            const sendMessageTargetChannelInput = new discord_js_1.TextInputBuilder()
                .setCustomId("send-message-target-channel-input")
                .setLabel("Target channel ID")
                .setStyle(discord_js_1.TextInputStyle.Short)
                .setRequired(true);
            const sendMessageContentInput = new discord_js_1.TextInputBuilder()
                .setCustomId("send-message-content-input")
                .setLabel("Message content")
                .setStyle(discord_js_1.TextInputStyle.Paragraph)
                .setRequired(true);
            const sendMessageTargetChannelRow = new discord_js_1.ActionRowBuilder().addComponents(sendMessageTargetChannelInput);
            const sendMessageContentRow = new discord_js_1.ActionRowBuilder().addComponents(sendMessageContentInput);
            sendMessageModal.addComponents(sendMessageTargetChannelRow, sendMessageContentRow);
            // Show the modal
            await interaction.showModal(sendMessageModal);
        }
        catch (error) {
            console.log("Error handling Send Message modal:", error);
        }
    },
    handleBanUserModal: async (interaction) => {
        try {
            // Set up the Ban User modal
            const banUserModal = new discord_js_1.ModalBuilder()
                .setCustomId("ban-user-modal")
                .setTitle("Ban User, very dangerous!");
            const banUserTargetInput = new discord_js_1.TextInputBuilder()
                .setCustomId("ban-user-target-input")
                .setLabel("Target user ID")
                .setStyle(discord_js_1.TextInputStyle.Short)
                .setRequired(true)
                .setMinLength(18);
            const banUserReasonInput = new discord_js_1.TextInputBuilder()
                .setCustomId("ban-user-reason-input")
                .setLabel("Reason for ban")
                .setStyle(discord_js_1.TextInputStyle.Short)
                .setRequired(false);
            const banUserTargetRow = new discord_js_1.ActionRowBuilder().addComponents(banUserTargetInput);
            const banUserReasonRow = new discord_js_1.ActionRowBuilder().addComponents(banUserReasonInput);
            banUserModal.addComponents(banUserTargetRow, banUserReasonRow);
            await interaction.showModal(banUserModal);
        }
        catch (error) {
            console.log("Error handling Ban User modal:", error);
        }
    },
    handleKickUserModal: async (interaction) => {
        try {
            // Set up the Kick User modal
            const kickUserModal = new discord_js_1.ModalBuilder()
                .setCustomId("kick-user-modal")
                .setTitle("Kick User, scary!");
            const kickUserTargetInput = new discord_js_1.TextInputBuilder()
                .setCustomId("kick-user-target-input")
                .setLabel("Target user ID")
                .setStyle(discord_js_1.TextInputStyle.Short)
                .setRequired(true)
                .setMinLength(18);
            const kickUserReasonInput = new discord_js_1.TextInputBuilder()
                .setCustomId("kick-user-reason-input")
                .setLabel("Reason for kick")
                .setStyle(discord_js_1.TextInputStyle.Short)
                .setRequired(false);
            const kickUserTargetRow = new discord_js_1.ActionRowBuilder().addComponents(kickUserTargetInput);
            const kickUserReasonRow = new discord_js_1.ActionRowBuilder().addComponents(kickUserReasonInput);
            kickUserModal.addComponents(kickUserTargetRow, kickUserReasonRow);
            await interaction.showModal(kickUserModal);
        }
        catch (error) {
            console.log("Error handling Kick User modal:", error);
        }
    },
    handleTimeoutUserModal: async (interaction) => {
        try {
            // Set up the Timeout User modal
            const timeoutUserModal = new discord_js_1.ModalBuilder()
                .setCustomId("timeout-user-modal")
                .setTitle("Timeout User, fun!");
            const timeoutUserTargetInput = new discord_js_1.TextInputBuilder()
                .setCustomId("timeout-user-target-input")
                .setLabel("Target user ID")
                .setStyle(discord_js_1.TextInputStyle.Short)
                .setRequired(true)
                .setMinLength(18);
            const timeoutUserDurationInput = new discord_js_1.TextInputBuilder()
                .setCustomId("timeout-user-duration-input")
                .setLabel("Duration")
                .setStyle(discord_js_1.TextInputStyle.Short)
                .setRequired(true);
            const timeoutUserReasonInput = new discord_js_1.TextInputBuilder()
                .setCustomId("timeout-user-reason-input")
                .setLabel("Reason for timeout")
                .setStyle(discord_js_1.TextInputStyle.Short)
                .setRequired(false);
            const timeoutUserTargetRow = new discord_js_1.ActionRowBuilder().addComponents(timeoutUserTargetInput);
            const timeoutUserDurationRow = new discord_js_1.ActionRowBuilder().addComponents(timeoutUserDurationInput);
            const timeoutUserReasonRow = new discord_js_1.ActionRowBuilder().addComponents(timeoutUserReasonInput);
            timeoutUserModal.addComponents(timeoutUserTargetRow, timeoutUserDurationRow, timeoutUserReasonRow);
            await interaction.showModal(timeoutUserModal);
        }
        catch (error) {
            console.log("Error handling Timeout User modal:", error);
        }
    },
};
