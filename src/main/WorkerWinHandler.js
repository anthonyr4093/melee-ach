import { ipcMain } from "electron";
import BrowserWinHandler from "./BrowserWinHandler";
const electron = require("electron");
const isDev = process.env.NODE_ENV === "development";
console.log(__dirname);
const WorkWindow = new BrowserWinHandler({
  show: false,
  webPreferences: { nodeIntegration: true },
});
const options = {
  title: "Open Slippi Directory",
  properties: ["openDirectory"],
};
electron.ipcMain.handle("OpenDialog", (event, args) => {
  return electron.dialog.showOpenDialogSync(null, options);
});
export default WorkWindow;
require("./main.js");
