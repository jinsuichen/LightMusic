import { ElectronAPI } from '@electron-toolkit/preload'

type AudioInfo = {
  path: string
  name: string
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      exitProgram(): Promise<void>
      getPath(): Promise<Array<string>>
      addPath(): Promise<void>
      deletePath(path: string): Promise<void>
      getAudioInfoList(): Promise<Array<AudioInfo>>
    }
  }
}
