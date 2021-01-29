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
const achievements = achievements_json_1.default;
const store = new electron_store_1.default();
const datastoredata = { name: "Data" };
const Achstoredata = { name: "Ach" };
const datastore = new electron_store_1.default(datastoredata);
const achstore = new electron_store_1.default(Achstoredata);
const replayDir = () => store.get("Replay_Directory").replace(/\\\\/g, "\\");
electron_1.default.ipcMain.handle("IsSettingsValid?", function (event, args) {
    const rep = args.Replay_Directory.toString().replace(/\\\\/g, "\\");
    if (fs_1.default.existsSync(rep)) {
        store.delete("Replay_Directory");
        store.set("username", args.username);
        store.set("Replay_Directory", rep.replace(/\\\\/g, "\\"));
        return true;
    }
    else {
        return false;
    }
});
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
    let game = new slippi_js_1.default(path_1.join(rep, gamefile));
    let int = game.getSettings().players[name(gamefile, uname)].characterId;
    return int;
}
function CheckMoveKill(gamefile, AttackID, Uname) {
    var _a;
    const rep = replayDir();
    const game = new slippi_js_1.default(path_1.join(rep, gamefile));
    const stats = game.getStats();
    const frames = game.getFrames();
    let count = 0;
    for (let i = 0; i in stats.conversions; i++) {
        if (stats.conversions[i].didKill) {
            if (stats.conversions[i].playerIndex === name(gamefile, Uname)) {
                if (((_a = frames[stats.conversions[i].endFrame].players[name(gamefile, Uname)]) === null || _a === void 0 ? void 0 : _a.post.lastAttackLanded) === AttackID)
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
                    if (UniqueItemId.includes((_a = frames[n].items) === null || _a === void 0 ? void 0 : _a[i].spawnId) ===
                        false) {
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
        let temp = checkSlippiFiles(gamefile, uname);
        datastore.set("stocks", datastore.get("stocks", 0) + temp.stock);
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
        if (temp.comp)
            AddToStore("Game_Total", 1);
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
electron_1.default.ipcMain.handle("GetAch", (_event, args) => {
    let keys = keys_json_1.default[args];
    let returnindex = [];
    for (let i = 0; i in keys; i++) {
        achievements_json_1.default[keys[i]].unlocked = achstore.get(keys[i], false);
        returnindex.push(achievements_json_1.default[keys[i]]);
    }
    return returnindex;
});
electron_1.default.ipcMain.handle("CheckAch", async (event, args) => {
    const rep = replayDir();
    if (fs_1.default.existsSync(rep)) {
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
                        CheckFileAch(gamefile, store.get("username"));
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
            return true;
        }
        catch (err) {
            console.log("Achievement Parser Failed");
            console.log(err);
            return false;
        }
    }
    else {
        console.log("Couldn't Find Replay Dir");
        return false;
    }
});
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
function didiwin(gamefile, Uname) {
    let rep = replayDir();
    let game = new slippi_js_1.default(path_1.join(rep, gamefile));
    if (game.getLatestFrame().players[name(gamefile, Uname)].post.stocksRemaining !=
        0) {
        return true;
    }
    else
        return false;
}
electron_1.default.ipcMain.handle("CheckThisFile", (event, args) => {
    let rep = replayDir();
    let uname = name(args, store.get("username"));
    let slpcheck = checkSlippiFiles(args, store.get("username", null));
    let game = new slippi_js_1.default(path_1.join(rep, args));
    let filename = path_1.parse(args).name;
    let altobj = {};
    altobj["name1"] = game.getMetadata().players[0].names.netplay;
    altobj["name2"] = game.getMetadata().players[1].names.netplay;
    altobj["stage"] = stageid[game.getSettings().stageId];
    return { slpparse: slpcheck, alt: altobj };
});
electron_1.default.ipcMain.handle("GetFileArray", (event, args) => {
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
        for (let i = 0; i in slippiFilesToArray; i++) {
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
                ReturnArray.push({
                    FileName: slippiFilesToArray[i],
                    names,
                    Stage: stageid[game.getSettings().stageId],
                    oppName: opponentname,
                });
            }
        }
        return ReturnArray;
    }
});
