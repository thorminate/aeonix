import Saveable from "./utils/Saveable";
import calculateLevelExp from "../utils/calculateLevelExp";
import { GuildMember, TextChannel, User } from "discord.js";
import { Document, Model, model, Schema } from "mongoose";

export interface InventoryEntry {
  name: string;
  quantity: number;
  state: string;
}

export interface InventoryBlock {
  name: string;
  entries: InventoryEntry[];
}

export interface StatBlock {
  level: number;
  xp: number;
  strength: number;
  will: number;
  cognition: number;
}

interface IPlayer extends Document {
  id: string;
  name: string;
  characterName: string;
  status: StatBlock;
  inventory: InventoryBlock;
}

const playerSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true, unique: true },
  characterName: { type: String, required: true },
  status: { type: Object, default: { strength: 0, will: 0, cognition: 0 } },
  inventory: { type: Object, default: [] },
});

const PlayerModel = model<IPlayer>("Player", playerSchema);

export default class Player extends Saveable<IPlayer> {
  id: string;
  name: string;
  characterName: string;
  status: StatBlock;
  inventory: InventoryBlock;

  /**
   * Level up the player by specified amount
   * @param amount Amount of levels to level up, may not be less than 1
   * @param member Member to level up, may not be null
   * @param currentChannel Channel to send level up message in, may be null
   * @param resetXp Whether to reset xp to 0 when levelling up
   * @param save Whether to save to db automatically
   * @returns The player after level up
   */
  async levelUp(
    member: GuildMember,
    amount: number = 1,
    currentChannel?: TextChannel,
    resetXp: boolean = true,
    save: boolean = true
  ) {
    if (amount <= 0 || !amount) return;
    this.status.level += amount;
    if (resetXp) this.status.xp = 0;

    if (currentChannel) {
      currentChannel.send(
        `<@${member.user.id}> has leveled up! Their level is now ${this.status.level}!`
      );
    }

    if (save) this.save();
  }

  /**
   * Give xp to the player
   * @param amount The amount of xp to give, may not be less than 0
   * @param member The member to give xp to, may not be null
   * @param save Whether to save to db automatically
   * @param currentChannel Channel to send level up message in.
   */
  async giveXp(
    amount: number,
    member: GuildMember,
    save: boolean = true,
    currentChannel?: TextChannel
  ) {
    this.status.xp += amount;
    while (this.status.xp >= calculateLevelExp(this.status.level)) {
      this.levelUp(member, 1, currentChannel, false, false);
      this.status.xp -= calculateLevelExp(this.status.level - 1);
    }

    if (this.status.xp < 0) this.status.xp = 0;

    if (save) this.save();
  }

  /**
   * Give xp to the player from a range, inputted as min and max
   * @param min The minimum amount of xp to give
   * @param max The maximum amount of xp to give
   * @param member The member to give xp to
   * @param currentChannel Channel to send level up message in
   * @param save Whether to save to db automatically
   */
  async giveXpFromRange(
    min: number,
    max: number,
    member: GuildMember,
    currentChannel?: TextChannel,
    save: boolean = true
  ) {
    const randomFromRange = Math.floor(Math.random() * (max - min + 1)) + min;

    this.giveXp(randomFromRange, member, save, currentChannel);
  }

  // All below is necessary for the Player class to function and may not be modified.

  constructor(user: User, characterName: string) {
    super();
    // Only the required properties (inside the schema) are set. The rest are implied when saving to db.
    this.name = user.username;
    this.characterName = characterName || "";
    this.id = user.id;
  }

  protected getIdentifier(): { key: keyof IPlayer; value: string } {
    return {
      key: "name",
      value: this.name,
    };
  }

  protected getModel(): Model<IPlayer> {
    return PlayerModel;
  }

  // Static method implementation
  static getModel(): Model<IPlayer> {
    return PlayerModel;
  }
}
