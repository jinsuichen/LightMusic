import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Header from './components/Header/Header'
import Settings from './pages/Settings/Settings'
import AudioPlayer from './pages/AudioPlayer/AudioPlayer'
const { api } = window

import './App.scss'

type AudioInfo = {
  path: string
  name: string
  suffix: string
}

type State = {
  pathList: Array<string>
  audioInfoList: Array<AudioInfo>
}

class App extends React.Component<Record<string, never>, State> {
  state: State = {
    pathList: [],
    audioInfoList: []
  }
  updatePathList = (): void => {
    api.getPath().then((result) => {
      this.setState({
        pathList: result
      })
    })
  }

  handleNewPath = (): void => {
    api.addPath()
    this.updatePathList()
  }

  handleDeletePath = (path: string): void => {
    api.deletePath(path).then(() => {
      this.updatePathList()
    })
  }

  componentDidMount(): void {
    this.updatePathList()
  }

  render(): JSX.Element {
    const { pathList } = this.state

    return (
      <div className="App">
        <Header />
        <Routes>
          <Route path="/AudioPlayer" element={<AudioPlayer />} index />
          <Route
            path="/Settings"
            element={
              <Settings
                pathList={pathList}
                handleDeletePath={this.handleDeletePath}
                handleNewPath={this.handleNewPath}
              />
            }
          />
          <Route path="/" element={<AudioPlayer />} />
        </Routes>
      </div>
    )
  }
}

export default App
