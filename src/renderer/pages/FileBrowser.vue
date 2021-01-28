<template>
  <div>
    <v-text-field v-model="search" label="Opponent Name" />
    <v-card>
      <v-card-title>Slippi Files</v-card-title>
      <v-list>
        <v-list-item
          v-for="{ FileName, names, Stage, oppName } in filteredItems"
          :key="FileName"
        >
          <v-list-item-title>
            {{ names[0] }} vs {{ names[1] }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ Stage }}
          </v-list-item-subtitle>
        </v-list-item>
      </v-list>
    </v-card>
    <v-snackbar v-model="snackbarS" type="error"
      >Couldn't load Files</v-snackbar
    >
  </div>
</template>

<script>
// TODO: Alert user when bad file is parsed.
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
          console.log(result[0].names);
        },
        (result) => {
          this.snackbarS = true;
        }
      );
    },
  },
};
</script>
