import DiscordProvider from "@auth/core/providers/discord";
import type { SolidAuthConfig } from "@solid-mediakit/auth";
import { APIGuild } from 'discord-api-types/v10';
import { setUser, getUser, db } from "./db";
 
const getGuilds = async (access_token: string): Promise<APIGuild[]> => {
  let guilds: APIGuild[] = [];

  try {
    const response: Response = await fetch("https://discord.com/api/users/@me/guilds", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    })
    guilds = await response.json(); 
  } catch (e) {
    guilds = [];
    console.error(e)
  } 

  return guilds;
}

export const authOptions: SolidAuthConfig = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
      authorization: "https://discord.com/oauth2/authorize?scope=guilds+identify"
    })
  ],
  callbacks: {
    async signIn({account, user}) {
      if (!account || !account.access_token) return false
      if (!user.id) return false

      let guilds: APIGuild[] = await getGuilds(account.access_token);
      const inGuild = guilds.some(v => v.id === process.env.DISCORD_GUILD_ID) 
      if (!inGuild) return false

      if (!await getUser(user.id)) setUser(user.id)
      return true
    }
  }
};
