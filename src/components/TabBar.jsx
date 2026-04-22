import { NavLink } from 'react-router-dom';
import { IconHome, IconGrid, IconClock, IconHeart, IconZap, IconUser } from './Icons';

const tabs = [
  { path: '/', label: 'Accueil', Icon: IconHome },
  { path: '/pieces', label: 'Pièces', Icon: IconGrid },
  { path: '/routines', label: 'Routines', Icon: IconClock },
  { path: '/breath', label: 'Respirer', Icon: IconHeart },
  { path: '/energie', label: 'Énergie', Icon: IconZap },
  { path: '/profil', label: 'Profil', Icon: IconUser },
];

export default function TabBar() {
  return (
    <nav className="tab-bar" role="navigation" aria-label="Menu principal">
      {tabs.map(({ path, label, Icon }) => (
        <NavLink
          key={path}
          to={path}
          className={({ isActive }) => `tab-item${isActive ? ' active' : ''}`}
          end={path === '/'}
        >
          {({ isActive }) => (
            <>
              <span className="tab-icon">
                <Icon filled={isActive} />
              </span>
              <span className="tab-label">{label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
