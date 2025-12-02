import React from 'react'
import './Home.css'
import Sidebar from '../../components/Sidebar/Sidebar'
import DemoButton from '../../components/DemoButton/DemoButton'

const Home = ({sidebar}) => {
  return (
    <div className="home-container">
      <Sidebar sidebar={sidebar}/>
      <div className="home-content fade-in">
        <h2 className="slide-in-up">Welcome to Your Enhanced YouTube Clone! 🎬</h2>
        <div className="features-showcase">
          <div className="feature-card slide-in-up" style={{animationDelay: '0.1s'}}>
            <h3>🎨 Multiple Themes</h3>
            <p>Switch between 6 unique themes including Dark, Midnight, Sunset, Ocean, Neon, and Light modes</p>
          </div>
          <div className="feature-card slide-in-up" style={{animationDelay: '0.2s'}}>
            <h3>📊 Watch Statistics</h3>
            <p>Track your viewing habits with detailed statistics and history</p>
          </div>
          <div className="feature-card slide-in-up" style={{animationDelay: '0.3s'}}>
            <h3>🔍 Advanced Search</h3>
            <p>Filter by duration, quality, category, language and more</p>
          </div>
          <div className="feature-card slide-in-up" style={{animationDelay: '0.4s'}}>
            <h3>📱 Mini Player</h3>
            <p>Watch videos while browsing with our draggable mini player</p>
          </div>
        </div>
        <DemoButton />
      </div>
    </div>
  )
}

export default Home
