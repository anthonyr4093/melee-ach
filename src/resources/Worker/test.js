const slippi = require("@slippi/slippi-js").SlippiGame;
const game = new slippi(
  "C:/Users/Anthony/Documents/Slippi/uhhhh/Game_20210122T214248.slp"
);
const pog = game.getMetadata();
console.log(pog.players[1]);
