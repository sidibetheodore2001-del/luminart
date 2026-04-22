import { useState } from 'react';
import { getSceneSuggestion } from '../data/appData';
import Toast from '../components/Toast';

export default function Scenes({ scenes, activeScene, onActivateScene }) {
  const [toast, setToast] = useState(null);
  const suggestion = getSceneSuggestion();
  const favScenes = scenes.filter(s => s.isFavorite);

  const handleActivate = (scene) => {
    onActivateScene(scene.id);
    setToast(`✨ Scène ${scene.name} activée`);
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="text-display">Scènes</h1>
        <p className="greeting-subtitle" style={{ marginTop: '4px' }}>
          {scenes.length} scènes · {favScenes.length} favoris
        </p>
      </div>

      <div className="page-content stagger">
        {/* Favorites */}
        <div className="animate-fade-in-up">
          <p className="section-title">⭐ Favoris</p>
          <div className="scroll-h">
            {favScenes.map((scene) => (
              <div
                key={scene.id}
                className={`scene-card${activeScene === scene.id ? ' active' : ''}`}
                style={{ background: scene.gradient }}
                onClick={() => handleActivate(scene)}
              >
                {activeScene === scene.id && <div className="scene-active-badge" />}
                <span className="scene-emoji">{scene.emoji}</span>
                <span className="scene-name">{scene.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Contextual suggestion */}
        <div className="animate-fade-in-up">
          <div className="suggestion-banner">
            <div className="suggestion-icon">💡</div>
            <div className="suggestion-text">
              <strong>Suggestion pour vous</strong>
              Il est {new Date().getHours()}h — {suggestion.text}
            </div>
            <button
              className="suggestion-action"
              onClick={() => {
                const scene = scenes.find(s => s.name === suggestion.scene);
                if (scene) handleActivate(scene);
              }}
            >
              Activer
            </button>
          </div>
        </div>

        {/* All scenes */}
        <div className="animate-fade-in-up">
          <p className="section-title">Toutes les scènes</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
            {scenes.map((scene, i) => (
              <div
                key={scene.id}
                className="scene-list-item animate-fade-in-up"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div
                  className="scene-list-icon"
                  style={{ background: scene.gradient }}
                >
                  {scene.emoji}
                </div>
                <div className="scene-list-info">
                  <div className="scene-list-name">
                    {scene.name}
                    {scene.isFavorite && <span style={{ marginLeft: '6px', fontSize: '12px' }}>⭐</span>}
                  </div>
                  <div className="scene-list-desc">{scene.desc}</div>
                </div>
                <button
                  className={`scene-list-action${activeScene === scene.id ? ' active-scene' : ''}`}
                  onClick={() => handleActivate(scene)}
                >
                  {activeScene === scene.id ? '● Actif' : 'Activer'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {toast && <Toast message={toast} onDone={() => setToast(null)} />}
    </div>
  );
}
