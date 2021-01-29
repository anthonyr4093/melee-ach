<template>
  <div v-if="isLoaded">
    <div v-if="filteredItems[0]">
      <v-text-field v-model="search" label="Opponent Name" />
      <v-card>
        <v-card-title>Slippi Files</v-card-title>
        <v-virtual-scroll
          item-height="50"
          height="300"
          :items="[...filteredItems]"
        >
          <template #default="{ item }">
            <v-list-item :key="item.FileName" :to="item.FileName" exact>
              <v-list-item-content>
                <v-list-item-title>
                  {{ item.names[0] }} vs {{ item.names[1] }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ item.Stage }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-virtual-scroll>
      </v-card>
      <v-dialog>
        <v-card> <v-card-title> </v-card-title> </v-card>
      </v-dialog>
    </div>

    <v-alert v-else type="error" prominent>
      <v-row align="center">
        <v-col class="grow"> Couldn't load Files, Double Check Settings </v-col>
        <v-col class="shrink">
          <v-btn outlined to="settings">Settings</v-btn>
        </v-col>
      </v-row>
    </v-alert>
  </div>

  <v-skeleton-loader v-else type="list-item, divider , list-item@9" />
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
      isLoaded: false,
      showGamefile: false,
      search: "",
      gamefile: "",
      File_list: [],
    };
  },
  computed: {
    filteredItems() {
      return this.File_list.filter((item) => {
        return item.oppName.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },
  beforeMount() {
    this.getFileList();
  },
  methods: {
    async getFileList() {
      this.File_list = await electron.ipcRenderer
        .invoke("GetFileArray")
        .catch(() => {
          return [];
        });

      this.isLoaded = true;
    },
  },
};
</script>
