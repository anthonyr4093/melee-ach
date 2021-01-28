/*
Notes:
It seems like keeping all frame data for slippi files takes up alot of memory when held there, makes sense but i think on demand scans of slippi files will probably be needed. This will lead to long processing times for achievements, making this a really non-viable option for running in the background as played. Or im possibly just overthinking this. Probably the ladder.
TODO: Test storing only individual player frame data, and only post frames, this should save a fourth of the memory usage. Hopefully. Worried about this running on lower-end pcs.
TODO: Setup inputs for user data like usernames.
TODO: put todos in more relevant places.
*/

import fs from "fs";
import { basename, extname, join } from "path";
import electron from "electron";
import Store from "electron-store";

import SlippiGame, { ItemUpdateType, MetadataType } from "@slippi/slippi-js";

import achievementsJson from "./achievements.json";
import achievementKeys from "./keys.json";

type Achievements = Record<
  string,
  {
    name: string | null;
    desc: string;
    unlocked?: boolean;
  }
>;

const achievements: Achievements = achievementsJson;

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
const datastore = new Store(datastoredata);
const achstore = new Store(Achstoredata);

achstore.set("dummy", null);

datastore.set("dummy", null);

const replayDir = () =>
  (store.get("Replay_Directory") as string).replace(/\\\\/g, "\\");

electron.ipcMain.handle("IsSettingsValid?", function (event, args) {
  //console.log("Checking...");
  const rep = args.Replay_Directory[0].toString().replace(/\\\\/g, "\\");
  // console.log(typeof rep);
  if (fs.existsSync(rep)) {
    // console.log("Settings Are Valid");
    store.delete("Replay_Directory");
    store.set("username", args.username);
    store.set("Replay_Directory", rep.replace(/\\\\/g, "\\"));
    return true;
  } else {
    //console.log("Settings Are Not Valid");
    //console.log(rep);
    return false;
  }
});

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
      const key = `${AchName} ${i + 1}`;

      achievements[key].unlocked = true;
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

  let game = new SlippiGame(join(rep, gamefile));
  let int = game.getSettings().players[name(gamefile, uname)].characterId;

  return int;
}

function CheckMoveKill(gamefile: string, AttackID: number, Uname: string) {
  const rep = replayDir();
  const game = new SlippiGame(join(rep, gamefile));
  const stats = game.getStats();
  const frames = game.getFrames();
  let count = 0;
  for (let i = 0; i in stats.conversions; i++) {
    if (stats.conversions[i].didKill) {
      if (stats.conversions[i].playerIndex === name(gamefile, Uname)) {
        // console.log(frames[stats.conversions[i].endFrame].players[name(gamefile)].post.lastAttackLanded)
        if (
          (frames[stats.conversions[i].endFrame as number].players[
            name(gamefile, Uname)
          ]?.post.lastAttackLanded as number) === AttackID
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
        console.log("Set Last Frame Check to false");

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
          if (
            UniqueItemId.includes(frames[n].items?.[i].spawnId as number) ===
            false
          ) {
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
function CheckLastHit(
  gamefile: string,
  AttackID: number,
  ActionStateID: number,
  Uname: string
) {
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
        frames[i].players[name(gamefile, Uname)]?.post.actionStateId ==
        ActionStateID
      )
        continue;
      else {
        LastFrameCheck = false;
        continue;
      } else {
        if (
          frames[i].players[name(gamefile, Uname)].post.actionStateId ==
          ActionStateID
        ) {
          continue;
        } else {
          LastFrameCheck = false;
          continue;
        }
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
  return { kn: Knee, fp: CheckLastHit(gamefile, 18, 347, uname) };
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
  JiggBackair += CheckLastHit(gamefile, 15, 67, uname);
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
  GanPunch += CheckLastHit(gamefile, 18, 347, uname);
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
  }
  return { PF: PeachFair, PS: PeachStich };
}
function YoshiParse(gamefile, uname) {
  let YoshiNair = 0;
  let YoshiDownSmash = 0;
  YoshiNair += CheckLastHit(gamefile, 13, 65, uname);
  YoshiDownSmash += CheckMoveKill(gamefile, 12, uname);
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
  YounglinkDS += CheckMoveKill(gamefile, 12, uname);
  return { YLA: YounglinkArrow, YLDS: YounglinkDS };
}
function KirbyParse(gamefile, uname) {
  let KirbyCide = 0;
  let KirbyNair = 0;
  KirbyCide +=
    CheckMoveKill(gamefile, 53, uname) + CheckMoveKill(gamefile, 54, uname);
  KirbyNair += CheckLastHit(gamefile, 13, 65, uname);
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
    CheckLastHit(gamefile, 20, 360, uname) +
    CheckLastHit(gamefile, 20, 364, uname);
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
  //console.log("Got Request For: " + gamefile);

  if (store.get(gamefile, false) === false) {
    // console.log(gamefile + " Not in the store");
    // console.log(charintGet(gamefile, uname));

    let temp = checkSlippiFiles(gamefile, uname);
    datastore.set("stocks", datastore.get("stocks", 0) + temp.stock);
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
    if (temp.comp) AddToStore("Game_Total", 1);
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

electron.ipcMain.handle("GetAch", (_event, args) => {
  return Object.keys(achievementKeys).map((key) => achievements[key]);
});

electron.ipcMain.handle("CheckAch", async (event, args) => {
  const rep = replayDir();

  if (fs.existsSync(rep)) {
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
            CheckFileAch(gamefile, store.get("username"));
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
    //console.log(exist(rep));
    console.log("Couldn't Find Replay Dir");
    //console.log(rep);

    return false;
  }
});

electron.ipcMain.handle("GetFileArray", (event, args) => {
  let stageid = [
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

    for (let i = 0; i in slippiFilesToArray; i++) {
      if (
        name(slippiFilesToArray[i], store.get("username")) !== -1 &&
        name(slippiFilesToArray[i], store.get("username")) !== undefined
      ) {
        const game = new SlippiGame(join(rep, slippiFilesToArray[i]));
        const { players } = game.getMetadata() as MetadataTypePlayers;

        const names = [];
        for (let i = 0; i in players; i++) names.push(players[i].names.netplay);

        if (name(slippiFilesToArray[i], store.get("username") === 0))
          opponentname = players[1].names.netplay;
        else opponentname = players[0].names.netplay;

        ReturnArray.push({
          FileName: slippiFilesToArray[i],
          names,
          Stage: stageid[game.getSettings().stageId as number],
          oppName: opponentname,
        });
      }
    }

    return ReturnArray;
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
