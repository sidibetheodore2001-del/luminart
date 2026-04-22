import { IconChevronRight } from '../components/Icons';

export default function Profile({ isLightMode, setIsLightMode }) {
  const menuGroups = [
    {
      title: 'Mon foyer',
      items: [
        { icon: '👥', label: 'Membres du foyer', badge: '3 membres', badgeBg: 'var(--accent-bg)', badgeColor: 'var(--accent)' },
        { icon: '🔔', label: 'Notifications', badge: '2', badgeBg: 'var(--danger-bg)', badgeColor: 'var(--danger)' },
        { icon: '🤖', label: 'Automatisations', badge: 'V1', badgeBg: 'var(--accent-secondary-bg)', badgeColor: 'var(--accent-secondary)' },
      ],
    },
    {
      title: 'Intégrations',
      items: [
        { icon: '🏠', label: 'Google Home', badge: 'Connecté', badgeBg: 'var(--success-bg)', badgeColor: 'var(--success)' },
        { icon: '📱', label: 'Apple HomeKit' },
        { icon: '🔊', label: 'Amazon Alexa' },
      ],
    },
    {
      title: 'Préférences',
      items: [
        { 
          icon: '🎨', 
          label: 'Mode Sombre', 
          hasToggle: true, 
          toggleState: !isLightMode, 
          onToggle: () => setIsLightMode(!isLightMode) 
        },
        { icon: '🌐', label: 'Langue', badge: 'Français', badgeBg: 'transparent', badgeColor: 'var(--text-tertiary)' },
        { icon: '🔒', label: 'Confidentialité' },
      ],
    },
    {
      title: 'Abonnement',
      items: [
        { icon: '⭐', label: 'Passer à Premium', highlight: true },
        { icon: '💳', label: 'Gérer mon abonnement' },
      ],
    },
    {
      title: 'Support',
      items: [
        { icon: '❓', label: 'Aide & FAQ' },
        { icon: '💬', label: 'Nous contacter' },
        { icon: 'ℹ️', label: 'À propos', badge: 'v1.0.0', badgeBg: 'transparent', badgeColor: 'var(--text-tertiary)' },
      ],
    },
  ];
  return (
    <div className="page">
      {/* Profile header */}
      <div className="profile-header">
        <div className="profile-avatar">T</div>
        <div>
          <div className="profile-info-name">Théo</div>
          <div className="profile-info-plan">
            ✨ Plan Gratuit
          </div>
        </div>
      </div>

      {/* Menu groups */}
      {menuGroups.map((group, gi) => (
        <div key={gi} className="menu-group">
          <div className="menu-group-title">{group.title}</div>
          {group.items.map((item, ii) => (
            <div
              key={ii}
              className="menu-item"
              style={item.highlight ? {
                background: 'linear-gradient(90deg, rgba(245,166,35,0.06), transparent)',
              } : {}}
            >
              <div
                className="menu-item-icon"
                style={{
                  background: item.highlight ? 'var(--accent-bg)' : 'var(--bg-card)',
                }}
              >
                {item.icon}
              </div>
              <span className="menu-item-text" style={item.highlight ? { color: 'var(--accent)', fontWeight: 600 } : {}}>
                {item.label}
              </span>
              {item.badge && (
                <span
                  className="menu-item-badge"
                  style={{
                    background: item.badgeBg || 'var(--bg-card)',
                    color: item.badgeColor || 'var(--text-secondary)',
                  }}
                >
                  {item.badge}
                </span>
              )}
              {item.hasToggle ? (
                <button
                  className={`room-toggle ${item.toggleState ? 'on' : 'off'}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    item.onToggle();
                  }}
                  aria-label={item.label}
                  style={{ marginLeft: 'auto' }}
                />
              ) : (
                <span className="menu-item-arrow">
                  <IconChevronRight />
                </span>
              )}
            </div>
          ))}
        </div>
      ))}

      {/* Log out */}
      <div style={{ padding: 'var(--space-lg)', paddingTop: 0 }}>
        <button
          className="btn-secondary"
          style={{ color: 'var(--danger)', fontWeight: 600 }}
        >
          Se déconnecter
        </button>
      </div>
    </div>
  );
}
