<template>
  <div>
    <v-navigation-drawer v-model="show" width="33%" fixed app>
      <v-list nav>
        <v-hover
          v-for="{ title, route, icon } in items"
          :key="title"
          v-slot="{ hover }"
        >
          <v-list-item :to="route" router exact>
            <v-list-item-icon class="my-auto">
              <v-icon>{{ icon + (hover ? "" : "-outline") }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-hover>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
// import os from "os";
// import path from "path";

// import SlippiGame from "@slippi/slippi-js";

export default {
  props: {
    showMenu: {
      type: Boolean,
    },
  },
  data() {
    return {
      items: [
        {
          route: "achievements",
          title: "Achievements",
          icon: "mdi-trophy-variant",
        },
        {
          route: "settings",
          title: "Settings",
          icon: "mdi-cog",
        },
        { route: "Filebrowser", title: "Slippi Files", icon: "mdi-folder" },
        { route: "Stats", title: "Stats", icon: "mdi-clipboard" },
        {
          route: "CharacterMU",
          title: "Character MU",
          icon: "mdi-medal",
        },
        // { route: "catagory", title: "Catagory", icon: "mdi-trophy-variant" },

        // { route: "schedule", title: "Schedule", icon: "mdi-calendar" }, // ? -clock
        // { route: "grades", title: "Grades", icon: "mdi-clipboard-check" },
      ],
    };
  },
  computed: {
    show: {
      get() {
        return this.showMenu;
      },
      set(value) {
        this.$emit("update:showMenu", value);
      },
    },
  },
};
</script>
