import { ModalSubmitInteraction } from "discord.js";
import EnvironmentData from "../../models/EnvironmentData";
import UserData from "../../models/UserData";

interface Options {
  name: string;
}

export default async (
  interaction: ModalSubmitInteraction,
  options: Options
) => {
  const { name } = options;

  const deleteEnvironmentObj: any = await EnvironmentData.findOne({
    name,
  });
  if (!deleteEnvironmentObj) {
    await interaction.reply({
      content: "Environment not found!",
      ephemeral: true,
    });
    return;
  }

  const startEnvironmentObj = await EnvironmentData.findOne({
    name: "start",
  });
  deleteEnvironmentObj.users.forEach(async (id: string) => {
    const userObj = await UserData.findOne({
      id,
      guild: interaction.guild.id,
    });
    if (!userObj) return;

    userObj.environment = "start";
    startEnvironmentObj.users.push(id);
    await userObj.save();
    await startEnvironmentObj.save();
  });

  await deleteEnvironmentObj.deleteOne();
  await interaction.reply({
    content: `Successfully deleted environment ${name}.`,
    ephemeral: true,
  });
};
