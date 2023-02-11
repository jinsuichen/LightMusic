const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow () {
    const win = new BrowserWindow({
        width: 350,
        height: 430,
        frame: false,
        transparent: true,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    // is development mode?
    const isDev = !app.isPackaged;

    // get distinct url according to distinct mode
    // TODO: change url of production mode
    const url = isDev ? 'http://localhost:5173' : `file://${path.join(__dirname, './build/index.html')}`;

    // If it's at development mode, the console will be opened
    if (isDev) {
        win.webContents.openDevTools();
    }

    // Loading application
    win.loadURL(url).then(_ => {});

}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
