import './AudioPlayer.scss';
import React from 'react';
import {
  CaretRightOutlined,
  FastBackwardOutlined,
  FastForwardOutlined,
  PauseOutlined,
} from '@ant-design/icons';

import CustomizationButton from '../../components/CustomizationButton/CustomizationButton';
import ArtWork from '../../assets/artwork/artwork.jpg';

type AudioInfo = {
  path: string;
  name: string;
};

type Props = {
  audioInfoList: Array<AudioInfo>;
};

type State = {
  currentAudioObj: HTMLAudioElement | null;
  isPlaying: boolean;
};

class AudioPlayer extends React.Component<Props, State> {
  state: State = {
    currentAudioObj: null,
    isPlaying: false,
  };

  // the left button
  handleLastAudio = (): void => {};

  // the right button
  handleNextAudio = (): void => {};

  // the middle button
  handleSwitch = (): void => {
    const { currentAudioObj, isPlaying } = this.state;

    if (currentAudioObj === null) {
      // if no audio is playing, randomly choose one to play
      const { audioInfoList } = this.props;
      const randIndex: number = (Math.random() * audioInfoList.length) | 0;
      const item: AudioInfo = audioInfoList[randIndex];

      const audioObj: HTMLAudioElement = new Audio('file://' + item.path);
      audioObj.play();
      this.setState({
        currentAudioObj: audioObj,
        isPlaying: true,
      });
    } else {
      // if once there was an audio file
      if (isPlaying) {
        currentAudioObj.pause();
        this.setState({
          isPlaying: false,
        });
      } else {
        currentAudioObj.play();
        this.setState({
          isPlaying: true,
        });
      }
    }
  };

  render(): JSX.Element {
    const { currentAudioObj, isPlaying } = this.state;

    return (
      <div className="AudioPlayerContainer">
        <img src={ArtWork} alt="artwork" className={'ArtWork'} />
        <h1 className={'Caption'}>Pop Music</h1>

        <div className={'Buttons'}>
          <CustomizationButton
            type={'icon'}
            color={'#407A52'}
            shape={'circle'}
            icon={<FastBackwardOutlined />}
          />
          <CustomizationButton
            type={'icon'}
            color={'#407A52'}
            shape={'circle'}
            icon={currentAudioObj && isPlaying ? <PauseOutlined /> : <CaretRightOutlined />}
            onClick={this.handleSwitch}
          />
          <CustomizationButton
            type={'icon'}
            color={'#407A52'}
            shape={'circle'}
            icon={<FastForwardOutlined />}
          />
        </div>

        <input type="range" className={'Process'} />
      </div>
    );
  }
}

export default AudioPlayer;
