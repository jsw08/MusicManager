import { SvelteKitAuth } from "@auth/sveltekit"
import Discord from "@auth/sveltekit/providers/discord"
import { env } from "$env/dynamic/private"
import { type APIGuild } from 'discord-api-types/v10';

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
  console.log(guilds)

  return guilds;
}

export const { handle, signIn, signOut } = SvelteKitAuth({
  trustHost: true,
  providers: [
    Discord({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
      authorization: "https://discord.com/oauth2/authorize?scope=guilds+identify"
    }),
  ],
  callbacks: {
    async signIn({account, user}) {
      console.log(account, user)
      if (!account || !account.access_token) return false
      if (!user.id) return false

      let guilds: APIGuild[] = await getGuilds(account.access_token);
      const inguild = guilds.some(v => v.id === env.DISCORD_GUILD_ID) 
      if (!inguild) return false

      // if (!await getuser(user.id)) setuser(user.id)
      return true
    }
  }
})
