import type { AuthConfig } from "@auth/core/types";
import { NuxtAuthHandler } from "#auth";
import { v4 as uuidv4 } from "uuid";

const runtimeConfig = useRuntimeConfig();

export const authOptions: AuthConfig = {
  secret: runtimeConfig.authJs.secret,
  providers: [
    // {
    //   id: "steam",
    //   name: "Steam",
    //   type: "oauth",
    //   style: {
    //     logo: "https://cdn.worldvectorlogo.com/logos/steam-1.svg",
    //     logoDark: "https://cdn.worldvectorlogo.com/logos/steam-1.svg",
    //     bg: "#fff",
    //     text: "#000",
    //     bgDark: "#fff",
    //     textDark: "#000",
    //   },
    //   idToken: false,
    //   checks: ["nonce"],
    //   clientId: "steam",
    //   authorization: {
    //     url: "https://steamcommunity.com/openid/login",
    //     params: {
    //       "openid.mode": "checkid_setup",
    //       "openid.ns": "http://specs.openid.net/auth/2.0",
    //       "openid.claimed_id":
    //         "http://specs.openid.net/auth/2.0/identifier_select",
    //       "openid.identity":
    //         "http://specs.openid.net/auth/2.0/identifier_select",
    //       "openid.return_to": runtimeConfig.steam.callbackUrl,
    //       "openid.realm": runtimeConfig.steam.realm,
    //     },
    //   },
    //   token: {
    //     url: "https:/ex.local",
    //     async request(context) {
    //       console.log(context);
    //       return {
    //         tokens: new TokenSet({
    //           id_token: "token",
    //           access_token: "token",
    //         }),
    //       };
    //     },
    //   },
    //   userinfo: {
    //     url: "https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002",
    //     async request(context) {
    //       console.log(context);
    //       return {
    //         id: "1234",
    //         displayName: "test",
    //         avatarfull: "https://example.com/avatar.png",
    //       };
    //     },
    //   },
    //   profile(profile) {
    //     return {
    //       id: profile.id,
    //       name: profile.displayName,
    //       email: profile.displayName + "@null.local",
    //       image: profile.avatarfull,
    //     };
    //   },
    //   clientSecret: runtimeConfig.steam.apiKey,
    // },
    {
      name: "Steam",
      id: "steam",
      type: "oidc",
      issuer: runtimeConfig.steam.issuer,
      authorization: {
        params: {
          scope: "openid profile",
        },
      },
      profile(profile) {
        return {
          id: uuidv4(),
          steam_id: profile.steam_id,
          name: profile.nickname,
          image: profile.picture,
          website: profile.website,
        };
      },
      style: {
        logo: "https://cdn.worldvectorlogo.com/logos/steam-1.svg",
        logoDark: "https://cdn.worldvectorlogo.com/logos/steam-1.svg",
        bg: "#fff",
        text: "#000",
        bgDark: "#fff",
        textDark: "#000",
      },
      clientId: runtimeConfig.steam.clientId,
      clientSecret: runtimeConfig.steam.clientSecret,
    },
  ],
  callbacks: {
    async session({ session, user }) {
      console.log(user);
      return session;
    }
  }
};

//TODO: Add callbacks to pass steam_id to frontend

export default NuxtAuthHandler(authOptions, runtimeConfig);
