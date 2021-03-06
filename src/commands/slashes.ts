import {
  CommandInteraction,
  Emoji,
  MessageEmbed,
  TextChannel,
} from "discord.js";
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
  async hhDay(
    @SlashOption("channel", {
      description: "what channel should the message be posted in",
    })
    rawChannelId: string,
    interaction: CommandInteraction
  ): Promise<void> {
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
    if (targetChannel) {
      let message = await targetChannel.send({ embeds: [embed] });
      message.react(Emojis.hamster);
      message.react(Emojis.bear);
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
  async hhPlace(
    @SlashOption("channel", {
      description: "what channel should the message be posted in",
    })
    rawChannelId: string,
    interaction: CommandInteraction
  ): Promise<void> {
    let channelId = fixRawChannelId(rawChannelId);
    let embed = new MessageEmbed()
      .setColor("#e42643")
      .setTitle("Where should we meet up?")
      .setDescription(
        "React with the below options to vote for which location you want! (voting for multiple locations is allowed!)\n" +
          "If you would like to add an option that is not here please create a thread with an emoji mapping! \n\n" +
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
      let message = await targetChannel.send({ embeds: [embed] });
      message.react(Emojis.beer);
      message.react(Emojis.clink);
      message.react(Emojis.marg);
      message.react(Emojis.pita);
      message.react(Emojis.dice);
      message.react(Emojis.highball);
      message.react(Emojis.bond);
      message.react(Emojis.wine);
      message.react(Emojis.pho);
      message.react(Emojis.taco);
      message.react(Emojis.bowling);
      interaction.reply("sent");
    } else {
      console.log(interaction.guild?.channels.cache);
      console.log(channelId);
      interaction.reply(
        "FAIL: target channel either wasn't provided or couldn't be found"
      );
    }
  }

  @Slash("hh-time", {
    description: "Send embeded message for voting on HH time",
  })
  async hhTime(
    @SlashOption("channel", {
      description: "what channel should the message be posted in",
    })
    rawChannelId: string,
    interaction: CommandInteraction
  ): Promise<void> {
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
      let message = await targetChannel.send({ embeds: [embed] });
      message.react(Emojis.five);
      message.react(Emojis.five_thirty);
      message.react(Emojis.six);
      message.react(Emojis.six_thirty);
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
