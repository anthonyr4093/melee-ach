<template>
  <div>
    <h1>Settings</h1>
    <v-divider></v-divider>
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title>
          Are you sure you would like to delete your data?
        </v-card-title>
        <v-card-actions>
          <v-btn text plain color="red" @click="WipeData()">yes</v-btn>
          <v-btn text plain @click="dialog = false">no</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-form>
      <v-text-field ref="Username" v-model="Username" label="Username">
      </v-text-field>
      <v-text-field
        ref="Rep_Dir"
        v-model="Replay_Directory"
        label="Replay Directory"
        prepend-icon="mdi-folder"
        @click:prepend="opendir"
      >
      </v-text-field>
      <v-btn
        :loading="loading"
        :color="btncolor"
        class="mt-3 mr-2"
        @click="submit"
      >
        <v-icon left>{{ Sicon }}</v-icon>
        {{ btntext }}</v-btn
      >
      <v-btn class="mt-3" @click="dialog = true">
        <v-icon left>{{ nuke_icon }}</v-icon>
        clear data
      </v-btn>
    </v-form>
  </div>
</template>

<script>
import Vue from "vue";
import Vuelidate from "vuelidate";
Vue.use(Vuelidate);
const electron = require("electron");
const Store = require("electron-store");
const store = new Store();
const datastoredata = { name: "Data" };
const Achstoredata = { name: "Ach" };
const StatsStoreData = { name: "Stats" };
const datastore = new Store(datastoredata);
const achstore = new Store(Achstoredata);
const statstore = new Store(StatsStoreData);
export default {
  data() {
    return {
      file: "",
      nuke_icon: "mdi-trash-can-outline",
      dialog: false,
      Sicon: "mdi-content-save-outline",
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
      this.Sicon = "mdi-content-save-outline";
      this.btncolor = "default";
    },
    WipeData() {
      store.clear();
      datastore.clear();
      achstore.clear();
      statstore.clear();
      this.dialog = false;
      console.log("Data Wiped Clean!");
      this.nuke_icon = "mdi-nuke";
      setTimeout(() => {
        this.nuke_icon = "mdi-trash-can-outline";
      }, 3000);
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
            store.openInEditor();
            this.btncolor = "success";
            this.btntext = "Saved";
            this.Sicon = "mdi-check-outline";
            setTimeout(() => this.defaultbtn(), 3000);
          } else {
            this.loading = false;
            this.btncolor = "error";
            this.btntext = "Error";
            this.Sicon = "mdi-alert-circle-outline";
            setTimeout(() => this.defaultbtn(), 3000);
          }
        });
    },
    opendir() {
      this.Replay_Directory = "";
      electron.ipcRenderer.invoke("OpenDialog").then((result) => {
        this.Replay_Directory ||= result;
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
