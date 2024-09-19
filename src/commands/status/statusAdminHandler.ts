import {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
  CommandInteraction,
} from "discord.js";

module.exports = {
  handleStatsGiverModal: async (interaction: CommandInteraction) => {
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

      const statsGiverRow =
        new ActionRowBuilder<TextInputBuilder>().addComponents(statsGiverInput);
      const statsGiverVariantRow =
        new ActionRowBuilder<TextInputBuilder>().addComponents(
          statsGiverVariantInput
        );
      const statsGiverTargetRow =
        new ActionRowBuilder<TextInputBuilder>().addComponents(
          statsGiverTargetInput
        );
      const statsGiverModifierRow =
        new ActionRowBuilder<TextInputBuilder>().addComponents(
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
  handleCreateSkillModal: async (interaction: CommandInteraction) => {
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

      const createSkillWillRow =
        new ActionRowBuilder<TextInputBuilder>().addComponents(
          createSkillWillInput
        );
      const createSkillCooldownRow =
        new ActionRowBuilder<TextInputBuilder>().addComponents(
          createSkillCooldownInput
        );

      const createSkillActionRow =
        new ActionRowBuilder<TextInputBuilder>().addComponents(
          createSkillActionInput
        );
      const createSkillDescriptionRow =
        new ActionRowBuilder<TextInputBuilder>().addComponents(
          createSkillDescriptionInput
        );
      const createSkillNameRow =
        new ActionRowBuilder<TextInputBuilder>().addComponents(
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
  handleDeleteSkillModal: async (interaction: CommandInteraction) => {
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

      const deleteSkillNameRow =
        new ActionRowBuilder<TextInputBuilder>().addComponents(
          deleteSkillNameInput
        );

      deleteSkillModal.addComponents(deleteSkillNameRow);

      // Show the modal
      await interaction.showModal(deleteSkillModal);
    } catch (error) {
      console.log("Error handling Delete Skill modal:", error);
    }
  },
  handleGrantSkillModal: async (interaction: CommandInteraction) => {
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

      const grantSkillTargetRow =
        new ActionRowBuilder<TextInputBuilder>().addComponents(
          grantSkillTargetInput
        );
      const grantSkillNameRow =
        new ActionRowBuilder<TextInputBuilder>().addComponents(
          grantSkillNameInput
        );

      grantSkillModal.addComponents(grantSkillNameRow, grantSkillTargetRow);

      // Show the modal
      await interaction.showModal(grantSkillModal);
    } catch (error) {
      console.log("Error handling Grant Skill modal:", error);
    }
  },
  handleRevokeSkillModal: async (interaction: CommandInteraction) => {
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

      const revokeSkillTargetRow =
        new ActionRowBuilder<TextInputBuilder>().addComponents(
          revokeSkillTargetInput
        );
      const revokeSkillNameRow =
        new ActionRowBuilder<TextInputBuilder>().addComponents(
          revokeSkillNameInput
        );

      revokeSkillModal.addComponents(revokeSkillNameRow, revokeSkillTargetRow);

      // Show the modal
      await interaction.showModal(revokeSkillModal);
    } catch (error) {
      console.log("Error handling Revoke Skill modal:", error);
    }
  },
  handleCreateItemModal: async (interaction: CommandInteraction) => {
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

      const createItemNameRow =
        new ActionRowBuilder<TextInputBuilder>().addComponents(
          createItemNameInput
        );
      const createItemDescriptionRow =
        new ActionRowBuilder<TextInputBuilder>().addComponents(
          createItemDescriptionInput
        );
      const createItemActionableRow =
        new ActionRowBuilder<TextInputBuilder>().addComponents(
          createItemActionableInput
        );
      const createItemActionRow =
        new ActionRowBuilder<TextInputBuilder>().addComponents(
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
  handleGiveItemModal: async (interaction: CommandInteraction) => {
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

      const giveItemTargetRow =
        new ActionRowBuilder<TextInputBuilder>().addComponents(
          giveItemTargetInput
        );
      const giveItemNameRow =
        new ActionRowBuilder<TextInputBuilder>().addComponents(
          giveItemNameInput
        );
      const giveItemAmountRow =
        new ActionRowBuilder<TextInputBuilder>().addComponents(
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
  handleRemoveItemModal: async (interaction: CommandInteraction) => {
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

      const removeItemTargetRow =
        new ActionRowBuilder<TextInputBuilder>().addComponents(
          removeItemTargetInput
        );
      const removeItemNameRow =
        new ActionRowBuilder<TextInputBuilder>().addComponents(
          removeItemNameInput
        );

      removeItemModal.addComponents(removeItemNameRow, removeItemTargetRow);

      // Show the modal
      await interaction.showModal(removeItemModal);
    } catch (error) {
      console.log("Error handling Remove Item modal:", error);
    }
  },
  handleDeleteItemModal: async (interaction: CommandInteraction) => {
    try {
      // Set up the Delete Item modal
      const deleteItemModal = new ModalBuilder()
        .setCustomId("delete-item-modal")
        .setTitle("Delete Item");

      const deleteItemNameInput = new TextInputBuilder()
        .setCustomId("delete-item-name-input")
        .setLabel("Item Descriptor/Name")
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

      const deleteItemNameRow =
        new ActionRowBuilder<TextInputBuilder>().addComponents(
          deleteItemNameInput
        );

      deleteItemModal.addComponents(deleteItemNameRow);

      // Show the modal
      await interaction.showModal(deleteItemModal);
    } catch (error) {
      console.log("Error handling Delete Item modal:", error);
    }
  },
  handleCreateStatusEffectModal: async (interaction: CommandInteraction) => {
    try {
      // Set up the Create Status Effect modal
      const createStatusEffectModal = new ModalBuilder()
        .setCustomId("create-status-effect-modal")
        .setTitle("Create Status Effect");

      const createStatusEffectNameInput = new TextInputBuilder()
        .setCustomId("create-status-effect-name-input")
        .setLabel("Status Effect name, no special characters!")
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

      const createStatusEffectDescriptionInput = new TextInputBuilder()
        .setCustomId("create-status-effect-description-input")
        .setLabel("Status Effect description")
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(true);

      const createStatusEffectActionInput = new TextInputBuilder()
        .setCustomId("create-status-effect-action-input")
        .setLabel("What the system does when applied")
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(true);

      const createStatusEffectDurationInput = new TextInputBuilder()
        .setCustomId("create-status-effect-duration-input")
        .setLabel("Status Effect duration")
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

      const createStatusEffectNameRow =
        new ActionRowBuilder<TextInputBuilder>().addComponents(
          createStatusEffectNameInput
        );
      const createStatusEffectDescriptionRow =
        new ActionRowBuilder<TextInputBuilder>().addComponents(
          createStatusEffectDescriptionInput
        );
      const createStatusEffectActionRow =
        new ActionRowBuilder<TextInputBuilder>().addComponents(
          createStatusEffectActionInput
        );
      const createStatusEffectDurationRow =
        new ActionRowBuilder<TextInputBuilder>().addComponents(
          createStatusEffectDurationInput
        );

      createStatusEffectModal.addComponents(
        createStatusEffectNameRow,
        createStatusEffectDescriptionRow,
        createStatusEffectActionRow,
        createStatusEffectDurationRow
      );

      // Show the modal
      await interaction.showModal(createStatusEffectModal);
    } catch (error) {
      console.log("Error handling Create Status Effect modal:", error);
    }
  },
  handleDeleteStatusEffectModal: async (interaction: CommandInteraction) => {
    try {
      // Set up the Delete Status Effect modal
      const deleteStatusEffectModal = new ModalBuilder()
        .setCustomId("delete-status-effect-modal")
        .setTitle("Delete Status Effect");

      const deleteStatusEffectNameInput = new TextInputBuilder()
        .setCustomId("delete-status-effect-name-input")
        .setLabel("Status Effect name")
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

      const deleteStatusEffectNameRow =
        new ActionRowBuilder<TextInputBuilder>().addComponents(
          deleteStatusEffectNameInput
        );

      deleteStatusEffectModal.addComponents(deleteStatusEffectNameRow);

      // Show the modal
      await interaction.showModal(deleteStatusEffectModal);
    } catch (error) {
      console.log("Error handling Delete Status Effect modal:", error);
    }
  },
  handleGrantStatusEffectModal: async (interaction: CommandInteraction) => {
    try {
      // Set up the Grant Status Effect modal
      const grantStatusEffectModal = new ModalBuilder()
        .setCustomId("grant-status-effect-modal")
        .setTitle("Grant Status Effect");

      const grantStatusEffectNameInput = new TextInputBuilder()
        .setCustomId("grant-status-effect-name-input")
        .setLabel("Status Effect name")
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

      const grantStatusEffectTargetInput = new TextInputBuilder()
        .setCustomId("grant-status-effect-target-input")
        .setLabel("Target user ID")
        .setStyle(TextInputStyle.Short)
        .setRequired(true)
        .setMinLength(18);

      const grantStatusEffectNameRow =
        new ActionRowBuilder<TextInputBuilder>().addComponents(
          grantStatusEffectNameInput
        );
      const grantStatusEffectTargetRow =
        new ActionRowBuilder<TextInputBuilder>().addComponents(
          grantStatusEffectTargetInput
        );

      grantStatusEffectModal.addComponents(
        grantStatusEffectNameRow,
        grantStatusEffectTargetRow
      );

      // Show the modal
      await interaction.showModal(grantStatusEffectModal);
    } catch (error) {
      console.log("Error handling Grant Status Effect modal:", error);
    }
  },
  handleRevokeStatusEffectModal: async (interaction: CommandInteraction) => {
    try {
      // Set up the Revoke Status Effect modal
      const revokeStatusEffectModal = new ModalBuilder()
        .setCustomId("revoke-status-effect-modal")
        .setTitle("Revoke Status Effect");

      const revokeStatusEffectNameInput = new TextInputBuilder()
        .setCustomId("revoke-status-effect-name-input")
        .setLabel("Status Effect name")
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

      const revokeStatusEffectTargetInput = new TextInputBuilder()
        .setCustomId("revoke-status-effect-target-input")
        .setLabel("Target user ID")
        .setStyle(TextInputStyle.Short)
        .setRequired(true)
        .setMinLength(18);

      const revokeStatusEffectNameRow =
        new ActionRowBuilder<TextInputBuilder>().addComponents(
          revokeStatusEffectNameInput
        );
      const revokeStatusEffectTargetRow =
        new ActionRowBuilder<TextInputBuilder>().addComponents(
          revokeStatusEffectTargetInput
        );

      revokeStatusEffectModal.addComponents(
        revokeStatusEffectNameRow,
        revokeStatusEffectTargetRow
      );

      // Show the modal
      await interaction.showModal(revokeStatusEffectModal);
    } catch (error) {
      console.log("Error handling Revoke Status Effect modal:", error);
    }
  },
  handleSendMessageModal: async (interaction: CommandInteraction) => {
    try {
      // Set up the Send Message modal
      const sendMessageModal = new ModalBuilder()
        .setCustomId("send-message-modal")
        .setTitle("Send Message");

      const sendMessageTargetChannelInput = new TextInputBuilder()
        .setCustomId("send-message-target-channel-input")
        .setLabel("Target channel ID")
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

      const sendMessageContentInput = new TextInputBuilder()
        .setCustomId("send-message-content-input")
        .setLabel("Message content")
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(true);

      const sendMessageTargetChannelRow =
        new ActionRowBuilder<TextInputBuilder>().addComponents(
          sendMessageTargetChannelInput
        );
      const sendMessageContentRow =
        new ActionRowBuilder<TextInputBuilder>().addComponents(
          sendMessageContentInput
        );

      sendMessageModal.addComponents(
        sendMessageTargetChannelRow,
        sendMessageContentRow
      );

      // Show the modal
      await interaction.showModal(sendMessageModal);
    } catch (error) {
      console.log("Error handling Send Message modal:", error);
    }
  },
  handleBanUserModal: async (interaction: CommandInteraction) => {
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

      const banUserTargetRow =
        new ActionRowBuilder<TextInputBuilder>().addComponents(
          banUserTargetInput
        );

      const banUserReasonRow =
        new ActionRowBuilder<TextInputBuilder>().addComponents(
          banUserReasonInput
        );

      banUserModal.addComponents(banUserTargetRow, banUserReasonRow);

      await interaction.showModal(banUserModal);
    } catch (error) {
      console.log("Error handling Ban User modal:", error);
    }
  },
  handleKickUserModal: async (interaction: CommandInteraction) => {
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

      const kickUserTargetRow =
        new ActionRowBuilder<TextInputBuilder>().addComponents(
          kickUserTargetInput
        );

      const kickUserReasonRow =
        new ActionRowBuilder<TextInputBuilder>().addComponents(
          kickUserReasonInput
        );

      kickUserModal.addComponents(kickUserTargetRow, kickUserReasonRow);

      await interaction.showModal(kickUserModal);
    } catch (error) {
      console.log("Error handling Kick User modal:", error);
    }
  },
  handleTimeoutUserModal: async (interaction: CommandInteraction) => {
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

      const timeoutUserTargetRow =
        new ActionRowBuilder<TextInputBuilder>().addComponents(
          timeoutUserTargetInput
        );

      const timeoutUserDurationRow =
        new ActionRowBuilder<TextInputBuilder>().addComponents(
          timeoutUserDurationInput
        );

      const timeoutUserReasonRow =
        new ActionRowBuilder<TextInputBuilder>().addComponents(
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
