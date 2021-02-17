// TODO make this an actual workerWindow
// !
import path from "path";
// eslint-disable-next-line import/no-webpack-loader-syntax
// import worker from "html-loader!./worker.html";
import BrowserWinHandler from "./BrowserWinHandler";

import "./mainWindow";

const isDev = process.env.NODE_ENV === "development";

const WorkWindow = new BrowserWinHandler({
  show: true,
  webPreferences: { nodeIntegration: true, enableRemoteModule: true },
});

WorkWindow.onCreated((browserWindow) => {
  console.log(__resources);
  browserWindow.loadURL(path.join(__resources, "/worker/worker.html"));
});
export default WorkWindow;
