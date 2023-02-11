const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

function createMainWindow () {
    const win = new BrowserWindow({
        width: 350,
        height: 430,
        frame: false,
        transparent: true,
        resizable: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    // is development mode?
    const isDev = !app.isPackaged;

    // get distinct url according to distinct mode
    // TODO: change url of production mode
    const url = isDev ? 'http://localhost:5173' : `file://${path.join(__dirname, './build/index.html')}`;

    // Loading application
    win.loadURL(url).then(_ => {});

    return win;
}

app.whenReady().then(() => {
    const mainWindow = createMainWindow();
    ipcMain.handle('exitProgram', () => mainWindow.close())

    // for macOS
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createMainWindow()
        }
    })
})

// for macOS
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
