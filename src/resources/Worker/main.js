"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs_1 = tslib_1.__importDefault(require("fs"));
const path_1 = require("path");
const electron_1 = tslib_1.__importDefault(require("electron"));
const electron_store_1 = tslib_1.__importDefault(require("electron-store"));
const slippi_js_1 = tslib_1.__importDefault(require("@slippi/slippi-js"));
const achievements_json_1 = tslib_1.__importDefault(require("./achievements.json"));
const keys_json_1 = tslib_1.__importDefault(require("./keys.json"));
const info_json_1 = tslib_1.__importDefault(require("./info.json"));
const achievements = achievements_json_1.default;
let message2UI = (command, payload) => {
    electron_1.default.ipcRenderer.send("message-from-worker", {
        command: command,
        payload: payload,
    });
};
function getPercentage(array, int) {
    return Math.round(100 * (int / array.length));
}
electron_1.default.ipcRenderer.on("message-from-page", (event, args) => {
    console.log(args);
    console.log("NotYourFriend");
    let arg = args.data;
    if (args.message == "checkSettings") {
        console.log("correct message");
        try {
            const rep = arg.Replay_Directory.toString().replace(/\\\\/g, "\\");
            console.log("we set rep");
            if (fs_1.default.existsSync(rep)) {
                console.log("rep Exists");
                store.delete("Replay_Directory");
                store.set("username", arg.username);
                store.set("Replay_Directory", rep.replace(/\\\\/g, "\\"));
                console.log("returning true");
                message2UI("resultCheckSettings", true);
            }
            else {
                console.log("rep Exists");
                console.log("returning false");
                message2UI("resultCheckSettings", false);
            }
        }
        catch (err) {
            console.log(err);
            message2UI("resultCheckSettings", false);
        }
    }
    else {
        console.log("not checkSettings for some reason fuck this stupid shit i hate it so much like jesus christ");
    }
});
console.log("Sent Message to Main");
const store = new electron_store_1.default();
const datastoredata = { name: "Data" };
const Achstoredata = { name: "Ach" };
const StatsStoreData = { name: "Stats" };
const datastore = new electron_store_1.default(datastoredata);
const achstore = new electron_store_1.default(Achstoredata);
const statstore = new electron_store_1.default(StatsStoreData);
const replayDir = () => store.get("Replay_Directory").replace(/\\\\/g, "\\");
const slippiFilesToArray = [];
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
const GameCheckArray = [1, 10, 50, 100, 250, 500, 1000, 2500, 5000, 10000];
const FireCheckArray = [1, 1000, 100000];
const marSpikeCheckArray = [1, 10, 100];
const ShineCheckArray = [1, 1000, 100000];
const ShineSpikeCheckArray = [1, 10, 100];
const KneeCheckArray = [1, 50, 100];
const FalconPunchArray = [1, 10, 50];
const CargoThrowArray = [1, 10, 100];
const DonkeyPArray = [1, 10, 100];
const RoyNeutralBArray = [1, 10, 100];
const RoySideSmashArray = [1, 10, 100];
const KirbycideArray = [1, 10, 100];
const KirbyNairArray = [1, 10, 100];
const BowserNairArray = [1, 10, 100];
const BowserUpBArray = [1, 10, 100];
const LinkNairArray = [1, 10, 100];
const LinkBombArray = [1, 100, 10000];
const ShiekNairArray = [1, 10, 100];
const ShiekNeedleArray = [50, 500, 50000];
const NessdairArray = [1, 10, 100];
const NessUpbArray = [1, 10, 100];
const PeachStickArray = [1, 10, 100];
const PeachFairArray = [1, 10, 100];
const IceClimbersFSArray = [1, 10, 100];
const IceClimbersDSArray = [1, 10, 100];
const TailSpikeArray = [1, 10, 100];
const ThunderJoltArray = [1, 10, 100];
const MissileArray = [1, 500, 5000];
const ChargeShotArray = [1, 50, 500];
const YoshiNairArray = [10, 100, 1000];
const YoshiDownSmashArray = [1, 10, 100];
const JigBackAirArray = [1, 100, 10000];
const RestKillArray = [1, 10, 100];
const MewtwoArray = [1, 10, 100];
const LuigiSlipperyArray = [1, 1000, 100000];
const MisfireArray = [1, 10, 1000];
const MarthSpikeArray = [1, 10, 100];
const MarthGrabArray = [1, 100, 1000];
const ZeldaFairArray = [1, 10, 100];
const ZeldaFireArray = [1, 100, 10000];
const YinkArrowArray = [1, 100, 1000];
const YinkDownSmashArray = [1, 10, 100];
const FalcoDairArray = [1, 100, 10000];
const FalcoLaserArray = [10, 1000, 100000];
const PichuTJoltArray = [1, 100, 10000];
const PichuBairArray = [1, 10, 100];
const GNWKeyArray = [1, 10, 100];
const GNWNairArray = [1, 10, 100];
const GannonPArray = [1, 10, 100];
const GannonSArray = [1, 10, 100];
const DRMPillsArray = [1, 100, 10000];
const DRMFairArray = [1, 10, 100];
const RepDirExist = false;
function AchievementUnlock(AchName, ChumpCheck, int) {
    for (let i = 0; i in ChumpCheck; i++) {
        if (int > ChumpCheck[i]) {
            const key = `${AchName}${i + 1}`;
            achstore.set(key, true);
            continue;
        }
        else
            continue;
    }
}
function name(gamefile, name) {
    const rep = replayDir();
    const game = new slippi_js_1.default(path_1.join(rep, gamefile));
    const settings = game.getSettings();
    const metadata = game.getMetadata();
    try {
        for (let i = 0; i in settings.players; i++) {
            if (settings.players[i].type != 1 && metadata.players[i].names != null) {
                if (metadata.players[i].names.netplay.toLowerCase() ==
                    name.toString().toLowerCase()) {
                    return i;
                }
                else {
                    continue;
                }
            }
            else {
                return -1;
            }
        }
    }
    catch (err) {
        return -1;
    }
    return -1;
}
function charintGet(gamefile, uname) {
    const rep = replayDir();
    try {
        let game = new slippi_js_1.default(path_1.join(rep, gamefile));
        let int = game.getSettings().players[name(gamefile, uname)].characterId;
        return int;
    }
    catch (err) {
        let game = new slippi_js_1.default(path_1.join(rep, gamefile));
        console.log(err);
        console.log(name(gamefile, uname));
    }
}
function CheckMoveKill(gamefile, AttackID, Uname) {
    var _a;
    const rep = replayDir();
    const game = new slippi_js_1.default(path_1.join(rep, gamefile));
    const stats = game.getStats();
    const frames = game.getFrames();
    let count = 0;
    for (let i = 0; i in stats.conversions; i++) {
        if (stats.conversions[i].didKill &&
            stats.conversions[i].playerIndex === name(gamefile, Uname)) {
            if (((_a = frames[stats.conversions[i].endFrame].players[name(gamefile, Uname)]) === null || _a === void 0 ? void 0 : _a.post.lastAttackLanded) === AttackID) {
                count += 1;
            }
        }
    }
    return count;
}
function CheckActionID(gamefile, ActionID, Uname) {
    var _a, _b;
    let LastFrameCheck = false;
    let count = 0;
    const rep = replayDir();
    const game = new slippi_js_1.default(path_1.join(rep, gamefile));
    const frames = game.getFrames();
    for (let i = 0; i in frames; i++) {
        if (LastFrameCheck === false) {
            if (((_a = frames[i].players[name(gamefile, Uname)]) === null || _a === void 0 ? void 0 : _a.post.actionStateId) ===
                ActionID) {
                LastFrameCheck = true;
                count += 1;
                continue;
            }
            else if (((_b = frames[i].players[name(gamefile, Uname)]) === null || _b === void 0 ? void 0 : _b.post.actionStateId) ===
                ActionID)
                continue;
        }
        else {
            LastFrameCheck = false;
            continue;
        }
    }
    return count;
}
function ItemIDCheck(gamefile, itemid, Uname) {
    var _a, _b, _c, _d;
    const rep = replayDir();
    const game = new slippi_js_1.default(path_1.join(rep, gamefile));
    const frames = game.getFrames();
    let UniqueItemId = [-1];
    let Count = 0;
    for (let n = 0; n in frames; n++) {
        if (frames[n].items != undefined) {
            for (let i = 0; i in frames[n].items; i++) {
                for (let z = 0; z in UniqueItemId; z++) {
                    if (!UniqueItemId.includes((_a = frames[n].items) === null || _a === void 0 ? void 0 : _a[i].spawnId)) {
                        UniqueItemId.push((_b = frames[n].items) === null || _b === void 0 ? void 0 : _b[i].spawnId);
                        if (((_c = frames[n].items) === null || _c === void 0 ? void 0 : _c[i].owner) === name(gamefile, Uname) &&
                            ((_d = frames[n].items) === null || _d === void 0 ? void 0 : _d[i].typeId) === itemid) {
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
function CheckLastHit(gamefile, AttackID, Uname) {
    var _a, _b;
    let LastFrameCheck = false;
    let count = 0;
    const rep = replayDir();
    const game = new slippi_js_1.default(path_1.join(rep, gamefile));
    const frames = game.getFrames();
    for (let i = 0; i in frames; i++) {
        if (LastFrameCheck === false) {
            if (((_a = frames[i].players[name(gamefile, Uname)]) === null || _a === void 0 ? void 0 : _a.post.lastAttackLanded) ==
                AttackID) {
                LastFrameCheck = true;
                count += 1;
                continue;
            }
            else if (((_b = frames[i].players[name(gamefile, Uname)]) === null || _b === void 0 ? void 0 : _b.post.lastAttackLanded) ==
                AttackID)
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
function checkSlippiFiles(gamefile, Uname) {
    const rep = replayDir();
    const game = new slippi_js_1.default(path_1.join(rep, gamefile));
    const game_complete = null;
    const player = name(gamefile, Uname);
    let murder;
    let dam;
    if (game.getStats().gameComplete) {
        try {
            if (game.getMetadata().players != undefined &&
                game.getMetadata().players != null &&
                name(gamefile, Uname) != -1) {
                murder = game.getStats().overall[player].killCount;
            }
            else
                "Yo idiot, theres an error here: " + gamefile;
        }
        catch (err) {
            console.log("slp general check ran into an error at" + gamefile);
        }
        if (game.getStats().gameComplete) {
            try {
                dam = Math.ceil(game.getStats().overall[player].totalDamage);
            }
            catch (err) {
            }
        }
        null;
    }
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
    const game = new slippi_js_1.default(path_1.join(rep, gamefile));
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
    TJolt += ItemIDCheck(gamefile, 89, uname);
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
    const game = new slippi_js_1.default(path_1.join(rep, gamefile));
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
                    if (frames[n].items[i].owner === name(gamefile, Uname) &&
                        frames[n].items[i].typeId === 99 &&
                        frames[n].frame[i].turnipFace === 7)
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
function AddToStore(storename, addint) {
    datastore.set(storename, datastore.get(storename, 0) + addint);
}
function CheckFileAch(gamefile, uname) {
    if (store.get(gamefile, false) === false) {
        let game = new slippi_js_1.default(path_1.join(replayDir(), gamefile));
        datastore.set("stocks", datastore.get("stocks", 0) +
            game.getStats().overall[name(gamefile, store.get("username"))].killCount);
        switch (charintGet(gamefile, uname)) {
            case 0:
                let Falcon = FalconParse(gamefile, uname);
                AddToStore("Falcon_Punch", Falcon.fp);
                AddToStore("Falcon_Knee", Falcon.kn);
                break;
            case 1:
                let donkeyK = DonkeyParse(gamefile, uname);
                AddToStore("Donkey_Punch", donkeyK.DP);
                AddToStore("Cargo_Throw", donkeyK.CT);
                break;
            case 2:
                let fox = foxParse(gamefile, uname);
                AddToStore("Shine", fox.Shine);
                AddToStore("Shine_Spike", fox.ShineSpike);
                break;
            case 3:
                let GNW = GameAndWatchParse(gamefile, uname);
                AddToStore("GNWK", GNW.GK);
                AddToStore("GNWN", GNW.GN);
                break;
            case 4:
                let Kirby = KirbyParse(gamefile, uname);
                AddToStore("Kirbycide", Kirby.KC);
                AddToStore("Kirby_Nair", Kirby.KN);
                break;
            case 5:
                let Bowser = BowserParse(gamefile, uname);
                AddToStore("Bowser_Nair", Bowser.BN);
                AddToStore("Bowser_Upb", Bowser.BUB);
                break;
            case 6:
                let Link = linkParse(gamefile, uname);
                AddToStore("LinkNair", Link.LinkN);
                AddToStore("LinkBomb", Link.LinkB);
                break;
            case 7:
                let Luigi = LuigiParse(gamefile, uname);
                AddToStore("Luigi_Wavedash", Luigi.wd);
                AddToStore("Misfire", Luigi.Mis);
                break;
            case 8:
                let Mario = marioParse(gamefile, uname);
                AddToStore("Fireball", Mario.fb);
                AddToStore("Mario_Spike", Mario.fs);
            case 9:
                let Marth = MarthParse(gamefile, uname);
                AddToStore("Marth_Grab", Marth.mg);
                AddToStore("Marth_Spike", Marth.ms);
                break;
            case 10:
                let Mewtwo = MewtwoParse(gamefile, uname);
                AddToStore("Mewtwo_Fair", Mewtwo.MF);
                AddToStore("Mewtwo_ShadowBall", Mewtwo.MB);
                break;
            case 11:
                let Ness = NessParse(gamefile, uname);
                AddToStore("Ness_Dair", Ness.ND);
                AddToStore("Ness_Upb", Ness.NUB);
                break;
            case 12:
                let Peach = PeachParse(gamefile, uname);
                AddToStore("Peach_Fair", Peach.PF);
                AddToStore("Peach_Stich", Peach.PS);
                break;
            case 13:
                let Pikachu = PikachuParse(gamefile, uname);
                AddToStore("Pikachu_Tjolt", Pikachu.tj);
                AddToStore("Pikachu.Tailspike", Pikachu.ts);
                break;
            case 14:
                let Ice_Climbers = IceClimbersParse(gamefile, uname);
                AddToStore("ICDS", Ice_Climbers.DS);
                AddToStore("ICFS", Ice_Climbers.FS);
                break;
            case 15:
                let Jigglypuff = JigglypuffParse(gamefile, uname);
                AddToStore("Jigglypuff_Rest", Jigglypuff.Rest);
                AddToStore("Jigglypuff_Bair", Jigglypuff.bair);
                break;
            case 16:
                let Samus = SamusParse(gamefile, uname);
                AddToStore("Samus_Chargeshot", Samus.cs);
                AddToStore("Samus_Missile", Samus.ms);
                break;
            case 17:
                let Yoshi = YoshiParse(gamefile, uname);
                AddToStore("Yoshi_Downsmash", Yoshi.YDS);
                AddToStore("Yoshi_Nair", Yoshi.YN);
                break;
            case 18:
                let Zelda = ZeldaParse(gamefile, uname);
                AddToStore("Zelda_Fair", Zelda.ZF);
                AddToStore("Zelda_Fire", Zelda.ZFI);
                break;
            case 19:
                let Shiek = ShiekParse(gamefile, uname);
                AddToStore("Sheik_Needle", Shiek.SNEED);
                AddToStore("Shiek_Nair", Shiek.SN);
                break;
            case 20:
                let Falco = FalcoParse(gamefile, uname);
                AddToStore("Falco_Dair", Falco.FD);
                AddToStore("Falco_Laser", Falco.FL);
                break;
            case 21:
                let Young_Link = YoungLinkParse(gamefile, uname);
                AddToStore("Yink_Arrow", Young_Link.YLA);
                AddToStore("Yink_Downsmash", Young_Link.YLDS);
                break;
            case 22:
                let Dr_Mario = DrMParse(gamefile, uname);
                AddToStore("DRMF", Dr_Mario.DRMF);
                AddToStore("DRMP", Dr_Mario.DRMP);
                break;
            case 23:
                let Roy = RoyParse(gamefile, uname);
                AddToStore("Roy_B", Roy.RB);
                AddToStore("Roy_Fsmash", Roy.RS);
                break;
            case 24:
                let Pichu = PichuParse(gamefile, uname);
                AddToStore("Pichu_Bair", Pichu.PB);
                AddToStore("Pichu_Tjolt", Pichu.PTJ);
                break;
            case 25:
                let Gannnondorf = GannonParse(gamefile, uname);
                AddToStore("Gannon_Punch", Gannnondorf.GP);
                AddToStore("Gannon_Spike", Gannnondorf.GS);
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
        case 9:
            let Marth = MarthParse(gamefile, uname);
            return {
                char: 9,
                Stat1: Marth.mg,
                Stat2: Marth.ms,
                Stat1Text: "Grab(s) This Game: ",
                Stat2Text: "Spike Kill(s) This Game: ",
            };
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
            break;
        case 23:
            let Roy = RoyParse(gamefile, uname);
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
            break;
        case 26:
            break;
    }
}
function CheckAch(GamefileArray, uname) {
    for (let i = 0; i in GamefileArray; i++) {
        let gamefile = GamefileArray[i];
        CheckFileAch(gamefile, uname);
    }
    AchievementUnlock("kill", killCheckArray, datastore.get("stocks", 0));
    AchievementUnlock("Game", GameCheckArray, datastore.get("Game_Total", 0));
    AchievementUnlock("Fire", FireCheckArray, datastore.get("Fireball", 0));
    AchievementUnlock("MarioSpike", marSpikeCheckArray, datastore.get("Mario_Spike", 0));
    AchievementUnlock("shine", ShineCheckArray, datastore.get("Shine", 0));
    AchievementUnlock("ShineSpike", ShineSpikeCheckArray, datastore.get("Shine_Spike", 0));
    AchievementUnlock("Knee", KneeCheckArray, datastore.get("Falcon_Punch", 0));
    AchievementUnlock("FalconPunch", FalconPunchArray, datastore.get("Falcon_Knee", 0));
    AchievementUnlock("CargoThrow", CargoThrowArray, datastore.get("Cargo_Throw", 0));
    AchievementUnlock("DonkeyP", DonkeyPArray, datastore.get("Donkey_Punch", 0));
    AchievementUnlock("RoyNeutralB", RoyNeutralBArray, datastore.get("Roy_B", 0));
    AchievementUnlock("RoySideSmash", RoySideSmashArray, datastore.get("Roy_Fsmash", 0));
    AchievementUnlock("Kirbycide", KirbycideArray, datastore.get("Kirbycide", 0));
    AchievementUnlock("KirbyNair", KirbyNairArray, datastore.get("Kirby_Nair", 0));
    AchievementUnlock("BowserNair", BowserNairArray, datastore.get("Bowser_Nair", 0));
    AchievementUnlock("BowserUpB", BowserUpBArray, datastore.get("BowserUpB"));
    AchievementUnlock("LinkNair", LinkNairArray, datastore.get("LinkNair", 0));
    AchievementUnlock("LinkBomb", LinkBombArray, datastore.get("LinkBomb", 0));
    AchievementUnlock("ShiekNair", ShiekNairArray, datastore.get("Sheik_Nair", 0));
    AchievementUnlock("ShiekNeedle", ShiekNeedleArray, datastore.get("Shiek_Needle", 0));
    AchievementUnlock("NessDair", NessdairArray, datastore.get("Ness_Dair", 0));
    AchievementUnlock("NessUpb", NessUpbArray, datastore.get("Ness_Upb", 0));
    AchievementUnlock("PeachStich", PeachStickArray, datastore.get("Peach_Stitch", 0));
    AchievementUnlock("PeachFair", PeachFairArray, datastore.get("Peach_Fair", 0));
    AchievementUnlock("IceClimbersFS", IceClimbersFSArray, datastore.get("ICFS", 0));
    AchievementUnlock("IceClimbersDS", IceClimbersDSArray, datastore.get("ICDS", 0));
    AchievementUnlock("TailSpike", TailSpikeArray, datastore.get("Pikachu_Tailspike", 0));
    AchievementUnlock("Thunderjolt", ThunderJoltArray, datastore.get("Pikachu_Tjolt", 0));
    AchievementUnlock("Missile", MissileArray, datastore.get("Samus_Missile", 0));
    AchievementUnlock("Chargeshot", ChargeShotArray, datastore.get("Samus_Chargeshot", 0));
    AchievementUnlock("YoshiNair", YoshiNairArray, datastore.get("Yoshi_Nair", 0));
    AchievementUnlock("YoshiDownSmash", YoshiDownSmashArray, datastore.get("Yoshi_Downsmash", 0));
    AchievementUnlock("JigBackair", JigBackAirArray, datastore.get("Jigglypuff_Bair", 0));
    AchievementUnlock("RestKill", RestKillArray, datastore.get("Jigglypuff_Rest", 0));
    AchievementUnlock("MewtwoSB", MewtwoArray, datastore.get("Mewtwo_ShadowBall", 0));
    AchievementUnlock("MewtwoFair", MewtwoArray, datastore.get("Mewtwo_Fair", 0));
    AchievementUnlock("luigiSlippery", LuigiSlipperyArray, datastore.get("Luigi_Wavedash", 0));
    AchievementUnlock("Misfire", MisfireArray, datastore.get("Misfire", 0));
    AchievementUnlock("MarthSpike", MarthSpikeArray, datastore.get("Marth_Spike", 0));
    AchievementUnlock("MarthGrab", MarthGrabArray, datastore.get("Marth_Grab", 0));
    AchievementUnlock("ZeldaFair", ZeldaFairArray, datastore.get("Zelda_Fair", 0));
    AchievementUnlock("ZeldaFlame", ZeldaFireArray, datastore.get("Zelda_Fire", 0));
    AchievementUnlock("YinkArrow", YinkArrowArray, datastore.get("Yink_Arrow", 0));
    AchievementUnlock("YinkDownSmash", YinkDownSmashArray, datastore.get("Yink_Downsmash", 0));
    AchievementUnlock("FalcoDair", FalcoDairArray, datastore.get("Falco_Dair", 0));
    AchievementUnlock("FalcoLaser", FalcoLaserArray, datastore.get("Falco_Laser", 0));
    AchievementUnlock("PichuTJolt", PichuTJoltArray, datastore.get("Pichu_Tjolt", 0));
    AchievementUnlock("PichuBair", PichuBairArray, datastore.get("Pichu_Bair", 0));
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
electron_1.default.ipcRenderer.on("message-from-page", (event, args) => {
    if (args.message == "getAch") {
        let keys = keys_json_1.default[args.data];
        let returnindex = [];
        for (let i = 0; i in keys; i++) {
            achievements_json_1.default[keys[i]].unlocked = achstore.get(keys[i], false);
            returnindex.push(achievements_json_1.default[keys[i]]);
        }
        message2UI("getAchResult", returnindex);
    }
});
electron_1.default.ipcRenderer.on("message-from-page", async (event, args) => {
    if (args.message == "checkAch") {
        const rep = replayDir();
        let slippiFilesToArray = [];
        if (fs_1.default.existsSync(rep)) {
            let stagecount = 0;
            let charcount = 0;
            const files = fs_1.default.readdirSync(rep, "utf-8");
            files.forEach((file) => {
                if (path_1.extname(file) === ".slp")
                    slippiFilesToArray.push(file);
            });
            let uname = store.get("username");
            try {
                for (let i = 0; i in slippiFilesToArray; i++) {
                    let gamefile = slippiFilesToArray[i];
                    if (store.get(gamefile, false) === false &&
                        name(gamefile, uname) !== -1) {
                        try {
                            let game = new slippi_js_1.default(path_1.join(replayDir(), slippiFilesToArray[i]));
                            CheckFileAch(gamefile, store.get("username"));
                            if (info_json_1.default.CharacterNames[game.getSettings().players[name(slippiFilesToArray[i], store.get("username"))].characterId]) {
                                datastore.set("Char." +
                                    info_json_1.default.CharacterNames[game.getSettings().players[name(slippiFilesToArray[i], store.get("username"))].characterId], true);
                            }
                            if (info_json_1.default.StageNames[game.getSettings().stageId]) {
                                datastore.set("stage." + info_json_1.default.StageNames[game.getSettings().stageId], true);
                            }
                            message2UI("checkAchLoading", {
                                value: getPercentage(slippiFilesToArray, i),
                                Gamefile: gamefile,
                            });
                        }
                        catch (err) {
                            console.log("Program ran into an error at gamefile: " + gamefile);
                            console.log(err);
                        }
                        event.sender.send("clearCache");
                        store.set(gamefile, true);
                    }
                    else {
                        continue;
                    }
                }
                AchievementUnlock("kill", killCheckArray, datastore.get("stocks", 0));
                AchievementUnlock("Game", GameCheckArray, datastore.get("Game_Total", 0));
                AchievementUnlock("Fire", FireCheckArray, datastore.get("Fireball", 0));
                AchievementUnlock("MarioSpike", marSpikeCheckArray, datastore.get("Mario_Spike", 0));
                AchievementUnlock("shine", ShineCheckArray, datastore.get("Shine", 0));
                AchievementUnlock("ShineSpike", ShineSpikeCheckArray, datastore.get("Shine_Spike", 0));
                AchievementUnlock("Knee", KneeCheckArray, datastore.get("Falcon_Punch", 0));
                AchievementUnlock("FalconPunch", FalconPunchArray, datastore.get("Falcon_Knee", 0));
                AchievementUnlock("CargoThrow", CargoThrowArray, datastore.get("Cargo_Throw", 0));
                AchievementUnlock("DonkeyP", DonkeyPArray, datastore.get("Donkey_Punch", 0));
                AchievementUnlock("RoyNeutralB", RoyNeutralBArray, datastore.get("Roy_B", 0));
                AchievementUnlock("RoySideSmash", RoySideSmashArray, datastore.get("Roy_Fsmash", 0));
                AchievementUnlock("Kirbycide", KirbycideArray, datastore.get("Kirbycide", 0));
                AchievementUnlock("KirbyNair", KirbyNairArray, datastore.get("Kirby_Nair", 0));
                AchievementUnlock("BowserNair", BowserNairArray, datastore.get("Bowser_Nair", 0));
                AchievementUnlock("BowserUpB", BowserUpBArray, datastore.get("BowserUpB"));
                AchievementUnlock("LinkNair", LinkNairArray, datastore.get("LinkNair", 0));
                AchievementUnlock("LinkBomb", LinkBombArray, datastore.get("LinkBomb", 0));
                AchievementUnlock("ShiekNair", ShiekNairArray, datastore.get("Sheik_Nair", 0));
                AchievementUnlock("ShiekNeedle", ShiekNeedleArray, datastore.get("Shiek_Needle", 0));
                AchievementUnlock("NessDair", NessdairArray, datastore.get("Ness_Dair", 0));
                AchievementUnlock("NessUpb", NessUpbArray, datastore.get("Ness_Upb", 0));
                AchievementUnlock("PeachStich", PeachStickArray, datastore.get("Peach_Stitch", 0));
                AchievementUnlock("PeachFair", PeachFairArray, datastore.get("Peach_Fair", 0));
                AchievementUnlock("IceClimbersFS", IceClimbersFSArray, datastore.get("ICFS", 0));
                AchievementUnlock("IceClimbersDS", IceClimbersDSArray, datastore.get("ICDS", 0));
                AchievementUnlock("TailSpike", TailSpikeArray, datastore.get("Pikachu_Tailspike", 0));
                AchievementUnlock("Thunderjolt", ThunderJoltArray, datastore.get("Pikachu_Tjolt", 0));
                AchievementUnlock("Missile", MissileArray, datastore.get("Samus_Missile", 0));
                AchievementUnlock("Chargeshot", ChargeShotArray, datastore.get("Samus_Chargeshot", 0));
                AchievementUnlock("YoshiNair", YoshiNairArray, datastore.get("Yoshi_Nair", 0));
                AchievementUnlock("YoshiDownSmash", YoshiDownSmashArray, datastore.get("Yoshi_Downsmash", 0));
                AchievementUnlock("JigBackair", JigBackAirArray, datastore.get("Jigglypuff_Bair", 0));
                AchievementUnlock("RestKill", RestKillArray, datastore.get("Jigglypuff_Rest", 0));
                AchievementUnlock("MewtwoSB", MewtwoArray, datastore.get("Mewtwo_ShadowBall", 0));
                AchievementUnlock("MewtwoFair", MewtwoArray, datastore.get("Mewtwo_Fair", 0));
                AchievementUnlock("LuigiSlippery", LuigiSlipperyArray, datastore.get("Luigi_Wavedash", 0));
                AchievementUnlock("Misfire", MisfireArray, datastore.get("Misfire", 0));
                AchievementUnlock("MarthSpike", MarthSpikeArray, datastore.get("Marth_Spike", 0));
                AchievementUnlock("MarthGrab", MarthGrabArray, datastore.get("Marth_Grab", 0));
                AchievementUnlock("ZeldaFair", ZeldaFairArray, datastore.get("Zelda_Fair", 0));
                AchievementUnlock("ZeldaFlame", ZeldaFireArray, datastore.get("Zelda_Fire", 0));
                AchievementUnlock("YinkArrow", YinkArrowArray, datastore.get("Yink_Arrow", 0));
                AchievementUnlock("YinkDownSmash", YinkDownSmashArray, datastore.get("Yink_Downsmash", 0));
                AchievementUnlock("FalcoDair", FalcoDairArray, datastore.get("Falco_Dair", 0));
                AchievementUnlock("FalcoLaser", FalcoLaserArray, datastore.get("Falco_Laser", 0));
                AchievementUnlock("PichuTJolt", PichuTJoltArray, datastore.get("Pichu_Tjolt", 0));
                AchievementUnlock("PichuBair", PichuBairArray, datastore.get("Pichu_Bair", 0));
                AchievementUnlock("GNWNair", GNWNairArray, datastore.get("GNWN", 0));
                AchievementUnlock("GNWKey", GNWKeyArray, datastore.get("GNWK", 0));
                AchievementUnlock("GannonP", GannonPArray, datastore.get("Gannon_Punch", 0));
                AchievementUnlock("GannonS", GannonSArray, datastore.get("Gannon_Spike", 0));
                AchievementUnlock("DRMPills", DRMPillsArray, datastore.get("DRMP", 0));
                AchievementUnlock("DRMFair", DRMFairArray, datastore.get("DRMF", 0));
                for (let i = 0; i in info_json_1.default.CharacterNames; i++) {
                    if (statstore.get(info_json_1.default.CharacterNames[i], false)) {
                        charcount += 1;
                    }
                }
                for (let i = 0; i in info_json_1.default.StageNames; i++) {
                    if (statstore.get(info_json_1.default.StageNames[i], false)) {
                        stagecount += 1;
                    }
                }
                if (charcount > info_json_1.default.CharacterNames.length) {
                    achstore.set("Specialist", true);
                }
                if (stagecount > 29) {
                    achstore.set("AATW", true);
                }
                console.log("stagecount: " + stagecount);
                console.log("charcount: " + charcount);
                message2UI("checkAchResult", true);
            }
            catch (err) {
                console.log("Achievement Parser Failed");
                console.log(err);
                message2UI("checkAchResult", false);
            }
        }
        else {
            console.log("Couldn't Find Replay Dir");
            message2UI("checkAchResult", false);
        }
    }
});
function didiwin(gamefile) {
    let rep = replayDir();
    let game = new slippi_js_1.default(path_1.join(rep, gamefile));
    try {
        if (game.getLatestFrame().players[name(gamefile, store.get("username"))].post.stocksRemaining != 0) {
            return true;
        }
        else
            return false;
    }
    catch (err) {
        return false;
    }
}
function didIWinStore(gamefile) {
    if (!store.has(path_1.parse(gamefile).name + ".win")) {
        store.set(path_1.parse(gamefile).name + ".win", didiwin(gamefile));
        return store.get(path_1.parse(gamefile).name + ".win");
    }
    else {
        return store.get(path_1.parse(gamefile).name + ".win");
    }
}
electron_1.default.ipcRenderer.on("message-from-page", (event, args) => {
    if (args.message == "checkThisFile") {
        let gamefile = args.data;
        let rep = replayDir();
        let uname = name(gamefile, store.get("username"));
        let slpcheck = checkSlippiFiles(gamefile, store.get("username", null));
        let game = new slippi_js_1.default(path_1.join(rep, gamefile));
        let filename = path_1.parse(gamefile).name;
        let charparse = characterConditionalParse(gamefile, store.get("username"));
        let altobj = {};
        altobj["name1"] = game.getMetadata().players[0].names.netplay;
        altobj["name2"] = game.getMetadata().players[1].names.netplay;
        altobj["stage"] = info_json_1.default.StageNames[game.getSettings().stageId];
        altobj["char"] = info_json_1.default.CharacterNames[charparse.char];
        altobj["Stats"] = [
            charparse.Stat1,
            charparse.Stat1Text,
            charparse.Stat2,
            charparse.Stat2Text,
        ];
        message2UI("checkThisFileResult", { slpparse: slpcheck, alt: altobj });
    }
});
electron_1.default.ipcRenderer.on("message-from-page", (event, args) => {
    if (args.message == "getFileArray") {
        try {
            console.log("Working on getFileArray...");
            let slippiFilesToArray = [];
            const rep = replayDir();
            const uname = store.get("username");
            if (fs_1.default.existsSync(rep)) {
                const ReturnArray = [];
                const files = fs_1.default.readdirSync(rep, "utf-8");
                const slippiFilesToArray = [];
                let opponentname;
                files.forEach((file) => {
                    if (path_1.extname(file) === ".slp")
                        slippiFilesToArray.push(file);
                });
                if (slippiFilesToArray == null) {
                    message2UI("getFileArrayResult", null);
                }
                for (let i = 0; i in slippiFilesToArray; i++) {
                    let stagename;
                    if (name(slippiFilesToArray[i], store.get("username")) !== -1 &&
                        name(slippiFilesToArray[i], store.get("username")) !== undefined) {
                        const game = new slippi_js_1.default(path_1.join(rep, slippiFilesToArray[i]));
                        const { players } = game.getMetadata();
                        const names = [];
                        for (let i = 0; i in players; i++)
                            names.push(players[i].names.netplay);
                        if (name(slippiFilesToArray[i], store.get("username")) === 0)
                            opponentname = players[1].names.netplay;
                        else
                            opponentname = players[0].names.netplay;
                        if (info_json_1.default.StageNames[game.getSettings().stageId] !==
                            undefined) {
                            stagename = info_json_1.default.StageNames[game.getSettings().stageId];
                        }
                        else {
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
        }
        catch (err) {
            console.log(err);
            message2UI("getFileArrayError", null);
        }
    }
});
function nameflip(int) {
    if (int == 1) {
        return 0;
        console.log("Nameflip returned 0");
    }
    else {
        return 1;
        console.log("Nameflip returned 1");
    }
}
function AddToStoreStats(storename, addint) {
    statstore.set(storename, statstore.get(storename, 0) + addint);
}
electron_1.default.ipcRenderer.on("message-from-page", (event, args) => {
    if (args.message == "getGeneralStats") {
        const rep = replayDir();
        if (fs_1.default.existsSync(rep)) {
            let slippiFilesToArray = [];
            const files = fs_1.default.readdirSync(rep, "utf-8");
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
            let murder = statstore.get("TotalStocks", 0);
            let damage = statstore.get("TotalDamage", 0);
            console.log(damage);
            console.log(murder);
            files.forEach((file) => {
                if (path_1.extname(file) === ".slp")
                    slippiFilesToArray.push(file);
            });
            for (let i = 0; i in slippiFilesToArray; i++) {
                try {
                    let game = new slippi_js_1.default(path_1.join(rep, slippiFilesToArray[i]));
                    if (!store.get(path_1.parse(slippiFilesToArray[i]).name + ".Stats", false)) {
                        store.set(path_1.parse(slippiFilesToArray[i]).name + ".Stats", true);
                        if (game.getSettings().stageId !== 294) {
                            if (name(slippiFilesToArray[i], store.get("username")) !=
                                -1) {
                                console.log(slippiFilesToArray[i]);
                                let opponentname = "";
                                if (name(slippiFilesToArray[i], store.get("username")) === 0) {
                                    opponentname = game.getMetadata().players[1].names.netplay;
                                }
                                else {
                                    opponentname = game.getMetadata().players[0].names.netplay;
                                }
                                if (!opparray.includes(opponentname)) {
                                    opparray.push(opponentname);
                                }
                                AddToStoreStats("Game_Total", 1);
                                damage += Math.ceil(game.getStats().overall[name(slippiFilesToArray[i], store.get("username"))].totalDamage);
                                murder += game.getStats().overall[name(slippiFilesToArray[i], store.get("username"))].killCount;
                                console.log(damage);
                                console.log(murder);
                                AddToStoreStats("TotalDeaths", game.getStats().overall[nameflip(name(slippiFilesToArray[i], store.get("username")))].killCount);
                                if (game.getGameEnd() !== null) {
                                    if (game.getGameEnd().lrasInitiatorIndex ===
                                        name(slippiFilesToArray[i], store.get("username"))) {
                                        AddToStoreStats("ILRAS", 1);
                                    }
                                    else if (game.getGameEnd().lrasInitiatorIndex ===
                                        nameflip(name(slippiFilesToArray[i], store.get("username")))) {
                                        AddToStoreStats("OppLRAS", 1);
                                    }
                                }
                                if (didiwin(slippiFilesToArray[i])) {
                                    AddToStoreStats("TotalWins", 1);
                                    AddToStoreStats(info_json_1.default.CharacterNames[game.getSettings().players[nameflip(name(slippiFilesToArray[i], store.get("username")))].characterId] + ".wins", 1);
                                    AddToStoreStats(info_json_1.default.StageNames[game.getSettings().stageId] + ".wins", 1);
                                }
                                else {
                                    AddToStoreStats(info_json_1.default.CharacterNames[game.getSettings().players[nameflip(name(slippiFilesToArray[i], store.get("username")))].characterId] + ".loss", 1);
                                    AddToStoreStats(info_json_1.default.StageNames[game.getSettings().stageId] + ".loss", 1);
                                }
                                AddToStoreStats(info_json_1.default.StageNames[game.getSettings().stageId] + ".played", 1);
                                if (didiwin(slippiFilesToArray[i], store.get("username"))) {
                                    AddToStoreStats(opponentname + ".win", 1);
                                }
                                else {
                                    AddToStoreStats(opponentname + ".loss", 1);
                                }
                                AddToStoreStats(info_json_1.default.CharacterNames[charintGet(slippiFilesToArray[i], store.get("username"))] + ".played", 1);
                            }
                        }
                        console.log(statstore.get("TotalStocks"));
                        message2UI("StatsLoadingBar", {
                            task: "Stealing Stats From Files, Stock Count: " +
                                statstore.get("TotalStocks"),
                            progress: Math.ceil(100 * (i / slippiFilesToArray.length)),
                            total: slippiFilesToArray.length,
                        });
                    }
                }
                catch (err) {
                    console.log(err);
                    console.log(slippiFilesToArray[i]);
                    continue;
                }
                statstore.set("TotalStocks", murder);
                statstore.set("TotalDamage", damage);
            }
            for (let i = 0; i in info_json_1.default.StageNames; i++) {
                if (statstore.get(info_json_1.default.StageNames[i] + ".played", 0) > largest) {
                    largest = statstore.get(info_json_1.default.StageNames[i] + ".played");
                    largestname = info_json_1.default.StageNames[i];
                }
                if (statstore.get(info_json_1.default.StageNames[i] + ".wins", 0) > beststagenum) {
                    beststagenum = statstore.get(info_json_1.default.StageNames[i] + ".wins");
                    beststage = info_json_1.default.StageNames[i];
                }
                else
                    console.log("Stage Store: " + statstore.get(info_json_1.default.StageNames[i] + ".wins"));
                if (statstore.get(info_json_1.default.StageNames[i] + ".loss", 0) > worststagenum) {
                    worststagenum = statstore.get(info_json_1.default.StageNames[i] + ".loss");
                    worststage = info_json_1.default.StageNames[i];
                }
                message2UI("StatsLoadingBar", {
                    task: "Checking " + info_json_1.default.StageNames[i] + " Right Now",
                    progress: Math.ceil(100 * (i / info_json_1.default.StageNames.length)),
                    total: info_json_1.default.StageNames.length,
                });
            }
            for (let i = 0; i in info_json_1.default.CharacterNames; i++) {
                if (statstore.get(info_json_1.default.CharacterNames[i] + ".played", 0) > largestalt) {
                    largestalt = statstore.get(info_json_1.default.CharacterNames[i] + ".played", 0);
                    largestaltname = info_json_1.default.CharacterNames[i];
                }
                if (statstore.get(info_json_1.default.CharacterNames[i] + ".loss", 0) > worstmunum) {
                    worstmunum = statstore.get(info_json_1.default.CharacterNames[i] + ".loss");
                    worstmu = info_json_1.default.CharacterNames[i];
                }
                if (statstore.get(info_json_1.default.CharacterNames[i] + ".wins", 0) > bestmunum) {
                    bestmunum = statstore.get(info_json_1.default.CharacterNames[i] + ".wins");
                    bestmu = info_json_1.default.CharacterNames[i];
                }
                else
                    console.log("Character Wins:" + statstore.get(info_json_1.default.CharacterNames[i] + ".wins"));
                message2UI("StatsLoadingBar", {
                    task: "Checking " + info_json_1.default.CharacterNames[i] + " Right Now",
                    progress: Math.ceil(100 * (i / info_json_1.default.CharacterNames.length)),
                    total: info_json_1.default.CharacterNames.length,
                });
            }
            for (let i = 0; i in opparray; i++) {
                if (statstore.get(opparray[i] + ".win") > largestopponent) {
                    largestopponent = statstore.get(opparray[i] + ".win");
                    largestopponentname = opparray[i];
                    statstore.set("DomOpp" + ".name", largestopponentname);
                    statstore.set("DomOpp" + ".num", largestopponent);
                    message2UI("StatsLoadingBar", {
                        task: "Checking Games Against This Opponent: " + opparray[i],
                        progress: Math.ceil(100 * (i / opparray.length)),
                        total: opparray.length,
                    });
                    continue;
                }
                else {
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
                    largestopponentloss = statstore.get(opparray[i] + ".loss");
                    largestopponentlossname = opparray[i];
                    statstore.set("DomOppLoss" + ".name", largestopponentlossname);
                    statstore.set("DomOppLoss" + ".num", largestopponentloss);
                    message2UI("StatsLoadingBar", {
                        task: "Checking Losses Against This Opponent: " + opparray[i],
                        progress: Math.ceil(100 * (i / opparray.length)),
                        total: opparray.length,
                    });
                    continue;
                }
                else {
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
                wlratio: (statstore.get("TotalWins", 0) /
                    statstore.get("Game_Total", 0)).toFixed(2),
                kdratio: (statstore.get("TotalStocks") / statstore.get("TotalDeaths")).toFixed(2),
                lrasratio: (statstore.get("ILRAS") / statstore.get("OppLRAS")).toFixed(2),
            };
            message2UI("getGeneralStatsResult", returnobj);
        }
    }
});
