<template>
  <div>
    <h1>Character Match Up</h1>
    <v-divider class="ma-3" />
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
          label="Your Character"
          filled
          clearable
        ></v-autocomplete>
      </v-col>
    </v-row>
    <v-layout justify-center> <v-btn> Process </v-btn> </v-layout>
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
  methods: {
    test() {
      console.log(JSON.parse(fs.openSync(__resources + "/worker/info.Json")));
    },
    async submit() {
      if (this.PCharacter === null || this.ECharacter === null) {
        electron.ipcRenderer.send("message-from-page", {
          message: "CharacterMUSpread",
          data: { PlayerChar: this.PCharacter, EnemyChar: this.ECharacter },
        });
      }
      await electron.ipcRenderer.on("message-from-worker", (event, args) => {
        if (args.command === "CharacterMUSpreadResult") {
        }
      });
    },
  },
};
</script>

<style></style>
