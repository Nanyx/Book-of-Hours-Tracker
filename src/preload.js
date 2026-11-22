// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  onSaveRead: (callback) =>
    ipcRenderer.on("save-check-event", (_event, value) => callback(value)),
});
