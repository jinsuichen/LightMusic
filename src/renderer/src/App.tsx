import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './pages/Header/Header';
import Settings from './pages/Settings/Settings';
import AudioPlayer from './pages/AudioPlayer/AudioPlayer';
const { api } = window;

import './App.scss';

type AudioInfo = {
  source: string;
  caption: string;
  from: 'local' | 'subscribe';
  status: 'ok' | 'down';
  author: string;
  pic: string;
  lyric: string;
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
  updateAudioInfoList = (): void => {
    api.getAudioList().then((result) => {
      this.setState({
        audioInfoList: result,
      });
    });
  };
  //
  handleSubscribeFromLocal = (): void => {
    api.subscribeFromLocal();
    this.updateAudioInfoList();
  };

  handleDeleteAudioInfo = (audioInfo: AudioInfo): void => {
    api.deleteAudio(audioInfo).then(() => {
      this.updateAudioInfoList();
    });
  };

  componentDidMount(): void {
    this.updateAudioInfoList();
  }

  render(): JSX.Element {
    const { audioInfoList } = this.state;

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
                audioInfoList={audioInfoList}
                handleDeleteAudioInfo={this.handleDeleteAudioInfo}
                handleNewAudioInfo={this.handleSubscribeFromLocal}
              />
            </div>
          }
        />
      </Routes>
    );
  }
}

export default App;
