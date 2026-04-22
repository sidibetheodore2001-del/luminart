import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROOMS_DATA, SCENES_DATA, ENERGY_DATA, getGreeting } from '../data/appData';
import Toast from '../components/Toast';

export default function Dashboard({ rooms, scenes, onToggleRoom, onActivateScene, activeScene }) {
  const navigate = useNavigate();
  const greeting = getGreeting();
  const [toast, setToast] = useState(null);

  const totalOn = rooms.reduce((sum, r) => sum + r.lamps.filter(l => l.on).length, 0);
  const totalLamps = rooms.reduce((sum, r) => sum + r.lamps.length, 0);
  const favScenes = scenes.filter(s => s.isFavorite);

  const handleAllOn = () => {
    rooms.forEach(r => onToggleRoom(r.id, true));
    setToast('💡 Toutes les lampes allumées');
  };

  const handleAllOff = () => {
    rooms.forEach(r => onToggleRoom(r.id, false));
    setToast('⚫ Toutes les lampes éteintes');
  };

  const handleSceneTap = (scene) => {
    onActivateScene(scene.id);
    setToast(`✨ Scène ${scene.name} activée`);
  };

  return (
    <div className="page">
      {/* Header */}
      <div className="page-header">
        <h1 className="text-display dashboard-greeting">
          {greeting.text}, Théo <span className="greeting-emoji">{greeting.emoji}</span>
        </h1>
        <p className="greeting-subtitle">
          {totalOn} lampe{totalOn > 1 ? 's' : ''} allumée{totalOn > 1 ? 's' : ''} sur {totalLamps}
        </p>
      </div>

      <div className="page-content stagger">
        {/* Quick Actions */}
        <div className="animate-fade-in-up">
          <div className="quick-actions">
            <button className="quick-action-btn action-on" onClick={handleAllOn}>
              💡 Tout allumer
            </button>
            <button className="quick-action-btn action-off" onClick={handleAllOff}>
              ⚫ Tout éteindre
            </button>
          </div>
        </div>

        {/* Favorite Scenes */}
        <div className="animate-fade-in-up">
          <p className="section-title">Scènes favorites</p>
          <div className="scroll-h" style={{ paddingLeft: 0 }}>
            {favScenes.map((scene) => (
              <div
                key={scene.id}
                className={`scene-card${activeScene === scene.id ? ' active' : ''}`}
                style={{ background: scene.gradient }}
                onClick={() => handleSceneTap(scene)}
              >
                {activeScene === scene.id && <div className="scene-active-badge" />}
                <span className="scene-emoji">{scene.emoji}</span>
                <span className="scene-name">{scene.name}</span>
              </div>
            ))}

          </div>
        </div>

        {/* Rooms */}
        <div className="animate-fade-in-up">
          <p className="section-title">Mes pièces</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
            {rooms.map((room, i) => {
              const onCount = room.lamps.filter(l => l.on).length;
              const anyOn = onCount > 0;
              return (
                <div
                  key={room.id}
                  className="room-card"
                  style={{ animationDelay: `${i * 60}ms` }}
                  onClick={() => navigate(`/pieces/${room.id}`)}
                >
                  <div className="room-icon-wrap">{room.emoji}</div>
                  <div className="room-info">
                    <div className="room-name">{room.name}</div>
                    <div className="room-status">
                      {onCount}/{room.lamps.length} lampe{room.lamps.length > 1 ? 's' : ''} allumée{onCount > 1 ? 's' : ''}
                    </div>
                  </div>
                  <button
                    className={`room-toggle ${anyOn ? 'on' : 'off'}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleRoom(room.id, !anyOn);
                    }}
                    aria-label={anyOn ? 'Tout éteindre' : 'Tout allumer'}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Energy Widget */}
        <div className="animate-fade-in-up" onClick={() => navigate('/energie')} style={{ cursor: 'pointer' }}>
          <p className="section-title">Énergie</p>
          <div className="energy-widget">
            <div className="energy-icon-wrap">⚡</div>
            <div className="energy-info">
              <div className="energy-value">{ENERGY_DATA.today.kwh} kWh</div>
              <div className="energy-label">Consommation aujourd'hui</div>
            </div>
            <div className="energy-trend">
              ↓ {Math.abs(ENERGY_DATA.today.trend)}%
            </div>
          </div>
        </div>
      </div>

      {toast && <Toast message={toast} onDone={() => setToast(null)} />}
    </div>
  );
}
