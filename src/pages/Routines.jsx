import { useState } from 'react';
import Toast from '../components/Toast';

export default function Routines() {
  const [toast, setToast] = useState(null);

  const handleAction = (msg) => {
    setToast(msg);
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="text-display">Routines</h1>
        <p className="greeting-subtitle" style={{ marginTop: '4px' }}>
          Sommeil & Réveil
        </p>
      </div>

      <div className="page-content stagger">
        {/* Coach Automatique */}
        <div className="animate-fade-in-up">
          <div className="suggestion-banner">
            <div className="suggestion-icon">🧠</div>
            <div className="suggestion-text">
              <strong>Coach Sommeil</strong>
              Vous vous couchez souvent après 23h. Avancer votre routine de 15 min ?
            </div>
            <button
              className="suggestion-action"
              onClick={() => handleAction('Routine ajustée par le coach !')}
            >
              Accepter
            </button>
          </div>
        </div>

        {/* Sommeil */}
        <div className="animate-fade-in-up">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <p className="section-title" style={{ margin: 0 }}>Sommeil</p>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
            <div className="scene-list-item">
              <div className="scene-list-icon" style={{ background: 'linear-gradient(135deg, #1A2980, #26D0CE)' }}>
                🌙
              </div>
              <div className="scene-list-info">
                <div className="scene-list-name">Créer routine sommeil</div>
                <div className="scene-list-desc">Extinction progressive (Gratuit)</div>
              </div>
              <button
                className="scene-list-action"
                onClick={() => handleAction('Création de routine sommeil...')}
              >
                Créer
              </button>
            </div>

            <div className="scene-list-item" style={{ opacity: 0.8 }}>
              <div className="scene-list-icon" style={{ background: 'linear-gradient(135deg, #3a1c71, #d76d77, #ffaf7b)' }}>
                🛌
              </div>
              <div className="scene-list-info">
                <div className="scene-list-name">
                  Coucher avancé <span style={{ fontSize: '10px', background: 'var(--accent)', color: '#000', padding: '2px 6px', borderRadius: '4px', marginLeft: '6px', fontWeight: 'bold' }}>PREMIUM</span>
                </div>
                <div className="scene-list-desc">Ajustement température de couleur</div>
              </div>
              <button
                className="scene-list-action"
                style={{ background: 'var(--bg-elevated)', color: 'var(--text-secondary)' }}
                onClick={() => handleAction('Fonctionnalité Premium')}
              >
                Découvrir
              </button>
            </div>
          </div>
        </div>

        {/* Réveil */}
        <div className="animate-fade-in-up">
          <p className="section-title">Réveil</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
            <div className="scene-list-item" style={{ opacity: 0.8 }}>
              <div className="scene-list-icon" style={{ background: 'linear-gradient(135deg, #FFB75E, #ED8F03)' }}>
                🌅
              </div>
              <div className="scene-list-info">
                <div className="scene-list-name">
                  Réveil lumineux <span style={{ fontSize: '10px', background: 'var(--accent)', color: '#000', padding: '2px 6px', borderRadius: '4px', marginLeft: '6px', fontWeight: 'bold' }}>PREMIUM</span>
                </div>
                <div className="scene-list-desc">Aube artificielle sur 30 min</div>
              </div>
              <button
                className="scene-list-action"
                style={{ background: 'var(--bg-elevated)', color: 'var(--text-secondary)' }}
                onClick={() => handleAction('Fonctionnalité Premium')}
              >
                Découvrir
              </button>
            </div>
          </div>
        </div>
      </div>

      {toast && <Toast message={toast} onDone={() => setToast(null)} />}
    </div>
  );
}
