import { contextBridge, ipcRenderer } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';

type AudioInfo = {
  source: string;
  caption: string;
  from: 'local' | 'subscribe';
};

// Custom APIs for renderer
const api = {
  closeFocusWindow: (): Promise<void> => ipcRenderer.invoke('closeFocusWindow'),
  createSettingsWindow: (): Promise<void> => ipcRenderer.invoke('createSettingsWindow'),
  // getPath: async (): Promise<Array<string>> => await ipcRenderer.invoke('getPath'),
  // addPath: (): Promise<void> => ipcRenderer.invoke('addPath'),
  // deletePath: (path: string): Promise<void> => ipcRenderer.invoke('deletePath', path),
  // getAudioInfoList: (): Promise<Array<AudioInfo>> => ipcRenderer.invoke('getAudioInfoList'),
  getAudioList: (): Promise<Array<AudioInfo>> => ipcRenderer.invoke('getAudioList'),
  subscribeFromLocal: (): Promise<void> => ipcRenderer.invoke('subscribeFromLocal'),
  deleteAudio: (audio: AudioInfo): Promise<void> => ipcRenderer.invoke('deleteAudio', audio),
};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI);
    contextBridge.exposeInMainWorld('api', api);
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI;
  // @ts-ignore (define in dts)
  window.api = api;
}
