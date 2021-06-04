<template>
  <div>
    <h1>Melee Achievements</h1>

    <div v-if="loading">
      <v-progress-linear
        v-if="loading"
        :active="loading"
        :value="value"
        height="20"
      >
        {{ currentGamefile }}
      </v-progress-linear>
    </div>
    <div v-if="firstTime">
      <v-alert v-if="!SettingsValid" type="error" prominent>
        <v-row align="center">
          <v-col class="grow">
            Please make sure your settings are valid before you process your
            Achievmenets
          </v-col>
          <v-col class="shrink">
            <v-btn outlined to="settings">Settings</v-btn>
          </v-col>
        </v-row>
      </v-alert>
      <p>
        Hiya! Welcome to Melee Achievemnts! We have noticed this ("might") be
        your first time on this tab, so here is an explanation to this. This tab
        takes your game data for all of your games and computes stats for them
        and gives you Achievements. Try and aim for all achievemnts (Might Be
        Impossible) But above all else, remember to have fun! Press the button
        below to start your initial dump of your stats ("please stay on this
        page") And after this initial dump, the achievement checking should go
        way faster. PS - Please give the dumper time to process all of the data,
        it might take a while,
      </p>
      <v-btn v-if="SettingsValid" @click="CheckAch()">Dump Achievemnets</v-btn>
    </div>
    <div v-else>
      <v-select
        v-model="selectedItem"
        append-icon="mdi-trophy"
        :items="catas"
        item-text="text"
        item-value="value"
        label="Achievmenet Selected"
        @change="onChange()"
      >
      </v-select>
      <div>
        <v-card>
          <v-card-title>Melee Achievements</v-card-title>
          <v-list>
            <v-list-item v-for="{ unlocked, name, desc } of achs" :key="name">
              <v-list-item-icon>
                <v-icon :color="unlocked ? 'white' : 'grey'">
                  {{ "mdi-lock" + (unlocked ? "-open-variant" : "") }}</v-icon
                >
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>
                  {{ name }}
                </v-list-item-title>
                <v-list-item-subtitle> {{ desc }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
        <v-btn
          v-if="!AutoProcess"
          :loading="loading"
          class="mt-2"
          @click="CheckAch()"
          >Check Achievements</v-btn
        >
        <v-snackbar v-model="snackbarE" type="error"
          >The Achievement Parser Failed. Double Check Settings</v-snackbar
        >
        <v-snackbar v-model="snackbarS" type="Success">
          <span>The Achievement Parser Succeeded.</span>
        </v-snackbar>
      </div>
    </div>
  </div>
</template>

<script>
import { ipcRenderer } from "electron";
// TODO: Alert user when bad file is parsed.
const Store = require("electron-store");
const store = new Store();

export default {
  data() {
    return {
      repfile: store.get("Replay_Directory", null),
      snackbarE: false,
      snackbarS: false,
      firstTime: store.get("firstTimeAch", true),
      error: "The Achievement Parser Failed. Double Check Settings",
      loading: false,
      value: null,
      currentGamefile: null,
      CurrentAch: null,
      selectedItem: "General",
      shineaudio: null,
      achs: [],
      catas: [
        { text: "Misc Achievements", value: "Misc" },
        { text: "General Achievements", value: "General" },
        { text: "Dr. Mario", value: "DrMario" },
        { text: "Mario", value: "Mario" },
        { text: "Luigi", value: "Luigi" },
        { text: "Bowser", value: "Bowser" },
        { text: "Peach", value: "Peach" },
        { text: "Yoshi", value: "Yoshi" },
        { text: "Donkey Kong", value: "DonkeyKong" },
        { text: "Captain Falcon", value: "Falcon" },
        { text: "Gannondorf", value: "Gannon" },
        { text: "Falco", value: "Falco" },
        { text: "Fox", value: "Fox" },
        { text: "Ness", value: "Ness" },
        { text: "Ice Climbers", value: "IceClimbers" },
        { text: "Kirby", value: "Kirby" },
        { text: "Samus", value: "Samus" },
        { text: "Zelda", value: "Zelda" },
        { text: "Link", value: "Link" },
        { text: "Young Link", value: "Young Link" },
        { text: "Pichu", value: "Pichu" },
        { text: "Pikachu", value: "Pikachu" },
        { text: "Jigglypuff", value: "Jigglypuff" },
        { text: "Mewtwo", value: "Mewtwo" },
        { text: "Mr.Game And Watch", value: "GNW" },
        { text: "Marth", value: "Marth" },
        { text: "Roy", value: "Roy" },
      ],
    };
  },
  computed: {
    AutoProcess() {
      return store.get("AutoProcess");
    },
    SettingsValid() {
      if (
        store.get("username", null) == null ||
        store.get("Replay_Directory", null) == null
      )
        return false;
      else return true;
    },
  },
  beforeMount() {
    if (!this.firstTime && this.AutoProcess) this.CheckAch();
    this.shineaudio = new Audio(__resources + "/sound/shine.mp3");
  },
  mounted() {
    ipcRenderer.send("message-from-page", {
      message: "getAch",
      data: "General",
    });
    ipcRenderer.on("message-from-worker", (event, args) => {
      console.log(args);
      if (args.command === "getAchResult") this.achs = args.payload;
    });
  },
  methods: {
    async onChange() {
      ipcRenderer.send("message-from-page", {
        message: "getAch",
        data: this.selectedItem,
      });
      await ipcRenderer.on("message-from-worker", (event, args) => {
        console.log(args);
        if (args.command === "getAchResult") this.achs = args.payload;
      });
    },
    CheckAch() {
      ipcRenderer.send("message-from-page", {
        message: "checkAch",
        data: null,
      });
      this.loading = true;
      ipcRenderer.on("message-from-worker", (event, args) => {
        if (args.command === "checkAchLoading") {
          ipcRenderer.send("ChangeProgressBar", args.payload.value / 100);
          this.value = args.payload.value;
          this.currentGamefile = args.payload.Gamefile;
        }
      });
      ipcRenderer.on("message-from-worker", (event, args) => {
        if (args.command === "checkAchResult") {
          this.firstTime = false;
          store.set("firstTimeAch", false);
          if (
            store.get("ShineAudio", false) &&
            this.shineaudio.played.length === 0
          )
            this.shineaudio.play();

          if (args.payload === false) {
            console.log("false");
            console.log(store.get("Replay_Directory"));
            this.loading = false;
            this.snackbarE = true;
            setTimeout(() => {
              ipcRenderer.send("HideProgressBar");
            }, 5000);
          } else {
            this.loading = false;
            this.snackbarS = true;
            this.CheckAch();
            setTimeout(() => {
              ipcRenderer.send("HideProgressBar");
            }, 5000);
          }
        }
      });
    },
  },
};
</script>
