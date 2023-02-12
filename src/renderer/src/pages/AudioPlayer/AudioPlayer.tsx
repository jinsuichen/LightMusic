import './AudioPlayer.scss'
import React from 'react'
import { CaretRightOutlined, FastBackwardOutlined, FastForwardOutlined } from '@ant-design/icons'

import CustomizationButton from '../../components/CustomizationButton/CustomizationButton'
import ArtWork from '../../assets/artwork/artwork.jpg'

class AudioPlayer extends React.Component {
  render(): JSX.Element {
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
            icon={<CaretRightOutlined />}
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
    )
  }
}

export default AudioPlayer