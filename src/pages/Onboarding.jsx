import { useState } from 'react';

const STEPS = [
  {
    id: 'welcome',
    type: 'welcome',
    visual: '💡',
    title: 'Bienvenue dans LuminArt',
    subtitle: 'Votre lumière, votre style',
  },
  {
    id: 'plan',
    type: 'plan',
    visual: '✨',
    title: 'Choisissez votre offre',
    subtitle: 'Commencez gratuitement ou débloquez tout le potentiel',
  },
  {
    id: 'rhythm',
    type: 'chips',
    visual: '⏰',
    title: 'Quel est votre rythme ?',
    subtitle: 'Nous personnaliserons votre expérience',
    chips: [
      { emoji: '🌅', label: 'Lève-tôt' },
      { emoji: '🦉', label: 'Couche-tard' },
      { emoji: '🔄', label: 'Variable' },
    ],
  },
  {
    id: 'household',
    type: 'chips',
    visual: '🏠',
    title: 'Qui vit chez vous ?',
    subtitle: 'Pour adapter les automatisations',
    chips: [
      { emoji: '👫', label: 'Couple' },
      { emoji: '👨‍👩‍👧‍👦', label: 'Famille' },
      { emoji: '🧑', label: 'Solo' },
      { emoji: '🐕', label: 'Animaux' },
    ],
  },
  {
    id: 'priority',
    type: 'chips',
    visual: '🎯',
    title: "Qu'est-ce qui compte le plus ?",
    subtitle: 'Choisissez vos priorités',
    chips: [
      { emoji: '🎨', label: 'Ambiance' },
      { emoji: '💰', label: 'Économies' },
      { emoji: '🤖', label: 'Automatisation' },
    ],
  },
  {
    id: 'ready',
    type: 'ready',
    visual: '🚀',
    title: 'Tout est prêt !',
    subtitle: 'Vos scènes et automatisations sont configurées',
  },
];

const FREE_FEATURES = [
  'Contrôle de toutes vos lampes',
  '5 scènes de base incluses',
  '1 automatisation simple',
  'Dashboard énergie basique',
  '2 membres max',
];

const PREMIUM_FEATURES = [
  'Tout du plan Gratuit',
  'Scènes illimitées + custom',
  'Automatisations illimitées',
  'Dashboard énergie complet',
  'Multi-utilisateurs illimité',
  'Mode Eco avancé',
  'Suggestions IA contextuelles',
  'Support prioritaire',
];

export default function Onboarding({ onComplete }) {
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState({});
  const [selectedPlan, setSelectedPlan] = useState(null);

  const current = STEPS[step];
  const progress = ((step + 1) / STEPS.length) * 100;

  const toggleChip = (label) => {
    setSelections(prev => ({
      ...prev,
      [current.id]: prev[current.id] === label ? null : label,
    }));
  };

  const handleNext = () => {
    if (step < STEPS.length - 1) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  const canProceed = () => {
    if (current.type === 'plan') return selectedPlan !== null;
    return true;
  };

  return (
    <div className="onboarding">
      {/* Progress bar */}
      <div className="onboarding-progress">
        <div className="onboarding-progress-fill" style={{ width: `${progress}%` }} />
      </div>

      {step > 0 && step < STEPS.length - 1 && (
        <button className="onboarding-skip" onClick={onComplete}>
          Passer →
        </button>
      )}

      {/* Content */}
      <div className="onboarding-content" key={step}>
        {/* Visual (not shown on plan step) */}
        {current.type !== 'plan' && (
          <div className="onboarding-visual">
            {current.visual}
          </div>
        )}

        <h1 className="onboarding-title">{current.title}</h1>
        <p className="onboarding-subtitle">{current.subtitle}</p>

        {/* Plan selection step */}
        {current.type === 'plan' && (
          <div className="plan-cards">
            {/* Free plan */}
            <button
              className={`plan-card${selectedPlan === 'free' ? ' selected' : ''}`}
              onClick={() => setSelectedPlan('free')}
            >
              <div className="plan-card-header">
                <span className="plan-card-emoji">🆓</span>
                <span className="plan-card-name">Gratuit</span>
              </div>
              <div className="plan-card-price">
                <span className="plan-price-amount">0€</span>
                <span className="plan-price-period">/ pour toujours</span>
              </div>
              <ul className="plan-card-features">
                {FREE_FEATURES.map((f, i) => (
                  <li key={i}>
                    <span className="plan-check">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              {selectedPlan === 'free' && (
                <div className="plan-selected-badge">✓ Sélectionné</div>
              )}
            </button>

            {/* Premium plan */}
            <button
              className={`plan-card premium${selectedPlan === 'premium' ? ' selected' : ''}`}
              onClick={() => setSelectedPlan('premium')}
            >
              <div className="plan-card-recommended">⭐ Recommandé</div>
              <div className="plan-card-header">
                <span className="plan-card-emoji">👑</span>
                <span className="plan-card-name">Premium</span>
              </div>
              <div className="plan-card-price">
                <span className="plan-price-amount">4,99€</span>
                <span className="plan-price-period">/ mois</span>
              </div>
              <div className="plan-trial-badge">14 jours d'essai gratuit</div>
              <ul className="plan-card-features">
                {PREMIUM_FEATURES.map((f, i) => (
                  <li key={i}>
                    <span className="plan-check premium-check">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              {selectedPlan === 'premium' && (
                <div className="plan-selected-badge premium-selected">✓ Sélectionné</div>
              )}
            </button>
          </div>
        )}

        {/* Chips */}
        {current.type === 'chips' && current.chips && (
          <div className="chips-group">
            {current.chips.map((chip) => (
              <button
                key={chip.label}
                className={`chip${selections[current.id] === chip.label ? ' selected' : ''}`}
                onClick={() => toggleChip(chip.label)}
              >
                {chip.emoji} {chip.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="onboarding-footer">
        <button
          className="btn-primary"
          onClick={handleNext}
          disabled={!canProceed()}
          style={!canProceed() ? { opacity: 0.4, pointerEvents: 'none' } : {}}
        >
          {step === STEPS.length - 1
            ? "C'est parti ! 🚀"
            : current.type === 'plan' && selectedPlan === 'premium'
              ? 'Essayer Premium 14 jours'
              : 'Continuer'}
        </button>
        {step > 0 && step < STEPS.length - 1 && (
          <button className="btn-secondary" onClick={() => setStep(step - 1)}>
            Retour
          </button>
        )}
      </div>
    </div>
  );
}
