import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageEmbed } from "discord.js";
import { Emojis } from "../constants/emojis";
import { Client } from "discordx";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("reactionrole")
    .setDescription("Sets up a reaction role message!"),
  async execute(message: any, args: any, client: Client) {
    const yellowTeamEmoji = Emojis[process.env.yellowRoleEmoji as string];
    const blueTeamEmoji = Emojis[process.env.blueRoleEmoji as string];
    let embed = new MessageEmbed()
      .setColor("#e42643")
      .setTitle("Choose a team to play on!")
      .setDescription(
        "Choosing a team will allow you to interact with your teammates!\n\n" +
          `${yellowTeamEmoji} for yellow team\n` +
          `${blueTeamEmoji} for blue team`
      );

    let messageEmbed = await message.channel.send({ embeds: [embed] });
    messageEmbed.react(yellowTeamEmoji);
    messageEmbed.react(blueTeamEmoji);

    client.on("messageReactionAdd", async (reaction: any, user: any) => {
      const yellowTeamEmoji = Emojis[process.env.yellowRoleEmoji as string];
      const blueTeamEmoji = Emojis[process.env.blueRoleEmoji as string];

      if (reaction.message.partial) await reaction.message.fetch();
      if (reaction.partial) await reaction.fetch();
      if (user.bot) return;
      if (!reaction.message.guild) return;

      if (reaction.message.channel.id == process.env.channel) {
        if (reaction.emoji.name === yellowTeamEmoji) {
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.add(process.env.yellowTeamRole);
        }
        if (reaction.emoji.name === blueTeamEmoji) {
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.add(process.env.blueTeamRole);
        }
      } else {
        return;
      }
    });

    client.on("messageReactionRemove", async (reaction: any, user: any) => {
      const yellowTeamEmoji = Emojis[process.env.yellowRoleEmoji as string];
      const blueTeamEmoji = Emojis[process.env.blueRoleEmoji as string];

      if (reaction.message.partial) await reaction.message.fetch();
      if (reaction.partial) await reaction.fetch();
      if (user.bot) return;
      if (!reaction.message.guild) return;

      if (reaction.message.channel.id == process.env.channel) {
        if (reaction.emoji.name === yellowTeamEmoji) {
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.remove(process.env.yellowTeamRole);
        }
        if (reaction.emoji.name === blueTeamEmoji) {
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.remove(process.env.blueTeamRole);
        }
      } else {
        return;
      }
    });
  },
};
