/*
Notes:
It seems like keeping all frame data for slippi files takes up alot of memory when held there, makes sense but i think on demand scans of slippi files will probably be needed. This will lead to long processing times for achievements, making this a really non-viable option for running in the background as played. Or im possibly just overthinking this. Probably the ladder.
TODO: Test storing only individual player frame data, and only post frames, this should save a fourth of the memory usage. Hopefully. Worried about this running on lower-end pcs.
TODO: Setup inputs for user data like usernames.
TODO: put todos in more relevant places.
*/
import fs, { stat } from "fs";
import { basename, extname, join, parse } from "path";
import electron from "electron";
import Store from "electron-store";

import SlippiGame, { ItemUpdateType, MetadataType } from "@slippi/slippi-js";

import achievementsJson from "./achievements.json";
import achievementKeys from "./keys.json";
import info from "./info.json";

type Achievements = Record<
  string,
  {
    name: string | null;
    desc: string;
    unlocked?: boolean;
  }
>;

const achievements: Achievements = achievementsJson;
let message2UI = (command, payload) => {
  electron.ipcRenderer.send("message-from-worker", {
    command: command,
    payload: payload,
  });
};
function getPercentage(array, int) {
  return Math.round(100 * (int / array.length));
}
// message2UI("helloWorld", { myParam: 1337, anotherParam: 42 });

electron.ipcRenderer.on("message-from-page", (event, args) => {
  console.log(args);
  console.log("NotYourFriend");

  let arg = args.data;
  if (args.message == "checkSettings") {
    console.log("correct message");

    try {
      const rep = arg.Replay_Directory.toString().replace(/\\\\/g, "\\");
      console.log("we set rep");

      // console.log(typeof rep);
      if (fs.existsSync(rep)) {
        console.log("rep Exists");

        // console.log("Settings Are Valid");
        store.delete("Replay_Directory");
        store.set("username", arg.username);
        store.set("Replay_Directory", rep.replace(/\\\\/g, "\\"));
        console.log("returning true");

        message2UI("resultCheckSettings", true);
      } else {
        console.log("rep Exists");
        //console.log("Settings Are Not Valid");
        //console.log(rep);\
        console.log("returning false");
        message2UI("resultCheckSettings", false);
      }
    } catch (err) {
      console.log(err);
      message2UI("resultCheckSettings", false);
    }
  } else {
    console.log(
      "not checkSettings for some reason fuck this stupid shit i hate it so much like jesus christ"
    );
  }
});
console.log("Sent Message to Main");
interface MetadataTypePlayers extends MetadataType {
  players: {
    [playerIndex: number]: {
      names: {
        netplay: string;
      };
      characters: {
        [internalCharacterId: number]: number;
      };
    };
  };
}

const store = new Store();
const datastoredata = { name: "Data" };
const Achstoredata = { name: "Ach" };
const StatsStoreData = { name: "Stats" };
const datastore = new Store(datastoredata);
const achstore = new Store(Achstoredata);
const statstore = new Store(StatsStoreData);

const replayDir = () =>
  (store.get("Replay_Directory") as string).replace(/\\\\/g, "\\");

// Initialize Variables For Later use, Later figure out how to load values from json.
// This is probably when we figure out ui.
//= store.get("Replay_Directory", ).replace(/\\\\/g, "\\");
// let username = store.get("Username");

const slippiFilesToArray: string[] = [];

// create the achivement class and create all of the new achiement.

// Empty Achivement class
// let null = new Achivement(null, null, null)
// General Achievemnts
// Kill Achievements
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
const GameCheckArray = [1, 10, 50, 100, 250, 500, 1000, 2500, 5000, 10000];
// Misc Achievements
// Character Specific Achivements
// Mario
const FireCheckArray = [1, 1000, 100000]; // null Achivement_Name
const marSpikeCheckArray = [1, 10, 100]; // null Achievement Name
// Fox
const ShineCheckArray = [1, 1000, 100000];
const ShineSpikeCheckArray = [1, 10, 100];
// Captin Falcon
const KneeCheckArray = [1, 50, 100];
const FalconPunchArray = [1, 10, 50];
// Donkey Kong
const CargoThrowArray = [1, 10, 100];
const DonkeyPArray = [1, 10, 100];
// Roy
const RoyNeutralBArray = [1, 10, 100];
const RoySideSmashArray = [1, 10, 100];
// Kirby
const KirbycideArray = [1, 10, 100];
const KirbyNairArray = [1, 10, 100];
// Bowser
const BowserNairArray = [1, 10, 100];
const BowserUpBArray = [1, 10, 100];
// Link
const LinkNairArray = [1, 10, 100];
const LinkBombArray = [1, 100, 10000];

// Shiek Nair And Neddle
const ShiekNairArray = [1, 10, 100];
const ShiekNeedleArray = [50, 500, 50000];
// Ness
const NessdairArray = [1, 10, 100];
const NessUpbArray = [1, 10, 100];
// Peach
const PeachStickArray = [1, 10, 100];
const PeachFairArray = [1, 10, 100];
// Ice Climbers??? Dont even know how i would start with this one lol. TODO: Figure out frame Parsing for IC.
const IceClimbersFSArray = [1, 10, 100];
const IceClimbersDSArray = [1, 10, 100];
// Pikachu Tail Spike And
const TailSpikeArray = [1, 10, 100];
const ThunderJoltArray = [1, 10, 100];
// Samus Missile And Chargeshot
const MissileArray = [1, 500, 5000];
const ChargeShotArray = [1, 50, 500];
// Yoshi
const YoshiNairArray = [10, 100, 1000];
const YoshiDownSmashArray = [1, 10, 100];
// Jigglypuff
const JigBackAirArray = [1, 100, 10000];
const RestKillArray = [1, 10, 100];
// Mewtwo
const MewtwoArray = [1, 10, 100];
// Luigi Wavedash and Misfire
const LuigiSlipperyArray = [1, 1000, 100000];
const MisfireArray = [1, 10, 1000];
// Marth Down Air and Grab
const MarthSpikeArray = [1, 10, 100];
const MarthGrabArray = [1, 100, 1000];
// Zelda
const ZeldaFairArray = [1, 10, 100];
const ZeldaFireArray = [1, 100, 10000];
// Young Link
const YinkArrowArray = [1, 100, 1000];
const YinkDownSmashArray = [1, 10, 100];
// Falco Lazer and Dair
const FalcoDairArray = [1, 100, 10000];
const FalcoLaserArray = [10, 1000, 100000];
// Pichu
const PichuTJoltArray = [1, 100, 10000];
const PichuBairArray = [1, 10, 100];
// Mr. Game And Watch
const GNWKeyArray = [1, 10, 100];
const GNWNairArray = [1, 10, 100];
// Gannondorf
const GannonPArray = [1, 10, 100];
const GannonSArray = [1, 10, 100];
// Dr. Mario
const DRMPillsArray = [1, 100, 10000];
const DRMFairArray = [1, 10, 100];
// Achievement End

//code
/**
 * This Function takes in the ach name, an array for values that need to be check, and the integer that should be checked. Not sure if i should return somthing here, i think returning void should work.
 *
 * @param AchName The Achievements name. This is for unlocking the achivement with the eval statement. I he
 * @param ChumpCheck This is an array with the values needed to check against. TODO:Come up with better name lol
 * @param int This is the integer that should be checked against Chump Check. This should be the count like number of games.
 */
