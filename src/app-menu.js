const { shell, dialog, BrowserWindow } = require('electron');
const fs = require('fs');

const isMac = process.platform === 'darwin'
const books = "books";
const crafts = "crafts";

const getWindow = () => BrowserWindow.getFocusedWindow();

const getLocalBooks = () => getWindow().webContents.executeJavaScript(`localStorage.getItem("${books}") || "[]";`, true);
const getLocalCrafts = () => getWindow().webContents.executeJavaScript(`localStorage.getItem("${crafts}") || "[]";`, true);

const saveWindow = () => dialog.showSaveDialog(null, {
  title: 'Export library',
  defaultPath: 'Book_of_Hours_library.bh',
  buttonLabel: 'Export',
  filters: [
    { name: 'Book of Hours Tracker', extensions: ['bht'] },
    { name: 'All Files', extensions: ['*'] },
  ]
});

const exportSave = () => {
  Promise.all([saveWindow(), getLocalBooks(), getLocalCrafts()]).then((vals) => {
    try { fs.writeFileSync(vals[0].filePath, JSON.stringify({books: vals[1], crafts: vals[2]}), { encoding: 'utf-8' }); }
    catch (ex) { console.log(ex); }
  });
};

const importSave = () => {
  let filePath = dialog.showOpenDialogSync(null, {
    title: 'Import library',
    buttonLabel: 'Import',
    filters: [{ name: 'Book of Hours Tracker', extensions: ['bht'] }]
  });
  let save = JSON.parse(fs.readFileSync(filePath.join("/"), { encoding: "utf-8" }));

  getWindow().webContents.executeJavaScript(`
    localStorage.setItem("${books}", '${save[books]}');
    localStorage.setItem("${crafts}", '${save[crafts]}');
    location.reload();
  `, true);
};

const destroySave = () => getWindow().webContents.executeJavaScript(`
  localStorage.clear();
  location.reload();
`, true);

const saveMenu = {
  label: 'Save',
  submenu: [
    {
      label: 'Export',
      click: exportSave
    },
    {
      label: 'Import',
      click: importSave
    },
    { type: 'separator' },
    {
      label: 'Destroy',
      click: destroySave
    }
  ]
};

const menu = [
  {
    label: 'File',
    submenu: [
      saveMenu,
      { type: 'separator' },
      isMac ? { role: 'close' } : { role: 'quit' }
    ]
  },
  {
    role: 'help',
    click: async () => { await shell.openExternal('https://book-of-hours.fandom.com/wiki/Book_of_Hours_Wiki'); }
  }
];

module.exports = menu;
