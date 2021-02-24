// Add button on first process to start loading the files
<template>
  <v-container>
    <p v-if="loading">{{ value }}% / 100%</p>
    <v-progress-linear :value="value" :active="loading" height="20"
      >{{ task }}
    </v-progress-linear>
    <!-- <v-carousel height="200">
      <v-carousel-item
        v-for="(item, i) in facts"
        :key="i"
        transition="fade-transition"
        reverse-transition="fade-transition"
        ><v-sheet color="red" height="100%"
          ><div class="text-xs">{{ item.text }}</div>
        </v-sheet>
      </v-carousel-item>
    </v-carousel> -->
    <div v-if="firstTime & !loaded">
      <h1>Melee Total Stats.</h1>
      <div v-if="!SettingsValid">
        <v-alert type="error" prominent>
          <v-row align="center">
            <v-col class="grow">
              Please make sure your settings are valid before you process your
              stats
            </v-col>
            <v-col class="shrink">
              <v-btn outlined to="settings">Settings</v-btn>
            </v-col>
          </v-row>
        </v-alert>
      </div>
      <p>
        Hiya! I can see this is the first time you are opening this stats tab.
        This takes the data from slippi files and shows you various fun stats
        from all of your games! Some examples would be like your favorite
        character, or the character you lose to the most. If you would like to
        do the initial stat check, please click the button down below, after
        that the file checks will all be automatic
      </p>
      <v-btn v-if="SettingsValid" @click="GetStats()">Process Stats</v-btn>
      <v-switch v-model="showExample" label="Show Example Data"> </v-switch>
      <v-img v-if="showExample" :src="examplePath"></v-img>
    </div>
    <div v-else-if="!firstTime & !loaded & !AutoProcess">
      <v-alert>
        <v-col class="grow">
          Hey, click this button to process data. (Or turn on Auto Process)
        </v-col>
        <v-col class="shrink">
          <v-btn @click="GetStats()">Process Data</v-btn>
        </v-col>
      </v-alert>
    </div>
    <div v-else>
      <v-flex>
        <v-row>
          <v-col cols="6">
            <v-card v-if="result" :width="cardwidth" height="100%">
              <v-card-title class="justify-center">
                Favorite Stage
              </v-card-title>
              <v-card-subtitle class="text-center">
                {{ result.stage }} Was Played on {{ result.stagenum }} Times
              </v-card-subtitle>
              <v-card-text>
                <v-img
                  height="150"
                  class="mx-auto"
                  :src="getStageImg(result.stage)"
                />
              </v-card-text>
            </v-card>

            <v-skeleton-loader v-else type="card-heading, list-item, image" />
          </v-col>

          <v-col cols="6">
            <v-card v-if="result" :width="cardwidth" :height="cardheight">
              <v-card-title class="justify-center">
                Favorite Character
              </v-card-title>
              <v-card-subtitle class="text-center">
                {{ result.char }} Was Played {{ result.charnum }} Times
              </v-card-subtitle>
              <v-card-text>
                <v-img
                  height="150"
                  width="150"
                  class="mx-auto pixel"
                  :src="getCharImg(result.char)"
                />
              </v-card-text>
            </v-card>

            <v-skeleton-loader v-else type="card-heading, list-item, image" />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-card v-if="result" :width="cardwidth" :height="cardheight">
              <v-card-title class="justify-center">
                Dominated Opponent
              </v-card-title>
              <v-card-subtitle class="text-center">
                {{ FetchfromStore("DomOpp.name", "ERROR") }} Lost
                {{ FetchfromStore("DomOpp.num", 0) }} Times to you
              </v-card-subtitle>
            </v-card>
            <v-skeleton-loader v-else type="card-heading, list-item, image" />
          </v-col>
          <v-col cols="6">
            <v-card v-if="result" :width="cardwidth" :height="cardheight">
              <v-card-title class="justify-center"> Dominated By </v-card-title>
              <v-card-subtitle class="text-center">
                {{ FetchfromStore("DomOppLoss.name") }} Beat You
                {{ FetchfromStore("DomOppLoss.num") }} Times
              </v-card-subtitle>
            </v-card>
            <v-skeleton-loader v-else type="card-heading, list-item, image" />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-card v-if="result" :width="cardwidth" :height="cardheight">
              <v-card-title class="justify-center"> Best Matchup </v-card-title>
              <v-card-subtitle class="text-center">
                {{ result.bestmu }} Lost {{ result.bestmunum }} Times to you
              </v-card-subtitle>
              <v-card-text>
                <v-img
                  height="150"
                  width="150"
                  class="mx-auto pixel"
                  :src="getCharImg(result.bestmu)"
                />
              </v-card-text>
            </v-card>
            <v-skeleton-loader v-else type="card-heading, list-item, image" />
          </v-col>
          <v-col cols="6">
            <v-card v-if="result" :width="cardwidth" :height="cardheight">
              <v-card-title class="justify-center">
                Worst Matchup
              </v-card-title>
              <v-card-subtitle class="text-center">
                {{ result.worstmu }} Won {{ result.worstmunum }} Games over you
              </v-card-subtitle>
              <v-card-text>
                <v-img
                  height="150"
                  width="150"
                  class="mx-auto pixel"
                  :src="getCharImg(result.worstmu)"
                />
              </v-card-text>
            </v-card>
            <v-skeleton-loader v-else type="card-heading, list-item, image" />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-card v-if="result" :width="cardwidth" height="100%">
              <v-card-title class="justify-center"> Best Stage </v-card-title>
              <v-card-subtitle class="text-center">
                {{ result.beststage }} Was Played on
                {{ result.beststagenum }} Winning Games
              </v-card-subtitle>
              <v-card-text>
                <v-img
                  height="150"
                  class="mx-auto"
                  :src="getStageImg(result.beststage)"
                />
              </v-card-text>
            </v-card>
            <v-skeleton-loader v-else type="card-heading, list-item, image" />
          </v-col>
          <v-col cols="6">
            <v-card v-if="result" :width="cardwidth" height="100%">
              <v-card-title class="justify-center">Worst Stage </v-card-title>
              <v-card-subtitle class="text-center">
                {{ result.worststage }} Was Played on
                {{ result.worststagenum }} Losing Games
              </v-card-subtitle>
              <v-card-text>
                <v-img
                  height="150"
                  class="mx-auto"
                  :src="getStageImg(result.worststage)"
                />
              </v-card-text>
            </v-card>
            <v-skeleton-loader v-else type="card-heading, list-item, image" />
          </v-col>
        </v-row>
      </v-flex>

      <div v-if="result">
        <v-divider />
        <h4>Game Stats</h4>
        <v-row>
          <v-col>Total Games: {{ FetchfromStore("Game_Total", 0) }}</v-col>
          <v-col> Total Damage: {{ FetchfromStore("TotalDamage", 0) }}</v-col>
          <v-col>Total Kills: {{ FetchfromStore("TotalStocks", 0) }}</v-col>
        </v-row>
        <v-row>
          <v-col>Win/Loss Ratio: {{ result.wlratio }}</v-col>
          <v-col>Kill/Death Ratio {{ result.kdratio }} </v-col>
          <v-col>Your LRAS/ Opponent LRAS: {{ result.lrasratio }} </v-col>
        </v-row>
      </div>

      <v-skeleton-loader
        v-else
        type="list-item"
        class="mx-auto"
      ></v-skeleton-loader>
    </div>
  </v-container>
