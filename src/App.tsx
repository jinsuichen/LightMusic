import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from "./components/Header/Header";
import Settings from "./components/Settings/Settings";
import AudioPlayer from "./components/AudioPlayer/AudioPlayer";

import './App.scss'

const App = () => (
    <BrowserRouter>
        <div className='App'>
            <Header />
            <Routes>
                <Route path='/AudioPlayer' element={<AudioPlayer/>} index />
                <Route path='/Settings' element={<Settings/>} />
            </Routes>
        </div>
    </BrowserRouter>

)

export default App
