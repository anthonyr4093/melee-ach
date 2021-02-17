<template>
  <v-container>
    <p v-if="loading">{{ value }}% / 100%</p>
    <p v-if="loading">Working on {{ task }}</p>
    <v-progress-linear :value="value" :active="loading"> </v-progress-linear>
    <p v-if="loading"></p>
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

    <v-flex>
      <h1>Melee Total Stats.</h1>

      <v-row>
        <v-col cols="6">
          <v-card v-if="result" :width="cardwidth" height="100%">
            <v-card-title class="justify-center"> Favorite Stage </v-card-title>
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
            <v-card-title class="justify-center"> Worst Matchup </v-card-title>
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
  </v-container>
</template>

<script>
import Store from "electron-store";
import { ipcRenderer } from "electron";

const statsstoredata = { name: "Stats" };
const store = new Store(statsstoredata);

export default {
  data() {
    return {
      result: null,
      loaded: false,
      loading: false,
      value: 0,
      dirname: __dirname,
      cardwidth: 500,
      cardheight: 250,
      total: null,
      task: null,
    };
  },
  beforeMount() {
    this.GetStats();
    console.log(this.dirname);
  },
  methods: {
    async GetStats() {
      ipcRenderer.send("message-from-page", {
        message: "getGeneralStats",
        data: null,
      });
      ipcRenderer.on("message-from-worker", (event, args) => {
        if (args.command == "StatsLoadingBar") {
          this.loading = true;
          this.total = args.payload.total;
          this.value = args.payload.progress;
          this.task = args.payload.task;
        }
      });
      ipcRenderer.on("message-from-worker", (event, args) => {
        if (args.command == "getGeneralStatsResult") {
          console.log(args.payload);
          this.result = args.payload;
          this.loading = false;
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
