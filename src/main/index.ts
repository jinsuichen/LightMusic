import { app, shell, BrowserWindow, ipcMain } from 'electron';
import { join } from 'path';
const { dialog } = require('electron');

import { electronApp, optimizer, is } from '@electron-toolkit/utils';
import { subscribeFromLocal } from './localSubscribe';
import { getAudioList, deleteAudio, changeStatusToDown } from './audio';

type AudioInfo = {
  source: string;
  caption: string;
  from: 'local' | 'subscribe';
  status: 'ok' | 'down';
  author: string;
  pic: string;
  lyric: string;
};

let mainWindow: BrowserWindow;
function createMainWindow(): BrowserWindow {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 350,
    height: 430,
    frame: false,
    transparent: true,
    resizable: false,
    // ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      webSecurity: false, // For loading local audio sources
    },
  });

  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  const router = '#/AudioPlayer';
  const url = (is.dev && process.env['ELECTRON_RENDERER_URL'])
    ? process.env['ELECTRON_RENDERER_URL'] + router
    : `file://${join(__dirname, '../renderer/index.html')}${router}`;

  mainWindow.loadURL(url);

  return mainWindow;
}

function createSettingWindow(): BrowserWindow {
  // Create the browser window.
  const settingWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    transparent: true,
    resizable: false,
    // ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
    },
  });

  // settingWindow.on('ready-to-show', () => {
  //   mainWindow.show();
  // });

  settingWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  const router = '#/Settings';
  const url = (is.dev && process.env['ELECTRON_RENDERER_URL'])
    ? process.env['ELECTRON_RENDERER_URL'] + router
    : `file://${join(__dirname, '../renderer/index.html')}${router}`;

  settingWindow.loadURL(url);

  return settingWindow;
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron');

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  mainWindow = createMainWindow();

  registerHandler();

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// the rest of the app's specific main process code.
const registerHandler = (): void => {
  ipcMain.handle('closeFocusWindow', () => {
    const focusWindow: BrowserWindow | null = BrowserWindow.getFocusedWindow();
    if (focusWindow) {
      focusWindow.close();
    }
  });

  ipcMain.handle('getAudioList', (): Array<AudioInfo> => {
    return getAudioList();
  });

  ipcMain.handle('subscribeFromLocal', () => {
    const dirList = dialog.showOpenDialogSync(mainWindow, {
      properties: ['openDirectory'],
    });
    if (dirList) {
      const dir: string = dirList[0];
      subscribeFromLocal(dir);
    }
  });

  ipcMain.handle('deleteAudio', async (_, ...args) => {
    const audio: AudioInfo = args[0];
    deleteAudio(audio);
  });

  ipcMain.handle('createSettingsWindow', () => {
    createSettingWindow();
  });

  ipcMain.handle('changeStatusToDown', async (_, ...args) => {
    const audioInfo: AudioInfo = args[0];
    changeStatusToDown(audioInfo);
  });
};
