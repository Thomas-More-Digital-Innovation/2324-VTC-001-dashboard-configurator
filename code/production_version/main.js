const { app, BrowserWindow } = require("electron");
const electronReload = require("electron-reload");
const path = require('node:path')

electronReload(__dirname);

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800, // Set your desired width
    height: 600, // Set your desired height
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  win.loadFile("index.html");
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});