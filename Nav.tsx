import { useState } from 'react';

interface Props { items: { id: string; label: string }[]; active: string; name: string }

export default function Nav({ items, active, name }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <header className="nav">
      <a className="brand" href="#home">{name || 'Portfolio'}</a>
      <button className="burger" aria-label="Menu" aria-expanded={open} aria-controls="menu" onClick={() => setOpen(o => !o)}>
        <span /><span /><span />
      </button>
      <nav aria-label="Main">
        <ul id="menu" className={open ? 'open' : ''}>
          {items.map(i => (
            <li key={i.id}>
              <a href={`#${i.id}`} aria-current={active === i.id ? 'true' : undefined} onClick={() => setOpen(false)}>{i.label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
