import {
  ButtonInteraction,
  CommandInteraction,
  MessageActionRow,
  MessageEmbed,
  TextChannel,
} from "discord.js";
import {
  Discord,
  Slash,
  Permission,
  SlashOption,
  ButtonComponent,
} from "discordx";
import { Emojis } from "../constants/emojis";
import { Roles } from "../constants/roles";
import { fixRawChannelId } from "../util/cleaning";
import {
  createButtons,
  createButtonsArgs,
  getMessage,
} from "../util/messageHelper";

@Discord()
export class HHDaySlash {
  private buttons: createButtonsArgs[] = [
    {
      label: "thursday",
      emoji: Emojis.hamster,
      style: "PRIMARY",
      id: "thur-btn",
    },
    {
      label: "friday",
      emoji: Emojis.bear,
      style: "PRIMARY",
      id: "fri-btn",
    },
  ];

  // TODO: fix this bc currently setting permissions in GUI
  @Permission(false)
  @Permission({ id: Roles.botWorker, type: "ROLE", permission: true })
  @Slash("hh-day", { description: "Send embeded message for voting on HH day" })
  hhDay(
    @SlashOption("channel", {
      description: "what channel should the message be posted in",
    })
    rawChannelId: string,
    interaction: CommandInteraction
  ): void {
    let channelId = fixRawChannelId(rawChannelId);
    let embed = new MessageEmbed()
      .setColor("#e42643")
      .setTitle("What day should we meet up?")
      .setDescription(
        "React with the below buttons to vote for which day works best for you! (voting for multiple days is allowed!) \n" +
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

  @ButtonComponent("thur-btn")
  async thurBtn(interaction: ButtonInteraction) {
    let message = await getMessage(interaction);
    message?.react(Emojis.hamster);
    await interaction.deferUpdate();
  }

  @ButtonComponent("fri-btn")
  async friBtn(interaction: ButtonInteraction) {
    let message = await getMessage(interaction);
    message?.react(Emojis.bear);
    await interaction.deferUpdate();
  }
}
