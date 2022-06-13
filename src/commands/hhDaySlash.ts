import {
  ButtonInteraction,
  CommandInteraction,
  MessageActionRow,
  MessageButton,
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

@Discord()
export class HHDaySlash {
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
        "React with the below options to vote for which day works best for you! (voting for multiple days is allowed!) \n" +
          "If you would like to add an option that is not here please create a thread with an emoji mapping! \n\n" +
          `${Emojis.hamster} for thursday\n` +
          `${Emojis.bear} for friday`
      );
    let targetChannel: TextChannel | undefined =
      interaction.guild?.channels.cache.get(channelId) as TextChannel;

    // Create the button, giving it the id: "hello-btn"
    const helloBtn = new MessageButton()
      .setLabel("Hello")
      .setEmoji("👋")
      .setStyle("PRIMARY")
      .setCustomId("hello-btn");

    // Create a MessageActionRow and add the button to that row.
    const row = new MessageActionRow().addComponents(helloBtn);

    if (targetChannel) {
      targetChannel.send({ embeds: [embed], components: [row] });
      interaction.reply("sent");
    } else {
      console.log(interaction.guild?.channels.cache);
      console.log(channelId);
      interaction.reply(
        "FAIL: target channel either wasn't provided or couldn't be found"
      );
    }
  }

  // register a handler for the button with id: "hello-btn"
  @ButtonComponent("hello-btn")
  async myBtn(interaction: ButtonInteraction) {
    let message = await interaction.channel?.messages.fetch(
      interaction.message.id
    );
    message?.react(Emojis.hamster);
    interaction.reply("something");
  }
}
