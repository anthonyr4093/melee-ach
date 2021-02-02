// TODO make this an actual workerWindow
import BrowserWinHandler from "./BrowserWinHandler";
const electron = require("electron");
const isDev = process.env.NODE_ENV === "development";
import { join } from "path";
console.log(__dirname);
const WorkWindow = new BrowserWinHandler({
  show: true,
  webPreferences: { nodeIntegration: true, enableRemoteModule: true },
});
// const workerurl = join(__dirname, "worker.vue");
const INDEX_PATH = join(__dirname, "worker.vue");
const DEV_SERVER_URL = process.env.DEV_SERVER_URL; // eslint-disable-line prefer-destructuring
WorkWindow.onCreated((browserWindow) => {
  browserWindow.loadURL(process.cwd() + "/" + __dirname + "/worker.html").then(
    (result) => {
      console.log(result);
    },
    (reason) => {
      console.log(reason);
    }
  );
});

export default WorkWindow;
// require("./main.js");
