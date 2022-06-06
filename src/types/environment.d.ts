export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      token: string;
      clientId: string;
      guildId: string;
      reactionRoleChannel: string;
      botWorkerId: string;
    }
  }
}
