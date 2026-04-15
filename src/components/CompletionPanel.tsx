import { Shelf } from '../types';

interface Props {
  shelf: Shelf;
  onRefill: () => void;
  onOpenShelves: () => void;
  onAddItem: () => void;
}

export default function CompletionPanel({ shelf, onRefill, onOpenShelves, onAddItem }: Props) {
  const counts = shelf.items.reduce(
    (acc, item) => {
      if (item.status !== 'unprocessed') acc[item.status] = (acc[item.status] ?? 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const statLines = [
    { label: 'Saved', value: counts['saved'] ?? 0 },
    { label: 'Finished', value: counts['finished'] ?? 0 },
    { label: 'Dismissed', value: counts['dismissed'] ?? 0 },
    { label: 'Wrong fit', value: counts['wrong-fit'] ?? 0 },
    { label: 'Already seen', value: counts['already-seen'] ?? 0 },
    { label: 'Abandoned', value: counts['abandoned'] ?? 0 },
  ].filter((s) => s.value > 0);

  return (
    <div className="min-h-screen bg-sinc-cream flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-lg text-center">
        <div className="mb-3 text-xs tracking-widest text-sinc-muted uppercase font-medium">
          Done
        </div>
        <h1 className="font-serif text-5xl md:text-6xl font-bold text-sinc-ink mb-3 leading-tight">
          {shelf.domain}
        </h1>
        <div className="text-sinc-secondary text-base mb-12">
          You got through it. All {shelf.items.length} items.
        </div>

        {statLines.length > 0 && (
          <div className="mb-14 border-t border-b border-sinc-border py-8">
            <div className="grid grid-cols-2 gap-x-12 gap-y-4 text-left max-w-xs mx-auto">
              {statLines.map((stat) => (
                <div key={stat.label} className="flex items-baseline justify-between gap-4">
                  <span className="text-sm text-sinc-muted">{stat.label}</span>
                  <span className="font-serif text-lg font-semibold text-sinc-ink tabular-nums">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <p className="text-sinc-secondary text-sm mb-2 leading-relaxed">
          You can stop here. That is a valid choice.
        </p>
        <p className="text-sinc-muted text-xs mb-10 leading-relaxed">
          Or choose what happens next. Nothing will happen automatically.
        </p>

        <div className="flex flex-col gap-3 max-w-xs mx-auto">
          <button
            onClick={onRefill}
            className="w-full py-4 bg-sinc-ink text-sinc-cream text-sm font-medium hover:bg-sinc-ink/90 transition-colors text-center"
          >
            Refill this shelf
          </button>
          <button
            onClick={onOpenShelves}
            className="w-full py-4 border border-sinc-ink text-sinc-ink text-sm font-medium hover:bg-sinc-ink hover:text-sinc-cream transition-colors text-center"
          >
            Open another shelf
          </button>
          <button
            onClick={onAddItem}
            className="w-full py-4 border border-sinc-border text-sinc-secondary text-sm font-medium hover:border-sinc-ink hover:text-sinc-ink transition-colors text-center"
          >
            Add one item manually
          </button>
        </div>
      </div>
    </div>
  );
}
