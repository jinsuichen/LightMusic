import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      exitProgram(): Promise<void>
      getPath(): Promise<Array<string>>
      addPath(): Promise<void>
    }
  }
}
