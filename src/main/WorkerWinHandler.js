// TODO make this an actual workerWindow
// !
import path from "path";
// eslint-disable-next-line import/no-webpack-loader-syntax
// import worker from "html-loader!./worker.html";
import BrowserWinHandler from "./BrowserWinHandler";

import winHandler from "./mainWindow";

const isDev = process.env.NODE_ENV === "development";

const WorkWindow = new BrowserWinHandler({
  show: isDev,
  webPreferences: { nodeIntegration: true, enableRemoteModule: true },
});

WorkWindow.onCreated((browserWindow) => {
  winHandler.onCreated(() => {
    winHandler.browserWindow.on("closed", () => {
      WorkWindow.browserWindow.close();
    });
  });

  browserWindow.loadURL(path.join(__resources, "/worker/worker.html"));
});
export default WorkWindow;
