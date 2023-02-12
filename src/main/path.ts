const Store = require('electron-store')
const path = require('path')
const fs = require('fs')

const store = new Store()

const audioSuffixs: Array<string> = ['mp3', 'wav', 'ogg']

const getPath = (): Array<string> => {
  if (!store.has('pathList')) {
    store.set('pathList', [])
  }
  return store.get('pathList')
}

const addPath = (path: string): void => {
  const currentPathList = getPath()
  const exist = currentPathList.find((value) => {
    return value === path
  })
  if (exist) return
  const newPathList = [...currentPathList, path]
  store.set('pathList', newPathList)
}

const deletePath = (path: string): void => {
  const currentPathList = getPath()
  const newPathList = currentPathList.filter((value) => {
    return value !== path
  })
  store.set('pathList', newPathList)
}

type AudioInfo = {
  path: string
  name: string
}
const getAudioInfoList = (): Array<AudioInfo> => {
  const dirList = getPath()
  const resultSet: Set<AudioInfo> = new Set()
  dirList.forEach((dir) => {
    scanPath(dir, resultSet)
  })
  return Array.from(resultSet)
}

const scanPath = (dirPath: string, set: Set<AudioInfo>): void => {
  const files = fs.readdirSync(dirPath)

  try {
    files.forEach((fileName) => {
      const filePath = path.join(dirPath, fileName)

      const state = fs.statSync(filePath)

      if (state.isFile() && !state.isSymbolicLink()) {
        const isAudioFile: boolean = audioSuffixs.some((suffix) => {
          return fileName.endsWith(suffix)
        })
        if (isAudioFile) {
          set.add({
            path: filePath,
            name: fileName
          })
        }
      }

      if (state.isDirectory()) {
        scanPath(filePath, set)
      }
    })
  } catch (e) {
    // do nothing
    // if (e.code !== 'ENOENT') {
    //   console.log(e)
    // }
  }
}

export { getPath, addPath, deletePath, getAudioInfoList }
