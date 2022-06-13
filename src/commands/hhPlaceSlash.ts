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
      label: "LynLake Brewery",
      emoji: Emojis.beer,
      style: "PRIMARY",
      id: "lynlake-brew-btn",
    },
    {
      label: "Morrissey's Pub",
      emoji: Emojis.clink,
      style: "PRIMARY",
      id: "morrissey-btn",
    },
    {
      label: "Lago Tacos",
      emoji: Emojis.marg,
      style: "PRIMARY",
      id: "lago-btn",
    },
    {
      label: "Malcolm Yards",
      emoji: Emojis.pita,
      style: "PRIMARY",
      id: "malcolm-yard-btn",
    },
    {
      label: "Gamezenter",
      emoji: Emojis.dice,
      style: "PRIMARY",
      id: "gamezenter-btn",
    },
    {
      label: "Norseman Distillery",
      emoji: Emojis.highball,
      style: "PRIMARY",
      id: "norseman-btn",
    },
    {
      label: "Twin Spirits Distillery",
      emoji: Emojis.bond,
      style: "PRIMARY",
      id: "twin-spirits-btn",
    },
    {
      label: "Brits Pub",
      emoji: Emojis.wine,
      style: "PRIMARY",
      id: "brits-btn",
    },
    {
      label: "Ipho by Saigon",
      emoji: Emojis.pho,
      style: "PRIMARY",
      id: "pho-btn",
    },
    {
      label: "Sonora Mexican Kitchen & Bar",
      emoji: Emojis.taco,
      style: "PRIMARY",
      id: "sonora-btn",
    },
    {
      label: "Bryant Lake Bowl & Theater",
      emoji: Emojis.bowling,
      style: "PRIMARY",
      id: "bryant-lake-btn",
    },
  ];

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
        "React with the below buttons to vote for which location you want! (voting for multiple locations is allowed!)\n" +
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

  @ButtonComponent("lynlake-brew-btn")
  async lynLakeBtn(interaction: ButtonInteraction) {
    let message = await getMessage(interaction);
    message?.react(Emojis.beer);
    await interaction.deferUpdate();
  }

  @ButtonComponent("morrissey-btn")
  async morrisseyBtn(interaction: ButtonInteraction) {
    let message = await getMessage(interaction);
    message?.react(Emojis.clink);
    await interaction.deferUpdate();
  }

  @ButtonComponent("lago-btn")
  async lagoBtn(interaction: ButtonInteraction) {
    let message = await getMessage(interaction);
    message?.react(Emojis.marg);
    await interaction.deferUpdate();
  }

  @ButtonComponent("malcolm-yard-btn")
  async malcolmYardBtn(interaction: ButtonInteraction) {
    let message = await getMessage(interaction);
    message?.react(Emojis.pita);
    await interaction.deferUpdate();
  }

  @ButtonComponent("gamezenter-btn")
  async gamezenterBtn(interaction: ButtonInteraction) {
    let message = await getMessage(interaction);
    message?.react(Emojis.dice);
    await interaction.deferUpdate();
  }

  @ButtonComponent("norseman-btn")
  async norsemanBtn(interaction: ButtonInteraction) {
    let message = await getMessage(interaction);
    message?.react(Emojis.highball);
    await interaction.deferUpdate();
  }

  @ButtonComponent("twin-spirits-btn")
  async twinSpiritsBtn(interaction: ButtonInteraction) {
    let message = await getMessage(interaction);
    message?.react(Emojis.bond);
    await interaction.deferUpdate();
  }

  @ButtonComponent("brits-btn")
  async britsBtn(interaction: ButtonInteraction) {
    let message = await getMessage(interaction);
    message?.react(Emojis.wine);
    await interaction.deferUpdate();
  }

  @ButtonComponent("pho-btn")
  async phoBtn(interaction: ButtonInteraction) {
    let message = await getMessage(interaction);
    message?.react(Emojis.pho);
    await interaction.deferUpdate();
  }

  @ButtonComponent("sonora-btn")
  async sonoraBtn(interaction: ButtonInteraction) {
    let message = await getMessage(interaction);
    message?.react(Emojis.taco);
    await interaction.deferUpdate();
  }

  @ButtonComponent("bryant-lake-btn")
  async bryantLakeBtn(interaction: ButtonInteraction) {
    let message = await getMessage(interaction);
    message?.react(Emojis.bowling);
    await interaction.deferUpdate();
  }
}
