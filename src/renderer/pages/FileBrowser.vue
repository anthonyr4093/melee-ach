<template>
  <div>
    <v-progress-linear
      v-if="isLoaded"
      :active="loading"
      :value="value"
      height="20"
    >
      {{ progressgamefile }}
    </v-progress-linear>

    <!-- <v-text-field v-model="search" label="Opponent Name" /> -->
    <v-checkbox v-model="didWin" label="Won?"></v-checkbox>
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

        <v-virtual-scroll item-height="50" height="300" :items="[...Didwin_()]">
          <template #default="{ item }">
            <v-list-item :key="item.FileName" @click="showAlert(item.FileName)">
              <v-list-item-content>
                <v-list-item-title>
                  <v-icon
                    >{{
                      item.win ? "mdi-trophy" : "mdi-trophy-broken"
                    }}
                    ></v-icon
                  >{{ item.names[0] }} vs {{ item.names[1] }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ item.Stage }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-virtual-scroll>
      </v-card>
      <div v-if="showgamefileAlert">
        <v-dialog
          v-model="showgamefileAlert"
          width="66%"
          v-on="showgamefileAlert"
        >
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
              Because you Played: {{ fileinfo.alt.char }} These Are The Stats We
              Calculated:
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
        <v-col class="grow"> Couldn't load Files, Double Check Settings </v-col>
        <v-col class="shrink">
          <v-btn outlined to="settings">Settings</v-btn>
        </v-col>
      </v-row>
    </v-alert>

    <v-skeleton-loader v-else type="list-item, divider , list-item@9" />
  </div>
</template>

<script>
// TODO: Alert user when bad file is parsed.
// TODO: #3 Load a segment of files when scrollbar hits a threshold
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
      isLoaded: false,
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
    };
  },
  computed: {
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
    this.getFileList();
  },
  methods: {
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
      electron.ipcRenderer.send("message-from-page", {
        message: "checkThisFile",
        data: gamefile,
      });

      await electron.ipcRenderer.on("message-from-worker", (event, args) => {
        if (args.command == "checkThisFileResult") {
          this.fileinfo = args.payload;
          this.showgamefileAlert = true;
          this.fetchinginfo = false;
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
        if (args.command == "getFileArrayErr") this.error = true;
      });
      electron.ipcRenderer.on("message-from-worker", (event, args) => {
        if (args.command == "fileArrayProgress") {
          this.value = args.payload.value;
          this.progressgamefile = args.payload.gamefile;
        }
      });

      await electron.ipcRenderer.on("message-from-worker", (event, args) => {
        if (args.command == "getFileArrayResult") {
          this.File_list = args.payload;
          this.loading = false;
        }
      });

      this.isLoaded = true;
    },
  },
};
</script>
