import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  onApplyClick: () => void;
}

const NAV_ITEMS = [
  { label: 'Programs', href: '#programs' },
  { label: 'Fees & Aid', href: '#fees' },
  { label: 'Campus & Photos', href: '#campus' },
  { label: 'Faculty & Placements', href: '#faculty' },
  { label: 'Contact & Help Desk', href: '#contact-helpdesk' },
];

export function Header({ onApplyClick }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = () => {
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      {/* Four-color collegiate heritage bar (Blue, Red, Yellow, Purple) */}
      <div className="grid grid-cols-4 h-1 w-full" aria-hidden="true">
        <div className="bg-[#1D4ED8]" />
        <div className="bg-[#B91C1C]" />
        <div className="bg-[#EAB308]" />
        <div className="bg-[#6D28D9]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#top"
          className="font-serif text-lg sm:text-xl font-semibold tracking-tight text-[#1E1B4B] whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1D4ED8] rounded-sm"
        >
          Sri Krishna College
        </a>

        {/* Zone 2: 5 concise single-line navigation links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hover:text-[#6D28D9] underline-offset-4 hover:underline decoration-[#EAB308] decoration-2 transition-colors duration-150 whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1D4ED8] rounded-sm py-1"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onApplyClick}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-[#1D4ED8] hover:bg-[#1E40AF] rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1D4ED8] focus-visible:ring-offset-2 cursor-pointer"
          >
            Apply 2026–27
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 text-slate-900 hover:bg-slate-100 rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1D4ED8]"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-2">
          <nav aria-label="Mobile navigation" className="flex flex-col space-y-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={handleNavClick}
                className="px-3 py-2.5 text-sm font-medium text-slate-900 hover:bg-[#F5F3FF] hover:text-[#6D28D9] rounded-md transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="pt-2 border-t border-slate-200">
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onApplyClick();
              }}
              className="w-full py-2.5 px-4 text-sm font-medium text-white bg-[#1D4ED8] hover:bg-[#1E40AF] rounded-md transition-colors"
            >
              Apply 2026–27
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
