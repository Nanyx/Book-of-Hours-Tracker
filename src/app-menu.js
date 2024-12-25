const { shell, dialog, BrowserWindow } = require('electron');
const fs = require('fs');

const isMac = process.platform === 'darwin';

const books = "books";
const crafts = "crafts";
const commits = "commits";
const secrets = "secrets";
const start = "begining";
const visitors = 'visitors';

const getWindow = () => BrowserWindow.getFocusedWindow();
const getLocal = (id, template = "[]") => getWindow().webContents.executeJavaScript(`localStorage.getItem("${id}") || "${template}";`, true);

const saveWindow = () => dialog.showSaveDialog(null, {
  title: 'Export library',
  defaultPath: 'Book_of_Hours_library',
  buttonLabel: 'Export',
  filters: [
    { name: 'Book of Hours Tracker', extensions: ['bht'] },
    { name: 'All Files', extensions: ['*'] },
  ]
});

const exportSave = () => {
  Promise.all([
    saveWindow(), 
    getLocal(start),
    getLocal(books),
    getLocal(crafts),
    getLocal(commits),
    getLocal(visitors),
    getLocal(secrets, "{}")
  ]).then((vals) => {
    try { fs.writeFileSync(vals[0].filePath, JSON.stringify({
      begining: vals[1],
      books: vals[2], 
      crafts: vals[3], 
      commits: vals[4],
      visitors: vals[5],
      secrets: vals[6]
    }), { encoding: 'utf-8' }); }
    catch (ex) { console.error(ex); }
  });
};

const importSave = () => {
  let filePath = dialog.showOpenDialogSync(null, {
    title: 'Import library',
    buttonLabel: 'Import',
    filters: [{ name: 'Book of Hours Tracker', extensions: ['bht'] }]
  });

  const save = JSON.parse(fs.readFileSync(filePath.join("/"), { encoding: "utf-8" }));
  const setLocal = (id) => `localStorage.setItem("${id}", '${save[id]}');`

  getWindow().webContents.executeJavaScript(`
    ${setLocal(start)}
    ${setLocal(books)}
    ${setLocal(crafts)}
    ${setLocal(commits)}
    ${setLocal(visitors)}
    ${setLocal(secrets)}
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
    { label: 'Export', click: exportSave },
    { label: 'Import', click: importSave },
    { type: 'separator' },
    { label: 'Destroy', click: destroySave }
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
