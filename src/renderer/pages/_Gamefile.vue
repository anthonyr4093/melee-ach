// TODO: #4 Figure out how to go backwards in routing. should not be hard.
<template>
  <div>
    <v-card>
      <v-card-title
        ><v-icon left>{{
          fileinfo.alt.win ? "mdi-trophy" : "mdi-trophy-broken"
        }}</v-icon
        >{{ fileinfo.alt.name1 }} vs. {{ fileinfo.alt.name2 }}</v-card-title
      >
      <v-card-subtitle
        >{{ fileinfo.alt.stage }}

        Kills This Game: {{ fileinfo.slpparse.stock }}

        Damage This Game: {{ fileinfo.slpparse.dama }}
      </v-card-subtitle>
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
    electron.ipcRenderer.invoke("Checkile", $route.params.Gamefile).then(
      (result) => ((fileinfo = result), console.log(result)),
      (reason) => console.log(reason)
    );
  },
};
</script>
