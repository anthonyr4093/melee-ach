// TODO: #4 Figure out how to go backwards in routing. This should not be hard.
<template>
  <div>
    <v-card>
      <v-card-title
        >{{ this.fileinfo.alt.name1 }} vs.
        {{ this.fileinfo.alt.name2 }}</v-card-title
      >
      <v-card-subtitle>{{ this.fileinfo.alt.stage }}</v-card-subtitle>
      <v-card-text>
        Kills This Game: {{ this.fileinfo.slpparse.stock }}
      </v-card-text>
      <v-card-text>
        Damage This Game: {{ this.fileinfo.slpparse.dama }}</v-card-text
      >
    </v-card>
  </div>
</template>
<script>
const electron = require("electron");
export default {
  data() {
    return {
      fileinfo: {},
    };
  },
  beforeMount() {
    electron.ipcRenderer
      .invoke("CheckThisFile", this.$route.params.Gamefile)
      .then(
        (result) => ((this.fileinfo = result), console.log(result)),
        (reason) => console.log(reason)
      );
  },
};
</script>
