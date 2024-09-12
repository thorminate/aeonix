import { ActionRowBuilder } from "discord.js";

export default function (buttons: any) {
  const components = [];
  let currentRow = new ActionRowBuilder();

  for (let a = 0; a < buttons.length && a < 25; a++) {
    if (a % 5 === 0 && a > 0) {
      components.push(currentRow);
      currentRow = new ActionRowBuilder();
    }

    currentRow.addComponents(buttons[a]);
  }

  if (currentRow.components.length > 0) {
    components.push(currentRow);
  }

  return components;
}
