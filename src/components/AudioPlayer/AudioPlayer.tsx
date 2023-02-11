import './AudioPlayer.scss'
import React from "react";

import { ReactSVG } from "react-svg";
import {Button, ConfigProvider} from "antd";
import { CaretRightOutlined, FastBackwardOutlined, FastForwardOutlined} from '@ant-design/icons';

type Props = {

}

type State = {

}

class AudioPlayer extends React.Component<Props, State> {

    render() {
        return (
            <div className='AudioPlayerContainer'>
                <img src="src/assets/artwork/artwork.jpg" alt="artwork" className={'ArtWork'}/>
                <h1 className={'Caption'}>Pop Music</h1>


                <div className={'Buttons'}>
                    <ConfigProvider theme={{ token: { colorPrimary: '#407A52'} }}>
                        <Button type="primary" shape="circle" size={'large'} icon={<FastBackwardOutlined />}  />
                        <Button type="primary" shape="circle" size={'large'} icon={<CaretRightOutlined />}  />
                        <Button type="primary" shape="circle" size={'large'} icon={<FastForwardOutlined />}  />
                    </ConfigProvider>

                </div>


                <input type="range" className={'Process'}/>
                
            </div>
        )
    }

}


export default AudioPlayer