import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Video from './Pages/Video/Video'
import { ThemeProvider } from './context/ThemeContext'
import { UserDataProvider } from './context/UserDataContext'
import { MiniPlayerProvider } from './context/MiniPlayerContext'
import MiniPlayer from './components/MiniPlayer/MiniPlayer'
const App = () => {

const [sidebar, setSidebar] = useState(true);

  
  return (
    <ThemeProvider>
      <UserDataProvider>
        <MiniPlayerProvider>
          <div className="app">
            <Navbar setSidebar={setSidebar}/>
            <Routes>
              <Route path='/' element={<Home sidebar={sidebar}/>} />
              <Route path='/video/:categoryId/:videoId' element={<Video/>} />
            </Routes>
            <MiniPlayer />
          </div>
        </MiniPlayerProvider>
      </UserDataProvider>
    </ThemeProvider>
  )
}

export default App

