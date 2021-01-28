<template>
  <div>
    <v-list nav>
      <v-list-item
        v-for="{ route, title } of achs"
        :key="title"
        :to="route"
        router
        exact
      >
        <v-list-item-content>
          <v-list-item-title>
            {{ title }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      achs: [
        {
          route: "achievements",
          title: "The big funny",
        },
        {
          route: "achievements",
          title: "The big sad",
        },
      ],
    };
  },
};
</script>
