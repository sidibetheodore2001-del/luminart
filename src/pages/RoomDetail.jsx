import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IconChevronLeft, IconBulb, IconSettings } from '../components/Icons';
import LampSheet from '../components/LampSheet';

export default function RoomDetail({ rooms, onUpdateLamp, onToggleRoom }) {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [selectedLamp, setSelectedLamp] = useState(null);

  const room = rooms.find(r => r.id === roomId);
  if (!room) return <div className="page"><p>Pièce introuvable.</p></div>;

  const onLamps = room.lamps.filter(l => l.on);
  const avgIntensity = onLamps.length > 0
    ? Math.round(onLamps.reduce((s, l) => s + l.intensity, 0) / onLamps.length)
    : 0;

  const [globalIntensity, setGlobalIntensity] = useState(avgIntensity);

  const handleGlobalIntensity = (e) => {
    const val = parseInt(e.target.value);
    setGlobalIntensity(val);
    // proportionally adjust ON lamps
    room.lamps.forEach(lamp => {
      if (lamp.on) {
        onUpdateLamp(room.id, lamp.id, { ...lamp, intensity: val });
      }
    });
  };

  const presets = [
    { emoji: '😌', name: 'Détente', intensity: 25, temp: 2700 },
    { emoji: '🎬', name: 'Film', intensity: 15, temp: 2700 },
    { emoji: '📖', name: 'Lecture', intensity: 60, temp: 4500 },
  ];

  return (
    <div className="page">
      {/* Header */}
      <div className="room-detail-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <IconChevronLeft />
        </button>
        <h1 className="room-detail-title">
          {room.emoji} {room.name}
        </h1>
        <button className="back-button" style={{ background: 'transparent', border: 'none' }}>
          <IconSettings />
        </button>
      </div>

      {/* Quick presets */}
      <div style={{ padding: '0 var(--space-lg)', marginBottom: 'var(--space-xl)' }}>
        <div className="scroll-h" style={{ gap: 'var(--space-xs)' }}>
          {presets.map((p) => (
            <button
              key={p.name}
              className="chip"
              onClick={() => {
                room.lamps.forEach(lamp => {
                  if (lamp.on) {
                    onUpdateLamp(room.id, lamp.id, { ...lamp, intensity: p.intensity, temp: p.temp });
                  }
                });
                setGlobalIntensity(p.intensity);
              }}
            >
              {p.emoji} {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Global slider */}
      <div className="global-slider-section">
        <div className="slider-label">
          <span className="slider-label-text">Intensité globale</span>
          <span className="slider-value">{globalIntensity}%</span>
        </div>
        <input
          type="range"
          className="intensity-slider"
          min="0"
          max="100"
          value={globalIntensity}
          onChange={handleGlobalIntensity}
          style={{
            background: `linear-gradient(to right, var(--accent) ${globalIntensity}%, var(--bg-input) ${globalIntensity}%)`,
          }}
        />
      </div>

      {/* Lamps list */}
      <div className="page-content">
        <div>
          <p className="section-title">Lampes</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }} className="stagger">
            {room.lamps.map((lamp, i) => (
              <div
                key={lamp.id}
                className="lamp-card animate-fade-in-up"
                style={{ animationDelay: `${i * 60}ms` }}
                onClick={() => setSelectedLamp(lamp)}
              >
                <div className={`lamp-icon-wrap ${lamp.on ? 'on' : 'off'}`}>
                  <IconBulb on={lamp.on} />
                </div>
                <div className="lamp-info">
                  <div className="lamp-name">{lamp.name}</div>
                  <div className="lamp-meta">
                    {lamp.on ? (
                      <>
                        Intensité: {lamp.intensity}%
                        <span className="lamp-color-dot" style={{ background: lamp.color }} />
                      </>
                    ) : (
                      <span style={{ color: 'var(--text-tertiary)' }}>Éteinte</span>
                    )}
                  </div>
                </div>
                <button
                  className={`room-toggle ${lamp.on ? 'on' : 'off'}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onUpdateLamp(room.id, lamp.id, {
                      ...lamp,
                      on: !lamp.on,
                      intensity: !lamp.on ? 50 : 0,
                    });
                  }}
                  aria-label={lamp.on ? 'Éteindre' : 'Allumer'}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Room actions */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-sm)' }}>
          <button
            className="quick-action-btn action-on"
            onClick={() => onToggleRoom(room.id, true)}
          >
            💡 Tout allumer
          </button>
          <button
            className="quick-action-btn action-off"
            onClick={() => onToggleRoom(room.id, false)}
          >
            ⚫ Tout éteindre
          </button>
        </div>
      </div>

      {/* Bottom Sheet */}
      {selectedLamp && (
        <LampSheet
          lamp={selectedLamp}
          onClose={() => setSelectedLamp(null)}
          onUpdate={(updated) => {
            onUpdateLamp(room.id, updated.id, updated);
            setSelectedLamp(updated);
          }}
        />
      )}
    </div>
  );
}
