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
  methods: {
    onChange() {
      console.log(this.selectedItem);
      electron.ipcRenderer
        .invoke("GetAch", this.selectedItem)
        .then((result) => {
          console.log(result);
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
