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
  source: string;
  caption: string;
  from: 'local' | 'subscribe';
};

type PlayingSheet = {
  list: Array<AudioInfo>;
  currentPos: number;
};

type Props = {
  audioInfoList: Array<AudioInfo>;
};

type State = {
  currentAudioObj: HTMLAudioElement | null;
  isPlaying: boolean;
  playingSheet: PlayingSheet; // for handling last audio
  processInterval: NodeJS.Timer | null;
};

class AudioPlayer extends React.Component<Props, State> {
  state: State = {
    currentAudioObj: null,
    isPlaying: false,
    playingSheet: { list: [], currentPos: -1 },
    processInterval: null,
  };

  componentDidMount(): void {
    const interval = setInterval(() => {
      // refresh the progress bar
      const { currentAudioObj } = this.state;
      this.setState({
        currentAudioObj: currentAudioObj,
      });

      // if audio is ended, goto the next audio
      if (currentAudioObj && currentAudioObj.ended) {
        this.playnNewAudio(1);
      }
    }, 15);
    // the ms cannot be too short, or it will create more than one audio obj

    this.setState({
      processInterval: interval,
    });
  }

  componentWillUnmount(): void {
    const { processInterval } = this.state;
    if (processInterval) {
      clearInterval(processInterval);
    }
  }

  playnNewAudio = (relativePos: 1 | -1 | 0): void => {
    const { audioInfoList } = this.props;
    const { currentAudioObj } = this.state;
    let { playingSheet } = this.state;

    // handle: the first time
    // choose audioInfoList to be default playingSheet
    if (playingSheet.list.length === 0) {
      if (audioInfoList.length === 0) {
        return;
      }

      playingSheet = {
        list: [...audioInfoList],
        currentPos: 0,
      };
      this.setState({ playingSheet: playingSheet });
    }

    if (currentAudioObj) {
      // pause the audio and wait chrome to gc
      currentAudioObj.pause();
    }

    // choose the next one
    const currentPos = playingSheet.currentPos;
    const len = playingSheet.list.length;
    const newPos: number = (((currentPos + relativePos) % len) + len) % len;
    const item: AudioInfo = playingSheet.list[newPos];

    // play audio
    const audioObj: HTMLAudioElement = new Audio(item.source);

    audioObj.play();

    // following statements cannot be in callback function of audioObj.play();
    // to avoid waiting so long and currentAudioObj.ended is always true,
    // leading to create audioObj more than once
    this.setState({
      currentAudioObj: audioObj,
      isPlaying: true,
      playingSheet: { ...playingSheet, currentPos: newPos },
    });
  };

  // the left button
  handleLastAudio = (): void => {
    this.playnNewAudio(-1);
  };

  // the right button
  handleNextAudio = (): void => {
    this.playnNewAudio(1);
  };

  // the middle button
  handleSwitch = (): void => {
    const { currentAudioObj, isPlaying } = this.state;

    if (currentAudioObj === null) {
      // if no audio has been played, randomly choose one to play
      this.playnNewAudio(0);
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

  handleProcessChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = parseInt(e.target.value);
    const { currentAudioObj, isPlaying } = this.state;
    if (currentAudioObj) {
      currentAudioObj.currentTime = value;
      if (!isPlaying) {
        currentAudioObj.play();
        this.setState({
          isPlaying: !isPlaying,
        });
      }
    }
  };

  render(): JSX.Element {
    const { currentAudioObj, isPlaying, playingSheet } = this.state;

    const caption =
      playingSheet.list.length === 0
        ? 'No Audio'
        : playingSheet.list[playingSheet.currentPos].caption;

    return (
      <div className="AudioPlayerContainer">
        <img src={ArtWork} alt="artwork" className={'ArtWork'} />
        <h1 className={'Caption'}>{caption}</h1>

        <div className={'Buttons'}>
          <CustomizationButton
            type={'icon'}
            color={'#407A52'}
            shape={'circle'}
            icon={<FastBackwardOutlined />}
            onClick={this.handleLastAudio}
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
            onClick={this.handleNextAudio}
          />
        </div>

        <input
          type="range"
          min={0}
          value={currentAudioObj ? currentAudioObj.currentTime : 0}
          max={
            currentAudioObj
              ? Number.isNaN(currentAudioObj.duration)
                ? 0
                : currentAudioObj.duration
              : 0
          }
          className={'Process'}
          onChange={this.handleProcessChange}
        />
      </div>
    );
  }
}

export default AudioPlayer;
