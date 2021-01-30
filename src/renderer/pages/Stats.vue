<template>
  <v-container>
    <div>
      <div v-if="loaded">
        <v-flex>
          <h1>Melee Total Stats.</h1>
          <v-row>
            <v-col>
              <v-card max-width="520">
                <v-card-title class="justify-center">
                  Favorite Stage
                </v-card-title>
                <v-card-subtitle class="text-center"
                  >{{ result.stage }} Was Played on
                  {{ result.stagenum }} Times</v-card-subtitle
                >
                <v-card-text
                  ><v-img
                    class="justify-center"
                    :aspect-ratio="16 / 9"
                    max-height="2048"
                    max-width="1024"
                    min-width="256"
                    :src="getStageImg(result.stage)"
                /></v-card-text>
              </v-card>
            </v-col>
            <v-col>
              <v-card max-width="520">
                <v-card-title class="justify-center">
                  Favorite Character
                </v-card-title>
                <v-card-subtitle class="text-center"
                  >{{ result.char }} Was Played
                  {{ result.charnum }} Times</v-card-subtitle
                >
                <v-card-text
                  ><v-img
                    class="justify-center"
                    :src="getCharImg(result.char)"
                    max-height="128"
                  ></v-img
                ></v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-flex>
        <v-divider />
      </div>
      <div v-else>
        <v-skeleton-loader type="image"></v-skeleton-loader>
      </div>
    </div>
  </v-container>
</template>

<script>
import { ipcRenderer } from "electron";
export default {
  data() {
    return {
      result: null,
      loaded: false,
      dirname: __dirname,
    };
  },
  methods: {
    GetStats() {
      ipcRenderer.invoke("GetGeneralStats").then((result) => {
        this.result = result;
        this.loaded = true;
        console.log(result);
      });
    },
    getStageImg(pic) {
      return require("../assets/Stages/" + pic + ".png");
    },
    getCharImg(pic) {
      return require("../assets/Icons/" + pic + ".png");
    },
  },
  beforeMount() {
    this.GetStats();
    console.log(this.dirname);
  },
};
</script>

<style></style>