const RepDirExist = false;
function AchievementUnlock(
  AchName: string,
  ChumpCheck: any[],
  int: number
): void {
  for (let i = 0; i in ChumpCheck; i++) {
    //console.log("Checking Ach: " + AchName + " Against: " + int);

    if (int > ChumpCheck[i]) {
      const key = `${AchName}${i + 1}`;

      //achievements[key].unlocked = true;
      achstore.set(key, true);

      continue;
    } else continue;
  }
}

function name(gamefile: string, name: string) {
  const rep = replayDir();
  const game = new SlippiGame(join(rep, gamefile));
  const settings = game.getSettings();
  const metadata = game.getMetadata() as MetadataTypePlayers;
  try {
    for (let i = 0; i in settings.players; i++) {
      if (settings.players[i].type != 1 && metadata.players[i].names != null) {
        if (
          metadata.players[i].names.netplay.toLowerCase() ==
          name.toString().toLowerCase()
        ) {
          return i;
        } else {
          continue;
        }
      } else {
        return -1;
      }
    }
  } catch (err) {
    return -1;
  }

  return -1;
}
function charintGet(gamefile: string, uname: string) {
  const rep = replayDir();
  try {
    let game = new SlippiGame(join(rep, gamefile));
    let int = game.getSettings().players[name(gamefile, uname)].characterId;
    return int;
  } catch (err) {
    let game = new SlippiGame(join(rep, gamefile));
    console.log(err);
    console.log(name(gamefile, uname));
  }
}

