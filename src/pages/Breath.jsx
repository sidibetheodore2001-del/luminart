import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Breath() {
  const [isBreathing, setIsBreathing] = useState(false);
  const [phase, setPhase] = useState('Prêt ?'); // Prêt ?, Inspire, Expire

  useEffect(() => {
    if (!isBreathing) {
      setPhase('Prêt ?');
      return;
    }

    let isInspire = true;
    setPhase('Inspire');

    const interval = setInterval(() => {
      isInspire = !isInspire;
      setPhase(isInspire ? 'Inspire' : 'Expire');
    }, 4000); // 4 seconds per phase

    return () => clearInterval(interval);
  }, [isBreathing]);

  return (
    <div className="page" style={{ overflow: 'hidden' }}>
      <div className="page-header">
        <h1 className="text-display">Respiration</h1>
        <p className="greeting-subtitle" style={{ marginTop: '4px' }}>
          Synchronisez votre souffle à la lumière
        </p>
      </div>

      <div className="page-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly', height: '100%' }}>
        
        {/* Breathing Circle Area */}
        <div style={{ position: 'relative', width: '250px', height: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          
          {/* Background glow layers */}
          <motion.div
            animate={{
              scale: isBreathing ? (phase === 'Inspire' ? 1.5 : 0.8) : 1,
              opacity: isBreathing ? (phase === 'Inspire' ? 0.6 : 0.2) : 0.1,
            }}
            transition={{ duration: 4, ease: "easeInOut" }}
            style={{
              position: 'absolute',
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              background: 'var(--accent)',
              filter: 'blur(30px)',
            }}
          />
          
          <motion.div
            animate={{
              scale: isBreathing ? (phase === 'Inspire' ? 1.2 : 0.9) : 1,
              background: isBreathing && phase === 'Expire' ? 'rgba(107, 255, 247, 0.2)' : 'rgba(250, 251, 99, 0.2)',
            }}
            transition={{ duration: 4, ease: "easeInOut" }}
            style={{
              position: 'absolute',
              width: '180px',
              height: '180px',
              borderRadius: '50%',
              border: '2px solid rgba(255,255,255,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(4px)',
            }}
          >
            <motion.h2
              key={phase}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '28px',
                fontWeight: '600',
                textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                margin: 0,
                color: '#fff'
              }}
            >
              {phase}
            </motion.h2>
          </motion.div>
        </div>

        {/* Controls */}
        <button
          className="quick-action-btn action-on"
          style={{ width: '80%', padding: '16px', borderRadius: '100px', fontSize: '16px', marginTop: '40px' }}
          onClick={() => setIsBreathing(!isBreathing)}
        >
          {isBreathing ? 'Arrêter' : 'Démarrer la séance'}
        </button>

        {/* Premium Programs */}
        <div style={{ width: '100%', marginTop: 'auto', paddingBottom: '20px' }}>
          <p className="section-title" style={{ fontSize: '14px', marginBottom: '12px' }}>Programmes <span style={{ fontSize: '10px', background: 'var(--accent)', color: '#000', padding: '2px 6px', borderRadius: '4px', marginLeft: '6px', fontWeight: 'bold' }}>PREMIUM</span></p>
          <div className="scroll-h" style={{ margin: '0 -24px', padding: '0 24px' }}>
            {['Cohérence cardiaque', 'Sommeil profond', 'Anti-stress', 'Éveil doux'].map((prog, i) => (
              <div
                key={prog}
                style={{
                  minWidth: '140px',
                  padding: '12px',
                  background: 'var(--bg-elevated)',
                  borderRadius: '16px',
                  border: '1px solid var(--border)',
                  opacity: 0.7,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}
              >
                <div style={{ fontSize: '20px' }}>{['❤️', '😴', '🧘', '🌅'][i]}</div>
                <div style={{ fontSize: '13px', fontWeight: '500' }}>{prog}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
