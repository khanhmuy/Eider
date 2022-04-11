# eider_hmuy
Fun Discord bot I guess.
- [Invite link](hmuy.ml/eider) (try refreshing if it doesn't work)

## Info
- Discord Gateway Intents used: `Intents.FLAGS.GUILDS` (used to get server info), `Intents.FLAGS.GUILD_MEMBERS` (used to get user info and logging), `Intents.FLAGS.GUILD_MESSAGES`, `Intents.FLAGS.GUILD_PRESENCES` (used to get user presence status in the `userinfo` command), `Intents.FLAGS.GUILD_BANS` (used for logging, moderation commands eta June 2022)

## Prerequisites:
- Anything that can run Node.js (iOS devices don't work, I tried).
- Node.js: 16.13 or newer.
- A brain and some common sense.

## How to host it yourself: 
- Step 1: Clone this repository
- Step 2: Create a Discord application, then create a bot (MAKE SURE YOUR ACCOUNT HAS 2FA ENABLED or most shit will just crash) and get the bot token (save it somewhere and **DO NOT SHARE WITH ANYONE**)
- Step 3: Create a file named `.env` with the content of `DISCORD_TOKEN=YOURBOTTOKEN` (replace `YOURBOTTOKEN` with the token from step 2. Optionally, you can also put your NASA OpenAPI key in for apod (Astronomy Picture of the Day). 
- Step 4: Open a terminal window, cd to the folder where the repo is saved and type `npm i`.
- Step 5: Type `npm start` or `node index.js`.
- Enjoy!
##### DEV
- Type `npm run dev`
## Acknowledgements: 
- [CallMeEcho](https://github.com/CallMeEchoCodes) and [llsc12](https://github.com/llsc12) for helping me a lot with the code, js stuff, etc 
- [CallMeEcho](https://github.com/CallMeEchoCodes) for creating this bot in the first place (this is a fork of it btw)
- APIs used in this bot: [PronounDB](https://pronoundb.org), [NASA's OpenAPIs](https://api.nasa.gov/), [Inspiration API](https://inspiration.goprogram.ai/), [Urban Dictionary API](https://www.urbandictionary.com/), [Useless Facts API](https://uselessfacts.jsph.pl/random.json?language=en), [Bored API](https://www.boredapi.com/api/activity/), [Return Youtube Dislikes API](https://returnyoutubedislike.com) and ~~[llsc12.ml](https://llsc12.ml)~~ replaced by [ytdl-core](https://www.npmjs.com/package/ytdl-core), [Canister](https://canister.me/).
- A big, big, big thanks to [SillySock](https://github.com/Sillysockk) for letting me host Eider on their VPS.