function CheckMoveKill(gamefile: string, AttackID: number, Uname: string) {
  const rep = replayDir();
  const game = new SlippiGame(join(rep, gamefile));
  const stats = game.getStats();
  const frames = game.getFrames();
  let count = 0;
  for (let i = 0; i in stats.conversions; i++) {
    if (
      stats.conversions[i].didKill &&
      stats.conversions[i].playerIndex === name(gamefile, Uname)
    ) {
      // console.log(frames[stats.conversions[i].endFrame].players[name(gamefile)].post.lastAttackLanded)
      if (
        (frames[stats.conversions[i].endFrame as number].players[
          name(gamefile, Uname)
        ]?.post.lastAttackLanded as number) === AttackID
      ) {
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
function CheckActionID(gamefile: string, ActionID: number, Uname: string) {
  let LastFrameCheck = false;
  let count = 0;
  const rep = replayDir();
  const game = new SlippiGame(join(rep, gamefile));
  const frames = game.getFrames();
  for (let i = 0; i in frames; i++) {
    if (LastFrameCheck === false) {
      if (
        frames[i].players[name(gamefile, Uname)]?.post.actionStateId ===
        ActionID
      ) {
        LastFrameCheck = true;
        count += 1;
        // console.log(frames[i].players[name(gamefile)].post);
        // console.log("Shine Frame: " + i);}
        continue;
      } else if (
        frames[i].players[name(gamefile, Uname)]?.post.actionStateId ===
        ActionID
      )
        continue;
    } else {
      LastFrameCheck = false;
      continue;
    }
  }

  return count;
}
function ItemIDCheck(gamefile: string, itemid: number, Uname: string) {
  const rep = replayDir();
  const game = new SlippiGame(join(rep, gamefile));
  const frames = game.getFrames();
  let UniqueItemId = [-1];
  let Count = 0;
  for (let n = 0; n in frames; n++) {
    if (frames[n].items != undefined) {
      for (let i = 0; i in (frames[n].items as ItemUpdateType[]); i++) {
        for (let z = 0; z in UniqueItemId; z++) {
          if (!UniqueItemId.includes(frames[n].items?.[i].spawnId as number)) {
            UniqueItemId.push(frames[n].items?.[i].spawnId as number);
            if (
              frames[n].items?.[i].owner === name(gamefile, Uname) &&
              frames[n].items?.[i].typeId === itemid
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
function CheckLastHit(gamefile: string, AttackID: number, Uname: string) {
  let LastFrameCheck = false;
  let count = 0;
  const rep = replayDir();
  const game = new SlippiGame(join(rep, gamefile));
  const frames = game.getFrames();
  for (let i = 0; i in frames; i++) {
    if (LastFrameCheck === false) {
      if (
        frames[i].players[name(gamefile, Uname)]?.post.lastAttackLanded ==
        AttackID
      ) {
        LastFrameCheck = true;
        count += 1;
        // console.log(frames[i].players[name(gamefile)].post);
        // console.log("Shine Frame: " + i);}
        continue;
      } else if (
        frames[i].players[name(gamefile, Uname)]?.post.lastAttackLanded ==
        AttackID
      )
        continue;
      else {
        console.log();

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
function checkSlippiFiles(gamefile: string, Uname: string) {
  // Initilize variables
  const rep = replayDir();
  const game = new SlippiGame(join(rep, gamefile));
  const game_complete = null;
  const player = name(gamefile, Uname);
  let murder;
  let dam;
  // Process Gamefiles
  if (game.getStats().gameComplete) {
    try {
      if (
        game.getMetadata().players != undefined &&
        game.getMetadata().players != null &&
        name(gamefile, Uname) != -1
      ) {
        murder = game.getStats().overall[player].killCount;
      } else "Yo idiot, theres an error here: " + gamefile;
    } catch (err) {
      console.log("slp general check ran into an error at" + gamefile);
    }

    if (game.getStats().gameComplete) {
      try {
        dam = Math.ceil(game.getStats().overall[player].totalDamage);
      } catch (err) {
        // console.log(game.getStats().overall[player]);
      }
    }
    null;
  }
  //return data inside of an object???
  //console.log("SLP stats Parse Is OK!");

  return { stock: murder, dama: dam, comp: game.getStats().gameComplete };
}

function foxParse(gamefile, uname) {
  let shine_Spike = 0;
  let shine = 0;
  shine += CheckActionID(gamefile, 360, uname);
  shine_Spike += CheckMoveKill(gamefile, 21, uname);

  return { Shine: shine, ShineSpike: shine_Spike };
}
function marioParse(gamefile, uname) {
  let Fireball = 0;
  let Fair_Spike = 0;
  Fireball += ItemIDCheck(gamefile, 48, uname);
  Fair_Spike += CheckMoveKill(gamefile, 14, uname);
  return { fb: Fireball, fs: Fair_Spike };
}
function FalconParse(gamefile, uname) {
  let Knee = 0;
  Knee += CheckMoveKill(gamefile, 14, uname);
  return { kn: Knee, fp: CheckLastHit(gamefile, 18, uname) };
}

function SamusParse(gamefile, uname) {
  let Samus_cs = 0;
  let Samus_ms = 0;
  Samus_cs += CheckMoveKill(gamefile, 18, uname);
  Samus_ms += ItemIDCheck(gamefile, 95, uname);
  return { cs: Samus_cs, ms: Samus_ms };
}
function MarthParse(gamefile, uname) {
  let Marth_Spike = 0;
  let Marth_Grab = 0;
  Marth_Spike += CheckMoveKill(gamefile, 17, uname);
  Marth_Grab += CheckActionID(gamefile, 213, uname);
  return { ms: Marth_Spike, mg: Marth_Grab };
}
function JigglypuffParse(gamefile, uname) {
  let JiggBackair = 0;
  let JiggRest = 0;
  JiggBackair += CheckLastHit(gamefile, 15, uname);
  JiggRest += CheckMoveKill(gamefile, 21, uname);
  return { bair: JiggBackair, Rest: JiggRest };
}
function LuigiParse(gamefile, Uname) {
  let WD = 0;
  let Misfire = 0;
  const rep = replayDir();
  const game = new SlippiGame(join(rep, gamefile));
  WD += game.getStats().actionCounts[name(gamefile, Uname)].wavedashCount;
  Misfire += CheckActionID(gamefile, 348, Uname);
  return { wd: WD, Mis: Misfire };
}
function DonkeyParse(gamefile, uname) {
  let DonkeyPunch = 0;
  let CargoThrow = 0;
  CargoThrow +=
    CheckMoveKill(gamefile, 57, uname) +
    CheckMoveKill(gamefile, 58, uname) +
    CheckMoveKill(gamefile, 5, uname) +
    CheckMoveKill(gamefile, 60, uname);
  DonkeyPunch += CheckMoveKill(gamefile, 18, uname);
  return { DP: DonkeyPunch, CT: CargoThrow };
}
function FalcoParse(gamefile, uname) {
  let FalcoDair = 0;
  let FalcoLaser = 0;
  FalcoDair += CheckMoveKill(gamefile, 17, uname);
  FalcoLaser += ItemIDCheck(gamefile, 55, uname);
  return { FD: FalcoDair, FL: FalcoLaser };
}
function GannonParse(gamefile, uname) {
  let GanSpike = 0;
  let GanPunch = 0;
  GanSpike += CheckMoveKill(gamefile, 17, uname);
  GanPunch += CheckLastHit(gamefile, 18, uname);
  return { GS: GanSpike, GP: GanPunch };
}
function PikachuParse(gamefile, uname) {
  let Tailspike = 0;
  let TJolt = 0;
  Tailspike += CheckMoveKill(gamefile, 18, uname);
  TJolt += ItemIDCheck(gamefile, 89, uname); // There are like 4 diffrent values for what this might be, so i just picked the one i think would be tjolt.
  return { ts: Tailspike, tj: TJolt };
}
function ShiekParse(gamefile, uname) {
  let ShiekNair = 0;
  let ShiekNeedles = 0;
  ShiekNair += CheckMoveKill(gamefile, 13, uname);
  ShiekNeedles += ItemIDCheck(gamefile, 79, uname);
  return { SN: ShiekNair, SNEED: ShiekNeedles };
}
function linkParse(gamefile, uname) {
  let LinkNair = 0;
  let LinkBomb = 0;
  LinkNair += CheckMoveKill(gamefile, 13, uname);
  LinkBomb += ItemIDCheck(gamefile, 58, uname);
  return { LinkN: LinkNair, LinkB: LinkBomb };
}
function PeachParse(gamefile, Uname) {
  let PeachStich = 0;
  const rep = replayDir();
  let PeachFair = 0;
  PeachFair += CheckMoveKill(gamefile, 14, Uname);
  const game = new SlippiGame(join(rep, gamefile));
  const stats = game.getStats();
  const frames = game.getFrames();
  const hitFireball = 0;
  let UniqueItemId = -1;
  for (let n = 0; n in frames; n++) {
    if (frames[n].items != undefined) {
      for (let i = 0; i in frames[n].items; i++) {
        if (frames[n].items[i].spawnId != UniqueItemId) {
          if (frames[n].items[i].typeId == 100)
            UniqueItemId = frames[n].items[i].spawnId;
          if (
            frames[n].items[i].owner === name(gamefile, Uname) &&
            frames[n].items[i].typeId === 99 &&
            frames[n].frame[i].turnipFace === 7
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
  YoshiNair += CheckLastHit(gamefile, 13, uname);
  YoshiDownSmash += CheckMoveKill(gamefile, 12, uname);
  return { YN: YoshiNair, YDS: YoshiDownSmash };
}
function BowserParse(gamefile, uname) {
  let BowserNair = 0;
  let BowserUpB = 0;
  BowserNair += CheckLastHit(gamefile, 13, uname);
  BowserUpB += CheckLastHit(gamefile, 20, uname);
  return { BN: BowserNair, BUB: BowserUpB };
}
function YoungLinkParse(gamefile, uname) {
  let YounglinkArrow = 0;
  let YounglinkDS = 0;
  YounglinkArrow += ItemIDCheck(gamefile, 65, uname);
  YounglinkDS += CheckMoveKill(gamefile, 12, uname);
  return { YLA: YounglinkArrow, YLDS: YounglinkDS };
}
function KirbyParse(gamefile, uname) {
  let KirbyCide = 0;
  let KirbyNair = 0;
  KirbyCide +=
    CheckMoveKill(gamefile, 53, uname) + CheckMoveKill(gamefile, 54, uname);
  KirbyNair += CheckLastHit(gamefile, 13, uname);
  return { KC: KirbyCide, KN: KirbyNair };
}
function ZeldaParse(gamefile, uname) {
  let ZeldaFair = 0;
  let ZeldaFire = 0;
  ZeldaFair += CheckMoveKill(gamefile, 14, uname);
  ZeldaFire += ItemIDCheck(gamefile, 108, uname);
  return { ZF: ZeldaFair, ZFI: ZeldaFire };
}
function GameAndWatchParse(gamefile, uname) {
  let GNWNair = 0;
  let GNWKey = 0;
  GNWNair += CheckMoveKill(gamefile, 13, uname);
  GNWKey += CheckMoveKill(gamefile, 1, uname);
  return { GN: GNWNair, GK: GNWKey };
}
function MewtwoParse(gamefile, uname) {
  let M2Ball = 0;
  let M2Fair = 0;
  M2Ball += ItemIDCheck(gamefile, 112, uname);
  M2Fair += CheckMoveKill(gamefile, 14, uname);
  return { MB: M2Ball, MF: M2Fair };
}
function NessParse(gamefile, uname) {
  let NessUpb = 0;
  let NessDair = 0;
  NessDair += CheckMoveKill(gamefile, 17, uname);
  NessUpb +=
    CheckLastHit(gamefile, 20, uname) + CheckLastHit(gamefile, 20, uname);
  return { NUB: NessUpb, ND: NessDair };
}
function PichuParse(gamefile, uname) {
  let PichuTjolt = 0;
  let PichuBair = 0;
  PichuTjolt += ItemIDCheck(gamefile, 91, uname);
  PichuBair += CheckMoveKill(gamefile, 13, uname);
  return { PTJ: PichuTjolt, PB: PichuBair };
}
function DrMParse(gamefile, uname) {
  let DRMPill = 0;
  let DRMFair = 0;
  DRMFair += CheckMoveKill(gamefile, 14, uname);
  DRMPill += ItemIDCheck(gamefile, 49, uname);
  return { DRMF: DRMFair, DRMP: DRMPill };
}
function RoyParse(gamefile, uname) {
  let RoyB = 0;
  let RoyFsmash = 0;
  RoyB += CheckMoveKill(gamefile, 18, uname);
  RoyFsmash += CheckMoveKill(gamefile, 10, uname);
  return { RB: RoyB, RS: RoyFsmash };
}
function IceClimbersParse(gamefile, uname) {
  let ICFS = 0;
  let ICDS = 0;
  ICDS += CheckMoveKill(gamefile, 12, uname);
  ICFS += CheckMoveKill(gamefile, 10, uname);
  return { DS: ICDS, FS: ICFS };
}

function AddToStore(storename: string, addint: number) {
  datastore.set(storename, datastore.get(storename, 0) + addint);
}
function CheckFileAch(gamefile, uname): void {
  //console.log("Got Request For: " + gamefile);

  if (store.get(gamefile, false) === false) {
    // console.log(gamefile + " Not in the store");
    // console.log(charintGet(gamefile, uname));
    let game = new SlippiGame(join(replayDir(), gamefile));
    datastore.set(
      "stocks",
      (datastore.get("stocks", 0) as number) +
        game.getStats().overall[name(gamefile, store.get("username"))].killCount
    );
    switch (charintGet(gamefile, uname)) {
      case 0:
        let Falcon = FalconParse(gamefile, uname);
        AddToStore("Falcon_Punch", Falcon.fp);
        AddToStore("Falcon_Knee", Falcon.kn);
        //console.log("Checking This Char..." + charintGet(gamefile, uname));

        break;
      case 1:
        //console.log("Checking This Char..." + charintGet(gamefile, uname));
        let donkeyK = DonkeyParse(gamefile, uname);
        AddToStore("Donkey_Punch", donkeyK.DP);
        AddToStore("Cargo_Throw", donkeyK.CT);
        break;
      case 2:
        let fox = foxParse(gamefile, uname);
        AddToStore("Shine", fox.Shine);
        AddToStore("Shine_Spike", fox.ShineSpike);
        //console.log("Checking This Char..." + charintGet(gamefile, uname));
        break;
      case 3:
        let GNW = GameAndWatchParse(gamefile, uname);
        AddToStore("GNWK", GNW.GK);
        AddToStore("GNWN", GNW.GN);
        //console.log("Checking This Char..." + charintGet(gamefile, uname));
        break;
      case 4:
        let Kirby = KirbyParse(gamefile, uname);
        AddToStore("Kirbycide", Kirby.KC);
        AddToStore("Kirby_Nair", Kirby.KN);
        //console.log("Checking This Char..." + charintGet(gamefile, uname));
        break;
      case 5:
        let Bowser = BowserParse(gamefile, uname);
        AddToStore("Bowser_Nair", Bowser.BN);
        AddToStore("Bowser_Upb", Bowser.BUB);
        //console.log("Checking This Char..." + charintGet(gamefile, uname));
        break;
      case 6:
        let Link = linkParse(gamefile, uname);
        AddToStore("LinkNair", Link.LinkN);
        AddToStore("LinkBomb", Link.LinkB);
        //console.log("Checking This Char..." + charintGet(gamefile, uname));
        break;
      case 7:
        let Luigi = LuigiParse(gamefile, uname);
        AddToStore("Luigi_Wavedash", Luigi.wd);
        AddToStore("Misfire", Luigi.Mis);
        //console.log("Checking This Char..." + charintGet(gamefile, uname));
        break;
      case 8:
        let Mario = marioParse(gamefile, uname);
        AddToStore("Fireball", Mario.fb);
        AddToStore("Mario_Spike", Mario.fs);
      //console.log("Checking This Char..." + charintGet(gamefile, uname));
      case 9:
        let Marth = MarthParse(gamefile, uname);
        AddToStore("Marth_Grab", Marth.mg);
        AddToStore("Marth_Spike", Marth.ms);
        //console.log("Checking This Char..." + charintGet(gamefile, uname));
        break;
      case 10:
        let Mewtwo = MewtwoParse(gamefile, uname);
        AddToStore("Mewtwo_Fair", Mewtwo.MF);
        AddToStore("Mewtwo_ShadowBall", Mewtwo.MB);
        //console.log("Checking This Char..." + charintGet(gamefile, uname));
        break;
      case 11:
        let Ness = NessParse(gamefile, uname);
        AddToStore("Ness_Dair", Ness.ND);
        AddToStore("Ness_Upb", Ness.NUB);
        //console.log("Checking This Char..." + charintGet(gamefile, uname));
        break;
      case 12:
        let Peach = PeachParse(gamefile, uname);
        AddToStore("Peach_Fair", Peach.PF);
        AddToStore("Peach_Stich", Peach.PS);
        //console.log("Checking This Char..." + charintGet(gamefile, uname));
        break;
      case 13:
        let Pikachu = PikachuParse(gamefile, uname);
        AddToStore("Pikachu_Tjolt", Pikachu.tj);
        AddToStore("Pikachu.Tailspike", Pikachu.ts);
        //console.log("Checking This Char..." + charintGet(gamefile, uname));
        break;
      case 14:
        let Ice_Climbers = IceClimbersParse(gamefile, uname);
        AddToStore("ICDS", Ice_Climbers.DS);
        AddToStore("ICFS", Ice_Climbers.FS);
        //console.log("Checking This Char..." + charintGet(gamefile, uname));
        break;
      case 15:
        let Jigglypuff = JigglypuffParse(gamefile, uname);
        AddToStore("Jigglypuff_Rest", Jigglypuff.Rest);
        AddToStore("Jigglypuff_Bair", Jigglypuff.bair);
        //console.log("Checking This Char..." + charintGet(gamefile, uname));
        break;
      case 16:
        let Samus = SamusParse(gamefile, uname);
        AddToStore("Samus_Chargeshot", Samus.cs);
        AddToStore("Samus_Missile", Samus.ms);
        //console.log("Checking This Char..." + charintGet(gamefile, uname));
        break;
      case 17:
        let Yoshi = YoshiParse(gamefile, uname);
        AddToStore("Yoshi_Downsmash", Yoshi.YDS);
        AddToStore("Yoshi_Nair", Yoshi.YN);
        //console.log("Checking This Char..." + charintGet(gamefile, uname));
        break;
      case 18:
        let Zelda = ZeldaParse(gamefile, uname);
        AddToStore("Zelda_Fair", Zelda.ZF);
        AddToStore("Zelda_Fire", Zelda.ZFI);
        //console.log("Checking This Char..." + charintGet(gamefile, uname));
        break;
      case 19:
        let Shiek = ShiekParse(gamefile, uname);
        AddToStore("Sheik_Needle", Shiek.SNEED);
        AddToStore("Shiek_Nair", Shiek.SN);
        //console.log("Checking This Char..." + charintGet(gamefile, uname));
        break;
      case 20:
        let Falco = FalcoParse(gamefile, uname);
        AddToStore("Falco_Dair", Falco.FD);
        AddToStore("Falco_Laser", Falco.FL);
        //console.log("Checking This Char..." + charintGet(gamefile, uname));
        break;
      case 21:
        let Young_Link = YoungLinkParse(gamefile, uname);
        AddToStore("Yink_Arrow", Young_Link.YLA);
        AddToStore("Yink_Downsmash", Young_Link.YLDS);
        //console.log("Checking This Char..." + charintGet(gamefile, uname));
        break;
      case 22:
        let Dr_Mario = DrMParse(gamefile, uname);
        AddToStore("DRMF", Dr_Mario.DRMF);
        AddToStore("DRMP", Dr_Mario.DRMP);
        //console.log("Checking This Char..." + charintGet(gamefile, uname));
        break;
      case 23:
        let Roy = RoyParse(gamefile, uname);
        AddToStore("Roy_B", Roy.RB);
        AddToStore("Roy_Fsmash", Roy.RS);
        //console.log("Checking This Char..." + charintGet(gamefile, uname));
        break;
      case 24:
        let Pichu = PichuParse(gamefile, uname);
        AddToStore("Pichu_Bair", Pichu.PB);
        AddToStore("Pichu_Tjolt", Pichu.PTJ);
        //console.log("Checking This Char..." + charintGet(gamefile, uname));
        break;
      case 25:
        let Gannnondorf = GannonParse(gamefile, uname);
        AddToStore("Gannon_Punch", Gannnondorf.GP);
        AddToStore("Gannon_Spike", Gannnondorf.GS);
        //console.log("Checking This Char..." + charintGet(gamefile, uname));
        break;
      case 26:
        break;
    }
    AddToStore("Game_Total", 1);
  }
}

function characterConditionalParse(gamefile, uname) {
  switch (charintGet(gamefile, uname)) {
    case 0:
      let Falcon = FalconParse(gamefile, uname);
      return {
        char: 0,
        Stat1: Falcon.fp,
        Stat2: Falcon.kn,
        Stat1Text: "Hit Falcon Punches This Game: ",
        Stat2Text: "Hit Knees This Game: ",
      };

      //console.log("Checking This Char..." + charintGet(gamefile, uname));

      break;
    case 1:
      let DK = DonkeyParse(gamefile, uname);
      return {
        char: 1,
        Stat1: DK.CT,
        Stat2: DK.DP,
        Stat1Text: "Cargo Throw Kill(s) This Game: ",
        Stat2Text: "Donkey Punch Kill(s) This Game: ",
      };

      break;
    case 2:
      let fox = foxParse(gamefile, uname);
      return {
        char: 2,
        Stat1: fox.Shine,
        Stat2: fox.ShineSpike,
        Stat1Text: "Shine(s) This Game: ",
        Stat2Text: "Shine Spikes(s) This Game: ",
      };
      //console.log("Checking This Char..." + charintGet(gamefile, uname));
      break;
    case 3:
      let GNW = GameAndWatchParse(gamefile, uname);
      return {
        char: 3,
        Stat1: GNW.GN,
        Stat2: GNW.GK,
        Stat1Text: "Nair Kill(s) This Game: ",
        Stat2Text: "Dair Kill(s) This Game: ",
      };
      //console.log("Checking This Char..." + charintGet(gamefile, uname));
      break;
    case 4:
      let Kirby = KirbyParse(gamefile, uname);
      return {
        char: 4,
        Stat1: Kirby.KC,
        Stat2: Kirby.KN,
        Stat1Text: "Kirbycide Kill(s) This Game: ",
        Stat2Text: "Nair Hit(s) This Game: ",
      };
      //console.log("Checking This Char..." + charintGet(gamefile, uname));
      break;
    case 5:
      let Bowser = BowserParse(gamefile, uname);
      return {
        char: 5,
        Stat1: Bowser.BN,
        Stat2: Bowser.BUB,
        Stat1Text: "Bowser Nair Hit(s) This Game: ",
        Stat2Text: "Bowser UpB Hit(s) This Game: ",
      };

      //console.log("Checking This Char..." + charintGet(gamefile, uname));
      break;
    case 6:
      let Link = linkParse(gamefile, uname);
      return {
        char: 6,
        Stat1: Link.LinkN,
        Stat2: Link.LinkB,
        Stat1Text: "Link Nair(s) This Game:",
        Stat2Text: "Link Bomb(s) This Game:",
      };

      //console.log("Checking This Char..." + charintGet(gamefile, uname));
      break;
    case 7:
      let Luigi = LuigiParse(gamefile, uname);
      return {
        char: 7,
        Stat1: Luigi.wd,
        Stat2: Luigi.Mis,
        Stat1Text: "Luigi Wavedash's This Game: ",
        Stat2Text: "Luigi Misfire(s) This Game",
      };
      //console.log("Checking This Char..." + charintGet(gamefile, uname));
      break;
    case 8:
      let Mario = marioParse(gamefile, uname);
      return {
        char: 8,
        Stat1: Mario.fb,
        Stat2: Mario.fs,
        Stat1Text: "Fireball(s) This Game: ",
        Stat2Text: "Fair Spike(s) This Game: ",
      };
    //console.log("Checking This Char..." + charintGet(gamefile, uname));
    case 9:
      let Marth = MarthParse(gamefile, uname);
      return {
        char: 9,
        Stat1: Marth.mg,
        Stat2: Marth.ms,
        Stat1Text: "Grab(s) This Game: ",
        Stat2Text: "Spike Kill(s) This Game: ",
      };

      //console.log("Checking This Char..." + charintGet(gamefile, uname));
      break;
    case 10:
      let Mewtwo = MewtwoParse(gamefile, uname);
      return {
        char: 10,
        Stat1: Mewtwo.MF,
        Stat2: Mewtwo.MB,
        Stat1Text: "Fair Kill(s) This Game: ",
        Stat2Text: "Shadow Ball(s) This Game: ",
      };
      //console.log("Checking This Char..." + charintGet(gamefile, uname));
      break;
    case 11:
      let Ness = NessParse(gamefile, uname);
      return {
        char: 11,
        Stat1: Ness.ND,
        Stat2: Ness.NUB,
        Stat1Text: "Ness Dair Kill(s) This Game:  ",
        Stat2Text: "Up-B Kill(s) This Game: ",
      };
      break;
    case 12:
      let Peach = PeachParse(gamefile, uname);
      return {
        char: 12,
        Stat1: Peach.PF,
        Stat2: Peach.PS,
        Stat1Text: "Peach Fair Kill(s) This Game: ",
        Stat2Text: "Peach Stich Face(s) This Game: ",
      };

      //console.log("Checking This Char..." + charintGet(gamefile, uname));
      break;
    case 13:
      let Pikachu = PikachuParse(gamefile, uname);
      return {
        char: 13,
        Stat1: Pikachu.ts,
        Stat2: Pikachu.tj,
        Stat1Text: "Pikachu Tailspike Kill(s) This Game: ",
        Stat2Text: "Pikachu Thunderjolt(s) This Game: ",
      };
      //console.log("Checking This Char..." + charintGet(gamefile, uname));
      break;
    case 14:
      let Ice_Climbers = IceClimbersParse(gamefile, uname);
      return {
        char: 14,
        Stat1: Ice_Climbers.DS,
        Stat2: Ice_Climbers.FS,
        Stat1Text: "Downsmash Kill(s) This Game: ",
        Stat2Text: "Forward Smash Kill(s) This Game",
      };

      //console.log("Checking This Char..." + charintGet(gamefile, uname));
      break;
    case 15:
      let Jigglypuff = JigglypuffParse(gamefile, uname);
      return {
        char: 15,
        Stat1: Jigglypuff.bair,
        Stat2: Jigglypuff.Rest,
        Stat1Text: "Jigglypuff Bair Hit(s) This Game: ",
        Stat2Text: "Jigglypuff Rest Kill(s) This Game: ",
      };
      //console.log("Checking This Char..." + charintGet(gamefile, uname));
      break;
    case 16:
      let Samus = SamusParse(gamefile, uname);
      return {
        char: 16,
        Stat1: Samus.cs,
        Stat2: Samus.ms,
        Stat1Text: "Samus Chargeshot Kill(s) This Game: ",
        Stat2Text: "Samus Missile(s) This Game: ",
      };

      //console.log("Checking This Char..." + charintGet(gamefile, uname));
      break;
    case 17:
      let Yoshi = YoshiParse(gamefile, uname);
      return {
        char: 17,
        Stat1: Yoshi.YN,
        Stat2: Yoshi.YDS,
        Stat1Text: "Yoshi Nair Hit(s) This Game: ",
        Stat2Text: "Yoshi Downsmash Kill(s) This Game: ",
      };

      //console.log("Checking This Char..." + charintGet(gamefile, uname));
      break;
    case 18:
      let Zelda = ZeldaParse(gamefile, uname);
      return {
        char: 18,
        Stat1: Zelda.ZFI,
        Stat2: Zelda.ZFI,
        Stat1Text: "Zelda Din's Fire(s) This Game: ",
        Stat2Text: "Zelda Fair Kill(s) This Game",
      };

      //console.log("Checking This Char..." + charintGet(gamefile, uname));
      break;
    case 19:
      let Shiek = ShiekParse(gamefile, uname);
      return {
        char: 19,
        Stat1: Shiek.SN,
        Stat2: Shiek.SNEED,
        Stat1Text: "Sheik Nair Kill(s) This Game: ",
        Stat2Text: "Sheik Needle(s) This Game: ",
      };
      //console.log("Checking This Char..." + charintGet(gamefile, uname));
      break;
    case 20:
      let Falco = FalcoParse(gamefile, uname);
      return {
        char: 20,
        Stat1: Falco.FL,
        Stat2: Falco.FD,
        Stat1Text: "Falco Laser(s) This Game",
        Stat2Text: "Falco Dair(s) This Game",
      };

      //console.log("Checking This Char..." + charintGet(gamefile, uname));
      break;
    case 21:
      let Young_Link = YoungLinkParse(gamefile, uname);
      return {
        char: 21,
        Stat1: Young_Link.YLA,
        Stat2: Young_Link.YLDS,
        Stat1Text: "Young Link Arrow(s) This Game: ",
        Stat2Text: "Young Link Downsmash Kill(s) This Game: ",
      };
      //console.log("Checking This Char..." + charintGet(gamefile, uname));
      break;
    case 22:
      let Dr_Mario = DrMParse(gamefile, uname);
      return {
        char: 22,
        Stat1: Dr_Mario.DRMF,
        Stat2: Dr_Mario.DRMP,
        Stat1Text: "Doctor Mario Fair Kill(s) This Game: ",
        Stat2Text: "Dr Mario Pill(s) This Game: ",
      };
      //console.log("Checking This Char..." + charintGet(gamefile, uname));
      break;
    case 23:
      let Roy = RoyParse(gamefile, uname);
      //console.log("Checking This Char..." + charintGet(gamefile, uname));
      return {
        char: 23,
        Stat1: Roy.RB,
        Stat2: Roy.RS,
        Stat1Text: "Roy Neutral Special Kill(s) This Game: ",
        Stat2Text: "Roy Forward Smash Kill(s) This Game",
      };
    case 24:
      let Pichu = PichuParse(gamefile, uname);
      return {
        char: 24,
        Stat1: Pichu.PB,
        Stat2: Pichu.PTJ,
        Stat1Text: "Pichu Bair Kill(s) This Game: ",
        Stat2Text: "Pichu Thunderjolt(s) This Game: ",
      };
      //console.log("Checking This Char..." + charintGet(gamefile, uname));
      break;
    case 25:
      let Gannnondorf = GannonParse(gamefile, uname);
      return {
        char: 25,
        Stat1: Gannnondorf.GP,
        Stat2: Gannnondorf.GS,
        Stat1Text: "Gannondorf Warlock Punch Hit(s) This Game: ",
        Stat2Text: "Gannondorf Spike Kill(s) This Game:",
      };
      //console.log("Checking This Char..." + charintGet(gamefile, uname));
      break;
    case 26:
      break;
  }
}
function CheckAch(GamefileArray, uname): void {
  for (let i = 0; i in GamefileArray; i++) {
    let gamefile = GamefileArray[i];
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
    let ArrName = [];
    ArrName.push[eval(ClassBaseName + num)];
  }
  return ArrName;
}
electron.ipcRenderer.on("message-from-page", (event, args) => {
  if (args.message == "getAch") {
    let keys = achievementKeys[args.data];
    let returnindex = [];
    for (let i = 0; i in keys; i++) {
      achievementsJson[keys[i]].unlocked = achstore.get(keys[i], false);

      returnindex.push(achievementsJson[keys[i]]);
    }
    message2UI("getAchResult", returnindex);
  }
});

electron.ipcRenderer.on("message-from-page", async (event, args) => {
  if (args.message == "checkAch") {
    const rep = replayDir();
    let slippiFilesToArray = [];
    if (fs.existsSync(rep)) {
      let stagecount = 0;
      let charcount = 0;
      const files = fs.readdirSync(rep, "utf-8");
      files.forEach((file) => {
        if (extname(file) === ".slp") slippiFilesToArray.push(file);
      });

      let uname = store.get("username");
      try {
        for (let i = 0; i in slippiFilesToArray; i++) {
          /*
        if (i === 250) {
          return true;
        } else {
          console.log(i);
        }
        */
          //console.log("Checking this file: " + slippiFilesToArray[i]);
          let gamefile = slippiFilesToArray[i];
          if (
            store.get(gamefile, false) === false &&
            name(gamefile, uname) !== -1
          ) {
            try {
              let game = new SlippiGame(
                join(replayDir(), slippiFilesToArray[i])
              );
              CheckFileAch(gamefile, store.get("username"));
              if (
                info.CharacterNames[
                  game.getSettings().players[
                    name(slippiFilesToArray[i], store.get("username"))
                  ].characterId
                ]
              ) {
                datastore.set(
                  "Char." +
                    info.CharacterNames[
                      game.getSettings().players[
                        name(slippiFilesToArray[i], store.get("username"))
                      ].characterId
                    ],
                  true
                );
              }
              if (info.StageNames[game.getSettings().stageId]) {
                datastore.set(
                  "stage." + info.StageNames[game.getSettings().stageId],
                  true
                );
              }
              message2UI("checkAchLoading", {
                value: getPercentage(slippiFilesToArray, i),
                Gamefile: gamefile,
              });
            } catch (err) {
              console.log("Program ran into an error at gamefile: " + gamefile);
              console.log(err);
            }
            //console.log("File Check Went Ok");
            event.sender.send("clearCache");
            store.set(gamefile, true);
          } else {
            //console.log("Skipping this file" + slippiFilesToArray[i]);

            continue;
          }
        }
        // Chump Checks Down Here (HAVE FUN :))))
        AchievementUnlock("kill", killCheckArray, datastore.get("stocks", 0));
        AchievementUnlock(
          "Game",
          GameCheckArray,
          datastore.get("Game_Total", 0)
        );
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
        AchievementUnlock(
          "NessUpb",
          NessUpbArray,
          datastore.get("Ness_Upb", 0)
        );
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
        for (let i = 0; i in info.CharacterNames; i++) {
          if (statstore.get(info.CharacterNames[i], false)) {
            charcount += 1;
          }
        }
        for (let i = 0; i in info.StageNames; i++) {
          if (statstore.get(info.StageNames[i], false)) {
            stagecount += 1;
          }
        }
        if (charcount > info.CharacterNames.length) {
          achstore.set("Specialist", true);
        }
        if (stagecount > 29) {
          achstore.set("AATW", true);
        }
        console.log("stagecount: " + stagecount);
        console.log("charcount: " + charcount);

        message2UI("checkAchResult", true);
      } catch (err) {
        console.log("Achievement Parser Failed");
        console.log(err);

        message2UI("checkAchResult", false);
      }
    } else {
      //console.log(exist(rep));
      console.log("Couldn't Find Replay Dir");
      //console.log(rep);

      message2UI("checkAchResult", false);
    }
  }
});
function didiwin(gamefile) {
  let rep = replayDir();
  let game = new SlippiGame(join(rep, gamefile));
  try {
    if (
      game.getLatestFrame().players[
        name(gamefile, store.get("username") as string)
      ].post.stocksRemaining != 0
    ) {
      return true;
    } else return false;
  } catch (err) {
    return false;
  }
}
function didIWinStore(gamefile) {
  if (!store.has(parse(gamefile).name + ".win")) {
    store.set(parse(gamefile).name + ".win", didiwin(gamefile));
    return store.get(parse(gamefile).name + ".win");
  } else {
    return store.get(parse(gamefile).name + ".win");
  }
}

electron.ipcRenderer.on("message-from-page", (event, args) => {
  if (args.message == "checkThisFile") {
    let gamefile = args.data;
    let rep = replayDir();
    let uname = name(gamefile, store.get("username") as string);
    let slpcheck = checkSlippiFiles(
      gamefile,
      store.get("username", null) as string
    );
    let game = new SlippiGame(join(rep, gamefile));
    let filename = parse(gamefile).name;
    let charparse = characterConditionalParse(gamefile, store.get("username"));
    let altobj = {};
    altobj["name1"] = game.getMetadata().players[0].names.netplay;
    altobj["name2"] = game.getMetadata().players[1].names.netplay;
    altobj["stage"] = info.StageNames[game.getSettings().stageId];
    altobj["char"] = info.CharacterNames[charparse.char];
    altobj["Stats"] = [
      charparse.Stat1,
      charparse.Stat1Text,
      charparse.Stat2,
      charparse.Stat2Text,
    ];

    message2UI("checkThisFileResult", { slpparse: slpcheck, alt: altobj });
  }
});
electron.ipcRenderer.on("message-from-page", (event, args) => {
  if (args.message == "getFileArray") {
    try {
      console.log("Working on getFileArray...");
      let slippiFilesToArray = [];
      const rep = replayDir();
      const uname = store.get("username");

      if (fs.existsSync(rep)) {
        const ReturnArray = [];
        const files = fs.readdirSync(rep, "utf-8");
        const slippiFilesToArray: string[] = [];
        let opponentname;

        files.forEach((file) => {
          if (extname(file) === ".slp") slippiFilesToArray.push(file);
        });
        if (slippiFilesToArray == null) {
          message2UI("getFileArrayResult", null);
        }

        for (let i = 0; i in slippiFilesToArray; i++) {
          let stagename;
          if (
            name(slippiFilesToArray[i], store.get("username")) !== -1 &&
            name(slippiFilesToArray[i], store.get("username")) !== undefined
          ) {
            const game = new SlippiGame(join(rep, slippiFilesToArray[i]));
            const { players } = game.getMetadata() as MetadataTypePlayers;

            const names = [];
            for (let i = 0; i in players; i++)
              names.push(players[i].names.netplay);

            if (name(slippiFilesToArray[i], store.get("username")) === 0)
              opponentname = players[1].names.netplay;
            else opponentname = players[0].names.netplay;
            if (
              info.StageNames[game.getSettings().stageId as number] !==
              undefined
            ) {
              stagename = info.StageNames[game.getSettings().stageId as number];
            } else {
              stagename = "Unknown";
            }
            ReturnArray.push({
              FileName: slippiFilesToArray[i],
              names,
              Stage: stagename,
              oppName: opponentname,
              win: didIWinStore(slippiFilesToArray[i]),
            });
          }
          message2UI("fileArrayProgress", {
            value: getPercentage(slippiFilesToArray, i),
            gamefile: slippiFilesToArray[i],
          });
        }

        message2UI("getFileArrayResult", ReturnArray);
      }
    } catch (err) {
      console.log(err);
      message2UI("getFileArrayError", null);
    }
  }
});
function nameflip(int) {
  if (int == 1) {
    return 0;
    console.log("Nameflip returned 0");
  } else {
    return 1;
    console.log("Nameflip returned 1");
  }
}
// TODO Configue AddToStore to support diffrent store names
function AddToStoreStats(storename: string, addint: number) {
  statstore.set(storename, statstore.get(storename, 0) + addint);
}
electron.ipcRenderer.on("message-from-page", (event, args) => {
  if (args.message == "getGeneralStats") {
    const rep = replayDir();
    if (fs.existsSync(rep)) {
      let slippiFilesToArray = [];
      const files = fs.readdirSync(rep, "utf-8");
      let largest = 0;
      let largestname = "";
      let largestalt = 0;
      let largestaltname = "";
      let opparray = [];
      let largestopponent = 0;
      let largestopponentname = "";
      let largestopponentloss = 0;
      let largestopponentlossname = "";
      let worstmu = "";
      let worstmunum = 0;
      let bestmu = "";
      let bestmunum = 0;
      let beststage = "";
      let beststagenum = 0;
      let worststage = "";
      let worststagenum = 0;
      let murder = statstore.get("TotalStocks", 0) as number;
      let damage = statstore.get("TotalDamage", 0) as number;
      console.log(damage);
      console.log(murder);

      files.forEach((file) => {
        if (extname(file) === ".slp") slippiFilesToArray.push(file);
      });
      for (let i = 0; i in slippiFilesToArray; i++) {
        try {
          let game = new SlippiGame(join(rep, slippiFilesToArray[i]));
          if (!store.get(parse(slippiFilesToArray[i]).name + ".Stats", false)) {
            store.set(parse(slippiFilesToArray[i]).name + ".Stats", true);
            if (game.getSettings().stageId !== 294) {
              if (
                name(slippiFilesToArray[i], store.get("username") as string) !=
                -1
              ) {
                console.log(slippiFilesToArray[i]);

                let opponentname = "";
                if (
                  name(
                    slippiFilesToArray[i],
                    store.get("username") as string
                  ) === 0
                ) {
                  opponentname = game.getMetadata().players[1].names.netplay;
                } else {
                  opponentname = game.getMetadata().players[0].names.netplay;
                }

                if (!opparray.includes(opponentname)) {
                  opparray.push(opponentname);
                }

                AddToStoreStats("Game_Total", 1);
                damage += Math.ceil(
                  game.getStats().overall[
                    name(slippiFilesToArray[i], store.get("username"))
                  ].totalDamage
                );
                murder += game.getStats().overall[
                  name(slippiFilesToArray[i], store.get("username"))
                ].killCount;
                console.log(damage);
                console.log(murder);

                AddToStoreStats(
                  "TotalDeaths",
                  game.getStats().overall[
                    nameflip(
                      name(
                        slippiFilesToArray[i],
                        store.get("username") as string
                      )
                    )
                  ].killCount
                );
                if (game.getGameEnd() !== null) {
                  if (
                    game.getGameEnd().lrasInitiatorIndex ===
                    name(slippiFilesToArray[i], store.get("username") as string)
                  ) {
                    AddToStoreStats("ILRAS", 1);
                  } else if (
                    game.getGameEnd().lrasInitiatorIndex ===
                    nameflip(
                      name(
                        slippiFilesToArray[i],
                        store.get("username") as string
                      )
                    )
                  ) {
                    AddToStoreStats("OppLRAS", 1);
                  }
                }
                if (didiwin(slippiFilesToArray[i])) {
                  AddToStoreStats("TotalWins", 1);
                  AddToStoreStats(
                    info.CharacterNames[
                      game.getSettings().players[
                        nameflip(
                          name(
                            slippiFilesToArray[i],
                            store.get("username") as string
                          )
                        )
                      ].characterId
                    ] + ".wins",
                    1
                  );
                  AddToStoreStats(
                    info.StageNames[game.getSettings().stageId] + ".wins",
                    1
                  );
                } else {
                  AddToStoreStats(
                    info.CharacterNames[
                      game.getSettings().players[
                        nameflip(
                          name(
                            slippiFilesToArray[i],
                            store.get("username") as string
                          )
                        )
                      ].characterId
                    ] + ".loss",
                    1
                  );
                  AddToStoreStats(
                    info.StageNames[game.getSettings().stageId] + ".loss",
                    1
                  );
                }

                //let game = new SlippiGame(join(rep, slippiFilesToArray[i]));
                AddToStoreStats(
                  info.StageNames[game.getSettings().stageId] + ".played",
                  1
                );
                if (didiwin(slippiFilesToArray[i], store.get("username"))) {
                  AddToStoreStats(opponentname + ".win", 1);
                } else {
                  AddToStoreStats(opponentname + ".loss", 1);
                }
                AddToStoreStats(
                  info.CharacterNames[
                    charintGet(
                      slippiFilesToArray[i],
                      store.get("username") as string
                    )
                  ] + ".played",
                  1
                );
              }
            }
            console.log(statstore.get("TotalStocks"));

            message2UI("StatsLoadingBar", {
              task:
                "Stealing Stats From Files, Stock Count: " +
                statstore.get("TotalStocks"),
              progress: Math.ceil(100 * (i / slippiFilesToArray.length)),
              total: slippiFilesToArray.length,
            });
          }
        } catch (err) {
          console.log(err);
          console.log(slippiFilesToArray[i]);

          continue;
        }
        statstore.set("TotalStocks", murder);
        statstore.set("TotalDamage", damage);
      }
      for (let i = 0; i in info.StageNames; i++) {
        if (statstore.get(info.StageNames[i] + ".played", 0) > largest) {
          largest = statstore.get(info.StageNames[i] + ".played") as number;
          largestname = info.StageNames[i];
        }
        if (statstore.get(info.StageNames[i] + ".wins", 0) > beststagenum) {
          beststagenum = statstore.get(info.StageNames[i] + ".wins") as number;
          beststage = info.StageNames[i];
        } else
          console.log(
            "Stage Store: " + statstore.get(info.StageNames[i] + ".wins")
          );
        if (statstore.get(info.StageNames[i] + ".loss", 0) > worststagenum) {
          worststagenum = statstore.get(info.StageNames[i] + ".loss") as number;
          worststage = info.StageNames[i];
        }
        message2UI("StatsLoadingBar", {
          task: "Checking " + info.StageNames[i] + " Right Now",
          progress: Math.ceil(100 * (i / info.StageNames.length)),
          total: info.StageNames.length,
        });
      }
      for (let i = 0; i in info.CharacterNames; i++) {
        if (statstore.get(info.CharacterNames[i] + ".played", 0) > largestalt) {
          largestalt = statstore.get(
            info.CharacterNames[i] + ".played",
            0
          ) as number;
          largestaltname = info.CharacterNames[i];
        }
        if (statstore.get(info.CharacterNames[i] + ".loss", 0) > worstmunum) {
          worstmunum = statstore.get(
            info.CharacterNames[i] + ".loss"
          ) as number;
          worstmu = info.CharacterNames[i];
        }
        if (statstore.get(info.CharacterNames[i] + ".wins", 0) > bestmunum) {
          bestmunum = statstore.get(info.CharacterNames[i] + ".wins") as number;
          bestmu = info.CharacterNames[i];
        } else
          console.log(
            "Character Wins:" + statstore.get(info.CharacterNames[i] + ".wins")
          );

        message2UI("StatsLoadingBar", {
          task: "Checking " + info.CharacterNames[i] + " Right Now",
          progress: Math.ceil(100 * (i / info.CharacterNames.length)),
          total: info.CharacterNames.length,
        });
      }
      for (let i = 0; i in opparray; i++) {
        if (statstore.get(opparray[i] + ".win") > largestopponent) {
          largestopponent = statstore.get(opparray[i] + ".win") as number;
          largestopponentname = opparray[i];
          statstore.set("DomOpp" + ".name", largestopponentname);
          statstore.set("DomOpp" + ".num", largestopponent);
          message2UI("StatsLoadingBar", {
            task: "Checking Games Against This Opponent: " + opparray[i],
            progress: Math.ceil(100 * (i / opparray.length)),
            total: opparray.length,
          });
          continue;
        } else {
          message2UI("StatsLoadingBar", {
            task: "Checking Wins Against This Opponent: " + opparray[i],
            progress: Math.ceil(100 * (i / opparray.length)),
            total: opparray.length,
          });
          continue;
        }
      }
      for (let i = 0; i in opparray; i++) {
        if (statstore.get(opparray[i] + ".loss") > largestopponentloss) {
          largestopponentloss = statstore.get(opparray[i] + ".loss") as number;
          largestopponentlossname = opparray[i];
          statstore.set("DomOppLoss" + ".name", largestopponentlossname);
          statstore.set("DomOppLoss" + ".num", largestopponentloss);
          message2UI("StatsLoadingBar", {
            task: "Checking Losses Against This Opponent: " + opparray[i],
            progress: Math.ceil(100 * (i / opparray.length)),
            total: opparray.length,
          });
          continue;
        } else {
          message2UI("StatsLoadingBar", {
            task: "Checking Losses Against This Opponent: " + opparray[i],
            progress: Math.ceil(100 * (i / opparray.length)),
            total: opparray.length,
          });
          continue;
        }
      }
      let returnobj = {
        stage: largestname,
        char: largestaltname,
        stagenum: largest,
        charnum: largestalt,
        beststage: beststage,
        beststagenum: beststagenum,
        bestmu: bestmu,
        bestmunum: bestmunum,
        worstmu: worstmu,
        worstmunum: worstmunum,
        worststage: worststage,
        worststagenum: worststagenum,
        wlratio: (
          (statstore.get("TotalWins", 0) as number) /
          statstore.get("Game_Total", 0)
        ).toFixed(2),

        kdratio: (
          statstore.get("TotalStocks") / statstore.get("TotalDeaths")
        ).toFixed(2),
        lrasratio: (statstore.get("ILRAS") / statstore.get("OppLRAS")).toFixed(
          2
        ),
      };
      message2UI("getGeneralStatsResult", returnobj);
    }
  }
});
//i really dont feel like thinking right now
// Depreciated for AchivementCheck Function. This was stupid and im happy i could come up with a function.
/*
if(Game_Total >= 1){
  Game1.unlocked = true
  if(Game_Total >= 10){
    Game2.unlocked = true
    if(Game_Total >= 50){
      Game3.unlocked = true
      if(Game_Total >= 100){
        Game4.unlocked = true
        if(Game_Total >= 250){
          Game5.unlocked = true
          if(Game_Total >= 500){
            Game6.unlocked = true
            if(Game_Total >= 1000){
              Game7.unlocked = true
              if(Game_Total >= 2500){
                Game8.unlocked = true
                if(Game_Total >= 5000){
                  Game9.unlocked = true
                  if(Game_Total >= 100000){
                    Game10.unlocked = true
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
