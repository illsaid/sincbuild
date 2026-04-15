import { useState } from 'react';
import { DOMAIN_OPTIONS } from '../data/domains';

interface Props {
  onComplete: (domainIds: string[]) => void;
}

export default function Onboarding({ onComplete }: Props) {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : prev.length < 3 ? [...prev, id] : prev
    );
  };

  const ready = selected.length === 3;

  return (
    <div className="min-h-screen bg-sinc-cream flex flex-col">
      <header className="px-10 pt-10 pb-6 border-b border-sinc-border">
        <div className="flex items-baseline gap-3">
          <span className="font-serif text-2xl font-bold tracking-tight text-sinc-ink">Sinc</span>
          <span className="text-sm text-sinc-muted font-light tracking-wide hidden md:inline">human signal · finite by design</span>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-16">
        <div className="w-full max-w-2xl">
          <div className="mb-2 text-xs tracking-widest text-sinc-muted uppercase font-medium">
            Step one
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-sinc-ink mb-4 leading-tight">
            Choose three areas.
          </h1>
          <p className="text-sinc-secondary text-base mb-3 leading-relaxed max-w-lg">
            Each one becomes a finite shelf — a real list with an end.
            Not a feed. Not a recommendation engine.
          </p>
          <p className="text-sinc-muted text-sm mb-12 leading-relaxed max-w-md">
            You process items, you finish them, and you decide what happens next.
            The list does not grow while you're not looking.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-10">
            {DOMAIN_OPTIONS.map((domain) => {
              const isSelected = selected.includes(domain.id);
              const isDisabled = !isSelected && selected.length === 3;
              return (
                <button
                  key={domain.id}
                  onClick={() => toggle(domain.id)}
                  disabled={isDisabled}
                  className={[
                    'text-left px-5 py-4 border transition-all duration-150',
                    isSelected
                      ? 'border-sinc-ink bg-sinc-ink text-sinc-cream'
                      : isDisabled
                      ? 'border-sinc-border bg-sinc-cream text-sinc-border cursor-not-allowed'
                      : 'border-sinc-border bg-sinc-cream text-sinc-ink hover:border-sinc-ink cursor-pointer',
                  ].join(' ')}
                >
                  <div className="font-serif font-semibold text-base mb-0.5">{domain.domain}</div>
                  <div
                    className={`text-xs leading-snug ${
                      isSelected ? 'text-sinc-cream/70' : isDisabled ? 'text-sinc-border' : 'text-sinc-muted'
                    }`}
                  >
                    {domain.description}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-sinc-muted">
              {selected.length === 0 && 'Select 3 shelves to begin'}
              {selected.length === 1 && '2 more to go'}
              {selected.length === 2 && '1 more to go'}
              {selected.length === 3 && 'Ready'}
            </span>
            <button
              onClick={() => ready && onComplete(selected)}
              disabled={!ready}
              className={[
                'px-8 py-3 font-medium text-sm tracking-wide transition-all duration-150',
                ready
                  ? 'bg-sinc-ink text-sinc-cream hover:bg-sinc-ink/90 cursor-pointer'
                  : 'bg-sinc-border text-sinc-cream/50 cursor-not-allowed',
              ].join(' ')}
            >
              Begin
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
