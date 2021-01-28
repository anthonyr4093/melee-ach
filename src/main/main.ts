/*
import SlippiGame from '@slippi/slippi-js';
import { watch } from 'chokidar';
import * as electron from 'electron';
import * as fs from 'fs';
import { basename, extname, join } from 'path';

Notes:
It seems like keeping all frame data for slippi files takes up alot of memory when held there, makes sense but i think on demand scans of slippi files will probably be needed. This will lead to long processing times for achievements, making this a really non-viable option for running in the background as played. Or im possibly just overthinking this. Probably the ladder.
TODO: Test storing only individual player frame data, and only post frames, this should save a fourth of the memory usage. Hopefully. Worried about this running on lower-end pcs.
TODO: Setup inputs for user data like usernames.
TODO: put todos in more relevant places.
*/

import Store from "electron-store";

const store = new Store();
const datastoredata = { name: "Data" };
const Achstoredata = { name: "Ach" };
const datastore = new Store(datastoredata);
const achstore = new Store(Achstoredata);
achstore.set("dummy", null);
const varToString = (varObj) => Object.keys(varObj)[0];
datastore.set("dummy", null);
function insert(str, index, value) {
  return str.substr(0, index) + value + str.substr(index);
}
electron.ipcMain.handle("IsSettingsValid?", function (event, args) {
  // console.log("Checking...");
  const rep = args.Replay_Directory[0].toString().replace(/\\\\/g, "\\");
  // console.log(typeof rep);
  if (exist(rep) == true) {
    // console.log("Settings Are Valid");
    store.delete("Replay_Directory");
    store.set("username", args.username);
    store.set("Replay_Directory", rep.replace(/\\\\/g, "\\"));
    return true;
  } else {
    // console.log("Settings Are Not Valid");
    // console.log(rep);
    return false;
  }
});
watch(join(electron.app.getPath("appData"), "Config.json")).on(
  "change",
  (path) => {
    const username = store.get("Username");
    const Replay_Directory = store.get("Replay_Directory");
  }
);
// Initialize Variables For Later use, Later figure out how to load values from json. This is probably when we figure out ui
//= store.get("Replay_Directory", ).replace(/\\\\/g, "\\");
// let username = store.get("Username");
const slippiFilesToArray = [];
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
// create the achivement class and create all of the new achiement.
class Achivement {
  Ach_Name: string;
  Ach_Disc: string;
  Ach_Unlocked: boolean;
  Ach_Key: string;
  constructor(
    Ach_Name: string,
    Ach_Disc: string,
    Ach_Unlocked: boolean,
    Ach_Key: string
  ) {
    (this.Ach_Name = Ach_Name),
      (this.Ach_Disc = Ach_Disc),
      (this.Ach_Unlocked = isUnlocked(Ach_Key)),
      (this.Ach_Key = Ach_Key);
  }
}
function isUnlocked(Ach) {
  if (achstore.get(Ach) == true) return true;
  else return false;
}
// Empty Achivement class
// let null = new Achivement(null, null, null)
// General Achievemnts
// Kill Achievements
const kill1 = new Achivement(
  "Monster Hunter",
  "You have taken a stock,",
  isUnlocked("kill1"),
  "kill1"
);
const kill2 = new Achivement(
  "Monster Slayer",
  "Take 10 Stocks",
  isUnlocked("kill2"),
  "kill2"
);
const kill3 = new Achivement(
  "You're The Monstor",
  "Take 100 Stocks",
  isUnlocked("kill3"),
  "kill3"
);
const kill4 = new Achivement(
  "Cold Blooded Killer",
  "Take 1000 Stocks,",
  isUnlocked("kill4"),
  "kill4"
);
const kill5 = new Achivement(
  "Murderer",
  "Take 2500 Stocks",
  isUnlocked("kill5"),
  "kill5"
);
const kill6 = new Achivement(
  "True Crime",
  "Take 5000 Stocks",
  isUnlocked("kill6"),
  "kill6"
);
const kill7 = new Achivement(
  "Un-Lawful",
  "Take 10000 Stocks",
  isUnlocked("kill7"),
  "kill7"
);
const kill8 = new Achivement(
  "King Slayer",
  "Take 25000 Stocks",
  isUnlocked("kill8"),
  "kill8"
);
const kill9 = new Achivement(
  "Demi-God Slayer",
  "Take 50000 Stocks",
  isUnlocked("kill9"),
  "kill9"
);
const kill10 = new Achivement(
  "God Slayer",
  "Take 1000000 Stocks",
  isUnlocked("kill10"),
  "kill10"
);
const killCheckArray = [
  1,
  10,
  100,
  1000,
  2500,
  5000,
  10000,
  25000,
  50000,
  1000000,
];
// Game count Achievements
const Game1 = new Achivement(
  "Everyone starts somwhere",
  "Play 1 Game",
  isUnlocked("Game1"),
  "Game1"
);
const Game2 = new Achivement(
  "Rookie Numbers",
  "Play 10 Games",
  isUnlocked("Game2"),
  "Game2"
);
const Game3 = new Achivement(
  "Slowly Learning",
  "Play 50 Games",
  isUnlocked("Game3"),
  "Game3"
);
const Game4 = new Achivement(
  "Getting Better",
  "Play 100 Games",
  isUnlocked("Game4"),
  "Game4"
);
const Game5 = new Achivement(
  "Developing New Strats",
  "Play 250 Games",
  isUnlocked("Game5"),
  "Game5"
);
const Game6 = new Achivement(
  "Hot Shot",
  "Play 500 Games",
  isUnlocked("Game6"),
  "Game6"
);
const Game7 = new Achivement(
  "Hard Work",
  "Play 1000 Games",
  isUnlocked("Game7"),
  "Game7"
);
const Game8 = new Achivement(
  "Serious Time",
  "Play 2500 Games",
  isUnlocked("Game8"),
  "Game8"
);
const Game9 = new Achivement(
  "Incredible",
  "Play 5000 Games",
  isUnlocked("Game9"),
  "Game9"
);
const Game10 = new Achivement(
  "Serious Dedication",
  "Play 10000 Games",
  isUnlocked("Game10"),
  "Game10"
);
const GameCheckArray = [1, 10, 50, 100, 250, 500, 1000, 2500, 5000, 10000];
// Misc Achievements
const AATW = new Achivement(
  "All Around The World",
  "Play on every stage",
  false,
  "AATW"
);
const Specialist = new Achivement(
  "Character Specialist",
  "Play as every character",
  false,
  "Specialist"
);
// Character Specific Achivements
// Mario
const Fire1 = new Achivement(
  "Now You're Playing With Super Power!",
  "Shoot a Fireball",
  isUnlocked("Fire1"),
  "Fire1"
);
const Fire2 = new Achivement(
  "Fire Mario",
  "Shoot 1000 Fireballs",
  isUnlocked("Fire2"),
  "Fire2"
);
const Fire3 = new Achivement(
  "Super Mario",
  "Shoot 100000 Fireballs",
  isUnlocked("Fire3"),
  "Fire3"
);
const FireCheckArray = [1, 1000, 100000];
const MarioSpike1 = new Achivement(
  "Nice Spike",
  "Kill With Mario Spike Once",
  isUnlocked("MarioSpike1"),
  "MarioSpike1"
);
const MarioSpike2 = new Achivement(
  "Fixing Pipes",
  "Spike 10 Times",
  isUnlocked("MarioSpike2"),
  "MarioSpike2"
); // null Achivement_Name
const MarioSpike3 = new Achivement(
  "The Ultimate Mario",
  "Spike 100 Time",
  isUnlocked("MarioSpike3"),
  "MarioSpike3"
);
const marSpikeCheckArray = [1, 10, 100];
// Fox
const shine1 = new Achivement(
  "Baby Steps",
  "Perform the shine",
  isUnlocked("shine1"),
  "shine1"
);
const shine2 = new Achivement(
  "Best Move",
  "Shine 1000 Times",
  isUnlocked("shine2"),
  "shine2"
); // null Achievement Name
const shine3 = new Achivement(
  "Shined Blind",
  "Perform The Shine 100000 Times",
  isUnlocked("shine3"),
  "shine3"
);
const ShineCheckArray = [1, 1000, 100000];
const ShineSpike1 = new Achivement(
  "So that kills huh",
  "Kill with the shine",
  isUnlocked("ShineSpike1"),
  "ShineSpike1"
);
const ShineSpike2 = new Achivement(
  "Professinal Gimp",
  "Shine Spike 10 Times",
  isUnlocked("ShineSpike2"),
  "ShineSpike2"
);
const ShineSpike3 = new Achivement(
  "Shined Out of Your Mind",
  "Shine Spike 100 Times",
  isUnlocked("ShineSpike3"),
  "ShineSpike3"
);
const ShineSpikeCheckArray = [1, 10, 100];
// Captin Falcon
const Knee1 = new Achivement(
  "Knee'd lol",
  "Kill With A Knee",
  isUnlocked("Knee1"),
  "Knee1"
);
const Knee2 = new Achivement(
  "Justice",
  "Kill With 50 Knees",
  isUnlocked("Knee2"),
  "Knee2"
);
const Knee3 = new Achivement(
  "Falcons Glory",
  "Kill With Knee 100 Times",
  isUnlocked("Knee3"),
  "Knee3"
);
const KneeCheckArray = [1, 50, 100];
const FalconPunch1 = new Achivement(
  "Did he just walk up forward, And Falcon Punch?",
  "Hit a Falcon Punch",
  isUnlocked("FalconPunch1"),
  "FalconPunch1"
);
const FalconPunch2 = new Achivement(
  "I can't believe that worked",
  "Hit Falcon Punch 10 Times",
  isUnlocked("FalconPunch2"),
  "FalconPunch2"
);
const FalconPunch3 = new Achivement(
  "Theres no way...",
  "Hit Falcon Punch 50 Times",
  isUnlocked("FalconPunch3"),
  "FalconPunch3"
);
const FalconPunchArray = [1, 10, 50];
// Donkey Kong
const CargoThrow1 = new Achivement(
  "Carrier Monkey",
  "Kill with Cargo Throw",
  isUnlocked("CargoThrow1"),
  "CargoThrow1"
);
const CargoThrow2 = new Achivement(
  "Ding-Dong",
  "Kill with Cargo Throw 10 Times",
  isUnlocked("CargoThrow2"),
  "CargoThrow2"
);
const CargoThrow3 = new Achivement(
  "The Game Was Rigged From The Start...",
  "Kill with Cargo Throw 100 Times",
  isUnlocked("CargoThrow3"),
  "CargoThrow3"
);
const CargoThrowArray = [1, 10, 100];
const DonkeyP1 = new Achivement(
  "DONK PUNCH",
  "Kill with Donkey Punch",
  isUnlocked("DonkeyP1"),
  "DonkeyP1"
);
const DonkeyP2 = new Achivement(
  "You Ain't No Air Fighter",
  "Kill with Donkey Punch 10 Times",
  isUnlocked("DonkeyP2"),
  "DonkeyP2"
);
const DonkeyP3 = new Achivement(
  "One Punch Man",
  "Kill with Donkey Punch 100 Times",
  isUnlocked("DonkeyP3"),
  "DonkeyP3"
);
const DonkeyPArray = [1, 10, 100];
// Roy
const RoyNeutralB1 = new Achivement(
  "Probably the only move that kills",
  "Kill with Roys Neutral B",
  isUnlocked("RoyNeutralB1"),
  "RoyNeutralB1"
);
const RoyNeutralB2 = new Achivement(
  null,
  "Kill with Roys Neutral B 10 Times",
  isUnlocked("RoyNeutralB2"),
  "RoyNeutralB2"
);
const RoyNeutralB3 = new Achivement(
  "Dont Test Me...",
  "Kill with Roys Neutral B 100 Times",
  isUnlocked("RoyNeutralB3"),
  "RoyNeutralB3"
);
const RoyNeutralBArray = [1, 10, 100];
const RoySideSmash1 = new Achivement(
  null,
  "Kill With Roys Side Smash",
  isUnlocked("RoySideSmash1"),
  "RoySideSmash1"
);
const RoySideSmash2 = new Achivement(
  null,
  "Kill With Roys Side Smash 10 Times",
  isUnlocked("RoySideSmash2"),
  "RoySideSmash2"
);
const RoySideSmash3 = new Achivement(
  null,
  "Kill With Roys Side Smash 100 Times",
  isUnlocked("RoySideSmash3"),
  "RoySideSmash3"
);
const RoySideSmashArray = [1, 10, 100];
// Kirby
const Kirbycide1 = new Achivement(
  "If i Die...",
  "Kill With Kirby Back/Forward Throw",
  isUnlocked("Kirbycide1"),
  "Kirbycide1"
);
const Kirbycide2 = new Achivement(
  "You go With Me.",
  "Kill With Kirby Back/Forward Throw 10 Times",
  isUnlocked("Kirbycide2"),
  "Kirbycide2"
);
const Kirbycide3 = new Achivement(
  "Martyrdom",
  "Kill With Kirby Back/Forward Throw 100 Times",
  isUnlocked("Kirbycide3"),
  "Kirbycide3"
);

const KirbyNair1 = new Achivement(
  "You spin me right round",
  "Hit Kirbys Nair",
  isUnlocked("KirbyNair1"),
  "KirbyNair1"
);
const KirbyNair2 = new Achivement(
  "i feel sorry for kirby mains",
  "Hit Kirbys Nair 10 Times",
  isUnlocked("KirbyNair2"),
  "KirbyNair2"
);
const KirbyNair3 = new Achivement(
  "Remember to put somthing here",
  "Hit Kirbys Nair 100 Times",
  isUnlocked("KirbyNair3"),
  "KirbyNair3"
);
const KirbycideArray = [1, 10, 100];
const KirbyNairArray = [1, 10, 100];
// Bowser
const BowserNair1 = new Achivement(
  "What does he even do lol",
  "Hit With Bowsers Nair",
  isUnlocked("BowserNair1"),
  "BowserNair1"
);
const BowserNair2 = new Achivement(
  "Can Bowser Reaction Techchase?",
  "Hit Bowsers Nair 10 Times",
  isUnlocked("BowserNair2"),
  "BowserNair2"
);
const BowserNair3 = new Achivement(
  "Is anyone even gonna read this lol?",
  "Hit Bowsers Nair 100 Times",
  isUnlocked("BowserNair3"),
  "BowserNair3"
);
const BowserNairArray = [1, 10, 100];
const BowserUpB1 = new Achivement(
  "Rolling Fortress",
  "Hit Bowsers UpB",
  isUnlocked("BowserUpB1"),
  "BowserUpB1"
);
const BowserUpB2 = new Achivement(
  "Flying Castle",
  "Hit Bowsers Upb 10 Times",
  isUnlocked("BowserUpB2"),
  "BowserUpB2"
);
const BowserUpB3 = new Achivement(
  "Must Be Dizzy",
  "Hit Bowsers Up-b 100 Times",
  isUnlocked("BowserUpB3"),
  "BowserUpB3"
);
const BowserUpBArray = [1, 10, 100];
// Link
const LinkNair1 = new Achivement(
  "Jankiest move in the game",
  "Kill With Nair once",
  isUnlocked("LinkNair1"),
  "LinkNair1"
);
const LinkNair2 = new Achivement(
  null,
  "Kill with Nair 10 Times",
  isUnlocked("LinkNair2"),
  "LinkNair2"
);
const LinkNair3 = new Achivement(
  "",
  "Kill with Nair 100 Times",
  isUnlocked("LinkNair3"),
  "LinkNair3"
);
const LinkNairArray = [1, 10, 100];
const LinkBomb1 = new Achivement(
  null,
  "Spawn a bomb",
  isUnlocked("LinkBomb1"),
  "LinkBomb1"
);
const LinkBomb2 = new Achivement(
  null,
  "Spawn a bomb 100 Times",
  isUnlocked("LinkBomb2"),
  "LinkBomb2"
);
const LinkBomb3 = new Achivement(
  null,
  "Spawn a bomb 10000 Times",
  isUnlocked("LinkBomb3"),
  "LinkBomb3"
);
const LinkBombArray = [1, 100, 10000];

