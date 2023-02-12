const Store = require('electron-store')

const store = new Store()

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

export { getPath, addPath, deletePath }
