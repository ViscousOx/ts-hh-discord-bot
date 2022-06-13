import {
  ButtonInteraction,
  CommandInteraction,
  MessageActionRow,
  MessageEmbed,
  TextChannel,
} from "discord.js";
import { ButtonComponent, Discord, Slash, SlashOption } from "discordx";
import { Emojis } from "../constants/emojis";
import { fixRawChannelId } from "../util/cleaning";
import {
  createButtons,
  createButtonsArgs,
  getMessage,
} from "../util/messageHelper";

@Discord()
export class Slashes {
  private buttons: createButtonsArgs[] = [
    {
      label: "5:00 pm",
      emoji: Emojis.five,
      style: "PRIMARY",
      id: "five-btn",
    },
    {
      label: "5:30 pm",
      emoji: Emojis.five_thirty,
      style: "PRIMARY",
      id: "five-thirty-btn",
    },
    {
      label: "6:00 pm",
      emoji: Emojis.six,
      style: "PRIMARY",
      id: "six-btn",
    },
    {
      label: "6:30 pm",
      emoji: Emojis.six_thirty,
      style: "PRIMARY",
      id: "six-thirty-btn",
    },
  ];

  @Slash("hh-time", {
    description: "Send embeded message for voting on HH time",
  })
  hhTime(
    @SlashOption("channel", {
      description: "what channel should the message be posted in",
    })
    rawChannelId: string,
    interaction: CommandInteraction
  ): void {
    let channelId = fixRawChannelId(rawChannelId);
    let embed = new MessageEmbed()
      .setColor("#e42643")
      .setTitle("What time should we meet up?")
      .setDescription(
        "React with the below buttons to vote for which time you want! (voting for multiple times is allowed!)\n" +
          "If you would like to add an option that is not here please create a thread with an emoji mapping! \n\n"
      );

    let targetChannel: TextChannel | undefined =
      interaction.guild?.channels.cache.get(channelId) as TextChannel;

    const row: MessageActionRow[] = createButtons(this.buttons);

    if (targetChannel) {
      targetChannel.send({ embeds: [embed], components: row });
      interaction.reply("sent");
    } else {
      console.log(interaction.guild?.channels.cache);
      console.log(channelId);
      interaction.reply(
        "FAIL: target channel either wasn't provided or couldn't be found"
      );
    }
  }

  @ButtonComponent("five-btn")
  async fiveBtn(interaction: ButtonInteraction) {
    let message = await getMessage(interaction);
    message?.react(Emojis.five);
    await interaction.deferUpdate();
  }

  @ButtonComponent("five-thirty-btn")
  async fiveThirtyBtn(interaction: ButtonInteraction) {
    let message = await getMessage(interaction);
    message?.react(Emojis.five_thirty);
    await interaction.deferUpdate();
  }

  @ButtonComponent("six-btn")
  async sixBtn(interaction: ButtonInteraction) {
    let message = await getMessage(interaction);
    message?.react(Emojis.six);
    await interaction.deferUpdate();
  }

  @ButtonComponent("six-thirty-btn")
  async sixThirtyBtn(interaction: ButtonInteraction) {
    let message = await getMessage(interaction);
    message?.react(Emojis.six_thirty);
    await interaction.deferUpdate();
  }
}