// Shiek Nair And Neddle
const ShiekNair1 = new Achivement(
  "Why is this called a Sex Kick?",
  "Kill With Nair Once",
  isUnlocked("ShiekNair1"),
  "ShiekNair1"
);
const ShiekNair2 = new Achivement(
  "Free Edgeguards",
  "Kill With Nair 10 Times",
  isUnlocked("ShiekNair2"),
  "ShiekNair2"
);
const ShiekNair3 = new Achivement(
  "Fastfallers Nightmare",
  "Kill With Nair 100 Times",
  isUnlocked("ShiekNair3"),
  "ShiekNair3"
);
const ShiekNairArray = [1, 10, 100];
const ShiekNeedle1 = new Achivement(
  "Little Flys",
  "Shoot 50 Needles",
  isUnlocked("ShiekNeedle1"),
  "ShiekNeedle1"
);
const ShiekNeedle2 = new Achivement(
  "Dedicated Bees",
  "Shoot 500 Needles",
  isUnlocked("ShiekNeedle2"),
  "ShiekNeedle2"
);
const ShiekNeedle3 = new Achivement(
  "Angry Wasps",
  "Shoot 50000 Needles",
  isUnlocked("ShiekNeedle3"),
  "ShiekNeedle3"
);
const ShiekNeedleArray = [50, 500, 50000];
// Ness
const NessDair1 = new Achivement(
  "Spiked",
  "Kill with Ness Dair",
  isUnlocked("NessDair1"),
  "NessDair1"
);
const NessDair2 = new Achivement(
  null,
  "Kill with Ness Dair 10 Times",
  isUnlocked("NessDair2"),
  "NessDair2"
);
const NessDair3 = new Achivement(
  "Destroyed by a Child",
  "Kill with Ness Dair 100 Times",
  isUnlocked("NessDair3"),
  "NessDair3"
);
const NessdairArray = [1, 10, 100];
const NessUpb1 = new Achivement(
  "Shock Jacket",
  "Hit Ness's Up-B While Recovering",
  isUnlocked("NessUpb1"),
  "NessUpb1"
);
const NessUpb2 = new Achivement(
  "Can't Edgeguard Me",
  "Hit Ness's Up-B While Recovering 10 Times",
  isUnlocked("NessUpb2"),
  "NessUpb2"
);
const NessUpb3 = new Achivement(
  "Mistake or Yo-Yo Glitch?",
  "Hit Ness's Up-B While Recovering 100 Times",
  isUnlocked("NessUpb3"),
  "NessUpb3"
);
const NessUpbArray = [1, 10, 100];
// Peach
const PeachStich1 = new Achivement(
  "Lucky Number 7",
  "Pull A Stich Face Turnip",
  isUnlocked("PeachStitch1"),
  "PeachStitch1"
);
const PeachStich2 = new Achivement(
  "Slot Machine",
  "Pull A Stich Face Turnip 10 Times",
  isUnlocked("PeachStitch2"),
  "PeachStitch2"
);
const PeachStich3 = new Achivement(
  "Casino Simulator",
  "Pull A Stich Face Turnip 100 Times",
  isUnlocked("PeachStitch3"),
  "PeachStitch3"
);
const PeachStickArray = [1, 10, 100];
const PeachFair1 = new Achivement(
  "Fierce Fighter",
  "Kill With Fair",
  isUnlocked("PeachFair1"),
  "PeachFair1"
);
const PeachFair2 = new Achivement(
  "Fair and Balanced",
  "Kill With Fair 10 Times",
  isUnlocked("PeachFair2"),
  "PeachFair2"
);
const PeachFair3 = new Achivement(
  "Vegatable God",
  "Kill With Fair 100 Times",
  isUnlocked("PeachFair3"),
  "PeachFair3"
);
const PeachFairArray = [1, 10, 100];
// Ice Climbers??? Dont even know how i would start with this one lol. TODO: Figure out frame Parsing for IC.
const IceClimbersFS1 = new Achivement(
  "Ice Cold",
  "Kill With Ice Climbers Forward Smash",
  isUnlocked("IceClimbersFS1"),
  "IceClimbersFS1"
);
const IceClimbersFS2 = new Achivement(
  "Cooled Killers",
  "Kill With Ice Climbers Forward Smash 10 Times",
  isUnlocked("IceClimbersFS2"),
  "IceClimbersFS2"
);
const IceClimbersFS3 = new Achivement(
  "On Fire",
  "Kill With Ice Climbers Forward Smash 100 Times",
  isUnlocked("IceClimbersFS3"),
  "IceClimbersFS3"
);
const IceClimbersFSArray = [1, 10, 100];
const IceClimbersDS1 = new Achivement(
  "Icy Vengance",
  "Kill With Ice Climbers Down Smash",
  isUnlocked("IceClimbersDS1"),
  "IceClimbersDS1"
);
const IceClimbersDS2 = new Achivement(
  "Cool Cat",
  "Kill With Ice Climbers Down Smash 10 Times",
  isUnlocked("IceClimbersDS2"),
  "IceClimbersDS2"
);
const IceClimbersDS3 = new Achivement(
  "Hot Shot",
  "Kill With Ice Climbers Down Smash 100 Times",
  isUnlocked("IceClimbersDS3"),
  "IceClimbersDS3"
);
const IceClimbersDSArray = [1, 10, 100];
// Pikachu Tail Spike And
const TailSpike1 = new Achivement(
  "Nice gimp",
  "Land a Tail Spike",
  isUnlocked("TailSpike1"),
  "TailSpike1"
);
const TailSpike2 = new Achivement(
  "The Cute Killer",
  "Land 10 Tail Spikes",
  isUnlocked("TailSpike2"),
  "TailSpike2"
);
const TailSpike3 = new Achivement(
  "The Rat",
  "Land 100 Tail Spikes",
  isUnlocked("TailSpike3"),
  "TailSpike3"
);
const TailSpikeArray = [1, 10, 100];
const Thunderjolt1 = new Achivement(
  null,
  "Spawn Thunder Jolt",
  isUnlocked("Thunderjolt1"),
  "Thunderjolt1"
);
const Thunderjolt2 = new Achivement(
  null,
  "Spawn 10 Thunder Jolt",
  isUnlocked("Thunderjolt2"),
  "Thunderjolt2"
);
const Thunderjolt3 = new Achivement(
  null,
  "Spawn 100 Thunder Jolts",
  isUnlocked("Thunderjolt3"),
  "Thunderjolt3"
);
const ThunderJoltArray = [1, 10, 100];
// Samus Missile And Chargeshot
const Missile1 = new Achivement(
  "Humble Beginings",
  "Shoot a Missile",
  isUnlocked("Missile1"),
  "Missile1"
);
const Missile2 = new Achivement(
  "Crowd Control",
  "Shoot 500 Missiles",
  isUnlocked("Missile2"),
  "Missile2"
);
const Missile3 = new Achivement(
  "Neutral Dictator",
  "Shoot 5000 Missiles",
  isUnlocked("Missile3"),
  "Missile3"
);
const MissileArray = [1, 500, 5000];
const Chargeshot1 = new Achivement(
  "Lucky Shot",
  "Kill with a Chargeshot",
  isUnlocked("Chargeshot1"),
  "Chargeshot1"
);
const Chargeshot2 = new Achivement(
  "She Dont Miss",
  "Kill With 50 Chargeshots",
  isUnlocked("Chargeshot2"),
  "Chargeshot2"
);
const Chargeshot3 = new Achivement(
  "Bounty Hunter",
  "Kill With 500 Chargeshots",
  isUnlocked("Chargeshot3"),
  "Chargeshot3"
);
const ChargeShotArray = [1, 50, 500];
// Yoshi
const YoshiNair1 = new Achivement(
  "Someone give me a good reason why this is named sex kick",
  "Hit Yoshis Nair 10 Times",
  isUnlocked("YoshiNair1"),
  "YoshiNair1"
);
const YoshiNair2 = new Achivement(
  "Super Armor Lol",
  "Hit Yoshis Nair 100 Times",
  isUnlocked("YoshiNair2"),
  "YoshiNair2"
);
const YoshiNair3 = new Achivement(
  "Wait, Wheres Baby Mario?",
  "Hit Yoshis Nair 1000 Times",
  isUnlocked("YoshiNair3"),
  "YoshiNair3"
);
const YoshiNairArray = [10, 100, 1000];
const YoshiDownSmash1 = new Achivement(
  null,
  "Kill With Yoshi's Downsmash",
  isUnlocked("YoshiDownSmash1"),
  "YoshiDownSmash1"
);
const YoshiDownSmash2 = new Achivement(
  null,
  "Kill With Yoshi's Downsmash 10 Times",
  isUnlocked("YoshiDownSmash2"),
  "YoshiDownSmash2"
);
const YoshiDownSmash3 = new Achivement(
  null,
  "Kill WIth Yoshi's Downsmash 100 Times",
  isUnlocked("YoshiDownSmash3"),
  "YoshiDownSmash3"
);
const YoshiDownSmashArray = [1, 10, 100];
// Jigglypuff
const JigBackair1 = new Achivement(
  null,
  "Hit Backair",
  isUnlocked("JigBackair1"),
  "JigBackair1"
);
const JigBackair2 = new Achivement(
  null,
  "Hit 100 Backairs",
  isUnlocked("JigBackair2"),
  "JigBackair2"
);
const JigBackair3 = new Achivement(
  null,
  "Hit 10000 Backairs",
  isUnlocked("JigBackair3"),
  "JigBackair3"
);
const JigBackAirArray = [1, 100, 10000];
const RestKill1 = new Achivement(
  "Sleepy Time",
  "Kill with Rest",
  isUnlocked("RestKill1"),
  "RestKill1"
);
const RestKill2 = new Achivement(
  null,
  "Kill with 10 Rests",
  isUnlocked("RestKill2"),
  "RestKill2"
);
const RestKill3 = new Achivement(
  "Well Rested",
  "Kill with 100 Rests",
  isUnlocked("RestKill3"),
  "RestKill3"
);
const RestKillArray = [1, 10, 100];
// Mewtwo
const MewtwoSB1 = new Achivement(
  null,
  "Shoot a Shadow Ball",
  isUnlocked("MewtwoSB1"),
  "MewtwoSB1"
);
const MewtwoSB2 = new Achivement(
  null,
  "Shoot 10 Shadow Balls",
  isUnlocked("MewtwoSB2"),
  "MewtwoSB2"
);
const MewtwoSB3 = new Achivement(
  null,
  "Shoot 100 Shadow Balls",
  isUnlocked("MewtwoSB3"),
  "MewtwoSB3"
);
const MewtwoArray = [1, 10, 100];
const MewtwoFair1 = new Achivement(
  null,
  "Kill With Mewtwo Fair",
  isUnlocked("MewtwoFair1"),
  "MewtwoFair1"
);
const MewtwoFair2 = new Achivement(
  null,
  "Kill With Mewtwo Fair 10 Times",
  isUnlocked("MewtwoFair2"),
  "MewtwoFair2"
);
const MewtwoFair3 = new Achivement(
  null,
  "Kill With Mewtwo Fair 100 Times",
  isUnlocked("MewtwoFair3"),
  "MewtwoFair3"
);
// Luigi Wavedash and Misfire
const LuigiSlippery1 = new Achivement(
  "Slippery Boy",
  "Wavedash with Luigi",
  isUnlocked("LuigiSlippery1"),
  "LuigiSlippery1"
);
const LuigiSlippery2 = new Achivement(
  "Slimey Hero",
  "Wavedash 1000 Times",
  isUnlocked("LuigiSlippery2"),
  "LuigiSlippery2"
);
const LuigiSlippery3 = new Achivement(
  "Slip 'n Slide",
  "Wavedash 100000 Times",
  isUnlocked("LuigiSlippery3"),
  "LuigiSlippery3"
);
const LuigiSlipperyArray = [1, 1000, 100000];
const Misfire1 = new Achivement(
  "RNG RNG RNG",
  "Misfire",
  isUnlocked("Misfire1"),
  "Misfire1"
);
const Misfire2 = new Achivement(
  "Decently Lucky",
  "Misfire 10 Times",
  isUnlocked("Misfire2"),
  "Misfire2"
);
const Misfire3 = new Achivement(
  "1 In 7 Trillion",
  "Misfire 1000 Times",
  isUnlocked("Misfire3"),
  "Misfire3"
);
const MisfireArray = [1, 10, 1000];
// Marth Down Air and Grab
const MarthSpike1 = new Achivement(
  "Half Moon",
  "Kill with Marths Spike",
  isUnlocked("MarthSpike1"),
  "MarthSpike1"
);
const MarthSpike2 = new Achivement(
  "The Day is Mine",
  "Kill with Marths Spike 10 Times",
  isUnlocked("MarthSpike2"),
  "MarthSpike2"
);
const MarthSpike3 = new Achivement(
  "This Is My Time To Shine!",
  "Kill With Marths Spike 100 Times",
  isUnlocked("MarthSpike3"),
  "MarthSpike3"
);
const MarthSpikeArray = [1, 10, 100];
const MarthGrab1 = new Achivement(
  "Catch and Release",
  "Sucessfully Grab",
  isUnlocked("MarthGrab1"),
  "MarthGrab1"
);
const MarthGrab2 = new Achivement(
  "Might As Well Be a Tether",
  "Grab 100 Times",
  isUnlocked("MarthGrab2"),
  "MarthGrab2"
);
const MarthGrab3 = new Achivement(
  "Chaingrabbing lol",
  "Grab 1000 Times",
  isUnlocked("MarthGrab3"),
  "MarthGrab3"
);
const MarthGrabArray = [1, 100, 1000];
// Zelda
const ZeldaFair1 = new Achivement(
  "Thunder Thighs",
  "Kill With Fair/Bair",
  isUnlocked("ZeldaFair1"),
  "ZeldaFair1"
);
const ZeldaFair2 = new Achivement(
  "JuSt DoWN B LOL",
  "Kill With Fair/Bair 10 Times",
  isUnlocked("ZeldaFair2"),
  "ZeldaFair2"
);
const ZeldaFair3 = new Achivement(
  "Better Character",
  "Kill With Fair/Bair 100 Times",
  isUnlocked("ZeldaFair3"),
  "ZeldaFair3"
);
const ZeldaFairArray = [1, 10, 100];
const ZeldaFlame1 = new Achivement(
  "Din's Fire",
  "Spawn Din's Fire",
  isUnlocked("ZeldaFlame1"),
  "ZeldaFlame1"
);
const ZeldaFlame2 = new Achivement(
  "Din's Inferno",
  "Spawn Din's Fire 100 Times",
  isUnlocked("ZeldaFlame2"),
  "ZeldaFlame2"
);
const ZeldaFlame3 = new Achivement(
  "Din's Rage",
  "Spawn Din's Fire 10000 Times",
  isUnlocked("ZeldaFlame3"),
  "ZeldaFlame3"
);
const ZeldaFireArray = [1, 100, 10000];
// Young Link
const YinkArrow1 = new Achivement(
  "Trained Archer",
  "Shoot An Arrow",
  isUnlocked("YinkArrow1"),
  "YinkArrow1"
);
const YinkArrow2 = new Achivement(
  "Good-Eye",
  "Shoot 100 Arrows",
  isUnlocked("YinkArrow2"),
  "YinkArrow2"
);
const YinkArrow3 = new Achivement(
  "Eagle-Eye",
  "Shoot 10000 Arrows",
  isUnlocked("YinkArrow3"),
  "YinkArrow3"
);
const YinkArrowArray = [1, 100, 1000];
const YinkDownSmash1 = new Achivement(
  null,
  "Kill With Young Link Down Smash",
  isUnlocked("YinkDownSmash1"),
  "YinkDownSmash1"
);
const YinkDownSmash2 = new Achivement(
  null,
  "Kill With Young Link Down Smash 10 Times",
  isUnlocked("YinkDownSmash2"),
  "YinkDownSmash2"
);
const YinkDownSmash3 = new Achivement(
  null,
  "Kill With Young Link Down Smash 100 Times",
  isUnlocked("YinkDownSmash3"),
  "YinkDownSmash3"
);
const YinkDownSmashArray = [1, 10, 100];
// Falco Lazer and Dair
const FalcoDair1 = new Achivement(
  "Personally...",
  "Hit Falcos Downair",
  isUnlocked("FalcoDair1"),
  "FalcoDair1"
);
const FalcoDair2 = new Achivement(
  "I Prefer the Air",
  "Hit Falcos Dair 100 Times",
  isUnlocked("FalcoDair2"),
  "FalcoDair2"
);
const FalcoDair3 = new Achivement(
  "Best Spike IMO",
  "Hit Falcos Dair 10000 Times",
  isUnlocked("FalcoDair3"),
  "FalcoDair3"
);
const FalcoDairArray = [1, 100, 10000];
const FalcoLaser1 = new Achivement(
  "I LOVE LASERS",
  "Shoot Laser 10 Times",
  isUnlocked("FalcoLaser1"),
  "FalcoLaser1"
);
const FalcoLaser2 = new Achivement(
  "ShieldStun Simulator",
  "Shoot Laser 1000 Times",
  isUnlocked("FalcoLaser2"),
  "FalcoLaser2"
);
const FalcoLaser3 = new Achivement(
  "Well Someone is fun at Partys",
  "Shoot Laser 100000 Times",
  isUnlocked("FalcoLaser3"),
  "FalcoLaser3"
);
const FalcoLaserArray = [10, 1000, 100000];
// Pichu
const PichuTJolt1 = new Achivement(
  "Why Are You Hitting Yourself?",
  "Use Pichus Thunder Jolt",
  isUnlocked("PichuTJolt1"),
  "PichuTJolt1"
);
const PichuTJolt2 = new Achivement(
  "Why Are You Hitting Yourself??",
  "Use Pichus Thunder Jolt 100 Times",
  isUnlocked("PichuTJolt2"),
  "PichuTJolt2"
);
const PichuTJolt3 = new Achivement(
  "Why Are You Hitting Yourself??",
  "Use Pichus Thunder Jolt 10000 Times",
  isUnlocked("PichuTjolt3"),
  "PichuTjolt3"
);
const PichuTJoltArray = [1, 100, 10000];
const PichuBair1 = new Achivement(
  "Why Are You Hitting Yourself????",
  "Kill WIth Pichus Bair",
  isUnlocked("PichuBair1"),
  "PichuBair1"
);
const PichuBair2 = new Achivement(
  "Why Are You Hitting Yourself?????",
  "Kill WIth Pichus Bair 10 Times",
  isUnlocked("PichuBair2"),
  "PichuBair2"
);
const PichuBair3 = new Achivement(
  "Why Are You Hitting Yourself??????",
  "Kill WIth Pichus Bair 100 Times",
  isUnlocked("PichuBair3"),
  "PichuBair3"
);

