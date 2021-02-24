<template>
  <v-app>
    <progressbar />
    <Toolbar :show-menu="showMenu" @update:showMenu="setShowMenu" />
    <v-app-bar color="blue-grey" fixed app>
      <v-app-bar-nav-icon @click.stop="setShowMenu(!showMenu)" />

      <v-toolbar-title>Melee Achievemnets</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-row justify="center">
        <v-col cols="11" sm="10" md="8" lg="7" class="pt-5">
          <Nuxt />
        </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>

<script>
import Progressbar from "../components/Progressbar.vue";
export default {
  components: { Progressbar },
  data() {
    return {
      showMenu: false,
    };
  },
  mounted() {
    this.$vuetify.theme.dark = true;
  },

  methods: {
    setShowMenu(show) {
      this.showMenu = show;
    },
  },
};
</script>

<style>
body {
  margin: 0 !important;
}
</style>
