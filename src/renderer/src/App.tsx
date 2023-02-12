import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './pages/Header/Header';
import Settings from './pages/Settings/Settings';
import AudioPlayer from './pages/AudioPlayer/AudioPlayer';
const { api } = window;

import './App.scss';

type AudioInfo = {
  path: string;
  name: string;
};

type State = {
  pathList: Array<string>;
  audioInfoList: Array<AudioInfo>;
};

class App extends React.Component<Record<string, never>, State> {
  state: State = {
    pathList: [],
    audioInfoList: [],
  };
  updatePathList = (): void => {
    api.getPath().then((result) => {
      this.setState({
        pathList: result,
      });
      this.updateAudioInfoList();
    });
  };

  handleNewPath = (): void => {
    api.addPath();
    this.updatePathList();
  };

  handleDeletePath = (path: string): void => {
    api.deletePath(path).then(() => {
      this.updatePathList();
    });
  };

  updateAudioInfoList = (): void => {
    api.getAudioInfoList().then((result) => {
      this.setState({
        audioInfoList: result,
      });
    });
  };

  componentDidMount(): void {
    this.updatePathList();
  }

  render(): JSX.Element {
    const { pathList, audioInfoList } = this.state;

    return (
      <Routes>
        <Route
          path="/AudioPlayer"
          element={
            <div className={'App Main-App'}>
              <Header select={['setting', 'close']} />
              <AudioPlayer audioInfoList={audioInfoList} />
            </div>
          }
          index
        />

        <Route
          path="/Settings"
          element={
            <div className={'App Setting-App'}>
              <Header select={['close']} />
              <Settings
                pathList={pathList}
                handleDeletePath={this.handleDeletePath}
                handleNewPath={this.handleNewPath}
              />
            </div>
          }
        />
      </Routes>
    );
  }
}

export default App;
