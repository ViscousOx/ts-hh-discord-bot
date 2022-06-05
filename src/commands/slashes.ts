import { CommandInteraction, MessageEmbed, TextChannel } from "discord.js";
import { Discord, Slash, Permission, SlashOption } from "discordx";
import { Emojis } from "../constants/emojis";
import { Roles } from "../constants/roles";
import { fixRawChannelId } from "../util/cleaning";

@Discord()
export class Example {
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
        "React with the below options to vote for which day works best for you! (voting for multiple days is allowed!) \n\n" +
          `${Emojis.hamster} for thursday\n` +
          `${Emojis.bear} for friday`
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

  @Slash("hh-place", {
    description: "Send embeded message for voting on HH location",
  })
  hhPlace(
    @SlashOption("channel", {
      description: "what channel should the message be posted in",
    })
    rawChannelId: string,
    interaction: CommandInteraction
  ): void {
    let channelId = fixRawChannelId(rawChannelId);
    let embed = new MessageEmbed()
      .setColor("#e42643")
      .setTitle("Where should we meet up?")
      .setDescription(
        "React with the below options to vote for which location you want! (voting for multiple days is allowed!)\n\n" +
          `${Emojis.beer} for LynLake Brewery\n` +
          `${Emojis.clink} for Morrissey's Pub\n` +
          `${Emojis.marg} for Lago Tacos\n` +
          `${Emojis.pita} for Malcolm Yards\n` +
          `${Emojis.dice} for Gamezenter\n` +
          `${Emojis.highball} for Norseman Distillery\n` +
          `${Emojis.bond} for Twin Spirits Distillery\n` +
          `${Emojis.wine} for Brits Pub\n` +
          `${Emojis.pho} for Ipho by Saigon\n` +
          `${Emojis.taco} for Sonora Mexican Kitchen & Bar\n` +
          `${Emojis.bowling} for Bryant Lake Bowl & Theater`
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
