import { CommandInteraction, MessageEmbed, TextChannel } from "discord.js";
import { Discord, Slash, SlashOption } from "discordx";
import { Emojis } from "../constants/emojis";
import { fixRawChannelId } from "../util/cleaning";

@Discord()
export class Slashes {
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
        "React with the below options to vote for which time you want! (voting for multiple times is allowed!)\n" +
          "If you would like to add an option that is not here please create a thread with an emoji mapping! \n\n" +
          `${Emojis.five} for 5:00 pm\n` +
          `${Emojis.five_thirty} for 5:30 pm\n` +
          `${Emojis.six} for 6:00 pm\n` +
          `${Emojis.six_thirty} for 6:30 pm`
      );
    let targetChannel: TextChannel | undefined =
      interaction.guild?.channels.cache.get(channelId) as TextChannel;
    if (targetChannel) {
      targetChannel.send({ embeds: [embed] });
      interaction.reply("sent");
    } else {
      console.log(interaction.guild?.channels.cache);
      console.log(channelId);
      interaction.reply(
        "FAIL: target channel either wasn't provided or couldn't be found"
      );
    }
  }
}
