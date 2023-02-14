import { ElectronAPI } from '@electron-toolkit/preload';

type AudioInfo = {
  source: string;
  caption: string;
  from: 'local' | 'subscribe';
};

declare global {
  interface Window {
    electron: ElectronAPI;
    api: {
      closeFocusWindow(): Promise<void>;
      createSettingsWindow(): Promise<void>;
      getAudioList(): Promise<Array<AudioInfo>>;
      subscribeFromLocal(): Promise<void>;
      deleteAudio(audio: AudioInfo): Promise<void>;
    };
  }
}
