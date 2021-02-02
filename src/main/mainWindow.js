import path from "path";
import { electron } from "webpack";
import BrowserWinHandler from "./BrowserWinHandler";
const isDev = process.env.NODE_ENV === "development";
import { app, ipcMain } from "electron";
import WorkWindow from "./WorkerWinHandler";
require("./WorkerWinHandler");
const INDEX_PATH = path.join(__dirname, "..", "renderer", "index.html");
const DEV_SERVER_URL = process.env.DEV_SERVER_URL; // eslint-disable-line prefer-destructuring

const winHandler = new BrowserWinHandler({
  height: 600,
  width: 1000,
  webPreferences: { enableRemoteModule: true, nodeIntegration: true },
});

winHandler.onCreated((browserWindow) => {
  if (isDev) browserWindow.loadURL(DEV_SERVER_URL);
  else browserWindow.loadFile(INDEX_PATH);
});

function sendWindowMessage(targetWindow, message, payload) {
  if (typeof targetWindow === "undefined") {
    console.log("Target window does not exist");
    return;
  }
  targetWindow.webContents.send(message, payload);
}
app.on("ready", async () => {
  ipcMain.on("message-from-worker", (event, arg) => {
    sendWindowMessage(winHandler.browserWindow, "message-from-worker", arg);
    console.log("Sent Message " + arg.command);
  });
  ipcMain.on("message-from-page", (event, args) => {
    WorkWindow.browserWindow.webContents.send("message-from-page", args);
    console.log("Sent Message " + args.message);
  });
});

export default winHandler;
