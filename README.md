# eider_hmuy
Fun Discord bot I guess.
- [Invite link](https://tiny.cc/eider_hmuy) (try refreshing if it doesn't work)

## Prerequisites:
- Anything that can run nodejs (iOS devices don't work, I tried).
- Nodejs: 16.13 or newer.
- A brain and common sense.

## How to host it yourself: 
- Step 1: Clone this repository
- Step 2: Create a Discord application, then create a bot (MAKE SURE YOUR ACCOUNT HAS 2FA ENABLED or most shit will just crash) and get the bot token (save it somewhere and **DO NOT SHARE WITH ANYONE**)
- Step 3: Create a file named `.env` with the content of `DISCORD_TOKEN=YOURBOTTOKEN` (replace `YOURBOTTOKEN` with the token from step 2. Optionally, you can also put your NASA OpenAPI key in for apod (Astronomy Picture of the Day). 
- Step 4: Open a terminal window, cd to the folder where the repo is saved and type `npm i`.
- Step 5: Type `node .` or `node index.js`, or if you want to be fancy, install [pm2](https://www.npmjs.com/package/pm2) and then type `pm2 start index.js`.
- Enjoy!

## Acknowledgements: 
- [CallMeEcho](https://github.com/CallMeEchoCodes) and [llsc12](https://github.com/llsc12) for helping me a lot with the code, js stuff, etc 
- [CallMeEcho](https://github.com/CallMeEchoCodes) for creating this bot in the first place (this is a fork of it btw)
- APIs used in this bot: [PronounDB](https://pronoundb.org), [NASA's OpenAPIs](https://api.nasa.gov/), [Inspiration API](https://inspiration.goprogram.ai/), [Urban Dictionary API](https://www.urbandictionary.com/), [Useless Facts API](https://uselessfacts.jsph.pl/random.json?language=en), [Bored API](https://www.boredapi.com/api/activity/), [Return Youtube Dislikes API](https://returnyoutubedislike.com) and ~~[llsc12.ml](https://llsc12.ml)~~ replaced by [ytdl-core](https://www.npmjs.com/package/ytdl-core).
- A big, big, big thanks to [SillySock](https://github.com/Sillysockk) for letting me host Eider on their VPS.