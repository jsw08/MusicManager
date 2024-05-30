import { SvelteKitAuth } from "@auth/sveltekit"
import Discord from "@auth/sveltekit/providers/discord"
import { env } from "$env/dynamic/private"
import { type APIGuild } from 'discord-api-types/v10';
import { db, getUser, setUser } from "./db";
import { UnstorageAdapter } from "@auth/unstorage-adapter";

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

export const { handle, signIn, signOut } = SvelteKitAuth({
  adapter: UnstorageAdapter(db),
  providers: [
    Discord({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
      authorization: "https://discord.com/oauth2/authorize?scope=guilds+identify"
    }),    
  ],
  secret: env.AUTH_SECRET,
  trustHost: true,
  callbacks: {
    async jwt({token, user}) {
      if (user) {
        token.id = user.id;
      }
      return token
    },
    async session({session, token}) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
    async signIn({account, user}) {
      if (!account || !account.access_token) return false
      if (!user.id) return false

      let guilds: APIGuild[] = await getGuilds(account.access_token);
      const inguild = guilds.some(v => v.id === env.DISCORD_GUILD_ID) 
      if (!inguild) return false

      if (!await getUser(user.id)) setUser(user.id)
      return true
    }
  }
})

