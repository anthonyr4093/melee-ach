// Add button on first process to start loading the files
<template>
  <div>
    <div v-if="loading">
      {{ value }} / 100%
      <v-progress-linear :active="loading" :value="value" height="20">
        {{ progressgamefile }}
      </v-progress-linear>
    </div>

    <!-- <v-text-field v-model="search" label="Opponent Name" /> -->
    <div v-if="firstTime & !isLoaded & !loading">
      <h1>Slippi File Browser</h1>
      <div v-if="!SettingsValid">
        <v-alert type="error" prominent>
          <v-row align="center">
            <v-col class="grow">
              Please make sure your settings are valid before you process your
              files
            </v-col>
            <v-col class="shrink">
              <v-btn outlined to="settings">Settings</v-btn>
            </v-col>
          </v-row>
        </v-alert>
      </div>
      <p>
        Hiya, we can see that this ("might") your first time in the file
        browser. So I should explain what this is. This is a browser for all of
        your slippi files. You can filter games by the opponent name, stage
        name, and if you have won that game, you can also hover over names to
        display connect tags. You will need to process your files for a first
        time so we can get the stats from your game file, In future we will
        process any future files as we can see them. So when you are ready,
        please click the button below and please stay on this page
      </p>
      <div v-if="SettingsValid">
        <v-btn @click="getFileList()">Process Files</v-btn>
      </div>
    </div>
    <div v-else-if="!autoProcess & !loading & !isLoaded">
      <v-alert>
        <v-col class="grow">
          Hey, click this button to process data. (Or turn on Auto Process)
        </v-col>
        <v-col class="shrink">
          <v-btn @click="getFileList">Process Data</v-btn>
        </v-col>
      </v-alert>
    </div>
    <div v-if="isLoaded">
      <v-switch v-model="didWin" label="Won?"></v-switch>

      <v-autocomplete
        v-model="search"
        :items="File_list"
        item-text="oppName"
        label="Opponent Name"
        filled
        clearable
      >
      </v-autocomplete>
      <v-autocomplete
        v-model="search1"
        :items="filteredItems"
        item-text="Stage"
        label="Stage Name"
        filled
        clearable
      >
      </v-autocomplete>
      <div v-if="filteredItems[0]">
        <v-card>
          <v-card-title>Slippi Files</v-card-title>

          <v-virtual-scroll
            item-height="50"
            height="300"
            :items="[...Didwin_()]"
          >
            <template #default="{ item }">
              <v-list-item
                :key="item.FileName"
                @click="showAlert(item.FileName)"
              >
                <v-list-item-content>
                  <v-list-item-title>
                    <v-icon
                      >{{
                        item.win ? "mdi-trophy" : "mdi-trophy-broken"
                      }}
                      ></v-icon
                    >
                    <v-tooltip bottom>
                      <template #activator="{ on, attrs }">
                        <span v-bind="attrs" v-on="on">{{
                          item.names[0].name
                        }}</span>
                      </template>
                      <span>{{ item.names[0].code }}</span>
                    </v-tooltip>
                    vs
                    <v-tooltip bottom>
                      <template #activator="{ on, attrs }">
                        <span v-bind="attrs" v-on="on">{{
                          item.names[1].name
                        }}</span>
                      </template>
                      <span>{{ item.names[1].code }}</span>
                    </v-tooltip>
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ item.Stage }}
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-icon
                  v-if="!fetchinginfo || uniqueGF !== item.FileName"
                  @click="playFile(item.FileName)"
                  >mdi-play</v-icon
                >
                <v-progress-circular
                  v-else-if="uniqueGF === item.FileName"
                  indeterminate
                ></v-progress-circular>
              </v-list-item>
            </template>
          </v-virtual-scroll>
        </v-card>
        <div v-if="showgamefileAlert">
          <v-dialog v-model="showgamefileAlert" width="66%">
            <v-card
              ><v-card-title
                ><v-icon left>{{
                  fileinfo.alt.win ? "mdi-trophy" : "mdi-trophy-broken"
                }}</v-icon
                >{{ fileinfo.alt.name1 }} vs.
                {{ fileinfo.alt.name2 }}</v-card-title
              >
              <v-card-subtitle>{{ fileinfo.alt.stage }} </v-card-subtitle>
              <v-card-text>
                Kills This Game: {{ fileinfo.slpparse.stock }}
              </v-card-text>
              <v-card-text>
                Damage This Game: {{ fileinfo.slpparse.dama }}
              </v-card-text>
              <v-card-text>
                Because you Played: {{ fileinfo.alt.char }} These Are The Stats
                We Calculated:
              </v-card-text>
              <v-card-text>
                {{ fileinfo.alt.Stats[1] }} {{ fileinfo.alt.Stats[0] }}
              </v-card-text>
              <v-card-text>
                {{ fileinfo.alt.Stats[3] }} {{ fileinfo.alt.Stats[2] }}
              </v-card-text>
            </v-card>
          </v-dialog>
        </div>
      </div>

      <v-alert v-else-if="error" type="error" prominent>
        <v-row align="center">
          <v-col class="grow">
            Couldn't load Files, Double Check Settings
          </v-col>
          <v-col class="shrink">
            <v-btn outlined to="settings">Settings</v-btn>
          </v-col>
        </v-row>
      </v-alert>

      <v-skeleton-loader v-else type="list-item, divider , list-item@9" />
    </div>
  </div>
