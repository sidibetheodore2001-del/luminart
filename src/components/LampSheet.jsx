import { useState } from 'react';
import { IconBulb, IconSun, IconClock, IconHeart } from './Icons';
import { COLOR_PRESETS } from '../data/appData';

export default function LampSheet({ lamp, onClose, onUpdate }) {
  const [intensity, setIntensity] = useState(lamp.intensity);
  const [temp, setTemp] = useState(lamp.temp);
  const [color, setColor] = useState(lamp.color);
  const [isOn, setIsOn] = useState(lamp.on);
  const [selectedTimer, setSelectedTimer] = useState(null);

  const handleToggle = () => {
    const newState = !isOn;
    setIsOn(newState);
    onUpdate({ ...lamp, on: newState, intensity: newState ? (intensity || 50) : 0 });
  };

  const handleIntensity = (e) => {
    const val = parseInt(e.target.value);
    setIntensity(val);
    onUpdate({ ...lamp, intensity: val, on: val > 0 });
  };

  const handleTemp = (e) => {
    const val = parseInt(e.target.value);
    setTemp(val);
    onUpdate({ ...lamp, temp: val });
  };

  const handleColor = (c) => {
    setColor(c);
    onUpdate({ ...lamp, color: c });
  };

  // compute thumb color for temperature
  const tempPct = ((temp - 2700) / (6500 - 2700)) * 100;
  const tempColor = `hsl(${30 - (tempPct * 0.3)}, ${90 - tempPct * 0.3}%, ${60 + tempPct * 0.2}%)`;

  return (
    <div className="bottom-sheet-overlay" onClick={(e) => {
      if (e.target === e.currentTarget) onClose();
    }}>
      <div className="bottom-sheet" style={{
        background: `linear-gradient(180deg, ${color}08, var(--bg-elevated) 80px)`,
      }}>
        <div className="bottom-sheet-handle" />

        {/* Header */}
        <div className="bottom-sheet-title">
          <span style={{ filter: isOn ? `drop-shadow(0 0 8px ${color})` : 'none' }}>
            <IconBulb on={isOn} />
          </span>
          {lamp.name}
          <button
            className={`room-toggle ${isOn ? 'on' : 'off'}`}
            onClick={handleToggle}
            style={{ marginLeft: 'auto' }}
            aria-label={isOn ? 'Éteindre' : 'Allumer'}
          />
        </div>

        {/* Intensity */}
        <div style={{ marginBottom: 'var(--space-xl)' }}>
          <div className="slider-label">
            <span className="slider-label-text"><IconSun /> Intensité</span>
            <span className="slider-value">{intensity}%</span>
          </div>
          <input
            type="range"
            className="intensity-slider"
            min="0"
            max="100"
            value={intensity}
            onChange={handleIntensity}
            style={{
              background: `linear-gradient(to right, var(--accent) ${intensity}%, var(--bg-input) ${intensity}%)`,
            }}
          />
        </div>

        {/* Temperature */}
        <div style={{ marginBottom: 'var(--space-xl)' }}>
          <div className="slider-label">
            <span className="slider-label-text">
              🟠 Température 
              <span style={{ fontSize: '9px', background: 'var(--accent)', color: '#000', padding: '2px 4px', borderRadius: '4px', marginLeft: '6px', fontWeight: 'bold' }}>PREMIUM</span>
            </span>
            <span className="slider-value" style={{ color: tempColor }}>{temp}K</span>
          </div>
          <input
            type="range"
            className="intensity-slider"
            min="2700"
            max="6500"
            value={temp}
            onChange={handleTemp}
            style={{
              background: `linear-gradient(to right, #FF8A00 0%, #FFE0B2 30%, #FFFFFF 60%, #BBDEFB 100%)`,
            }}
          />
        </div>

        {/* Color presets */}
        <div style={{ marginBottom: 'var(--space-xl)' }}>
          <div className="slider-label" style={{ marginBottom: 'var(--space-sm)' }}>
            <span className="slider-label-text">
              🎨 Couleur
              <span style={{ fontSize: '9px', background: 'var(--accent)', color: '#000', padding: '2px 4px', borderRadius: '4px', marginLeft: '6px', fontWeight: 'bold' }}>PREMIUM</span>
            </span>
          </div>
          <div className="color-presets">
            {COLOR_PRESETS.map((c) => (
              <button
                key={c}
                className={`color-preset${color === c ? ' selected' : ''}`}
                style={{ background: c }}
                onClick={() => handleColor(c)}
                aria-label={`Couleur ${c}`}
              />
            ))}
          </div>
        </div>

        {/* Timer */}
        <div style={{ marginBottom: 'var(--space-xl)' }}>
          <div className="slider-label" style={{ marginBottom: 'var(--space-sm)' }}>
            <span className="slider-label-text"><IconClock /> Éteindre dans…</span>
          </div>
          <div className="timer-presets">
            {['15min', '30min', '1h', '2h'].map((t) => (
              <button
                key={t}
                className={`timer-preset${selectedTimer === t ? ' selected' : ''}`}
                onClick={() => setSelectedTimer(selectedTimer === t ? null : t)}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Save as scene */}
        <button className="btn-primary" style={{ marginTop: 'var(--space-sm)' }}>
          <IconHeart /> Sauvegarder comme scène
        </button>
      </div>
    </div>
  );
}
