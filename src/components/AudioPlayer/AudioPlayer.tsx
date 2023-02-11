import './AudioPlayer.scss'
import React from "react";

import { ReactSVG } from "react-svg";


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
                    <button>
                        <ReactSVG src={"/src/assets/svg/left.svg"}/>
                    </button>
                    <button>
                        <ReactSVG src={"/src/assets/svg/play.svg"}/>
                    </button>
                    <button>
                        <ReactSVG src={"/src/assets/svg/right.svg"}/>
                    </button>
                </div>


                <input type="range" className={'Process'}/>
                
            </div>
        )
    }

}


export default AudioPlayer