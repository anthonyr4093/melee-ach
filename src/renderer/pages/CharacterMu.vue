// TODO: Add loading Bar
<template>
  <div>
    <h1>Character Match Up</h1>
    <v-divider class="ma-3" />
    <div v-if="loading" class="ma-2">
      <v-progress-linear :value="value" height="15" striped>
        {{ message }}</v-progress-linear
      >
    </div>
    <v-row>
      <v-col cols="5">
        <v-autocomplete
          v-model="PCharacter"
          :items="Characters"
          item-text="Characters"
          label="Your Character"
          filled
          clearable
        ></v-autocomplete>
      </v-col>
      <v-col cols="2" align-self="center" class="text-center"> Vs. </v-col>
      <v-col cols="5">
        <v-autocomplete
          v-model="ECharacter"
          :items="Characters"
          item-text="Characters"
          label="Opponents Character"
          filled
          clearable
        ></v-autocomplete>
      </v-col>
    </v-row>
    <v-layout justify-center>
      <v-btn @click="submit"> Process </v-btn>
    </v-layout>
    <div v-if="loaded && ReturnedData">
      <v-divider class="ma-2" />
      <v-row>
        <v-col cols="6">
          <v-card>
            <v-card-title> Your Character {{ PCharacter }}</v-card-title>
            <v-card-text> Kills: {{ ReturnedData.Kills }} </v-card-text>
            <v-card-text> Damage: {{ ReturnedData.Damage }} </v-card-text>
            <v-card-text> Wins: {{ ReturnedData.Wins }} </v-card-text>
            <v-card-text>
              Best Stage: {{ ReturnedData.beststage }}({{
                ReturnedData.beststageval
              }})
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card>
            <v-card-title> Opponents Character: {{ ECharacter }}</v-card-title>
            <v-card-text> Deaths: {{ ReturnedData.Oppkills }} </v-card-text>
            <v-card-text>
              Opponents Damage: {{ ReturnedData.Oppdamage }}
            </v-card-text>
            <v-card-text> Losses: {{ ReturnedData.Loss }} </v-card-text>
            <v-card-text>
              Worst Stage: {{ ReturnedData.worststage }}({{
                ReturnedData.worststageval
              }})
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-divider class="ma-2" />
      <div class="text-center">
        <v-layout>
          <v-row justify="center">
            <v-col>
              <h4>Other Stats</h4>
              <p>WL Ratio: {{ ReturnedData.WLRatio }}</p>
              <br />
              <p>KD Ratio: {{ ReturnedData.KDRatio }}</p>
              <br />
              <p>Damage Ratio: {{ ReturnedData.DamageRatio }}</p>
              <br />
              <p>Total Games: {{ ReturnedData.Wins + ReturnedData.Loss }}</p>
            </v-col>
          </v-row>
        </v-layout>
      </div>
    </div>
  </div>
</template>

<script>
const fs = require("fs");
const electron = require("electron");
export default {
  data() {
    return {
      PCharacter: null,
      ECharacter: null,
      loaded: false,
      ReturnedData: null,
      message: null,
      loading: false,
      value: 0,
    };
  },
  computed: {
    Characters() {
      const mydata = JSON.parse(
        fs.readFileSync(__resources + "/worker/info.Json")
      );
      console.log(mydata.CharacterNames);
      return mydata.CharacterNames;
    },
  },
  beforeMount() {
    this.shineaudio = new Audio(__resources + "/sound/shine.mp3");
  },
  methods: {
    test() {
      console.log(JSON.parse(fs.openSync(__resources + "/worker/info.Json")));
    },
    async submit() {
      if (this.PCharacter !== null || this.ECharacter !== null) {
        console.log("yo");
        this.loaded = false;
        this.loading = true;
        this.ReturnedData = null;
        electron.ipcRenderer.send("message-from-page", {
          message: "CharacterMUSpread",
          data: { PlayerChar: this.PCharacter, EnemyChar: this.ECharacter },
        });

        electron.ipcRenderer.on("message-from-worker", (event, args) => {
          if (args.command === "CharacterMUSpreadBar") {
            this.message = args.payload.Message;
            this.value = args.payload.Value;
          }
        });
        await electron.ipcRenderer.on("message-from-worker", (event, args) => {
          if (args.command === "CharacterMUSpreadResult") {
            if (store.get(this.shineaudio, false) === false)
              this.shineaudio.play();
            this.loaded = true;
            this.loading = false;
            this.value = 0;
            this.ReturnedData = args.payload;
          }
        });
      }
    },
  },
};
</script>

<style></style>
