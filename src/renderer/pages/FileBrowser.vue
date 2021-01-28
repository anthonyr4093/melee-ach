<template>
  <div>
    <v-text-field v-model="search" label="Opponent Name" />
    <v-card>
      <v-card-title>Slippi Files</v-card-title>
      <v-virtual-scroll
        item-height="50"
        height="300"
        :items="[...filteredItems]"
      >
        <template #default="{ item }">
          <v-list-item :key="item.FileName">
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
    <v-snackbar v-model="snackbarS" type="error"
      >Couldn't load Files</v-snackbar
    >
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
      search: "",
      snackbarS: false,
      File_list: [],
      route: [{}],
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
    getFileList() {
      electron.ipcRenderer.invoke("GetFileArray").then(
        (result) => {
          this.File_list = result;
          console.log(this.filteredItems);
        },
        (result) => {
          this.snackbarS = true;
        }
      );
    },
  },
};
</script>
