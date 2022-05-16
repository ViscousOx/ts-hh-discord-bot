export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      token: string;
      clientId: string;
      guildId: string;
      yellowRoleEmoji: string;
      blueRoleEmoji: string;
      yellowRoleName: string;
      blueRoleName: string;
      reactionRoleChannel: string;
    }
  }
}