</template>

<script>
import Store from "electron-store";
import { ipcRenderer } from "electron";

const statsstoredata = { name: "Stats" };
const store = new Store(statsstoredata);
const genstore = new Store();

export default {
  data() {
    return {
      showExample: false,
      result: null,
      loaded: false,
      loading: false,
      shineaudio: null,
      value: 0,
      dirname: __dirname,
      cardwidth: 500,
      cardheight: 250,
      total: null,
      task: null,
    };
  },
  computed: {
    examplePath() {
      return __resources + "/exampleData.PNG";
    },
    firstTime() {
      return genstore.get("firstTimeStats", true);
    },
    AutoProcess() {
      return genstore.get("AutoProcess");
    },
    SettingsValid() {
      if (
        genstore.get("username", null) == null ||
        genstore.get("Replay_Directory", null) == null
      )
        return false;
      else return true;
    },
  },
  beforeMount() {
    if (!this.firstTime && this.AutoProcess) this.GetStats();
    this.shineaudio = new Audio(__resources + "/sound/shine.mp3");
  },
  methods: {
    async GetStats() {
      genstore.set("firstTimeStats", false);
      ipcRenderer.send("message-from-page", {
        message: "getGeneralStats",
        data: null,
      });
      ipcRenderer.on("message-from-worker", (event, args) => {
        if (args.command === "StatsLoadingBar") {
          ipcRenderer.send("ChangeProgressBar", args.payload.progress / 100);
          this.loading = true;
          this.total = args.payload.total;
          this.value = args.payload.progress;
          this.task = args.payload.task;
        }
      });
      ipcRenderer.on("message-from-worker", (event, args) => {
        if (args.command === "getGeneralStatsResult") {
          if (
            genstore.get("ShineSound", false) &&
            this.shineaudio.played.length === 0
          )
            this.shineaudio.play();

          this.result = args.payload;
          this.loaded = true;
          this.loading = false;
          ipcRenderer.send("HideProgressBar");
        }
      });
    },

    FetchfromStore(str, placeholder) {
      return store.get(str, placeholder);
    },
    getStageImg(pic) {
      return require("../assets/Stages/" + pic + ".png");
    },
    getCharImg(pic) {
      return require("../assets/Icons/" + pic + ".png");
    },
  },
};
</script>

<style>
.pixel {
  image-rendering: pixelated;
}
</style>
