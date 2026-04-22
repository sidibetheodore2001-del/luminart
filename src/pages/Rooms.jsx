import { useNavigate } from 'react-router-dom';

export default function Rooms({ rooms, onToggleRoom }) {
  const navigate = useNavigate();

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="text-display">Pièces</h1>
        <p className="greeting-subtitle" style={{ marginTop: '4px' }}>
          {rooms.length} pièces · {rooms.reduce((s, r) => s + r.lamps.length, 0)} lampes
        </p>
      </div>

      <div className="page-content">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }} className="stagger">
          {rooms.map((room, i) => {
            const onCount = room.lamps.filter(l => l.on).length;
            const anyOn = onCount > 0;
            return (
              <div
                key={room.id}
                className="room-card animate-fade-in-up"
                style={{ animationDelay: `${i * 60}ms` }}
                onClick={() => navigate(`/pieces/${room.id}`)}
              >
                <div className="room-icon-wrap" style={{
                  background: anyOn ? 'var(--accent-bg)' : 'var(--bg-elevated)',
                  boxShadow: anyOn ? '0 0 12px var(--accent-glow)' : 'none',
                }}>
                  {room.emoji}
                </div>
                <div className="room-info">
                  <div className="room-name">{room.name}</div>
                  <div className="room-status">
                    {onCount}/{room.lamps.length} lampe{room.lamps.length > 1 ? 's' : ''}
                    {anyOn ? ' · allumée' + (onCount > 1 ? 's' : '') : ' · éteintes'}
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
    </div>
  );
}