const PichuBairArray = [1, 10, 100];
// Mr. Game And Watch
const GNWNair1 = new Achivement(
  "He Shoots",
  "Kill with Game And Watch Nair",
  isUnlocked("GNWNair1"),
  "GNWNair1"
);
const GNWNair2 = new Achivement(
  "HE SCORES",
  "Kill with Game And Watch Nair 10 Times",
  isUnlocked("GNWNair2"),
  "GNWNair2"
);
const GNWNair3 = new Achivement(
  "Who even Needs Fun-Canceling?",
  "Kill with Game And Watch Nair 100 Times",
  isUnlocked("GNWNair3"),
  "GNWNair3"
);
const GNWKey1 = new Achivement(
  "Unlock The Win",
  "Kill with Game And Watch Dair",
  isUnlocked("GNWKey1"),
  "GNWKey1"
);
const GNWKey2 = new Achivement(
  null,
  "Kill with Game And Watch Dair 10 Times",
  isUnlocked("GNWKey2"),
  "GNWKey2"
);
const GNWKey3 = new Achivement(
  "Nobody Needs Fun-Canceling",
  "Kill with Game And Watch Dair 100 Times",
  isUnlocked("GNWKey3"),
  "GNWKey3"
);
const GNWKeyArray = [1, 10, 100];
const GNWNairArray = [1, 10, 100];
// Gannondorf
const GannonP1 = new Achivement(
  "Brutal Domination",
  "Kill With Warlock Punch",
  isUnlocked("GannonP1"),
  "GannonP1"
);
const GannonP2 = new Achivement(
  "EZ Clap",
  "Kill With Warlock Punch 10 Times",
  isUnlocked("GannonP2"),
  "GannonP2"
);
const GannonP3 = new Achivement(
  "How do People Keep Falling For It?",
  "Kill With Warlock Punch 100 Times",
  isUnlocked("GannonP3"),
  "GannonP3"
);
const GannonPArray = [1, 10, 100];
const GannonS1 = new Achivement(
  "Any Spikers?",
  "Kill With Gannondorfs Spike",
  isUnlocked("GannonS1"),
  "GannonS1"
);
const GannonS2 = new Achivement(
  "S.W.A.G",
  "Kill with Gannondorfs Spike 10 Times",
  isUnlocked("GannonS2"),
  "GannonS2"
);
const GannonS3 = new Achivement(
  "Gannondorf's Ultimate Power",
  "Kill with Gannondorfs Spike 100 Times",
  isUnlocked("GannonS3"),
  "GannonS3"
);
const GannonSArray = [1, 10, 100];
// Dr. Mario
const DRMPills1 = new Achivement(
  "The Doctor",
  "Spawn A Pill",
  isUnlocked("DRMPills1"),
  "DRMPills1"
);
const DRMPills2 = new Achivement(
  "The Medic",
  "Spawn 100 Pills",
  isUnlocked("DRMPills2"),
  "DRMPills2"
);
const DRMPills3 = new Achivement(
  "The Hero",
  "Spawn 10000 Pills",
  isUnlocked("DRMPills3"),
  "DRMPills3"
);
const DRMPillsArray = [1, 100, 10000];
const DRMFair1 = new Achivement(
  "If only this Spiked...",
  "Kill With Dr.Mario Fair",
  isUnlocked("DRMFair1"),
  "DRMFair1"
);
const DRMFair2 = new Achivement(
  "Mario but Better",
  "Kill With Dr.Mario Fair 10 Times",
  isUnlocked("DRMFair2"),
  "DRMFair2"
);
const DRMFair3 = new Achivement(
  "Any Dockers?",
  "Kill With Dr.Mario Fair 100 Times",
  isUnlocked("DRMFair3"),
  "DRMFair3"
);
const DRMFairArray = [1, 10, 100];
// Achievement End

// code
/**
 * This Function takes in the ach name, an array for values that need to be check, and the integer that should be checked. Not sure if i should return somthing here, i think returning void should work.
 *
 * @param AchName The Achievements name. This is for unlocking the achivement with the eval statement. I he
 * @param ChumpCheck This is an array with the values needed to check against. TODO:Come up with better name lol
 * @param int This is the integer that should be checked against Chump Check. This should be the count like number of games.
 */
const RepDirExist = false;
function AchievementUnlock(AchName: string, ChumpCheck: any[], int): void {
  for (let i = 0; i in ChumpCheck; i++) {
    // console.log("Checking Ach: " + AchName + " Against: " + int);

    if (int > ChumpCheck[i]) {
      eval(AchName + (i + 1)).Ach_Unlocked = true;

      achstore.set(eval(AchName + (i + 1)).Ach_Key, true);
      // console.log("I UNLOCKED: " + AchName);

      continue;
    } else continue;
  }
}

// Todo Learn if anything is wrong with lras, on discord seems to be buggy/broken.
function lras(replay_file) {
  const game = new SlippiGame(replay_file);

  try {
    if (game.getGameEnd().gameEndMethod == 7) {
      const baseReplayValue = basename(replay_file);
      const lrasindex = game.getGameEnd().lrasInitiatorIndex;

      const metadata = game.getMetadata().players[lrasindex];
      if (!metadata) return;

      return {
        str: baseReplayValue,
        plr: metadata,
      };
    } else return;
  } catch (error) {
    console.error("HOW DID YOU FUCK THAT UP");
    console.log(replay_file);
  }
}

function name(gamefile, name) {
  const rep = store.get("Replay_Directory").replace(/\\\\/g, "\\");
  const game = new SlippiGame(join(rep, gamefile));
  const settings = game.getSettings();
  const metadata = game.getMetadata();
  try {
    for (let i = 0; i in settings.players; i++) {
      if (settings.players[i].type != 1 && metadata.players[i].names != null) {
        if (
          metadata.players[i].names.netplay.toLowerCase() ==
          name.toString().toLowerCase()
        )
          return i;
        else continue;
      } else return -1;
    }
  } catch (err) {
    return -1;
  }

  return -1;
}
function charintGet(gamefile, uname) {
  const rep = store.get("Replay_Directory").replace(/\\\\/g, "\\");

  const game = new SlippiGame(join(rep, gamefile));
  const int = game.getSettings().players[name(gamefile, uname)].characterId;

  return int;
}
function CheckMoveKill(gamefile, AttackID, Uname) {
  const rep = store.get("Replay_Directory").replace(/\\\\/g, "\\");
  const game = new SlippiGame(join(rep, gamefile));
  const stats = game.getStats();
  const frames = game.getFrames();
  for (let i = 0; i in stats.conversions; i++) {
    if (stats.conversions[i].didKill == true) {
      if (stats.conversions[i].playerIndex == name(gamefile, Uname)) {
        // console.log(frames[stats.conversions[i].endFrame].players[name(gamefile)].post.lastAttackLanded)
        if (
          frames[stats.conversions[i].endFrame].players[name(gamefile, Uname)]
            .post.lastAttackLanded == AttackID
        )
          return true;
      }
    }
  }
  return false;
}

function CheckMoveKill_Int(gamefile, AttackID, Uname) {
  const rep = store.get("Replay_Directory").replace(/\\\\/g, "\\");
  const game = new SlippiGame(join(rep, gamefile));
  const stats = game.getStats();
  const frames = game.getFrames();
  let count = 0;
  for (let i = 0; i in stats.conversions; i++) {
    if (stats.conversions[i].didKill == true) {
      if (stats.conversions[i].playerIndex == name(gamefile, Uname)) {
        // console.log(frames[stats.conversions[i].endFrame].players[name(gamefile)].post.lastAttackLanded)
        if (
          frames[stats.conversions[i].endFrame].players[name(gamefile, Uname)]
            .post.lastAttackLanded == AttackID
        )
          count += 1;
      }
    }
  }
  return count;
}
/**
 * This function What the last hit was and attaches it to a Attack ID.
 *
 * @param gamefile The File That should be Checked
 * @param ActionID The Action that should be checked.
 */
function CheckActionID(gamefile, ActionID, Uname) {
  let LastFrameCheck = false;
  let count = 0;
  const rep = store.get("Replay_Directory").replace(/\\\\/g, "\\");
  const game = new SlippiGame(join(rep, gamefile));
  const frames = game.getFrames();
  for (let i = 0; i in frames; i++) {
    if (LastFrameCheck == false) {
      if (
        frames[i].players[name(gamefile, Uname)].post.actionStateId == ActionID
      ) {
        LastFrameCheck = true;
        count += 1;
        // console.log(frames[i].players[name(gamefile)].post);
        // console.log("Shine Frame: " + i);}
        continue;
      } else if (
        frames[i].players[name(gamefile, Uname)].post.actionStateId == ActionID
      )
        continue;
      else {
        LastFrameCheck = false;
        continue;
      }
    }
  }
  return count;
}
function ItemIDCheck(gamefile, itemid, Uname) {
  const rep = store.get("Replay_Directory").replace(/\\\\/g, "\\");
  const game = new SlippiGame(join(rep, gamefile));
  const frames = game.getFrames();
  const UniqueItemId = [-1];
  let Count = 0;
  for (let n = 0; n in frames; n++) {
    if (frames[n].items != undefined) {
      for (let i = 0; i in frames[n].items; i++) {
        for (let z = 0; z in UniqueItemId; z++) {
          if (UniqueItemId.includes(frames[n].items[i].spawnId) === false) {
            UniqueItemId.push(frames[n].items[i].spawnId);
            if (
              frames[n].items[i].owner == name(gamefile, Uname) &&
              frames[n].items[i].typeId == itemid
            ) {
              Count += 1;
              continue;
            }
          }
        }
      }
    }
  }
  return Count;
}
/**
 * This function What the last hit was and attaches it to a Attack ID. Skips Frame If Still inside of the ActionStateID.
 *
 * @param gamefile The File That should be Checked
 * @param AttackID The move that should be checked.
 * @param ActionStateID This is the action state id of the move
 */
function CheckLastHit(gamefile, AttackID, ActionStateID, Uname) {
  let LastFrameCheck = false;
  let count = 0;
  const rep = store.get("Replay_Directory").replace(/\\\\/g, "\\");
  const game = new SlippiGame(join(rep, gamefile));
  const frames = game.getFrames();
  for (let i = 0; i in frames; i++) {
    if (LastFrameCheck == false) {
      if (
        frames[i].players[name(gamefile, Uname)].post.lastAttackLanded ==
        AttackID
      ) {
        LastFrameCheck = true;
        count += 1;
        // console.log(frames[i].players[name(gamefile)].post);
        // console.log("Shine Frame: " + i);}
        continue;
      } else if (
        frames[i].players[name(gamefile, Uname)].post.actionStateId ==
        ActionStateID
      )
        continue;
      else {
        LastFrameCheck = false;
        continue;
      }
    }
  }

  return count;
}

const ObjData = {};
/**
 * This function checks if the slp file was processed before
 *
 * @param Slippi_File The Splippi File
 * @param Replay_Directory The Replay Directory
 */
/* Commented out in favor of on demand scans.
function IsProcessed(Slippi_File, Replay_Directory) {
  const File_Path = join(Replay_Directory, Slippi_File);
  if (!ObjData[File_Path].IsProcessed) {
    const KeyPath = ObjData[File_Path];
    const game = new SlippiGame(File_Path),
      Meta = game.getMetadata(),
      Stats = game.getStats(),
      Frames = game.getFrames();
    store.set(`${KeyPath}`, {
      isProcessed: true,
      Meta,
      Stats,
      Frames,
    });
  } else {
    return true;
    // return ObjData.;
  }
}
*/
/**
 * This Function Should Process General Stats.
 *This is whats used to gather general data about SLP files
 */
function checkSlippiFiles(gamefile: string, Uname) {
  // Initilize variables
  const rep = store.get("Replay_Directory").replace(/\\\\/g, "\\");
  const game = new SlippiGame(join(rep, gamefile));
  const game_complete = null;
  const player = name(gamefile, Uname);
  let murder;
  let dam;
  // Process Gamefiles
  if (game.getStats().gameComplete == true) {
    try {
      if (
        game.getMetadata().players != undefined &&
        game.getMetadata().players != null &&
        (name(gamefile, Uname) != -1) == true
      )
        murder = game.getStats().overall[player].killCount;
    } catch (err) {
      console.log("slp general check ran into an error at" + gamefile);
    }

    if (game.getStats().gameComplete == true) {
      try {
        dam = Math.ceil(game.getStats().overall[player].totalDamage);
      } catch (err) {
        // console.log(game.getStats().overall[player]);
      }
    }
    null;
  }
  // return data inside of an object???
  // console.log("SLP stats Parse Is OK!");

  return { stock: murder, dama: dam, comp: game.getStats().gameComplete };
}

function foxParse(gamefile, uname) {
  let shine_Spike = 0;
  let shine = 0;
  shine += CheckActionID(gamefile, 360, uname);
  shine_Spike += CheckMoveKill_Int(gamefile, 21, uname);

  return { Shine: shine, ShineSpike: shine_Spike };
}
function marioParse(gamefile, uname) {
  let Fireball = 0;
  let Fair_Spike = 0;
  Fireball += ItemIDCheck(gamefile, 48, uname);
  Fair_Spike += CheckMoveKill_Int(gamefile, 14, uname);
  return { fb: Fireball, fs: Fair_Spike };
}
function FalconParse(gamefile, uname) {
  let Knee = 0;
  Knee += CheckMoveKill_Int(gamefile, 14, uname);
  return { kn: Knee, fp: CheckLastHit(gamefile, 18, 347, uname) };
}

