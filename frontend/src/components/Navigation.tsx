const links = [
  { href: '#booking', label: 'Book Session' },
  { href: '#symptom-checker', label: 'Symptom Checker' },
  { href: '#dashboard', label: 'Dashboard' },
];

export const Navigation = () => (
  <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
    <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
      <a href="#" className="text-lg font-bold text-brand-700">
        PhysioConnect
      </a>
      <ul className="flex gap-3 text-sm font-medium text-slate-700 md:gap-6">
        {links.map((link) => (
          <li key={link.href}>
            <a className="hover:text-brand-700" href={link.href}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  </header>
);
