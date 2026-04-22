import { useState, useEffect } from 'react';

export default function Toast({ message, onDone }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onDone, 300);
    }, 2200);
    return () => clearTimeout(timer);
  }, [onDone]);

  if (!visible) return null;

  return (
    <div className="toast" style={{ opacity: visible ? 1 : 0, transition: 'opacity 300ms' }}>
      {message}
    </div>
  );
}
