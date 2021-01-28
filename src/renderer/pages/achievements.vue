<template>
  <div>
    <div>
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
    </div>
    <div>
      <v-card>
        <v-card-title>Melee Achievements</v-card-title>
        <v-list>
          <v-list-item
            v-for="{ Ach_Unlocked, Ach_Name, Ach_Disc } of achs"
            :key="Ach_Name"
          >
            <v-list-item-icon>
              <v-icon :color="Ach_Unlocked ? 'white' : 'grey'">
                {{ "mdi-lock" + (Ach_Unlocked ? "-open-variant" : "") }}</v-icon
              >
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>
                {{ Ach_Name }}
              </v-list-item-title>
              <v-list-item-subtitle> {{ Ach_Disc }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
      <v-btn :loading="loading" class="mt-2" @click="CheckAch()"
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
</template>

<script>
// TODO: Alert user when bad file is parsed.
const electron = require("electron");
const Store = require("electron-store");
const store = new Store();
export default {
  data() {
    return {
      repfile: store.get("Replay_Directory", null),
      snackbarE: false,
      snackbarS: false,
      error: "The Achievement Parser Failed. Double Check Settings",
      loading: false,
      CurrentAch: null,
      selectedItem: null,
      achs: [],
      catas: [
        { text: "Misc Achievements", value: 27 },
        { text: "General Achievements", value: 26 },
        { text: "Dr. Mario", value: 22 },
        { text: "Mario", value: 8 },
        { text: "Luigi", value: 7 },
        { text: "Bowser", value: 5 },
        { text: "Peach", value: 12 },
        { text: "Yoshi", value: 17 },
        { text: "Donkey Kong", value: 1 },
        { text: "Captain Falcon", value: 0 },
        { text: "Gannondorf", value: 25 },
        { text: "Falco", value: 20 },
        { text: "Fox", value: 2 },
        { text: "Ness", value: 11 },
        { text: "Ice Climbers", value: 14 },
        { text: "Kirby", value: 4 },
        { text: "Samus", value: 16 },
        { text: "Zelda", value: 18 },
        { text: "Link", value: 6 },
        { text: "Young Link", value: 21 },
        { text: "Pichu", value: 24 },
        { text: "Pikachu", value: 13 },
        { text: "Jigglypuff", value: 15 },
        { text: "Mewtwo", value: 10 },
        { text: "Mr.Game And Watch", value: 3 },
        { text: "Marth", value: 9 },
        { text: "Roy", value: 17 },
      ],
    };
  },
  methods: {
    onChange() {
      console.log(this.selectedItem);
      electron.ipcRenderer
        .invoke("GetAch", this.selectedItem)
        .then((result) => {
          this.achs = result;
        });
    },
    CheckAch() {
      this.loading = true;
      console.log("Checking Ach");
      electron.ipcRenderer.invoke("CheckAch").then((result) => {
        console.log(result);
        if (result === false) {
          console.log("false");
          console.log(store.get("Replay_Directory"));
          this.loading = false;
          this.snackbarE = true;
        } else {
          console.log("result true i guess");
          this.loading = false;
          this.snackbarS = true;
        }
      });
    },
  },
};
</script>
