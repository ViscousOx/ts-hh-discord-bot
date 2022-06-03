import { CommandInteraction, MessageEmbed } from "discord.js";
import { Discord, Slash } from "discordx";
import { Emojis } from "../constants/emojis";

@Discord()
export class Example {
  @Slash()
  ping(interaction: CommandInteraction): void {
    interaction.reply("pong!");
  }

  @Slash("hh-day", { description: "Send embeded message for voting on HH day" })
  hhDay(interaction: CommandInteraction): void {
    let embed = new MessageEmbed()
      .setColor("#e42643")
      .setTitle("What day should we meet up?")
      .setDescription(
        "React with the below options to vote for which day works best for you! (voting for multiple days is allowed!) \n\n" +
          `${Emojis.hamster} for thursday\n` +
          `${Emojis.bear} for friday`
      );
    interaction.channel?.send({ embeds: [embed] });
  }

  @Slash("hh-place", {
    description: "Send embeded message for voting on HH location",
  })
  hhPlace(interaction: CommandInteraction): void {
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
    interaction.channel?.send({ embeds: [embed] });
  }
}