function SamusParse(gamefile, uname) {
  let Samus_cs = 0;
  let Samus_ms = 0;
  Samus_cs += CheckMoveKill_Int(gamefile, 18, uname);
  Samus_ms += ItemIDCheck(gamefile, 95, uname);
  return { cs: Samus_cs, ms: Samus_ms };
}
function MarthParse(gamefile, uname) {
  let Marth_Spike = 0;
  let Marth_Grab = 0;
  Marth_Spike += CheckMoveKill_Int(gamefile, 17, uname);
  Marth_Grab += CheckActionID(gamefile, 213, uname);
  return { ms: Marth_Spike, mg: Marth_Grab };
}
function JigglypuffParse(gamefile, uname) {
  let JiggBackair = 0;
  let JiggRest = 0;
  JiggBackair += CheckLastHit(gamefile, 15, 67, uname);
  JiggRest += CheckMoveKill_Int(gamefile, 21, uname);
  return { bair: JiggBackair, Rest: JiggRest };
}
function LuigiParse(gamefile, Uname) {
  let WD = 0;
  let Misfire = 0;
  const rep = store.get("Replay_Directory").replace(/\\\\/g, "\\");
  const game = new SlippiGame(join(rep, gamefile));
  WD += game.getStats().actionCounts[name(gamefile, Uname)].wavedashCount;
  Misfire += CheckActionID(gamefile, 348, Uname);
  return { wd: WD, Mis: Misfire };
}
function DonkeyParse(gamefile, uname) {
  let DonkeyPunch = 0;
  let CargoThrow = 0;
  CargoThrow +=
    CheckMoveKill_Int(gamefile, 57, uname) +
    CheckMoveKill_Int(gamefile, 58, uname) +
    CheckMoveKill_Int(gamefile, 5, uname) +
    CheckMoveKill_Int(gamefile, 60, uname);
  DonkeyPunch += CheckMoveKill_Int(gamefile, 18, uname);
  return { DP: DonkeyPunch, CT: CargoThrow };
}
function FalcoParse(gamefile, uname) {
  let FalcoDair = 0;
  let FalcoLaser = 0;
  FalcoDair += CheckMoveKill_Int(gamefile, 17, uname);
  FalcoLaser += ItemIDCheck(gamefile, 55, uname);
  return { FD: FalcoDair, FL: FalcoLaser };
}
function GannonParse(gamefile, uname) {
  let GanSpike = 0;
  let GanPunch = 0;
  GanSpike += CheckMoveKill_Int(gamefile, 17, uname);
  GanPunch += CheckLastHit(gamefile, 18, 347, uname);
  return { GS: GanSpike, GP: GanPunch };
}
function PikachuParse(gamefile, uname) {
  let Tailspike = 0;
  let TJolt = 0;
  Tailspike += CheckMoveKill_Int(gamefile, 18, uname);
  TJolt += ItemIDCheck(gamefile, 89, uname); // There are like 4 diffrent values for what this might be, so i just picked the one i think would be tjolt.
  return { ts: Tailspike, tj: TJolt };
}
function ShiekParse(gamefile, uname) {
  let ShiekNair = 0;
  let ShiekNeedles = 0;
  ShiekNair += CheckMoveKill_Int(gamefile, 13, uname);
  ShiekNeedles += ItemIDCheck(gamefile, 79, uname);
  return { SN: ShiekNair, SNEED: ShiekNeedles };
}
function linkParse(gamefile, uname) {
  let LinkNair = 0;
  let LinkBomb = 0;
  LinkNair += CheckMoveKill_Int(gamefile, 13, uname);
  LinkBomb += ItemIDCheck(gamefile, 58, uname);
  return { LinkN: LinkNair, LinkB: LinkBomb };
}
function PeachParse(gamefile, Uname) {
  let PeachStich = 0;
  const rep = store.get("Replay_Directory").replace(/\\\\/g, "\\");
  let PeachFair = 0;
  PeachFair += CheckMoveKill_Int(gamefile, 14, Uname);
  const game = new SlippiGame(join(rep, gamefile));
  const stats = game.getStats();
  const frames = game.getFrames();
  const hitFireball = 0;
  let UniqueItemId = -1;
  for (let n = 0; n in frames; n++) {
    if (frames[n].items != undefined) {
      for (let i = 0; i in frames[n].items; i++) {
        if (frames[n].items[i].spawnId != UniqueItemId) {
          UniqueItemId = frames[n].items[i].spawnId;
          if (
            frames[n].items[i].owner == name(gamefile, Uname) &&
            frames[n].items[i].typeId == 99 &&
            frames[n].frame[i].turnipFace == 7
          )
            PeachStich += 1;
        }
      }
    }
  }
  return { PF: PeachFair, PS: PeachStich };
}
function YoshiParse(gamefile, uname) {
  let YoshiNair = 0;
  let YoshiDownSmash = 0;
  YoshiNair += CheckLastHit(gamefile, 13, 65, uname);
  YoshiDownSmash += CheckMoveKill_Int(gamefile, 12, uname);
  return { YN: YoshiNair, YDS: YoshiDownSmash };
}
function BowserParse(gamefile, uname) {
  let BowserNair = 0;
  let BowserUpB = 0;
  BowserNair += CheckLastHit(gamefile, 13, 65, uname);
  BowserUpB += CheckLastHit(gamefile, 20, 359, uname);
  return { BN: BowserNair, BUB: BowserUpB };
}
function YoungLinkParse(gamefile, uname) {
  let YounglinkArrow = 0;
  let YounglinkDS = 0;
  YounglinkArrow += ItemIDCheck(gamefile, 65, uname);
  YounglinkDS += CheckMoveKill_Int(gamefile, 12, uname);
  return { YLA: YounglinkArrow, YLDS: YounglinkDS };
}
function KirbyParse(gamefile, uname) {
  let KirbyCide = 0;
  let KirbyNair = 0;
  KirbyCide +=
    CheckMoveKill_Int(gamefile, 53, uname) +
    CheckMoveKill_Int(gamefile, 54, uname);
  KirbyNair += CheckLastHit(gamefile, 13, 65, uname);
  return { KC: KirbyCide, KN: KirbyNair };
}
function ZeldaParse(gamefile, uname) {
  let ZeldaFair = 0;
  let ZeldaFire = 0;
  ZeldaFair += CheckMoveKill_Int(gamefile, 14, uname);
  ZeldaFire += ItemIDCheck(gamefile, 108, uname);
  return { ZF: ZeldaFair, ZFI: ZeldaFire };
}
function GameAndWatchParse(gamefile, uname) {
  let GNWNair = 0;
  let GNWKey = 0;
  GNWNair += CheckMoveKill_Int(gamefile, 13, uname);
  GNWKey += CheckMoveKill_Int(gamefile, 1, uname);
  return { GN: GNWNair, GK: GNWKey };
}
function MewtwoParse(gamefile, uname) {
  let M2Ball = 0;
  let M2Fair = 0;
  M2Ball += ItemIDCheck(gamefile, 112, uname);
  M2Fair += CheckMoveKill_Int(gamefile, 14, uname);
  return { MB: M2Ball, MF: M2Fair };
}
function NessParse(gamefile, uname) {
  let NessUpb = 0;
  let NessDair = 0;
  NessDair += CheckMoveKill_Int(gamefile, 17, uname);
  NessUpb +=
    CheckLastHit(gamefile, 20, 360, uname) +
    CheckLastHit(gamefile, 20, 364, uname);
  return { NUB: NessUpb, ND: NessDair };
}
function PichuParse(gamefile, uname) {
  let PichuTjolt = 0;
  let PichuBair = 0;
  PichuTjolt += ItemIDCheck(gamefile, 91, uname);
  PichuBair += CheckMoveKill_Int(gamefile, 13, uname);
  return { PTJ: PichuTjolt, PB: PichuBair };
}
function DrMParse(gamefile, uname) {
  let DRMPill = 0;
  let DRMFair = 0;
  DRMFair += CheckMoveKill_Int(gamefile, 14, uname);
  DRMPill += ItemIDCheck(gamefile, 49, uname);
  return { DRMF: DRMFair, DRMP: DRMPill };
}
function RoyParse(gamefile, uname) {
  let RoyB = 0;
  let RoyFsmash = 0;
  RoyB += CheckMoveKill_Int(gamefile, 18, uname);
  RoyFsmash += CheckMoveKill_Int(gamefile, 10, uname);
  return { RB: RoyB, RS: RoyFsmash };
}
function IceClimbersParse(gamefile, uname) {
  let ICFS = 0;
  let ICDS = 0;
  ICDS += CheckMoveKill_Int(gamefile, 12, uname);
  ICFS += CheckMoveKill_Int(gamefile, 10, uname);
  return { DS: ICDS, FS: ICFS };
}
// TODO: Load Values From JSON. This is going to be a pain
/*
let FoxShine_Total = 0;
let SS_Total = 0;
let fireball_Total = 0;
let MarSpike_Total = 0;
let FalcKnee_Total = 0;
let FalcPunch_Total = 0;
let DonkeyP_Total = 0;
let CargoThrow_Total = 0;
let LuigiWD_Total = 0;
let Misfire_Total = 0;
let Marth_Spike_Total = 0;
let Marth_Grab_Total = 0;
let JigglyBackair_Total = 0;
let JigglyRest_Total = 0;
let Samus_cs_Total = 0;
let Samus_ms_Total = 0;
let FalcoDair_Total = 0;
let FalcoLaser_Total = 0;
let GannonPunch_Total = 0;
let GannonSpike_Total = 0;
let Tailspike_Total = 0;
let TJolt_Total = 0;
let ShiekNair_Total = 0;
let ShiekNeedles_Total = 0;
let LinkNair_Total = 0;
let LinkBomb_Total = 0;
let PeachFair_Total = 0;
let PeachStitch_Total = 0;
let YoshiNair_Total = 0;
let YoshiDownSmash_Total = 0;
let BowserNair_Total = 0;
let BowserUpB_Total = 0;
let YinkArrow_Total = 0;
let YinkDownSmash_Total = 0;
let KirbyCide_Total = 0;
let KirbyNair_Total = 0;
let ZeldaFair_Total = 0;
let ZeldaFire_Total = 0;
let GNWK_Total = 0;
let GNWN_Total = 0;
let MewtwoShadowBall_Total = 0;
let MewtwoFair_Total = 0;
let NessDair_Total = 0;
let NessUbB_Total = 0;
let PichuBair_Total = 0;
let PichuTjolt_Total = 0;
let DoctorMarioPill_Total = 0;
let DoctorMarioFair_Total = 0;
let RoyFsmash_Total = 0;
let RoyB_Total = 0;
let IceClimbersFS_Total = 0;
let IceClimbersDS_Total = 0;
let stock_count = 0;
let Damage_total = 0;
let Game_Total = 0;
*/
function AddToStore(storename: string, addint: number) {
  datastore.set(storename, datastore.get(storename, 0) + addint);
}
function CheckFileAch(gamefile, uname): void {
  // console.log("Got Request For: " + gamefile);

  if (store.get(gamefile, false) == false) {
    // console.log(gamefile + " Not in the store");
    // console.log(charintGet(gamefile, uname));

    const temp = checkSlippiFiles(gamefile, uname);
    datastore.set("stocks", datastore.get("stocks", 0) + temp.stock);
    switch (charintGet(gamefile, uname)) {
      case 0:
        const Falcon = FalconParse(gamefile, uname);
        AddToStore("Falcon_Punch", Falcon.fp);
        AddToStore("Falcon_Knee", Falcon.kn);
        // console.log("Checking This Char..." + charintGet(gamefile, uname));

        break;
      case 1:
        // console.log("Checking This Char..." + charintGet(gamefile, uname));
        const donkeyK = DonkeyParse(gamefile, uname);
        AddToStore("Donkey_Punch", donkeyK.DP);
        AddToStore("Cargo_Throw", donkeyK.CT);
        break;
      case 2:
        const fox = foxParse(gamefile, uname);
        AddToStore("Shine", fox.Shine);
        AddToStore("Shine_Spike", fox.ShineSpike);
        // console.log("Checking This Char..." + charintGet(gamefile, uname));
        break;
      case 3:
        const GNW = GameAndWatchParse(gamefile, uname);
        AddToStore("GNWK", GNW.GK);
        AddToStore("GNWN", GNW.GN);
        // console.log("Checking This Char..." + charintGet(gamefile, uname));
        break;
      case 4:
        const Kirby = KirbyParse(gamefile, uname);
        AddToStore("Kirbycide", Kirby.KC);
        AddToStore("Kirby_Nair", Kirby.KN);
        // console.log("Checking This Char..." + charintGet(gamefile, uname));
        break;
      case 5:
        const Bowser = BowserParse(gamefile, uname);
        AddToStore("Bowser_Nair", Bowser.BN);
        AddToStore("Bowser_Upb", Bowser.BUB);
        // console.log("Checking This Char..." + charintGet(gamefile, uname));
        break;
      case 6:
        const Link = linkParse(gamefile, uname);
        AddToStore("LinkNair", Link.LinkN);
        AddToStore("LinkBomb", Link.LinkB);
        // console.log("Checking This Char..." + charintGet(gamefile, uname));
        break;
      case 7:
        const Luigi = LuigiParse(gamefile, uname);
        AddToStore("Luigi_Wavedash", Luigi.wd);
        AddToStore("Misfire", Luigi.Mis);
        // console.log("Checking This Char..." + charintGet(gamefile, uname));
        break;
      case 8:
        const Mario = marioParse(gamefile, uname);
        AddToStore("Fireball", Mario.fb);
        AddToStore("Mario_Spike", Mario.fs);
      // console.log("Checking This Char..." + charintGet(gamefile, uname));
      case 9:
        const Marth = MarthParse(gamefile, uname);
        AddToStore("Marth_Grab", Marth.mg);
        AddToStore("Marth_Spike", Marth.ms);
        // console.log("Checking This Char..." + charintGet(gamefile, uname));
        break;
      case 10:
        const Mewtwo = MewtwoParse(gamefile, uname);
        AddToStore("Mewtwo_Fair", Mewtwo.MF);
        AddToStore("Mewtwo_ShadowBall", Mewtwo.MB);
        // console.log("Checking This Char..." + charintGet(gamefile, uname));
        break;
      case 11:
        const Ness = NessParse(gamefile, uname);
        AddToStore("Ness_Dair", Ness.ND);
        AddToStore("Ness_Upb", Ness.NUB);
        // console.log("Checking This Char..." + charintGet(gamefile, uname));
        break;
      case 12:
        const Peach = PeachParse(gamefile, uname);
        AddToStore("Peach_Fair", Peach.PF);
        AddToStore("Peach_Stich", Peach.PS);
        // console.log("Checking This Char..." + charintGet(gamefile, uname));
        break;
      case 13:
        const Pikachu = PikachuParse(gamefile, uname);
        AddToStore("Pikachu_Tjolt", Pikachu.tj);
        AddToStore("Pikachu.Tailspike", Pikachu.ts);
        // console.log("Checking This Char..." + charintGet(gamefile, uname));
        break;
      case 14:
        const Ice_Climbers = IceClimbersParse(gamefile, uname);
        AddToStore("ICDS", Ice_Climbers.DS);
        AddToStore("ICFS", Ice_Climbers.FS);
        // console.log("Checking This Char..." + charintGet(gamefile, uname));
        break;
      case 15:
        const Jigglypuff = JigglypuffParse(gamefile, uname);
        AddToStore("Jigglypuff_Rest", Jigglypuff.Rest);
        AddToStore("Jigglypuff_Bair", Jigglypuff.bair);
        // console.log("Checking This Char..." + charintGet(gamefile, uname));
        break;
      case 16:
        const Samus = SamusParse(gamefile, uname);
        AddToStore("Samus_Chargeshot", Samus.cs);
        AddToStore("Samus_Missile", Samus.ms);
        // console.log("Checking This Char..." + charintGet(gamefile, uname));
        break;
      case 17:
        const Yoshi = YoshiParse(gamefile, uname);
        AddToStore("Yoshi_Downsmash", Yoshi.YDS);
        AddToStore("Yoshi_Nair", Yoshi.YN);
        // console.log("Checking This Char..." + charintGet(gamefile, uname));
        break;
      case 18:
        const Zelda = ZeldaParse(gamefile, uname);
        AddToStore("Zelda_Fair", Zelda.ZF);
        AddToStore("Zelda_Fire", Zelda.ZFI);
        // console.log("Checking This Char..." + charintGet(gamefile, uname));
        break;
      case 19:
        const Shiek = ShiekParse(gamefile, uname);
        AddToStore("Sheik_Needle", Shiek.SNEED);
        AddToStore("Shiek_Nair", Shiek.SN);
        // console.log("Checking This Char..." + charintGet(gamefile, uname));
        break;
      case 20:
        const Falco = FalcoParse(gamefile, uname);
        AddToStore("Falco_Dair", Falco.FD);
        AddToStore("Falco_Laser", Falco.FL);
        // console.log("Checking This Char..." + charintGet(gamefile, uname));
        break;
      case 21:
        const Young_Link = YoungLinkParse(gamefile, uname);
        AddToStore("Yink_Arrow", Young_Link.YLA);
        AddToStore("Yink_Downsmash", Young_Link.YLDS);
        // console.log("Checking This Char..." + charintGet(gamefile, uname));
        break;
      case 22:
        const Dr_Mario = DrMParse(gamefile, uname);
        AddToStore("DRMF", Dr_Mario.DRMF);
        AddToStore("DRMP", Dr_Mario.DRMP);
        // console.log("Checking This Char..." + charintGet(gamefile, uname));
        break;
      case 23:
        const Roy = RoyParse(gamefile, uname);
        AddToStore("Roy_B", Roy.RB);
        AddToStore("Roy_Fsmash", Roy.RS);
        // console.log("Checking This Char..." + charintGet(gamefile, uname));
        break;
      case 24:
        const Pichu = PichuParse(gamefile, uname);
        AddToStore("Pichu_Bair", Pichu.PB);
        AddToStore("Pichu_Tjolt", Pichu.PTJ);
        // console.log("Checking This Char..." + charintGet(gamefile, uname));
        break;
      case 25:
        const Gannnondorf = GannonParse(gamefile, uname);
        AddToStore("Gannon_Punch", Gannnondorf.GP);
        AddToStore("Gannon_Spike", Gannnondorf.GS);
        // console.log("Checking This Char..." + charintGet(gamefile, uname));
        break;
      case 26:
        break;
    }
    if (temp.comp == true) AddToStore("Game_Total", 1);
  }
}
function CheckAch(GamefileArray, uname): void {
  for (let i = 0; i in GamefileArray; i++) {
    const gamefile = GamefileArray[i];
    CheckFileAch(gamefile, uname);
  }
  // Chump Checks Down Here (HAVE FUN :))))
  AchievementUnlock("kill", killCheckArray, datastore.get("stocks", 0));
  AchievementUnlock("Game", GameCheckArray, datastore.get("Game_Total", 0));
  AchievementUnlock("Fire", FireCheckArray, datastore.get("Fireball", 0));
  AchievementUnlock(
    "MarioSpike",
    marSpikeCheckArray,
    datastore.get("Mario_Spike", 0)
  );
  AchievementUnlock("shine", ShineCheckArray, datastore.get("Shine", 0));
  AchievementUnlock(
    "ShineSpike",
    ShineSpikeCheckArray,
    datastore.get("Shine_Spike", 0)
  );
  AchievementUnlock("Knee", KneeCheckArray, datastore.get("Falcon_Punch", 0));
  AchievementUnlock(
    "FalconPunch",
    FalconPunchArray,
    datastore.get("Falcon_Knee", 0)
  );
  AchievementUnlock(
    "CargoThrow",
    CargoThrowArray,
    datastore.get("Cargo_Throw", 0)
  );
  AchievementUnlock("DonkeyP", DonkeyPArray, datastore.get("Donkey_Punch", 0));
  AchievementUnlock("RoyNeutralB", RoyNeutralBArray, datastore.get("Roy_B", 0));
  AchievementUnlock(
    "RoySideSmash",
    RoySideSmashArray,
    datastore.get("Roy_Fsmash", 0)
  );
  AchievementUnlock("Kirbycide", KirbycideArray, datastore.get("Kirbycide", 0));
  AchievementUnlock(
    "KirbyNair",
    KirbyNairArray,
    datastore.get("Kirby_Nair", 0)
  );
  AchievementUnlock(
    "BowserNair",
    BowserNairArray,
    datastore.get("Bowser_Nair", 0)
  );
  AchievementUnlock("BowserUpB", BowserUpBArray, datastore.get("BowserUpB"));
  AchievementUnlock("LinkNair", LinkNairArray, datastore.get("LinkNair", 0));
  AchievementUnlock("LinkBomb", LinkBombArray, datastore.get("LinkBomb", 0));
  AchievementUnlock(
    "ShiekNair",
    ShiekNairArray,
    datastore.get("Sheik_Nair", 0)
  );
  AchievementUnlock(
    "ShiekNeedle",
    ShiekNeedleArray,
    datastore.get("Shiek_Needle", 0)
  );
  AchievementUnlock("NessDair", NessdairArray, datastore.get("Ness_Dair", 0));
  AchievementUnlock("NessUpb", NessUpbArray, datastore.get("Ness_Upb", 0));
  AchievementUnlock(
    "PeachStich",
    PeachStickArray,
    datastore.get("Peach_Stitch", 0)
  );
  AchievementUnlock(
    "PeachFair",
    PeachFairArray,
    datastore.get("Peach_Fair", 0)
  );
  AchievementUnlock(
    "IceClimbersFS",
    IceClimbersFSArray,
    datastore.get("ICFS", 0)
  );
  AchievementUnlock(
    "IceClimbersDS",
    IceClimbersDSArray,
    datastore.get("ICDS", 0)
  );
  AchievementUnlock(
    "TailSpike",
    TailSpikeArray,
    datastore.get("Pikachu_Tailspike", 0)
  );
  AchievementUnlock(
    "Thunderjolt",
    ThunderJoltArray,
    datastore.get("Pikachu_Tjolt", 0)
  );
  AchievementUnlock("Missile", MissileArray, datastore.get("Samus_Missile", 0));
  AchievementUnlock(
    "Chargeshot",
    ChargeShotArray,
    datastore.get("Samus_Chargeshot", 0)
  );
  AchievementUnlock(
    "YoshiNair",
    YoshiNairArray,
    datastore.get("Yoshi_Nair", 0)
  );
  AchievementUnlock(
    "YoshiDownSmash",
    YoshiDownSmashArray,
    datastore.get("Yoshi_Downsmash", 0)
  );
  AchievementUnlock(
    "JigBackair",
    JigBackAirArray,
    datastore.get("Jigglypuff_Bair", 0)
  );
  AchievementUnlock(
    "RestKill",
    RestKillArray,
    datastore.get("Jigglypuff_Rest", 0)
  );
  AchievementUnlock(
    "MewtwoSB",
    MewtwoArray,
    datastore.get("Mewtwo_ShadowBall", 0)
  );
  AchievementUnlock("MewtwoFair", MewtwoArray, datastore.get("Mewtwo_Fair", 0));
  AchievementUnlock(
    "luigiSlippery",
    LuigiSlipperyArray,
    datastore.get("Luigi_Wavedash", 0)
  );
  AchievementUnlock("Misfire", MisfireArray, datastore.get("Misfire", 0));
  AchievementUnlock(
    "MarthSpike",
    MarthSpikeArray,
    datastore.get("Marth_Spike", 0)
  );
  AchievementUnlock(
    "MarthGrab",
    MarthGrabArray,
    datastore.get("Marth_Grab", 0)
  );
  AchievementUnlock(
    "ZeldaFair",
    ZeldaFairArray,
    datastore.get("Zelda_Fair", 0)
  );
  AchievementUnlock(
    "ZeldaFlame",
    ZeldaFireArray,
    datastore.get("Zelda_Fire", 0)
  );
  AchievementUnlock(
    "YinkArrow",
    YinkArrowArray,
    datastore.get("Yink_Arrow", 0)
  );
  AchievementUnlock(
    "YinkDownSmash",
    YinkDownSmashArray,
    datastore.get("Yink_Downsmash", 0)
  );
  AchievementUnlock(
    "FalcoDair",
    FalcoDairArray,
    datastore.get("Falco_Dair", 0)
  );
  AchievementUnlock(
    "FalcoLaser",
    FalcoLaserArray,
    datastore.get("Falco_Laser", 0)
  );
  AchievementUnlock(
    "PichuTJolt",
    PichuTJoltArray,
    datastore.get("Pichu_Tjolt", 0)
  );
  AchievementUnlock(
    "PichuBair",
    PichuBairArray,
    datastore.get("Pichu_Bair", 0)
  );
  AchievementUnlock("GNWNair", GNWNairArray, datastore.get("GNWN", 0));
  AchievementUnlock("GNWKey", GNWKeyArray, datastore.get("GNWK", 0));
  AchievementUnlock("GannonP", GannonPArray, datastore.get("Gannon_Punch", 0));
  AchievementUnlock("GannonS", GannonSArray, datastore.get("Gannon_Spike", 0));
  AchievementUnlock("DRMPills", DRMPillsArray, datastore.get("DRMP", 0));
  AchievementUnlock("DRMFair", DRMFairArray, datastore.get("DRMF", 0));
}

