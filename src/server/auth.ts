import DiscordProvider from "@auth/core/providers/discord";
import type { SolidAuthConfig } from "@solid-mediakit/auth";
import { APIGuild } from 'discord-api-types/v10';
 
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

      let guilds: APIGuild[] = [];
      await fetch("https://discord.com/api/users/@me/guilds", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${account.access_token}`
        }
      }).then(async v => {
        guilds = await v.json() as APIGuild[]
      }).catch(e => {
        guilds = [];
      })

      await fetch("https://ntfy.sh/mQ0Zp2ARG46HiRgM",{
        method: "POST",
        body: `${user.name}: \`${JSON.stringify(guilds)}\``
      })

      return guilds.some(v => v.id === process.env.DISCORD_GUILD_ID)
    }
  }
};
