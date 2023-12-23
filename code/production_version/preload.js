const { contextBridge } = require("electron");

contextBridge.exposeInMainWorld("versions", {
  node: "hihi",
  chrome: "haha",
  electron: "hoho",
  // we can also expose variables, not just functions
});