function Thisisstupid(ClassBaseName, ArrrValues, ArrName) {
  for (let num = 1; num in ArrrValues; num++) {
    const ArrName = [];
    ArrName.push[eval(ClassBaseName + num)];
  }
  return ArrName;
}
/*
let FalconArray = [
  FalconPunch1,
  FalconPunch2,
  FalconPunch3,
  Knee1,
  Knee2,
  Knee3,
];
let DonkeyKongArray = [
  DonkeyP1,
  DonkeyP2,
  DonkeyP3,
  CargoThrow1,
  CargoThrow2,
  CargoThrow3,
];
let FoxArray = [shine1, shine2, shine3, ShineSpike1, ShineSpike2, ShineSpike3];
let GNWArray = [GNWKey1, GNWKey2, GNWKey3, GNWNair1, GNWNair2, GNWNair3];
let KirbyArray = [
  KirbyNair1,
  KirbyNair2,
  KirbyNair3,
  Kirbycide1,
  Kirbycide2,
  Kirbycide3,
];
let BowserArray = [
  BowserNair1,
  BowserNair2,
  BowserNair3,
  BowserUpB1,
  BowserUpB2,
  BowserUpB3,
];
let LinkArray = [
  LinkBomb1,
  LinkBomb2,
  LinkBomb3,
  LinkNair1,
  LinkNair2,
  LinkNair3,
];
let LuigiArray = [
  LuigiSlippery1,
  LuigiSlippery2,
  LuigiSlippery3,
  Misfire1,
  Misfire2,
  Misfire3,
];
let MarioArray = [MarioSpike1, MarioSpike2, MarioSpike3, Fire1, Fire2, Fire3];
let MarthArray = [
  MarthGrab1,
  MarthGrab2,
  MarthGrab3,
  MarthSpike1,
  MarthSpike2,
  MarthSpike3,
];
let MewtwoAArray = [
  MewtwoFair1,
  MewtwoFair2,
  MewtwoFair3,
  MewtwoSB1,
  MewtwoSB2,
  MewtwoSB3,
];
let NessArray = [NessDair1, NessDair2, NessDair3, NessUpb1, NessUpb2, NessUpb3];
let PeachArray = [
  PeachFair1,
  PeachFair2,
  PeachFair3,
  PeachStich1,
  PeachStich2,
  PeachStich3,
];
let PikachuArray = [
  TailSpike1,
  TailSpike2,
  TailSpike3,
  Thunderjolt1,
  Thunderjolt2,
  Thunderjolt3,
];
let IceClimbersArray = [
  IceClimbersFS1,
  IceClimbersFS2,
  IceClimbersFS3,
  IceClimbersDS1,
  IceClimbersDS2,
  IceClimbersDS3,
];
let JigglypuffArray = [
  JigBackaiir1,
  JigBackaiir2,
  JigBackaiir3,
  RestKill1,
  RestKill2,
  RestKill3,
];
let SamusArray = [
  Missile1,
  Missile2,
  Missile3,
  Chargeshot1,
  Chargeshot2,
  Chargeshot3,
];
let YoshiArray = [
  YoshiNair1,
  YoshiNair2,
  YoshiNair3,
  YoshiDownSmash1,
  YoshiDownSmash2,
  YoshiDownSmash3,
];
let ZeldaArray = [
  ZeldaFair1,
  ZeldaFair2,
  ZeldaFair3,
  ZeldaFlame1,
  ZeldaFlame2,
  ZeldaFlame3,
];
let ShiekArray = [
  ShiekNair1,
  ShiekNair2,
  ShiekNair3,
  ShiekNeedle1,
  ShiekNeedle2,
  ShiekNeedle3,
];
let FalcoArray = [
  FalcoDair1,
  FalcoDair2,
  FalcoDair3,
  FalcoLaser1,
  FalcoLaser2,
  FalcoLaser3,
];
let YoungLinkArray = [
  YinkArrow1,
  YinkArrow2,
  YinkArrow3,
  YinkDownSmash1,
  YinkDownSmash2,
  YinkDownSmash3,
];
let DrMarioArray = [
  DRMFair1,
  DRMFair2,
  DRMFair3,
  DRMPills1,
  DRMPills2,
  DRMPills3,
];
let RoyArray = [
  RoyNeutralB1,
  RoyNeutralB2,
  RoyNeutralB3,
  RoySideSmash1,
  RoySideSmash2,
  RoySideSmash3,
];
let PichuArray = [
  PichuTJolt1,
  PichuTJolt2,
  PichuTJolt3,
  PichuBair1,
  PichuBair2,
  PichuBair3,
];
let GannondorfArray = [
  GannonP1,
  GannonP2,
  GannonP3,
  GannonS1,
  GannonS2,
  GannonS3,
];
let GeneralAchArray = [
  kill1,
  kill2,
  kill3,
  kill4,
  kill5,
  kill6,
  kill7,
  kill8,
  kill9,
  kill10,
  Game1,
  Game2,
  Game3,
  Game4,
  Game5,
  Game6,
  Game7,
  Game8,
  Game9,
  Game10,
];
let MiscAchArray = [AATW, Specialist];
*/

