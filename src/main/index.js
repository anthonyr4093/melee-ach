/* globals INCLUDE_RESOURCES_PATH */
import { app, ipcMain, dialog, remote } from "electron";
import username from "username";
import winHandler from "./mainWindow";

/**
 * Set `__resources` path to resources files in renderer process
 */
global.__resources = undefined; // eslint-disable-line no-underscore-dangle
// noinspection BadExpressionStatementJS
INCLUDE_RESOURCES_PATH; // eslint-disable-line no-unused-expressions
if (__resources === undefined)
  console.error("[Main-process]: Resources path is undefined");

app.allowRendererProcessReuse = true;

// Quit when all windows are closed.
app.on("window-all-closed", function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") app.quit();
});

const options = {
  title: "Open Slippi Directory",
  properties: ["openDirectory"],
  defaultPath: app.getPath("documents"),
};
ipcMain.handle("OpenDialog", (event, args) => {
  return dialog.showOpenDialogSync(null, options);
});
// Load here all startup windows
require("./mainWindow");
require("./WorkerWinHandler");
ipcMain.on("ChangeProgressBar", (event, args) => {
  console.log(args);
  winHandler.browserWindow.setProgressBar(args);
});
ipcMain.on("HideProgressBar", (event) => {
  winHandler.browserWindow.setProgressBar(-1);
});
