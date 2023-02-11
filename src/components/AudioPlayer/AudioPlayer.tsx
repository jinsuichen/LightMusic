import './AudioPlayer.scss'
import React from "react";
import {Button, ConfigProvider} from "antd";
import { CaretRightOutlined, FastBackwardOutlined, FastForwardOutlined} from '@ant-design/icons';


import CustomizationButton from "../CustomizationButton/CustomizationButton";

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
                    <CustomizationButton customizationType={'icon'} color={'#407A52'} shape={'circle'} icon={<FastBackwardOutlined />}/>
                    <CustomizationButton customizationType={'icon'} color={'#407A52'} shape={'circle'} icon={<CaretRightOutlined />}/>
                    <CustomizationButton customizationType={'icon'} color={'#407A52'} shape={'circle'} icon={<FastForwardOutlined />}/>
                </div>


                <input type="range" className={'Process'}/>
                
            </div>
        )
    }

}


export default AudioPlayer