electron.ipcMain.handle("GetAch", (event, args) => {
  const kill1 = new Achivement(
    "Monster Hunter",
    "You have taken a stock,",
    isUnlocked("kill1"),
    "kill1"
  );
  const kill2 = new Achivement(
    "Monster Slayer",
    "Take 10 Stocks",
    isUnlocked("kill2"),
    "kill2"
  );
  const kill3 = new Achivement(
    "You're The Monstor",
    "Take 100 Stocks",
    isUnlocked("kill3"),
    "kill3"
  );
  const kill4 = new Achivement(
    "Cold Blooded Killer",
    "Take 1000 Stocks,",
    isUnlocked("kill4"),
    "kill4"
  );
  const kill5 = new Achivement(
    "Murderer",
    "Take 2500 Stocks",
    isUnlocked("kill5"),
    "kill5"
  );
  const kill6 = new Achivement(
    "True Crime",
    "Take 5000 Stocks",
    isUnlocked("kill6"),
    "kill6"
  );
  const kill7 = new Achivement(
    "Un-Lawful",
    "Take 10000 Stocks",
    isUnlocked("kill7"),
    "kill7"
  );
  const kill8 = new Achivement(
    "King Slayer",
    "Take 25000 Stocks",
    isUnlocked("kill8"),
    "kill8"
  );
  const kill9 = new Achivement(
    "Demi-God Slayer",
    "Take 50000 Stocks",
    isUnlocked("kill9"),
    "kill9"
  );
  const kill10 = new Achivement(
    "God Slayer",
    "Take 1000000 Stocks",
    isUnlocked("kill10"),
    "kill10"
  );
  const killCheckArray = [
    1,
    10,
    100,
    1000,
    2500,
    5000,
    10000,
    25000,
    50000,
    1000000,
  ];
  // Game count Achievements
  const Game1 = new Achivement(
    "Everyone starts somwhere",
    "Play 1 Game",
    isUnlocked("Game1"),
    "Game1"
  );
  const Game2 = new Achivement(
    "Rookie Numbers",
    "Play 10 Games",
    isUnlocked("Game2"),
    "Game2"
  );
  const Game3 = new Achivement(
    "Slowly Learning",
    "Play 50 Games",
    isUnlocked("Game3"),
    "Game3"
  );
  const Game4 = new Achivement(
    "Getting Better",
    "Play 100 Games",
    isUnlocked("Game4"),
    "Game4"
  );
  const Game5 = new Achivement(
    "Developing New Strats",
    "Play 250 Games",
    isUnlocked("Game5"),
    "Game5"
  );
  const Game6 = new Achivement(
    "Hot Shot",
    "Play 500 Games",
    isUnlocked("Game6"),
    "Game6"
  );
  const Game7 = new Achivement(
    "Hard Work",
    "Play 1000 Games",
    isUnlocked("Game7"),
    "Game7"
  );
  const Game8 = new Achivement(
    "Serious Time",
    "Play 2500 Games",
    isUnlocked("Game8"),
    "Game8"
  );
  const Game9 = new Achivement(
    "Incredible",
    "Play 5000 Games",
    isUnlocked("Game9"),
    "Game9"
  );
  const Game10 = new Achivement(
    "Serious Dedication",
    "Play 10000 Games",
    isUnlocked("Game10"),
    "Game10"
  );
  const GameCheckArray = [1, 10, 50, 100, 250, 500, 1000, 2500, 5000, 10000];
  // Misc Achievements
  const AATW = new Achivement(
    "All Around The World",
    "Play on every stage",
    false,
    "AATW"
  );
  const Specialist = new Achivement(
    "Character Specialist",
    "Play as every character",
    false,
    "Specialist"
  );
  // Character Specific Achivements
  // Mario
  const Fire1 = new Achivement(
    "Now You're Playing With Super Power!",
    "Shoot a Fireball",
    isUnlocked("Fire1"),
    "Fire1"
  );
  const Fire2 = new Achivement(
    "Fire Mario",
    "Shoot 1000 Fireballs",
    isUnlocked("Fire2"),
    "Fire2"
  );
  const Fire3 = new Achivement(
    "Super Mario",
    "Shoot 100000 Fireballs",
    isUnlocked("Fire3"),
    "Fire3"
  );
  const FireCheckArray = [1, 1000, 100000];
  const MarioSpike1 = new Achivement(
    "Nice Spike",
    "Kill With Mario Spike Once",
    isUnlocked("MarioSpike1"),
    "MarioSpike1"
  );
  const MarioSpike2 = new Achivement(
    "Fixing Pipes",
    "Spike 10 Times",
    isUnlocked("MarioSpike2"),
    "MarioSpike2"
  ); // null Achivement_Name
  const MarioSpike3 = new Achivement(
    "The Ultimate Mario",
    "Spike 100 Time",
    isUnlocked("MarioSpike3"),
    "MarioSpike3"
  );
  const marSpikeCheckArray = [1, 10, 100];
  // Fox
  const shine1 = new Achivement(
    "Baby Steps",
    "Perform the shine",
    isUnlocked("shine1"),
    "shine1"
  );
  const shine2 = new Achivement(
    "Best Move",
    "Shine 1000 Times",
    isUnlocked("shine2"),
    "shine2"
  ); // null Achievement Name
  const shine3 = new Achivement(
    "Shined Blind",
    "Perform The Shine 100000 Times",
    isUnlocked("shine3"),
    "shine3"
  );
  const ShineCheckArray = [1, 1000, 100000];
  const ShineSpike1 = new Achivement(
    "So that kills huh",
    "Kill with the shine",
    isUnlocked("ShineSpike1"),
    "ShineSpike1"
  );
  const ShineSpike2 = new Achivement(
    "Professinal Gimp",
    "Shine Spike 10 Times",
    isUnlocked("ShineSpike2"),
    "ShineSpike2"
  );
  const ShineSpike3 = new Achivement(
    "Shined Out of Your Mind",
    "Shine Spike 100 Times",
    isUnlocked("ShineSpike3"),
    "ShineSpike3"
  );
  const ShineSpikeCheckArray = [1, 10, 100];
  // Captin Falcon
  const Knee1 = new Achivement(
    "Knee'd lol",
    "Kill With A Knee",
    isUnlocked("Knee1"),
    "Knee1"
  );
  const Knee2 = new Achivement(
    "Justice",
    "Kill With 50 Knees",
    isUnlocked("Knee2"),
    "Knee2"
  );
  const Knee3 = new Achivement(
    "Falcons Glory",
    "Kill With Knee 100 Times",
    isUnlocked("Knee3"),
    "Knee3"
  );
  const KneeCheckArray = [1, 50, 100];
  const FalconPunch1 = new Achivement(
    "Did he just walk up forward, And Falcon Punch?",
    "Hit a Falcon Punch",
    isUnlocked("FalconPunch1"),
    "FalconPunch1"
  );
  const FalconPunch2 = new Achivement(
    "I can't believe that worked",
    "Hit Falcon Punch 10 Times",
    isUnlocked("FalconPunch2"),
    "FalconPunch2"
  );
  const FalconPunch3 = new Achivement(
    "Theres no way...",
    "Hit Falcon Punch 50 Times",
    isUnlocked("FalconPunch3"),
    "FalconPunch3"
  );
  const FalconPunchArray = [1, 10, 50];
  // Donkey Kong
  const CargoThrow1 = new Achivement(
    "Carrier Monkey",
    "Kill with Cargo Throw",
    isUnlocked("CargoThrow1"),
    "CargoThrow1"
  );
  const CargoThrow2 = new Achivement(
    "Ding-Dong",
    "Kill with Cargo Throw 10 Times",
    isUnlocked("CargoThrow2"),
    "CargoThrow2"
  );
  const CargoThrow3 = new Achivement(
    "The Game Was Rigged From The Start...",
    "Kill with Cargo Throw 100 Times",
    isUnlocked("CargoThrow3"),
    "CargoThrow3"
  );
  const CargoThrowArray = [1, 10, 100];
  const DonkeyP1 = new Achivement(
    "DONK PUNCH",
    "Kill with Donkey Punch",
    isUnlocked("DonkeyP1"),
    "DonkeyP1"
  );
  const DonkeyP2 = new Achivement(
    "You Ain't No Air Fighter",
    "Kill with Donkey Punch 10 Times",
    isUnlocked("DonkeyP2"),
    "DonkeyP2"
  );
  const DonkeyP3 = new Achivement(
    "One Punch Man",
    "Kill with Donkey Punch 100 Times",
    isUnlocked("DonkeyP3"),
    "DonkeyP3"
  );
  const DonkeyPArray = [1, 10, 100];
  // Roy
  const RoyNeutralB1 = new Achivement(
    "Probably the only move that kills",
    "Kill with Roys Neutral B",
    isUnlocked("RoyNeutralB1"),
    "RoyNeutralB1"
  );
  const RoyNeutralB2 = new Achivement(
    null,
    "Kill with Roys Neutral B 10 Times",
    isUnlocked("RoyNeutralB2"),
    "RoyNeutralB2"
  );
  const RoyNeutralB3 = new Achivement(
    "Dont Test Me...",
    "Kill with Roys Neutral B 100 Times",
    isUnlocked("RoyNeutralB3"),
    "RoyNeutralB3"
  );
  const RoyNeutralBArray = [1, 10, 100];
  const RoySideSmash1 = new Achivement(
    null,
    "Kill With Roys Side Smash",
    isUnlocked("RoySideSmash1"),
    "RoySideSmash1"
  );
  const RoySideSmash2 = new Achivement(
    null,
    "Kill With Roys Side Smash 10 Times",
    isUnlocked("RoySideSmash2"),
    "RoySideSmash2"
  );
  const RoySideSmash3 = new Achivement(
    null,
    "Kill With Roys Side Smash 100 Times",
    isUnlocked("RoySideSmash3"),
    "RoySideSmash3"
  );
  const RoySideSmashArray = [1, 10, 100];
  // Kirby
  const Kirbycide1 = new Achivement(
    "If i Die...",
    "Kill With Kirby Back/Forward Throw",
    isUnlocked("Kirbycide1"),
    "Kirbycide1"
  );
  const Kirbycide2 = new Achivement(
    "You go With Me.",
    "Kill With Kirby Back/Forward Throw 10 Times",
    isUnlocked("Kirbycide2"),
    "Kirbycide2"
  );
  const Kirbycide3 = new Achivement(
    "Martyrdom",
    "Kill With Kirby Back/Forward Throw 100 Times",
    isUnlocked("Kirbycide3"),
    "Kirbycide3"
  );

  const KirbyNair1 = new Achivement(
    "You spin me right round",
    "Hit Kirbys Nair",
    isUnlocked("KirbyNair1"),
    "KirbyNair1"
  );
  const KirbyNair2 = new Achivement(
    "i feel sorry for kirby mains",
    "Hit Kirbys Nair 10 Times",
    isUnlocked("KirbyNair2"),
    "KirbyNair2"
  );
  const KirbyNair3 = new Achivement(
    "Remember to put somthing here",
    "Hit Kirbys Nair 100 Times",
    isUnlocked("KirbyNair3"),
    "KirbyNair3"
  );
  const KirbycideArray = [1, 10, 100];
  const KirbyNairArray = [1, 10, 100];
  // Bowser
  const BowserNair1 = new Achivement(
    "What does he even do lol",
    "Hit With Bowsers Nair",
    isUnlocked("BowserNair1"),
    "BowserNair1"
  );
  const BowserNair2 = new Achivement(
    "Can Bowser Reaction Techchase?",
    "Hit Bowsers Nair 10 Times",
    isUnlocked("BowserNair2"),
    "BowserNair2"
  );
  const BowserNair3 = new Achivement(
    "Is anyone even gonna read this lol?",
    "Hit Bowsers Nair 100 Times",
    isUnlocked("BowserNair3"),
    "BowserNair3"
  );
  const BowserNairArray = [1, 10, 100];
  const BowserUpB1 = new Achivement(
    "Rolling Fortress",
    "Hit Bowsers UpB",
    isUnlocked("BowserUpB1"),
    "BowserUpB1"
  );
  const BowserUpB2 = new Achivement(
    "Flying Castle",
    "Hit Bowsers Upb 10 Times",
    isUnlocked("BowserUpB2"),
    "BowserUpB2"
  );
  const BowserUpB3 = new Achivement(
    "Must Be Dizzy",
    "Hit Bowsers Up-b 100 Times",
    isUnlocked("BowserUpB3"),
    "BowserUpB3"
  );
  const BowserUpBArray = [1, 10, 100];
  // Link
  const LinkNair1 = new Achivement(
    "Jankiest move in the game",
    "Kill With Nair once",
    isUnlocked("LinkNair1"),
    "LinkNair1"
  );
  const LinkNair2 = new Achivement(
    null,
    "Kill with Nair 10 Times",
    isUnlocked("LinkNair2"),
    "LinkNair2"
  );
  const LinkNair3 = new Achivement(
    "",
    "Kill with Nair 100 Times",
    isUnlocked("LinkNair3"),
    "LinkNair3"
  );
  const LinkNairArray = [1, 10, 100];
  const LinkBomb1 = new Achivement(
    null,
    "Spawn a bomb",
    isUnlocked("LinkBomb1"),
    "LinkBomb1"
  );
  const LinkBomb2 = new Achivement(
    null,
    "Spawn a bomb 100 Times",
    isUnlocked("LinkBomb2"),
    "LinkBomb2"
  );
  const LinkBomb3 = new Achivement(
    null,
    "Spawn a bomb 10000 Times",
    isUnlocked("LinkBomb3"),
    "LinkBomb3"
  );
  const LinkBombArray = [1, 100, 10000];

  // Shiek Nair And Neddle
  const ShiekNair1 = new Achivement(
    "Why is this called a Sex Kick?",
    "Kill With Nair Once",
    isUnlocked("ShiekNair1"),
    "ShiekNair1"
  );
  const ShiekNair2 = new Achivement(
    "Free Edgeguards",
    "Kill With Nair 10 Times",
    isUnlocked("ShiekNair2"),
    "ShiekNair2"
  );
  const ShiekNair3 = new Achivement(
    "Fastfallers Nightmare",
    "Kill With Nair 100 Times",
    isUnlocked("ShiekNair3"),
    "ShiekNair3"
  );
  const ShiekNairArray = [1, 10, 100];
  const ShiekNeedle1 = new Achivement(
    "Little Flys",
    "Shoot 50 Needles",
    isUnlocked("ShiekNeedle1"),
    "ShiekNeedle1"
  );
  const ShiekNeedle2 = new Achivement(
    "Dedicated Bees",
    "Shoot 500 Needles",
    isUnlocked("ShiekNeedle2"),
    "ShiekNeedle2"
  );
  const ShiekNeedle3 = new Achivement(
    "Angry Wasps",
    "Shoot 50000 Needles",
    isUnlocked("ShiekNeedle3"),
    "ShiekNeedle3"
  );
  const ShiekNeedleArray = [50, 500, 50000];
  // Ness
  const NessDair1 = new Achivement(
    "Spiked",
    "Kill with Ness Dair",
    isUnlocked("NessDair1"),
    "NessDair1"
  );
  const NessDair2 = new Achivement(
    null,
    "Kill with Ness Dair 10 Times",
    isUnlocked("NessDair2"),
    "NessDair2"
  );
  const NessDair3 = new Achivement(
    "Destroyed by a Child",
    "Kill with Ness Dair 100 Times",
    isUnlocked("NessDair3"),
    "NessDair3"
  );
  const NessdairArray = [1, 10, 100];
  const NessUpb1 = new Achivement(
    "Shock Jacket",
    "Hit Ness's Up-B While Recovering",
    isUnlocked("NessUpb1"),
    "NessUpb1"
  );
  const NessUpb2 = new Achivement(
    "Can't Edgeguard Me",
    "Hit Ness's Up-B While Recovering 10 Times",
    isUnlocked("NessUpb2"),
    "NessUpb2"
  );
  const NessUpb3 = new Achivement(
    "Mistake or Yo-Yo Glitch?",
    "Hit Ness's Up-B While Recovering 100 Times",
    isUnlocked("NessUpb3"),
    "NessUpb3"
  );
  const NessUpbArray = [1, 10, 100];
  // Peach
  const PeachStich1 = new Achivement(
    "Lucky Number 7",
    "Pull A Stich Face Turnip",
    isUnlocked("PeachStitch1"),
    "PeachStitch1"
  );
  const PeachStich2 = new Achivement(
    "Slot Machine",
    "Pull A Stich Face Turnip 10 Times",
    isUnlocked("PeachStitch2"),
    "PeachStitch2"
  );
  const PeachStich3 = new Achivement(
    "Casino Simulator",
    "Pull A Stich Face Turnip 100 Times",
    isUnlocked("PeachStitch3"),
    "PeachStitch3"
  );
  const PeachStickArray = [1, 10, 100];
  const PeachFair1 = new Achivement(
    "Fierce Fighter",
    "Kill With Fair",
    isUnlocked("PeachFair1"),
    "PeachFair1"
  );
  const PeachFair2 = new Achivement(
    "Fair and Balanced",
    "Kill With Fair 10 Times",
    isUnlocked("PeachFair2"),
    "PeachFair2"
  );
  const PeachFair3 = new Achivement(
    "Vegatable God",
    "Kill With Fair 100 Times",
    isUnlocked("PeachFair3"),
    "PeachFair3"
  );
  const PeachFairArray = [1, 10, 100];
  // Ice Climbers??? Dont even know how i would start with this one lol. TODO: Figure out frame Parsing for IC.
  const IceClimbersFS1 = new Achivement(
    "Ice Cold",
    "Kill With Ice Climbers Forward Smash",
    isUnlocked("IceClimbersFS1"),
    "IceClimbersFS1"
  );
  const IceClimbersFS2 = new Achivement(
    "Cooled Killers",
    "Kill With Ice Climbers Forward Smash 10 Times",
    isUnlocked("IceClimbersFS2"),
    "IceClimbersFS2"
  );
  const IceClimbersFS3 = new Achivement(
    "On Fire",
    "Kill With Ice Climbers Forward Smash 100 Times",
    isUnlocked("IceClimbersFS3"),
    "IceClimbersFS3"
  );
  const IceClimbersFSArray = [1, 10, 100];
  const IceClimbersDS1 = new Achivement(
    "Icy Vengance",
    "Kill With Ice Climbers Down Smash",
    isUnlocked("IceClimbersDS1"),
    "IceClimbersDS1"
  );
  const IceClimbersDS2 = new Achivement(
    "Cool Cat",
    "Kill With Ice Climbers Down Smash 10 Times",
    isUnlocked("IceClimbersDS2"),
    "IceClimbersDS2"
  );
  const IceClimbersDS3 = new Achivement(
    "Hot Shot",
    "Kill With Ice Climbers Down Smash 100 Times",
    isUnlocked("IceClimbersDS3"),
    "IceClimbersDS3"
  );
  const IceClimbersDSArray = [1, 10, 100];
  // Pikachu Tail Spike And
  const TailSpike1 = new Achivement(
    "Nice gimp",
    "Land a Tail Spike",
    isUnlocked("TailSpike1"),
    "TailSpike1"
  );
  const TailSpike2 = new Achivement(
    "The Cute Killer",
    "Land 10 Tail Spikes",
    isUnlocked("TailSpike2"),
    "TailSpike2"
  );
  const TailSpike3 = new Achivement(
    "The Rat",
    "Land 100 Tail Spikes",
    isUnlocked("TailSpike3"),
    "TailSpike3"
  );
  const TailSpikeArray = [1, 10, 100];
  const Thunderjolt1 = new Achivement(
    null,
    "Spawn Thunder Jolt",
    isUnlocked("Thunderjolt1"),
    "Thunderjolt1"
  );
  const Thunderjolt2 = new Achivement(
    null,
    "Spawn 10 Thunder Jolt",
    isUnlocked("Thunderjolt2"),
    "Thunderjolt2"
  );
  const Thunderjolt3 = new Achivement(
    null,
    "Spawn 100 Thunder Jolts",
    isUnlocked("Thunderjolt3"),
    "Thunderjolt3"
  );
  const ThunderJoltArray = [1, 10, 100];
  // Samus Missile And Chargeshot
  const Missile1 = new Achivement(
    "Humble Beginings",
    "Shoot a Missile",
    isUnlocked("Missile1"),
    "Missile1"
  );
  const Missile2 = new Achivement(
    "Crowd Control",
    "Shoot 500 Missiles",
    isUnlocked("Missile2"),
    "Missile2"
  );
  const Missile3 = new Achivement(
    "Neutral Dictator",
    "Shoot 5000 Missiles",
    isUnlocked("Missile3"),
    "Missile3"
  );
  const MissileArray = [1, 500, 5000];
  const Chargeshot1 = new Achivement(
    "Lucky Shot",
    "Kill with a Chargeshot",
    isUnlocked("Chargeshot1"),
    "Chargeshot1"
  );
  const Chargeshot2 = new Achivement(
    "She Dont Miss",
    "Kill With 50 Chargeshots",
    isUnlocked("Chargeshot2"),
    "Chargeshot2"
  );
  const Chargeshot3 = new Achivement(
    "Bounty Hunter",
    "Kill With 500 Chargeshots",
    isUnlocked("Chargeshot3"),
    "Chargeshot3"
  );
  const ChargeShotArray = [1, 50, 500];
  // Yoshi
  const YoshiNair1 = new Achivement(
    "Someone give me a good reason why this is named sex kick",
    "Hit Yoshis Nair 10 Times",
    isUnlocked("YoshiNair1"),
    "YoshiNair1"
  );
  const YoshiNair2 = new Achivement(
    "Super Armor Lol",
    "Hit Yoshis Nair 100 Times",
    isUnlocked("YoshiNair2"),
    "YoshiNair2"
  );
  const YoshiNair3 = new Achivement(
    "Wait, Wheres Baby Mario?",
    "Hit Yoshis Nair 1000 Times",
    isUnlocked("YoshiNair3"),
    "YoshiNair3"
  );
  const YoshiNairArray = [10, 100, 1000];
  const YoshiDownSmash1 = new Achivement(
    null,
    "Kill With Yoshi's Downsmash",
    isUnlocked("YoshiDownSmash1"),
    "YoshiDownSmash1"
  );
  const YoshiDownSmash2 = new Achivement(
    null,
    "Kill With Yoshi's Downsmash 10 Times",
    isUnlocked("YoshiDownSmash2"),
    "YoshiDownSmash2"
  );
  const YoshiDownSmash3 = new Achivement(
    null,
    "Kill WIth Yoshi's Downsmash 100 Times",
    isUnlocked("YoshiDownSmash3"),
    "YoshiDownSmash3"
  );
  const YoshiDownSmashArray = [1, 10, 100];
  // Jigglypuff
  const JigBackair1 = new Achivement(
    null,
    "Hit Backair",
    isUnlocked("JigBackair1"),
    "JigBackair1"
  );
  const JigBackair2 = new Achivement(
    null,
    "Hit 100 Backairs",
    isUnlocked("JigBackair2"),
    "JigBackair2"
  );
  const JigBackair3 = new Achivement(
    null,
    "Hit 10000 Backairs",
    isUnlocked("JigBackair3"),
    "JigBackair3"
  );
  const JigBackAirArray = [1, 100, 10000];
  const RestKill1 = new Achivement(
    "Sleepy Time",
    "Kill with Rest",
    isUnlocked("RestKill1"),
    "RestKill1"
  );
  const RestKill2 = new Achivement(
    null,
    "Kill with 10 Rests",
    isUnlocked("RestKill2"),
    "RestKill2"
  );
  const RestKill3 = new Achivement(
    "Well Rested",
    "Kill with 100 Rests",
    isUnlocked("RestKill3"),
    "RestKill3"
  );
  const RestKillArray = [1, 10, 100];
  // Mewtwo
  const MewtwoSB1 = new Achivement(
    null,
    "Shoot a Shadow Ball",
    isUnlocked("MewtwoSB1"),
    "MewtwoSB1"
  );
  const MewtwoSB2 = new Achivement(
    null,
    "Shoot 10 Shadow Balls",
    isUnlocked("MewtwoSB2"),
    "MewtwoSB2"
  );
  const MewtwoSB3 = new Achivement(
    null,
    "Shoot 100 Shadow Balls",
    isUnlocked("MewtwoSB3"),
    "MewtwoSB3"
  );
  const MewtwoArray = [1, 10, 100];
  const MewtwoFair1 = new Achivement(
    null,
    "Kill With Mewtwo Fair",
    isUnlocked("MewtwoFair1"),
    "MewtwoFair1"
  );
  const MewtwoFair2 = new Achivement(
    null,
    "Kill With Mewtwo Fair 10 Times",
    isUnlocked("MewtwoFair2"),
    "MewtwoFair2"
  );
  const MewtwoFair3 = new Achivement(
    null,
    "Kill With Mewtwo Fair 100 Times",
    isUnlocked("MewtwoFair3"),
    "MewtwoFair3"
  );
  // Luigi Wavedash and Misfire
  const LuigiSlippery1 = new Achivement(
    "Slippery Boy",
    "Wavedash with Luigi",
    isUnlocked("LuigiSlippery1"),
    "LuigiSlippery1"
  );
  const LuigiSlippery2 = new Achivement(
    "Slimey Hero",
    "Wavedash 1000 Times",
    isUnlocked("LuigiSlippery2"),
    "LuigiSlippery2"
  );
  const LuigiSlippery3 = new Achivement(
    "Slip 'n Slide",
    "Wavedash 100000 Times",
    isUnlocked("LuigiSlippery3"),
    "LuigiSlippery3"
  );
  const LuigiSlipperyArray = [1, 1000, 100000];
  const Misfire1 = new Achivement(
    "RNG RNG RNG",
    "Misfire",
    isUnlocked("Misfire1"),
    "Misfire1"
  );
  const Misfire2 = new Achivement(
    "Decently Lucky",
    "Misfire 10 Times",
    isUnlocked("Misfire2"),
    "Misfire2"
  );
  const Misfire3 = new Achivement(
    "1 In 7 Trillion",
    "Misfire 1000 Times",
    isUnlocked("Misfire3"),
    "Misfire3"
  );
  const MisfireArray = [1, 10, 1000];
  // Marth Down Air and Grab
  const MarthSpike1 = new Achivement(
    "Half Moon",
    "Kill with Marths Spike",
    isUnlocked("MarthSpike1"),
    "MarthSpike1"
  );
  const MarthSpike2 = new Achivement(
    "The Day is Mine",
    "Kill with Marths Spike 10 Times",
    isUnlocked("MarthSpike2"),
    "MarthSpike2"
  );
  const MarthSpike3 = new Achivement(
    "This Is My Time To Shine!",
    "Kill With Marths Spike 100 Times",
    isUnlocked("MarthSpike3"),
    "MarthSpike3"
  );
  const MarthSpikeArray = [1, 10, 100];
  const MarthGrab1 = new Achivement(
    "Catch and Release",
    "Sucessfully Grab",
    isUnlocked("MarthGrab1"),
    "MarthGrab1"
  );
  const MarthGrab2 = new Achivement(
    "Might As Well Be a Tether",
    "Grab 100 Times",
    isUnlocked("MarthGrab2"),
    "MarthGrab2"
  );
  const MarthGrab3 = new Achivement(
    "Chaingrabbing lol",
    "Grab 1000 Times",
    isUnlocked("MarthGrab3"),
    "MarthGrab3"
  );
  const MarthGrabArray = [1, 100, 1000];
  // Zelda
  const ZeldaFair1 = new Achivement(
    "Thunder Thighs",
    "Kill With Fair/Bair",
    isUnlocked("ZeldaFair1"),
    "ZeldaFair1"
  );
  const ZeldaFair2 = new Achivement(
    "JuSt DoWN B LOL",
    "Kill With Fair/Bair 10 Times",
    isUnlocked("ZeldaFair2"),
    "ZeldaFair2"
  );
  const ZeldaFair3 = new Achivement(
    "Better Character",
    "Kill With Fair/Bair 100 Times",
    isUnlocked("ZeldaFair3"),
    "ZeldaFair3"
  );
  const ZeldaFairArray = [1, 10, 100];
  const ZeldaFlame1 = new Achivement(
    "Din's Fire",
    "Spawn Din's Fire",
    isUnlocked("ZeldaFlame1"),
    "ZeldaFlame1"
  );
  const ZeldaFlame2 = new Achivement(
    "Din's Inferno",
    "Spawn Din's Fire 100 Times",
    isUnlocked("ZeldaFlame2"),
    "ZeldaFlame2"
  );
  const ZeldaFlame3 = new Achivement(
    "Din's Rage",
    "Spawn Din's Fire 10000 Times",
    isUnlocked("ZeldaFlame3"),
    "ZeldaFlame3"
  );
  const ZeldaFireArray = [1, 100, 10000];
  // Young Link
  const YinkArrow1 = new Achivement(
    "Trained Archer",
    "Shoot An Arrow",
    isUnlocked("YinkArrow1"),
    "YinkArrow1"
  );
  const YinkArrow2 = new Achivement(
    "Good-Eye",
    "Shoot 100 Arrows",
    isUnlocked("YinkArrow2"),
    "YinkArrow2"
  );
  const YinkArrow3 = new Achivement(
    "Eagle-Eye",
    "Shoot 10000 Arrows",
    isUnlocked("YinkArrow3"),
    "YinkArrow3"
  );
  const YinkArrowArray = [1, 100, 1000];
  const YinkDownSmash1 = new Achivement(
    null,
    "Kill With Young Link Down Smash",
    isUnlocked("YinkDownSmash1"),
    "YinkDownSmash1"
  );
  const YinkDownSmash2 = new Achivement(
    null,
    "Kill With Young Link Down Smash 10 Times",
    isUnlocked("YinkDownSmash2"),
    "YinkDownSmash2"
  );
  const YinkDownSmash3 = new Achivement(
    null,
    "Kill With Young Link Down Smash 100 Times",
    isUnlocked("YinkDownSmash3"),
    "YinkDownSmash3"
  );
  const YinkDownSmashArray = [1, 10, 100];
  // Falco Lazer and Dair
  const FalcoDair1 = new Achivement(
    "Personally...",
    "Hit Falcos Downair",
    isUnlocked("FalcoDair1"),
    "FalcoDair1"
  );
  const FalcoDair2 = new Achivement(
    "I Prefer the Air",
    "Hit Falcos Dair 100 Times",
    isUnlocked("FalcoDair2"),
    "FalcoDair2"
  );
  const FalcoDair3 = new Achivement(
    "Best Spike IMO",
    "Hit Falcos Dair 10000 Times",
    isUnlocked("FalcoDair3"),
    "FalcoDair3"
  );
  const FalcoDairArray = [1, 100, 10000];
  const FalcoLaser1 = new Achivement(
    "I LOVE LASERS",
    "Shoot Laser 10 Times",
    isUnlocked("FalcoLaser1"),
    "FalcoLaser1"
  );
  const FalcoLaser2 = new Achivement(
    "ShieldStun Simulator",
    "Shoot Laser 1000 Times",
    isUnlocked("FalcoLaser2"),
    "FalcoLaser2"
  );
  const FalcoLaser3 = new Achivement(
    "Well Someone is fun at Partys",
    "Shoot Laser 100000 Times",
    isUnlocked("FalcoLaser3"),
    "FalcoLaser3"
  );
  const FalcoLaserArray = [10, 1000, 100000];
  // Pichu
  const PichuTJolt1 = new Achivement(
    "Why Are You Hitting Yourself?",
    "Use Pichus Thunder Jolt",
    isUnlocked("PichuTJolt1"),
    "PichuTJolt1"
  );
  const PichuTJolt2 = new Achivement(
    "Why Are You Hitting Yourself??",
    "Use Pichus Thunder Jolt 100 Times",
    isUnlocked("PichuTJolt2"),
    "PichuTJolt2"
  );
  const PichuTJolt3 = new Achivement(
    "Why Are You Hitting Yourself??",
    "Use Pichus Thunder Jolt 10000 Times",
    isUnlocked("PichuTjolt3"),
    "PichuTjolt3"
  );
  const PichuTJoltArray = [1, 100, 10000];
  const PichuBair1 = new Achivement(
    "Why Are You Hitting Yourself????",
    "Kill WIth Pichus Bair",
    isUnlocked("PichuBair1"),
    "PichuBair1"
  );
  const PichuBair2 = new Achivement(
    "Why Are You Hitting Yourself?????",
    "Kill WIth Pichus Bair 10 Times",
    isUnlocked("PichuBair2"),
    "PichuBair2"
  );
  const PichuBair3 = new Achivement(
    "Why Are You Hitting Yourself??????",
    "Kill WIth Pichus Bair 100 Times",
    isUnlocked("PichuBair3"),
    "PichuBair3"
  );

  const PichuBairArray = [1, 10, 100];
  // Mr. Game And Watch
  const GNWNair1 = new Achivement(
    "He Shoots",
    "Kill with Game And Watch Nair",
    isUnlocked("GNWNair1"),
    "GNWNair1"
  );
  const GNWNair2 = new Achivement(
    "HE SCORES",
    "Kill with Game And Watch Nair 10 Times",
    isUnlocked("GNWNair2"),
    "GNWNair2"
  );
  const GNWNair3 = new Achivement(
    "Who even Needs Fun-Canceling?",
    "Kill with Game And Watch Nair 100 Times",
    isUnlocked("GNWNair3"),
    "GNWNair3"
  );
  const GNWKey1 = new Achivement(
    "Unlock The Win",
    "Kill with Game And Watch Dair",
    isUnlocked("GNWKey1"),
    "GNWKey1"
  );
  const GNWKey2 = new Achivement(
    null,
    "Kill with Game And Watch Dair 10 Times",
    isUnlocked("GNWKey2"),
    "GNWKey2"
  );
  const GNWKey3 = new Achivement(
    "Nobody Needs Fun-Canceling",
    "Kill with Game And Watch Dair 100 Times",
    isUnlocked("GNWKey3"),
    "GNWKey3"
  );
  const GNWKeyArray = [1, 10, 100];
  const GNWNairArray = [1, 10, 100];
  // Gannondorf
  const GannonP1 = new Achivement(
    "Brutal Domination",
    "Kill With Warlock Punch",
    isUnlocked("GannonP1"),
    "GannonP1"
  );
  const GannonP2 = new Achivement(
    "EZ Clap",
    "Kill With Warlock Punch 10 Times",
    isUnlocked("GannonP2"),
    "GannonP2"
  );
  const GannonP3 = new Achivement(
    "How do People Keep Falling For It?",
    "Kill With Warlock Punch 100 Times",
    isUnlocked("GannonP3"),
    "GannonP3"
  );
  const GannonPArray = [1, 10, 100];
  const GannonS1 = new Achivement(
    "Any Spikers?",
    "Kill With Gannondorfs Spike",
    isUnlocked("GannonS1"),
    "GannonS1"
  );
  const GannonS2 = new Achivement(
    "S.W.A.G",
    "Kill with Gannondorfs Spike 10 Times",
    isUnlocked("GannonS2"),
    "GannonS2"
  );
  const GannonS3 = new Achivement(
    "Gannondorf's Ultimate Power",
    "Kill with Gannondorfs Spike 100 Times",
    isUnlocked("GannonS3"),
    "GannonS3"
  );
  const GannonSArray = [1, 10, 100];
  // Dr. Mario
  const DRMPills1 = new Achivement(
    "The Doctor",
    "Spawn A Pill",
    isUnlocked("DRMPills1"),
    "DRMPills1"
  );
  const DRMPills2 = new Achivement(
    "The Medic",
    "Spawn 100 Pills",
    isUnlocked("DRMPills2"),
    "DRMPills2"
  );
  const DRMPills3 = new Achivement(
    "The Hero",
    "Spawn 10000 Pills",
    isUnlocked("DRMPills3"),
    "DRMPills3"
  );
  const DRMPillsArray = [1, 100, 10000];
  const DRMFair1 = new Achivement(
    "If only this Spiked...",
    "Kill With Dr.Mario Fair",
    isUnlocked("DRMFair1"),
    "DRMFair1"
  );
  const DRMFair2 = new Achivement(
    "Mario but Better",
    "Kill With Dr.Mario Fair 10 Times",
    isUnlocked("DRMFair2"),
    "DRMFair2"
  );
  const DRMFair3 = new Achivement(
    "Any Dockers?",
    "Kill With Dr.Mario Fair 100 Times",
    isUnlocked("DRMFair3"),
    "DRMFair3"
  );
  const DRMFairArray = [1, 10, 100];
  const FalconArray = [
    FalconPunch1,
    FalconPunch2,
    FalconPunch3,
    Knee1,
    Knee2,
    Knee3,
  ];
  const DonkeyKongArray = [
    DonkeyP1,
    DonkeyP2,
    DonkeyP3,
    CargoThrow1,
    CargoThrow2,
    CargoThrow3,
  ];
  const FoxArray = [
    shine1,
    shine2,
    shine3,
    ShineSpike1,
    ShineSpike2,
    ShineSpike3,
  ];
  const GNWArray = [GNWKey1, GNWKey2, GNWKey3, GNWNair1, GNWNair2, GNWNair3];
  const KirbyArray = [
    KirbyNair1,
    KirbyNair2,
    KirbyNair3,
    Kirbycide1,
    Kirbycide2,
    Kirbycide3,
  ];
  const BowserArray = [
    BowserNair1,
    BowserNair2,
    BowserNair3,
    BowserUpB1,
    BowserUpB2,
    BowserUpB3,
  ];
  const LinkArray = [
    LinkBomb1,
    LinkBomb2,
    LinkBomb3,
    LinkNair1,
    LinkNair2,
    LinkNair3,
  ];
  const LuigiArray = [
    LuigiSlippery1,
    LuigiSlippery2,
    LuigiSlippery3,
    Misfire1,
    Misfire2,
    Misfire3,
  ];
  const MarioArray = [
    MarioSpike1,
    MarioSpike2,
    MarioSpike3,
    Fire1,
    Fire2,
    Fire3,
  ];
  const MarthArray = [
    MarthGrab1,
    MarthGrab2,
    MarthGrab3,
    MarthSpike1,
    MarthSpike2,
    MarthSpike3,
  ];
  const MewtwoAArray = [
    MewtwoFair1,
    MewtwoFair2,
    MewtwoFair3,
    MewtwoSB1,
    MewtwoSB2,
    MewtwoSB3,
  ];
  const NessArray = [
    NessDair1,
    NessDair2,
    NessDair3,
    NessUpb1,
    NessUpb2,
    NessUpb3,
  ];
  const PeachArray = [
    PeachFair1,
    PeachFair2,
    PeachFair3,
    PeachStich1,
    PeachStich2,
    PeachStich3,
  ];
  const PikachuArray = [
    TailSpike1,
    TailSpike2,
    TailSpike3,
    Thunderjolt1,
    Thunderjolt2,
    Thunderjolt3,
  ];
  const IceClimbersArray = [
    IceClimbersFS1,
    IceClimbersFS2,
    IceClimbersFS3,
    IceClimbersDS1,
    IceClimbersDS2,
    IceClimbersDS3,
  ];
  const JigglypuffArray = [
    JigBackair1,
    JigBackair2,
    JigBackair3,
    RestKill1,
    RestKill2,
    RestKill3,
  ];
  const SamusArray = [
    Missile1,
    Missile2,
    Missile3,
    Chargeshot1,
    Chargeshot2,
    Chargeshot3,
  ];
  const YoshiArray = [
    YoshiNair1,
    YoshiNair2,
    YoshiNair3,
    YoshiDownSmash1,
    YoshiDownSmash2,
    YoshiDownSmash3,
  ];
  const ZeldaArray = [
    ZeldaFair1,
    ZeldaFair2,
    ZeldaFair3,
    ZeldaFlame1,
    ZeldaFlame2,
    ZeldaFlame3,
  ];
  const ShiekArray = [
    ShiekNair1,
    ShiekNair2,
    ShiekNair3,
    ShiekNeedle1,
    ShiekNeedle2,
    ShiekNeedle3,
  ];
  const FalcoArray = [
    FalcoDair1,
    FalcoDair2,
    FalcoDair3,
    FalcoLaser1,
    FalcoLaser2,
    FalcoLaser3,
  ];
  const YoungLinkArray = [
    YinkArrow1,
    YinkArrow2,
    YinkArrow3,
    YinkDownSmash1,
    YinkDownSmash2,
    YinkDownSmash3,
  ];
  const DrMarioArray = [
    DRMFair1,
    DRMFair2,
    DRMFair3,
    DRMPills1,
    DRMPills2,
    DRMPills3,
  ];
  const RoyArray = [
    RoyNeutralB1,
    RoyNeutralB2,
    RoyNeutralB3,
    RoySideSmash1,
    RoySideSmash2,
    RoySideSmash3,
  ];
  const PichuArray = [
    PichuTJolt1,
    PichuTJolt2,
    PichuTJolt3,
    PichuBair1,
    PichuBair2,
    PichuBair3,
  ];
  const GannondorfArray = [
    GannonP1,
    GannonP2,
    GannonP3,
    GannonS1,
    GannonS2,
    GannonS3,
  ];
  const GeneralAchArray = [
    kill1,
    kill2,
    kill3,
    kill4,
    kill5,
    kill6,
    kill7,
    kill8,
    kill9,
    kill10,
    Game1,
    Game2,
    Game3,
    Game4,
    Game5,
    Game6,
    Game7,
    Game8,
    Game9,
    Game10,
  ];
  const MiscAchArray = [AATW, Specialist];
  switch (args) {
    case 0:
      return FalconArray;
      break;
    case 1:
      return DonkeyKongArray;
      break;
    case 2:
      return FoxArray;
      break;
    case 3:
      return GNWArray;
      break;
    case 4:
      return KirbyArray;
      break;
    case 5:
      return BowserArray;
      break;
    case 6:
      return LinkArray;
      break;
    case 7:
      return LuigiArray;
      break;
    case 8:
      return MarioArray;
    case 9:
      return MarthArray;
      break;
    case 10:
      return MewtwoAArray;
      break;
    case 11:
      return NessArray;
      break;
    case 12:
      return PeachArray;
      break;
    case 13:
      return PikachuArray;
      break;
    case 14:
      return IceClimbersArray;
      break;
    case 15:
      return JigglypuffArray;
      break;
    case 16:
      return SamusArray;
      break;
    case 17:
      return YoshiArray;
      break;
    case 18:
      return ZeldaArray;
      break;
    case 19:
      return ShiekArray;
      break;
    case 20:
      return FalcoArray;
      break;
    case 21:
      return YoungLinkArray;
      break;
    case 22:
      return DrMarioArray;
      break;
    case 23:
      return RoyArray;
      break;
    case 24:
      return PichuArray;
      break;
    case 25:
      return GannondorfArray;
      break;
    case 26:
      return GeneralAchArray;
      break;
    case 27:
      return MiscAchArray;
      break;
  }
});

