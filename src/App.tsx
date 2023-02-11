import AudioPlayer from "./components/AudioPlayer/AudioPlayer";

import './App.scss'
import React from "react";
import Header from "./components/Header/Header";

const App = () => (
    <div className='App'>
        <Header />
        <AudioPlayer />
    </div>
)

export default App
