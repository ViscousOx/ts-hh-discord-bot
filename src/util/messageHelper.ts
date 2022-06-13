import {
  ButtonInteraction,
  Message,
  MessageActionRow,
  MessageButton,
  MessageButtonStyleResolvable,
} from "discord.js";

export interface createButtonsArgs {
  label: string;
  emoji: string;
  style: MessageButtonStyleResolvable;
  id: string;
}
export async function getMessage(
  interaction: ButtonInteraction
): Promise<Message<boolean> | undefined> {
  return await interaction.channel?.messages.fetch(interaction.message.id);
}

export function createButtons(args: createButtonsArgs[]): MessageActionRow[] {
  let i = 0;
  let currentRow: MessageActionRow = new MessageActionRow();
  const returnValue: MessageActionRow[] = [];
  args.forEach((button) => {
    currentRow.addComponents(
      new MessageButton()
        .setLabel(button.label)
        .setEmoji(button.emoji)
        .setStyle(button.style)
        .setCustomId(button.id)
    );

    // 5 bc message width is at 5
    if (i % 4 === 0 && i !== 0) {
      returnValue.push(currentRow);
      currentRow = new MessageActionRow();
    } else if (i === args.length - 1) {
      returnValue.push(currentRow);
    }

    i++;
  });

  return returnValue;
}
