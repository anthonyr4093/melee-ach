<template>
  <div>
    <h1>Settings</h1>
    <v-divider></v-divider>
    <v-form>
      <v-text-field
        ref="Username"
        v-model="Username"
        label="Username"
        style="margin: 3px"
      >
      </v-text-field>
      <v-text-field
        ref="Rep_Dir"
        v-model="Replay_Directory"
        style="margin: 3px"
        label="Replay Directory"
        append-icon="mdi-folder"
        @click:append="opendir"
      >
      </v-text-field>
      <v-btn
        :loading="loading"
        :color="btncolor"
        style="margin: 3px"
        @click="submit"
      >
        {{ btntext }}</v-btn
      ></v-form
    >
  </div>
</template>

<script>
import Vue from "vue";
import Vuelidate from "vuelidate";
Vue.use(Vuelidate);
const electron = require("electron");
const Store = require("electron-store");
const store = new Store();
export default {
  data() {
    return {
      Username: store.get("username", null),
      show: false,
      Replay_Directory: store.get("Replay_Directory", null),
      loading: false,
      type: 2,
      alert: false,
      btncolor: "default",
      btntext: "Save",
    };
  },
  methods: {
    defaultbtn() {
      this.btntext = "Save";
      this.btncolor = "default";
    },
    submit() {
      this.loading = true;

      const userdata = {
        username: this.Username,
        Replay_Directory: this.Replay_Directory,
      };

      electron.ipcRenderer
        .invoke("IsSettingsValid?", userdata)
        .then((result) => {
          if (result === true) {
            this.loading = false;

            this.btncolor = "success";
            this.btntext = "Saved";
            setTimeout(() => this.defaultbtn(), 3000);
          } else {
            this.loading = false;
            this.btncolor = "error";
            this.btntext = "Error";
            setTimeout(() => this.defaultbtn(), 3000);
          }
        });
    },
    opendir() {
      electron.ipcRenderer.invoke("OpenDialog").then((result) => {
        console.log(typeof result);
        this.Replay_Directory = result;
      });
    },
  },
};
</script>

<style>
.h1 {
  text-align: center;
}
.e-nuxt-container {
  min-height: calc(100vh - 50px);
  background: linear-gradient(to right, #ece9e6, #ffffff);
  font-family: Helvetica, sans-serif;
}

.e-nuxt-content {
  display: flex;
  justify-content: space-around;
  padding-top: 100px;
  align-item: flex-start;
  flex-wrap: wrap;
}

.e-nuxt-logo {
  width: 400px;
}

.e-nuxt-system-info {
  padding: 20px;
  border-top: 1px solid #397c6d;
  border-bottom: 1px solid #397c6d;
}

.e-nuxt-links {
  padding: 100px 0;
  display: flex;
  justify-content: center;
}

.e-nuxt-button {
  color: #364758;
  padding: 5px 20px;
  border: 1px solid #397c6d;
  margin: 0 20px;
  border-radius: 15p;
  font-size: 1rem;
}

.e-nuxt-button:hover {
  cursor: pointer;
  color: white;
  background-color: #397c6d;
}
</style>
