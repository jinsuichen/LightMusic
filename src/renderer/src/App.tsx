import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Header from './components/Header/Header'
import Settings from './pages/Settings/Settings'
import AudioPlayer from './pages/AudioPlayer/AudioPlayer'

import './App.scss'

const App = () => (
  <BrowserRouter>
    <div className="App">
      <Header />
      <Routes>
        <Route path="/AudioPlayer" element={<AudioPlayer />} index />
        <Route path="/Settings" element={<Settings />} />
        <Route path="/" element={<AudioPlayer />} />
      </Routes>
    </div>
  </BrowserRouter>
)

export default App
