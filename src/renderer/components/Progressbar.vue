<template>
  <div>
    <v-progress-linear v-model="loader" bottom :active="loading">
    </v-progress-linear>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      loader: 0,
    };
  },
};
</script>

<style></style>
