import AudioPlayer from "./components/AudioPlayer/AudioPlayer";

import './App.scss'
import React from "react";
import Header from "./components/Header/Header";
import Settings from "./components/Settings/Settings";

const App = () => (
    <div className='App'>
        <Header />
        {/*<AudioPlayer />*/}
        <Settings />
    </div>
)

export default App
