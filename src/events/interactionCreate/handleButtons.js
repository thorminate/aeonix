const {
  ActionRowBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

const userData = require("../../models/userDatabaseSchema");

module.exports = async (bot, interaction) => {
  if (!interaction.isButton()) return;

  if (interaction.customId === "welcome-channel-begin-onboarding") {
    let user = await userData.findOne({
      userId: interaction.user.id,
      guildId: interaction.guild.id,
    });
    const userDiscord = await interaction.guild.members.fetch(
      interaction.user.id
    );

    if (!user) {
      newUser = new userData({
        userId: interaction.user.id,
        guildId: interaction.guild.id,
        isOnboard: false,
      });

      user = newUser;

      await user.save();
    }
    if (user.isOnboard && !userDiscord.roles.cache.has("1270791621289578607")) {
      await interaction.reply({
        content:
          "You have already completed the onboarding process, but you don't have the player role. Fixing...",
        ephemeral: true,
      });
      setTimeout(() => {
        interaction.member.roles.add(
          interaction.guild.roles.cache.find(
            (role) => role.id === "1270791621289578607"
          )
        );
      }, 2000);
      return;
    } else if (user.isOnboard) {
      await interaction.reply({
        content: "You have already completed the onboarding process.",
        ephemeral: true,
      });
      return;
    }
    const onboardingChannel = interaction.guild.channels.cache.get(
      "1270790941892153404"
    );
    const messages = await onboardingChannel.messages.fetch({ limit: 1 });
    const message = messages.first();

    // Ensure the message has components
    if (!message || !message.components || message.components.length === 0) {
      console.error("No components found in the message.");
      return;
    }

    const actionRow = message.components[0];
    const beginOnboardingButtonData = actionRow.components[0].data;

    // Recreate the button using ButtonBuilder
    const beginOnboardingButton = new ButtonBuilder()
      .setCustomId(beginOnboardingButtonData.custom_id)
      .setLabel("Onboarding player...")
      .setStyle(beginOnboardingButtonData.style)
      .setDisabled(true);

    const row = new ActionRowBuilder().addComponents(beginOnboardingButton);

    await message.edit({
      components: [row],
    });

    // Set a timeout to reset the button after 15 minutes (15 * 60 * 1000 ms)
    const resetTimeout = setTimeout(async () => {
      await resetButton();
    }, 2 * 60 * 1000);

    // Function to reset the button
    const resetButton = async () => {
      const resetButton = new ButtonBuilder()
        .setCustomId(beginOnboardingButtonData.custom_id)
        .setLabel("Begin Onboarding")
        .setStyle(ButtonStyle.Success)
        .setDisabled(false);

      const resetRow = new ActionRowBuilder().addComponents(resetButton);

      await message.edit({
        components: [resetRow],
      });
    };

    if (user.isOnboard) {
      clearTimeout(resetTimeout);
      await resetButton();
    }

    const speciesMenu = new StringSelectMenuBuilder()
      .setCustomId("species-select")
      .setPlaceholder("Select your species!")
      .addOptions(
        new StringSelectMenuOptionBuilder()
          .setLabel("Human")
          .setDescription("Humans are the most common and versatile species.")
          .setEmoji("👨")
          .setValue("Human"),
        new StringSelectMenuOptionBuilder()
          .setLabel("Elf")
          .setDescription(
            "Elves are known for their tall build and attunement to nature."
          )
          .setEmoji("🧝")
          .setValue("Elf"),
        new StringSelectMenuOptionBuilder()
          .setLabel("Dwarf")
          .setDescription("Dwarves are known for their dexterity and smarts.")
          .setEmoji("🧙")
          .setValue("Dwarf"),
        new StringSelectMenuOptionBuilder()
          .setLabel("Orc")
          .setDescription(
            "Orcs are known for their brutish strength and resilience."
          )
          .setEmoji("🧟")
          .setValue("orc")
      );
    const speciesRow = new ActionRowBuilder().addComponents(speciesMenu);

    interaction.reply({
      content: "First off, select your species!",
      components: [speciesRow],
      ephemeral: true,
    });
  }
};
