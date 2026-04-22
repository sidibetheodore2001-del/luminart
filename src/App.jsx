import { useState, useCallback } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ROOMS_DATA, SCENES_DATA } from './data/appData';
import TabBar from './components/TabBar';
import Dashboard from './pages/Dashboard';
import Rooms from './pages/Rooms';
import RoomDetail from './pages/RoomDetail';
import Routines from './pages/Routines';
import Breath from './pages/Breath';
import Energy from './pages/Energy';
import Profile from './pages/Profile';
import Onboarding from './pages/Onboarding';
import './App.css';

function AppShell({ isLightMode, setIsLightMode }) {
  const [rooms, setRooms] = useState(ROOMS_DATA);
  const [scenes] = useState(SCENES_DATA);
  const [activeScene, setActiveScene] = useState(null);
  const [onboarded, setOnboarded] = useState(false);

  const toggleRoom = useCallback((roomId, turnOn) => {
    setRooms(prev => prev.map(r =>
      r.id === roomId
        ? { ...r, lamps: r.lamps.map(l => ({ ...l, on: turnOn, intensity: turnOn ? (l.intensity || 50) : 0 })) }
        : r
    ));
  }, []);

  const updateLamp = useCallback((roomId, lampId, updated) => {
    setRooms(prev => prev.map(r =>
      r.id === roomId
        ? { ...r, lamps: r.lamps.map(l => l.id === lampId ? updated : l) }
        : r
    ));
  }, []);

  const activateScene = useCallback((sceneId) => {
    setActiveScene(prev => prev === sceneId ? null : sceneId);
  }, []);

  if (!onboarded) {
    return <Onboarding onComplete={() => setOnboarded(true)} />;
  }

  return (
    <>
      <Routes>
        <Route path="/" element={
          <Dashboard
            rooms={rooms}
            scenes={scenes}
            onToggleRoom={toggleRoom}
            onActivateScene={activateScene}
            activeScene={activeScene}
          />
        } />
        <Route path="/pieces" element={
          <Rooms rooms={rooms} onToggleRoom={toggleRoom} />
        } />
        <Route path="/pieces/:roomId" element={
          <RoomDetail rooms={rooms} onUpdateLamp={updateLamp} onToggleRoom={toggleRoom} />
        } />
        <Route path="/routines" element={<Routines />} />
        <Route path="/breath" element={<Breath />} />
        <Route path="/energie" element={<Energy />} />
        <Route path="/profil" element={<Profile isLightMode={isLightMode} setIsLightMode={setIsLightMode} />} />
      </Routes>
      <TabBar />
    </>
  );
}

function App() {
  const [isLightMode, setIsLightMode] = useState(false);

  return (
    <BrowserRouter>
      {/* Desktop wrapper — phone simulator */}
      <div className="desktop-wrapper">
        {/* Left side — branding */}
        <div className="desktop-branding">
          <div className="brand-logo">💡</div>
          <h1 className="brand-title">LuminArt</h1>
          <p className="brand-tagline">Votre lumière, votre style</p>
          <div className="brand-features">
            <div className="brand-feature">
              <span className="brand-feature-icon">🎨</span>
              <span>Ambiances personnalisées</span>
            </div>
            <div className="brand-feature">
              <span className="brand-feature-icon">⚡</span>
              <span>Économies d'énergie</span>
            </div>
            <div className="brand-feature">
              <span className="brand-feature-icon">🤖</span>
              <span>Automatisations intelligentes</span>
            </div>
            <div className="brand-feature">
              <span className="brand-feature-icon">👥</span>
              <span>Multi-utilisateurs</span>
            </div>
          </div>
        </div>

        {/* Phone frame */}
        <div className="phone-frame">
          <div className="phone-notch">
            <div className="phone-notch-camera" />
          </div>
          <div className={`phone-screen${isLightMode ? ' light-theme' : ''}`}>
            <AppShell isLightMode={isLightMode} setIsLightMode={setIsLightMode} />
          </div>
          <div className="phone-home-indicator" />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
