import { useState } from 'react';
import { ENERGY_DATA } from '../data/appData';
import { IconLeaf } from '../components/Icons';

export default function Energy() {
  const [period, setPeriod] = useState('Jour');
  const [ecoMode, setEcoMode] = useState(true);

  const maxHourly = Math.max(...ENERGY_DATA.hourly);
  const currentHour = new Date().getHours();

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="text-display">Énergie</h1>
        <p className="greeting-subtitle" style={{ marginTop: '4px' }}>
          Suivi et optimisation
        </p>
      </div>

      <div className="page-content stagger">
        {/* Period tabs */}
        <div className="animate-fade-in-up">
          <div className="period-tabs">
            {['Jour', 'Semaine', 'Mois'].map((p) => (
              <button
                key={p}
                className={`period-tab${period === p ? ' active' : ''}`}
                onClick={() => setPeriod(p)}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Hero stats */}
        <div className="animate-fade-in-up">
          <div className="energy-hero">
            <div className="energy-hero-value">
              {ENERGY_DATA.today.kwh}
              <span className="energy-hero-unit"> kWh</span>
            </div>
            <div className="energy-hero-trend">
              ↓ {Math.abs(ENERGY_DATA.today.trend)}% vs hier
            </div>
            <div className="energy-hero-cost">
              ~{ENERGY_DATA.today.cost.toFixed(2)}€ estimé
            </div>

            {/* Bar chart */}
            <div className="bar-chart">
              {ENERGY_DATA.hourly.map((val, i) => (
                <div className="bar-chart-item" key={i}>
                  <div
                    className={`bar-fill${i === currentHour ? ' current' : ''}`}
                    style={{
                      height: `${(val / maxHourly) * 80}px`,
                      animationDelay: `${i * 30}ms`,
                    }}
                  />
                  {i % 4 === 0 && <span className="bar-label">{i}h</span>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Eco mode */}
        <div className="animate-fade-in-up">
          <p className="section-title">Mode Éco</p>
          <div className={`eco-toggle-card${ecoMode ? ' active' : ''}`}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: 'var(--radius-md)',
              background: ecoMode ? 'var(--energy-green-bg)' : 'var(--bg-elevated)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <IconLeaf />
            </div>
            <div className="eco-info">
              <div className="eco-title">
                Mode Eco
                {ecoMode && <span className="eco-badge">🌿 Actif</span>}
              </div>
              <div className="eco-desc">
                {ecoMode
                  ? 'Optimisation heures creuses active. Économie estimée : 12%'
                  : 'Réduisez votre consommation automatiquement'}
              </div>
            </div>
            <button
              className={`room-toggle ${ecoMode ? 'on' : 'off'}`}
              onClick={() => setEcoMode(!ecoMode)}
              style={ecoMode ? { background: 'var(--energy-green)' } : {}}
              aria-label={ecoMode ? 'Désactiver Eco' : 'Activer Eco'}
            />
          </div>
        </div>

        {/* Breakdown by room */}
        <div className="animate-fade-in-up">
          <p className="section-title">Par pièce</p>
          <div style={{
            background: 'var(--bg-card)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--border)',
            padding: 'var(--space-md)',
          }}>
            {ENERGY_DATA.byRoom.map((item, i) => (
              <div key={i} className="energy-breakdown-item">
                <span className="energy-breakdown-label">{item.name}</span>
                <div className="energy-breakdown-bar-bg">
                  <div
                    className="energy-breakdown-bar-fill"
                    style={{ width: `${item.pct}%`, transitionDelay: `${i * 100}ms` }}
                  />
                </div>
                <span className="energy-breakdown-value">
                  {item.kwh} kWh ({item.pct}%)
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="animate-fade-in-up">
          <p className="section-title">💡 Recommandations</p>
          <div className="reco-card">
            <p className="reco-text">
              Le couloir est resté allumé 3h sans mouvement hier. Créez une automatisation pour éviter le gaspillage.
            </p>
            <span className="reco-action">
              → Créer une automatisation
            </span>
          </div>
          <div className="reco-card" style={{ marginTop: 'var(--space-sm)' }}>
            <p className="reco-text">
              Passez aux ampoules LED dans la cuisine pour économiser jusqu'à 30% sur cette pièce.
            </p>
            <span className="reco-action">
              → En savoir plus
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