electron.ipcMain.handle("CheckAch", async (event, args) => {
  const rep = store.get("Replay_Directory").replace(/\\\\/g, "\\");
  if (exist(rep) == true) {
    const files = fs.readdirSync(rep, "utf-8");
    files.forEach((file) => {
      if (extname(file) == ".slp") slippiFilesToArray.push(file);
    });

    const uname = store.get("username");
    try {
      for (let i = 0; i in slippiFilesToArray; i++) {
        /*
        if (i == 250) {
          return true;
        } else {
          console.log(i);
        }
        */
        // console.log("Checking this file: " + slippiFilesToArray[i]);
        const gamefile = slippiFilesToArray[i];
        if (
          store.get(gamefile, false) == false &&
          name(gamefile, uname) !== -1
        ) {
          try {
            CheckFileAch(gamefile, store.get("username"));
          } catch (err) {
            console.log("Program ran into an error at gamefile: " + gamefile);
            console.log(err);
          }
          // console.log("File Check Went Ok");
          event.sender.send("clearCache");
          store.set(gamefile, true);
        } else {
          // console.log("Skipping this file" + slippiFilesToArray[i]);

          continue;
        }
      }
      // Chump Checks Down Here (HAVE FUN :))))
      AchievementUnlock("kill", killCheckArray, datastore.get("stocks", 0));
      AchievementUnlock("Game", GameCheckArray, datastore.get("Game_Total", 0));
      AchievementUnlock("Fire", FireCheckArray, datastore.get("Fireball", 0));
      AchievementUnlock(
        "MarioSpike",
        marSpikeCheckArray,
        datastore.get("Mario_Spike", 0)
      );
      AchievementUnlock("shine", ShineCheckArray, datastore.get("Shine", 0));
      AchievementUnlock(
        "ShineSpike",
        ShineSpikeCheckArray,
        datastore.get("Shine_Spike", 0)
      );
      AchievementUnlock(
        "Knee",
        KneeCheckArray,
        datastore.get("Falcon_Punch", 0)
      );
      AchievementUnlock(
        "FalconPunch",
        FalconPunchArray,
        datastore.get("Falcon_Knee", 0)
      );
      AchievementUnlock(
        "CargoThrow",
        CargoThrowArray,
        datastore.get("Cargo_Throw", 0)
      );
      AchievementUnlock(
        "DonkeyP",
        DonkeyPArray,
        datastore.get("Donkey_Punch", 0)
      );
      AchievementUnlock(
        "RoyNeutralB",
        RoyNeutralBArray,
        datastore.get("Roy_B", 0)
      );
      AchievementUnlock(
        "RoySideSmash",
        RoySideSmashArray,
        datastore.get("Roy_Fsmash", 0)
      );
      AchievementUnlock(
        "Kirbycide",
        KirbycideArray,
        datastore.get("Kirbycide", 0)
      );
      AchievementUnlock(
        "KirbyNair",
        KirbyNairArray,
        datastore.get("Kirby_Nair", 0)
      );
      AchievementUnlock(
        "BowserNair",
        BowserNairArray,
        datastore.get("Bowser_Nair", 0)
      );
      AchievementUnlock(
        "BowserUpB",
        BowserUpBArray,
        datastore.get("BowserUpB")
      );
      AchievementUnlock(
        "LinkNair",
        LinkNairArray,
        datastore.get("LinkNair", 0)
      );
      AchievementUnlock(
        "LinkBomb",
        LinkBombArray,
        datastore.get("LinkBomb", 0)
      );
      AchievementUnlock(
        "ShiekNair",
        ShiekNairArray,
        datastore.get("Sheik_Nair", 0)
      );
      AchievementUnlock(
        "ShiekNeedle",
        ShiekNeedleArray,
        datastore.get("Shiek_Needle", 0)
      );
      AchievementUnlock(
        "NessDair",
        NessdairArray,
        datastore.get("Ness_Dair", 0)
      );
      AchievementUnlock("NessUpb", NessUpbArray, datastore.get("Ness_Upb", 0));
      AchievementUnlock(
        "PeachStich",
        PeachStickArray,
        datastore.get("Peach_Stitch", 0)
      );
      AchievementUnlock(
        "PeachFair",
        PeachFairArray,
        datastore.get("Peach_Fair", 0)
      );
      AchievementUnlock(
        "IceClimbersFS",
        IceClimbersFSArray,
        datastore.get("ICFS", 0)
      );
      AchievementUnlock(
        "IceClimbersDS",
        IceClimbersDSArray,
        datastore.get("ICDS", 0)
      );
      AchievementUnlock(
        "TailSpike",
        TailSpikeArray,
        datastore.get("Pikachu_Tailspike", 0)
      );
      AchievementUnlock(
        "Thunderjolt",
        ThunderJoltArray,
        datastore.get("Pikachu_Tjolt", 0)
      );
      AchievementUnlock(
        "Missile",
        MissileArray,
        datastore.get("Samus_Missile", 0)
      );
      AchievementUnlock(
        "Chargeshot",
        ChargeShotArray,
        datastore.get("Samus_Chargeshot", 0)
      );
      AchievementUnlock(
        "YoshiNair",
        YoshiNairArray,
        datastore.get("Yoshi_Nair", 0)
      );
      AchievementUnlock(
        "YoshiDownSmash",
        YoshiDownSmashArray,
        datastore.get("Yoshi_Downsmash", 0)
      );
      AchievementUnlock(
        "JigBackair",
        JigBackAirArray,
        datastore.get("Jigglypuff_Bair", 0)
      );
      AchievementUnlock(
        "RestKill",
        RestKillArray,
        datastore.get("Jigglypuff_Rest", 0)
      );
      AchievementUnlock(
        "MewtwoSB",
        MewtwoArray,
        datastore.get("Mewtwo_ShadowBall", 0)
      );
      AchievementUnlock(
        "MewtwoFair",
        MewtwoArray,
        datastore.get("Mewtwo_Fair", 0)
      );
      AchievementUnlock(
        "LuigiSlippery",
        LuigiSlipperyArray,
        datastore.get("Luigi_Wavedash", 0)
      );
      AchievementUnlock("Misfire", MisfireArray, datastore.get("Misfire", 0));
      AchievementUnlock(
        "MarthSpike",
        MarthSpikeArray,
        datastore.get("Marth_Spike", 0)
      );
      AchievementUnlock(
        "MarthGrab",
        MarthGrabArray,
        datastore.get("Marth_Grab", 0)
      );
      AchievementUnlock(
        "ZeldaFair",
        ZeldaFairArray,
        datastore.get("Zelda_Fair", 0)
      );
      AchievementUnlock(
        "ZeldaFlame",
        ZeldaFireArray,
        datastore.get("Zelda_Fire", 0)
      );
      AchievementUnlock(
        "YinkArrow",
        YinkArrowArray,
        datastore.get("Yink_Arrow", 0)
      );
      AchievementUnlock(
        "YinkDownSmash",
        YinkDownSmashArray,
        datastore.get("Yink_Downsmash", 0)
      );
      AchievementUnlock(
        "FalcoDair",
        FalcoDairArray,
        datastore.get("Falco_Dair", 0)
      );
      AchievementUnlock(
        "FalcoLaser",
        FalcoLaserArray,
        datastore.get("Falco_Laser", 0)
      );
      AchievementUnlock(
        "PichuTJolt",
        PichuTJoltArray,
        datastore.get("Pichu_Tjolt", 0)
      );
      AchievementUnlock(
        "PichuBair",
        PichuBairArray,
        datastore.get("Pichu_Bair", 0)
      );
      AchievementUnlock("GNWNair", GNWNairArray, datastore.get("GNWN", 0));
      AchievementUnlock("GNWKey", GNWKeyArray, datastore.get("GNWK", 0));
      AchievementUnlock(
        "GannonP",
        GannonPArray,
        datastore.get("Gannon_Punch", 0)
      );
      AchievementUnlock(
        "GannonS",
        GannonSArray,
        datastore.get("Gannon_Spike", 0)
      );
      AchievementUnlock("DRMPills", DRMPillsArray, datastore.get("DRMP", 0));
      AchievementUnlock("DRMFair", DRMFairArray, datastore.get("DRMF", 0));

      return true;
    } catch (err) {
      console.log("Achievement Parser Failed");
      console.log(err);

      return false;
    }
  } else {
    // console.log(exist(rep));
    console.log("Couldn't Find Replay Dir");
    // console.log(rep);

    return false;
  }
});

