/* eslint-disable prettier/prettier */
/* eslint-disable prefer-const */
/* eslint-disable eqeqeq */
const fs = require("fs");
const path = require("path");
const { default: SlippiGame } = require("@slippi/slippi-js");
function name(gamefile, name) {
  const rep = "C:\\Users\\Anthony\\Documents\\Slippi\\TEMPORARY";
  const game = new SlippiGame(path.join(rep, gamefile));
  const settings = game.getSettings();
  const metadata = game.getMetadata();
  const name1 = name.toLowerCase();
  for (let i = 0; i in settings.players; i++) {
    try {
      if (
        settings.players[i].type !== 1 &&
        metadata.players[i].names.netplay !== undefined
      ) {
        if (metadata.players[i].names.netplay.toLowerCase() === name1) return i;
        else continue;
      } else return -1;
    } catch (err) {
      return -1;
    }
  }
}

let game = new SlippiGame(
  path.join(
    "C:\\Users\\Anthony\\Documents\\Slippi\\TEMPORARY",
    "9.24.2020_Dream Land N64_GrayFox_Ry.slp"
  )
);
let stageid = [
  "null",
  "null",
  "Princess Peaches Castle",
  "Rainbow Crusie",
  "Kongo Jungle",
  "Jungle Japes",
  "Great Bay",
  "Hyrule Temple",
  "Brinstar",
  "Brinstar Depths",
  "Yoshi's Story",
  "Yoshi's Island",
  "Fountain of Dreams",
  "Green Greens",
  "Corneria",
  "Venom",
  "Pokemon Stadium",
  "Poke Floats",
  "Mute City",
  "Big Blue",
  "Onett",
  "Fourside",
  "Icicle Mountain",
  "Mushroom Kingdom",
  "Mushroom Kingdom 2",
  "Flatzone",
  "Dreamland",
  "Yoshi's Island (64)",
  "Kongo Jungle(64)",
];
let latest = game.getLatestFrame();
let frames = game.getFrames();
console.log(latest.players[1].post.stocksRemaining);
