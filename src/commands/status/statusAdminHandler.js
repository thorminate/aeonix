const {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
} = require("discord.js");
const userData = require("../../models/userDatabaseSchema");

module.exports = {
  handleStatsGiverModal: async (interaction) => {
    try {
      // Set up the Stats Giver modal
      const statsGiverModal = new ModalBuilder()
        .setCustomId("stats-giver-modal")
        .setTitle("Stat Giver");

      const statsGiverModifierInput = new TextInputBuilder()
        .setCustomId("stats-giver-modifier-input")
        .setLabel("Modifier of stats to give")
        .setStyle(TextInputStyle.Short)
        .setRequired(true)
        .setMinLength(1);

      const statsGiverVariantInput = new TextInputBuilder()
        .setCustomId("stats-giver-variant-input")
        .setLabel("Variant of stats to give")
        .setStyle(TextInputStyle.Short)
        .setRequired(true)
        .setMinLength(1);

      const statsGiverInput = new TextInputBuilder()
        .setCustomId("stats-giver-input")
        .setLabel("Amount of stat points to give, remove or set")
        .setStyle(TextInputStyle.Short)
        .setRequired(true)
        .setMinLength(1);

      const statsGiverTargetInput = new TextInputBuilder()
        .setCustomId("stats-giver-target-input")
        .setLabel("Target user ID")
        .setStyle(TextInputStyle.Short)
        .setRequired(true)
        .setMinLength(18);

      const statsGiverRow = new ActionRowBuilder().addComponents(
        statsGiverInput
      );
      const statsGiverVariantRow = new ActionRowBuilder().addComponents(
        statsGiverVariantInput
      );
      const statsGiverTargetRow = new ActionRowBuilder().addComponents(
        statsGiverTargetInput
      );
      const statsGiverModifierRow = new ActionRowBuilder().addComponents(
        statsGiverModifierInput
      );
      statsGiverModal.addComponents(
        statsGiverRow,
        statsGiverVariantRow,
        statsGiverTargetRow,
        statsGiverModifierRow
      );

      // Show the modal
      await interaction.showModal(statsGiverModal);
    } catch (error) {
      console.log("Error handling Stats Giver modal:", error);
    }
  },
  handleCreateSkillModal: async (interaction) => {
    try {
      // Set up the Create Skill modal
      const createSkillModal = new ModalBuilder()
        .setCustomId("create-skill-modal")
        .setTitle("Create Skill");

      const createSkillNameInput = new TextInputBuilder()
        .setCustomId("create-skill-name-input")
        .setLabel("Skill name, no special characters!")
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

      const createSkillDescriptionInput = new TextInputBuilder()
        .setCustomId("create-skill-description-input")
        .setLabel("Skill description")
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(true);

      const createSkillActionInput = new TextInputBuilder()
        .setCustomId("create-skill-action-input")
        .setLabel("What the system says when the skill is used")
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(true);

      const createSkillCooldownInput = new TextInputBuilder()
        .setCustomId("create-skill-cooldown-input")
        .setLabel("Skill cooldown")
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

      const createSkillWillInput = new TextInputBuilder()
        .setCustomId("create-skill-will-input")
        .setLabel("Will requirement")
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

      const createSkillWillRow = new ActionRowBuilder().addComponents(
        createSkillWillInput
      );
      const createSkillCooldownRow = new ActionRowBuilder().addComponents(
        createSkillCooldownInput
      );

      const createSkillActionRow = new ActionRowBuilder().addComponents(
        createSkillActionInput
      );
      const createSkillDescriptionRow = new ActionRowBuilder().addComponents(
        createSkillDescriptionInput
      );
      const createSkillNameRow = new ActionRowBuilder().addComponents(
        createSkillNameInput
      );

      createSkillModal.addComponents(
        createSkillNameRow,
        createSkillDescriptionRow,
        createSkillActionRow,
        createSkillCooldownRow,
        createSkillWillRow
      );

      // Show the modal
      await interaction.showModal(createSkillModal);
    } catch (error) {
      console.log("Error handling Create Skill modal:", error);
    }
  },
  handleDeleteSkillModal: async (interaction) => {
    try {
      // Set up the Delete Skill modal

      const deleteSkillModal = new ModalBuilder()
        .setCustomId("delete-skill-modal")
        .setTitle("Delete Skill");

      const deleteSkillNameInput = new TextInputBuilder()
        .setCustomId("delete-skill-name-input")
        .setLabel("Skill name")
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

      const deleteSkillNameRow = new ActionRowBuilder().addComponents(
        deleteSkillNameInput
      );

      deleteSkillModal.addComponents(deleteSkillNameRow);

      // Show the modal
      await interaction.showModal(deleteSkillModal);
    } catch (error) {
      console.log("Error handling Delete Skill modal:", error);
    }
  },
  handleGrantSkillModal: async (interaction) => {
    try {
      // Set up the Grant Skill modal
      const grantSkillModal = new ModalBuilder()
        .setCustomId("grant-skill-modal")
        .setTitle("Grant Skill");

      const grantSkillNameInput = new TextInputBuilder()
        .setCustomId("grant-skill-name-input")
        .setLabel("Skill name")
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

      const grantSkillTargetInput = new TextInputBuilder()
        .setCustomId("grant-skill-target-input")
        .setLabel("Target user ID")
        .setStyle(TextInputStyle.Short)
        .setRequired(true)
        .setMinLength(18);

      const grantSkillTargetRow = new ActionRowBuilder().addComponents(
        grantSkillTargetInput
      );
      const grantSkillNameRow = new ActionRowBuilder().addComponents(
        grantSkillNameInput
      );

      grantSkillModal.addComponents(grantSkillNameRow, grantSkillTargetRow);

      // Show the modal
      await interaction.showModal(grantSkillModal);
    } catch (error) {
      console.log("Error handling Grant Skill modal:", error);
    }
  },
  handleRevokeSkillModal: async (interaction) => {
    try {
      // Set up the Revoke Skill modal
      const revokeSkillModal = new ModalBuilder()
        .setCustomId("revoke-skill-modal")
        .setTitle("Revoke Skill");

      const revokeSkillTargetInput = new TextInputBuilder()
        .setCustomId("revoke-skill-target-input")
        .setLabel("The user who's skill you want to revoke")
        .setStyle(TextInputStyle.Short)
        .setRequired(true)
        .setMinLength(18);

      const revokeSkillNameInput = new TextInputBuilder()
        .setCustomId("revoke-skill-name-input")
        .setLabel("The Name of the skill you want to revoke")
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

      const revokeSkillTargetRow = new ActionRowBuilder().addComponents(
        revokeSkillTargetInput
      );
      const revokeSkillNameRow = new ActionRowBuilder().addComponents(
        revokeSkillNameInput
      );

      revokeSkillModal.addComponents(revokeSkillNameRow, revokeSkillTargetRow);

      // Show the modal
      await interaction.showModal(revokeSkillModal);
    } catch (error) {
      console.log("Error handling Revoke Skill modal:", error);
    }
  },
  handleCreateItemModal: async (interaction) => {
    try {
      // Set up the Create Item modal
      const createItemModal = new ModalBuilder()
        .setCustomId("create-item-modal")
        .setTitle("Create Item");

      const createItemNameInput = new TextInputBuilder()
        .setCustomId("create-item-name-input")
        .setLabel("Item Descriptor/Name")
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

      const createItemDescriptionInput = new TextInputBuilder()
        .setCustomId("create-item-description-input")
        .setLabel("Item Description")
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(true);

      const createItemActionableInput = new TextInputBuilder()
        .setCustomId("create-item-actionable-input")
        .setLabel("What the item does, use/consume/interact")
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

      const createItemActionInput = new TextInputBuilder()
        .setCustomId("create-item-action-input")
        .setLabel("What happens when you interact?")
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(true);

      const createItemNameRow = new ActionRowBuilder().addComponents(
        createItemNameInput
      );
      const createItemDescriptionRow = new ActionRowBuilder().addComponents(
        createItemDescriptionInput
      );
      const createItemActionableRow = new ActionRowBuilder().addComponents(
        createItemActionableInput
      );
      const createItemActionRow = new ActionRowBuilder().addComponents(
        createItemActionInput
      );

      createItemModal.addComponents(
        createItemNameRow,
        createItemDescriptionRow,
        createItemActionableRow,
        createItemActionRow
      );

      // Show the modal
      await interaction.showModal(createItemModal);
    } catch (error) {
      console.log("Error handling Create Item modal:", error);
    }
  },
  handleGiveItemModal: async (interaction) => {
    try {
      // Set up the Give Item modal
      const giveItemModal = new ModalBuilder()
        .setCustomId("give-item-modal")
        .setTitle("Give Item");

      const giveItemTargetInput = new TextInputBuilder()
        .setCustomId("give-item-target-input")
        .setLabel("Target user ID")
        .setStyle(TextInputStyle.Short)
        .setRequired(true)
        .setMinLength(18);

      const giveItemNameInput = new TextInputBuilder()
        .setCustomId("give-item-name-input")
        .setLabel("Item Descriptor/Name")
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

      const giveItemAmountInput = new TextInputBuilder()
        .setCustomId("give-item-amount-input")
        .setLabel("Amount")
        .setStyle(TextInputStyle.Short)
        .setRequired(true)
        .setMinLength(1);

      const giveItemTargetRow = new ActionRowBuilder().addComponents(
        giveItemTargetInput
      );
      const giveItemNameRow = new ActionRowBuilder().addComponents(
        giveItemNameInput
      );
      const giveItemAmountRow = new ActionRowBuilder().addComponents(
        giveItemAmountInput
      );

      giveItemModal.addComponents(
        giveItemNameRow,
        giveItemTargetRow,
        giveItemAmountRow
      );

      // Show the modal
      await interaction.showModal(giveItemModal);
    } catch (error) {
      console.log("Error handling Give Item modal:", error);
    }
  },
  handleRemoveItemModal: async (interaction) => {
    try {
      // Set up the Remove Item modal
      const removeItemModal = new ModalBuilder()
        .setCustomId("remove-item-modal")
        .setTitle("Remove Item");

      const removeItemTargetInput = new TextInputBuilder()
        .setCustomId("remove-item-target-input")
        .setLabel("Target user ID")
        .setStyle(TextInputStyle.Short)
        .setRequired(true)
        .setMinLength(18);

      const removeItemNameInput = new TextInputBuilder()
        .setCustomId("remove-item-name-input")
        .setLabel("Item Descriptor/Name")
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

      const removeItemTargetRow = new ActionRowBuilder().addComponents(
        removeItemTargetInput
      );
      const removeItemNameRow = new ActionRowBuilder().addComponents(
        removeItemNameInput
      );

      removeItemModal.addComponents(removeItemNameRow, removeItemTargetRow);

      // Show the modal
      await interaction.showModal(removeItemModal);
    } catch (error) {
      console.log("Error handling Remove Item modal:", error);
    }
  },
  handleDeleteItemModal: async (interaction) => {
    // Set up the Delete Item modal
    const deleteItemModal = new ModalBuilder()
      .setCustomId("delete-item-modal")
      .setTitle("Delete Item");

    const deleteItemNameInput = new TextInputBuilder()
      .setCustomId("delete-item-name-input")
      .setLabel("Item Descriptor/Name")
      .setStyle(TextInputStyle.Short)
      .setRequired(true);

    const deleteItemNameRow = new ActionRowBuilder().addComponents(
      deleteItemNameInput
    );

    deleteItemModal.addComponents(deleteItemNameRow);

    // Show the modal
    await interaction.showModal(deleteItemModal);
  },
  handleBanUserModal: async (interaction) => {
    try {
      // Set up the Ban User modal
      const banUserModal = new ModalBuilder()
        .setCustomId("ban-user-modal")
        .setTitle("Ban User, very dangerous!");

      const banUserTargetInput = new TextInputBuilder()
        .setCustomId("ban-user-target-input")
        .setLabel("Target user ID")
        .setStyle(TextInputStyle.Short)
        .setRequired(true)
        .setMinLength(18);

      const banUserReasonInput = new TextInputBuilder()
        .setCustomId("ban-user-reason-input")
        .setLabel("Reason for ban")
        .setStyle(TextInputStyle.Short)
        .setRequired(false);

      const banUserTargetRow = new ActionRowBuilder().addComponents(
        banUserTargetInput
      );

      const banUserReasonRow = new ActionRowBuilder().addComponents(
        banUserReasonInput
      );

      banUserModal.addComponents(banUserTargetRow, banUserReasonRow);

      await interaction.showModal(banUserModal);
    } catch (error) {
      console.log("Error handling Ban User modal:", error);
    }
  },
  handleKickUserModal: async (interaction) => {
    try {
      // Set up the Kick User modal
      const kickUserModal = new ModalBuilder()
        .setCustomId("kick-user-modal")
        .setTitle("Kick User, scary!");

      const kickUserTargetInput = new TextInputBuilder()
        .setCustomId("kick-user-target-input")
        .setLabel("Target user ID")
        .setStyle(TextInputStyle.Short)
        .setRequired(true)
        .setMinLength(18);

      const kickUserReasonInput = new TextInputBuilder()
        .setCustomId("kick-user-reason-input")
        .setLabel("Reason for kick")
        .setStyle(TextInputStyle.Short)
        .setRequired(false);

      const kickUserTargetRow = new ActionRowBuilder().addComponents(
        kickUserTargetInput
      );

      const kickUserReasonRow = new ActionRowBuilder().addComponents(
        kickUserReasonInput
      );

      kickUserModal.addComponents(kickUserTargetRow, kickUserReasonRow);

      await interaction.showModal(kickUserModal);
    } catch (error) {
      console.log("Error handling Kick User modal:", error);
    }
  },
  handleTimeoutUserModal: async (interaction) => {
    try {
      // Set up the Timeout User modal
      const timeoutUserModal = new ModalBuilder()
        .setCustomId("timeout-user-modal")
        .setTitle("Timeout User, fun!");

      const timeoutUserTargetInput = new TextInputBuilder()
        .setCustomId("timeout-user-target-input")
        .setLabel("Target user ID")
        .setStyle(TextInputStyle.Short)
        .setRequired(true)
        .setMinLength(18);

      const timeoutUserDurationInput = new TextInputBuilder()
        .setCustomId("timeout-user-duration-input")
        .setLabel("Duration")
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

      const timeoutUserReasonInput = new TextInputBuilder()
        .setCustomId("timeout-user-reason-input")
        .setLabel("Reason for timeout")
        .setStyle(TextInputStyle.Short)
        .setRequired(false);

      const timeoutUserTargetRow = new ActionRowBuilder().addComponents(
        timeoutUserTargetInput
      );

      const timeoutUserDurationRow = new ActionRowBuilder().addComponents(
        timeoutUserDurationInput
      );

      const timeoutUserReasonRow = new ActionRowBuilder().addComponents(
        timeoutUserReasonInput
      );

      timeoutUserModal.addComponents(
        timeoutUserTargetRow,
        timeoutUserDurationRow,
        timeoutUserReasonRow
      );

      await interaction.showModal(timeoutUserModal);
    } catch (error) {
      console.log("Error handling Timeout User modal:", error);
    }
  },
};