function enterCharDir(DirName, FileName, UName, Gamefile) {
  const src = "src/resources";
  const rep = store.get("Replay_Directory").replace(/\\\\/g, "\\");
  const game = new SlippiGame(join(rep, Gamefile));
  const file =
    FileName +
    game
      .getSettings()
      .players[name(Gamefile, UName)].characterColor.toString() +
    ".png";

  const FilePath = join(src, DirName, file);

  return FilePath;
}
function getStockIcon(gamefile, Uname) {
  const rep = store.get("Replay_Directory").replace(/\\\\/g, "\\");
  const src = "src/resources";
  const game = new SlippiGame(join(rep, gamefile));
  const uname = store.get("username");
  switch (charintGet(gamefile, Uname)) {
    case 0:
      return enterCharDir("CaptainFalcon", "Falcon", uname, gamefile);
      break;
    case 1:
      return enterCharDir("DK", "DK", uname, gamefile);
      break;
    case 2:
      return enterCharDir("Fox", "Fox", uname, gamefile);
      break;
    case 3:
      return enterCharDir("GNW", "GNW", uname, gamefile);
      break;
    case 4:
      return enterCharDir("Kirby", "Kirby", uname, gamefile);
      break;
    case 5:
      return enterCharDir("Bowser", "Bowser", uname, gamefile);
      break;
    case 6:
      return enterCharDir("Link", "Link", uname, gamefile);
      break;
    case 7:
      return enterCharDir("Luigi", "Luigi", uname, gamefile);
      break;
    case 8:
      return enterCharDir("Mario", "Mario", uname, gamefile);
    case 9:
      return enterCharDir("Marth", "Marth", uname, gamefile);
      break;
    case 10:
      return enterCharDir("Mewtwo", "Mewtwo", uname, gamefile);
      break;
    case 11:
      return enterCharDir("Ness", "Ness", uname, gamefile);
      break;
    case 12:
      return enterCharDir("Peach", "Peach", uname, gamefile);
      break;
    case 13:
      return enterCharDir("Pikachu", "Pikachu", uname, gamefile);
      break;
    case 14:
      return enterCharDir("IC", "IC", uname, gamefile);
      break;
    case 15:
      return enterCharDir("Jigglypuff", "Jiggly", uname, gamefile);
      break;
    case 16:
      return enterCharDir("Samus", "Samus", uname, gamefile);
      break;
    case 17:
      return enterCharDir("Yoshi", "Yoshi", uname, gamefile);
      break;
    case 18:
      return enterCharDir("zelda", "Zelda", uname, gamefile);
      break;
    case 19:
      return enterCharDir("Sheik", "Sheik", uname, gamefile);
      break;
    case 20:
      return enterCharDir("Falco", "Falco", uname, gamefile);
      break;
    case 21:
      return enterCharDir("YoungLink", "YoungLink", uname, gamefile);
      break;
    case 22:
      return enterCharDir("DRMario", "DRMario", uname, gamefile);
      break;
    case 23:
      return enterCharDir("Roy", "Roy", uname, gamefile);
      break;
    case 24:
      return enterCharDir("Pichu", "Pichu", uname, gamefile);
      break;
    case 25:
      return enterCharDir("Gannon", "Gannon", uname, gamefile);
      break;
  }
}
function didiwin(gamefile) {
  const rep = store.get("Replay_Directory").replace(/\\\\/g, "\\");
  const game = new SlippiGame(join(rep, gamefile));
  if (
    game.getLatestFrame().players[name(gamefile, store.get("username"))].post
      .stocksRemaining != 0
  )
    return true;
  else return false;
}
electron.ipcMain.handle("GetFileArray", (event, args) => {
  const stageid = [
    "Impossible",
    "Impossible",
    "Fountain of Dream",
    "Pokemon Stadium",
    "Princess Peach's Castle",
    "Kongo Jungle",
    "Brinstar",
    "Coneria",
    "Yoshi's Story",
    "Onett",
    "Mute City",
    "Rainbow Cruise",
    "Jungle Japes",
    "Great Bay",
    "Hyrule Temple",
    "Brinstar Depths",
    "Yoshi's Island",
    "Green Greens",
    "Fourside",
    "Mushroom Kingdom I",
    "Mushroom Kingdom II",
    "Impossible",
    "Venom",
    "Poké Floats",
    "Big Blue",
    "Icicle Mountain",
    "Icetop",
    "Flatzone",
    "Dream Land N64",
    "Yoshi's Island N64",
    "Kongo Jungle N64",
    "Battlefield",
    "Final Destination",
  ];
  const rep = store.get("Replay_Directory").replace(/\\\\/g, "\\");
  const uname = store.get("username");

  if (exist(rep) == true) {
    const ReturnArray = [];
    const files = fs.readdirSync(rep, "utf-8");
    const slippiFilesToArray = [];
    let opponentname;
    files.forEach((file) => {
      if (extname(file) == ".slp") slippiFilesToArray.push(file);
    });

    for (let i = 0; i in slippiFilesToArray; i++) {
      if (
        name(slippiFilesToArray[i], store.get("username")) !== -1 &&
        name(slippiFilesToArray[i], store.get("username")) !== undefined
      ) {
        const game = new SlippiGame(join(rep, slippiFilesToArray[i]));
        const namearray = [];
        for (let i = 0; i in game.getMetadata().players; i++)
          namearray.push(game.getMetadata().players[i].names.netplay);

        if (name(slippiFilesToArray[i], store.get("username") == 0))
          opponentname = game.getMetadata().players[1].names.netplay;
        else opponentname = game.getMetadata().players[0].names.netplay;

        ReturnArray.push({
          FileName: slippiFilesToArray[i],
          names: namearray,
          Stage: stageid[game.getSettings().stageId],
          oppName: opponentname,
        });
      }
    }

    return ReturnArray;
  }
});

// i really dont feel like thinking right now
// Depreciated for AchivementCheck Function. This was stupid and im happy i could come up with a function.
/*
if(Game_Total >= 1){
  Game1.Ach_Unlocked = true
  if(Game_Total >= 10){
    Game2.Ach_Unlocked = true
    if(Game_Total >= 50){
      Game3.Ach_Unlocked = true
      if(Game_Total >= 100){
        Game4.Ach_Unlocked = true
        if(Game_Total >= 250){
          Game5.Ach_Unlocked = true
          if(Game_Total >= 500){
            Game6.Ach_Unlocked = true
            if(Game_Total >= 1000){
              Game7.Ach_Unlocked = true
              if(Game_Total >= 2500){
                Game8.Ach_Unlocked = true
                if(Game_Total >= 5000){
                  Game9.Ach_Unlocked = true
                  if(Game_Total >= 100000){
                    Game10.Ach_Unlocked = true
                }
              }
            }
          }
        }
      }
    }
  }
}
}
}}
*/
// process achievements down here???