</template>

<script>
import { ipcRenderer } from "electron";
// TODO: Alert user when bad file is parsed.
// TODO: #3 Load a segment of files when scrollbar hits a threshold
const path = require("path");
const electron = require("electron");
const Store = require("electron-store");
const store = new Store();

electron.ipcRenderer.on("clearCache", (event) => {
  electron.remote.getCurrentWindow().webContents.session.clearCache();
});
export default {
  data() {
    return {
      search1: null,
      fetchinginfo: false,
      showGamefile: false,
      loading: false,
      value: null,
      showgamefileAlert: false,
      error: false,
      search: null,
      didWin: false,
      progressgamefile: null,
      gamefile: "",
      File_list: [],
      fileinfo: null,
      isLoaded: false,
      shineaudio: null,
      uniqueGF: null,
    };
  },
  computed: {
    autoProcess() {
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
    firstTime() {
      return store.get("firstTimeFile", true);
    },
    filteredItems() {
      return this.File_list.filter((item) => {
        return (
          !this.search ||
          item.oppName.toLowerCase().includes(this.search.toLowerCase())
        );
      });
    },
    filteredWins() {
      return this.filteredStage.filter((item) => {
        return item.win === true;
      });
    },
    filteredStage() {
      return this.filteredItems.filter((item) => {
        return (
          !this.search1 ||
          item.Stage.toLowerCase().includes(this.search1.toLowerCase())
        );
      });
    },
  },
  beforeMount() {
    if (!store.get("firstTimeFile", true) && store.get("AutoProcess", false))
      this.getFileList();
    this.shineaudio = new Audio(__resources + "/sound/shine.mp3");
  },

  methods: {
    playFile(gamefile) {
      console.log("gamefile: " + gamefile);
      console.log("replaydir: " + store.get("Replay_Directory"));
      electron.shell.openItem(
        path.join(store.get("Replay_Directory"), gamefile)
      );
    },
    markFirstTime() {
      store.set("firstTimeFile", false);
    },
    Didwin_() {
      if (this.didWin) return this.filteredWins;
      else return this.filteredStage;
    },
    clearinput() {
      this.search = "";
    },
    logthis(logged) {
      console.log(logged);
    },
    async showAlert(gamefile) {
      this.fetchinginfo = true;
      this.uniqueGF = gamefile;
      electron.ipcRenderer.send("message-from-page", {
        message: "checkThisFile",
        data: gamefile,
      });

      await electron.ipcRenderer.on("message-from-worker", (event, args) => {
        if (args.command === "checkThisFileResult") {
          this.fileinfo = args.payload;
          this.showgamefileAlert = true;
          this.fetchinginfo = false;
          this.uniqueGF = null;
        }
      });
    },
    async getFileList() {
      this.loading = true;
      electron.ipcRenderer.send("message-from-page", {
        message: "getFileArray",
        data: null,
      });
      electron.ipcRenderer.on("message-from-worker", (event, args) => {
        if (args.command === "getFileArrayErr") this.error = true;
      });
      electron.ipcRenderer.on("message-from-worker", (event, args) => {
        if (args.command === "fileArrayProgress") {
          ipcRenderer.send("ChangeProgressBar", args.payload.value / 100);
          this.value = args.payload.value;
          this.progressgamefile = args.payload.gamefile;
        }
      });

      await electron.ipcRenderer.on("message-from-worker", (event, args) => {
        if (args.command === "getFileArrayResult") {
          this.isLoaded = true;
          this.markFirstTime();
          console.log(this.shineaudio.played.length);
          if (
            store.get("ShineSound", false) &&
            this.shineaudio.played.length === 0
          )
            this.shineaudio.play();

          if (args.payload.length !== 0) {
            this.File_list = args.payload;
            this.loading = false;
            setTimeout(() => {
              electron.ipcRenderer.send("HideProgressBar");
            }, 5000);
          } else {
            this.error = true;
            this.loading = false;
          }
        }
      });
    },
  },
};
</script>
