import { Shelf } from '../types';

interface Props {
  shelves: Shelf[];
  onOpenShelf: (shelfId: string) => void;
  onAddItem: () => void;
  onReset: () => void;
  onHome: () => void;
}

function shelfStats(shelf: Shelf) {
  const total = shelf.items.length;
  const processed = shelf.items.filter((i) => i.status !== 'unprocessed').length;
  const complete = total > 0 && processed === total;
  return { total, processed, complete };
}

export default function ShelfView({ shelves, onOpenShelf, onAddItem, onReset, onHome }: Props) {
  return (
    <div className="min-h-screen bg-sinc-cream flex flex-col">
      <header className="px-8 md:px-12 pt-8 pb-5 border-b border-sinc-border flex items-center justify-between">
        <div className="flex items-center gap-5">
          <button
            onClick={onHome}
            className="text-sm text-sinc-muted hover:text-sinc-ink transition-colors"
          >
            ←
          </button>
          <div className="w-px h-4 bg-sinc-border" />
          <span className="font-serif text-base font-bold tracking-tight text-sinc-ink">Sinc</span>
        </div>
        <div className="flex items-center gap-5">
          <button
            onClick={onAddItem}
            className="text-xs tracking-wide text-sinc-muted hover:text-sinc-ink transition-colors uppercase font-medium"
          >
            Add
          </button>
          <button
            onClick={onReset}
            className="text-xs text-sinc-border hover:text-sinc-muted transition-colors"
          >
            Reset
          </button>
        </div>
      </header>

      <main className="flex-1 px-8 md:px-12 py-12 max-w-3xl w-full">
        <div className="mb-2 text-xs tracking-widest text-sinc-muted uppercase font-medium">
          All shelves
        </div>
        <h2 className="font-serif text-3xl font-bold text-sinc-ink mb-10 leading-tight">
          {shelves.every((s) => shelfStats(s).complete) ? 'Everything processed.' : 'Your finite lists.'}
        </h2>

        <div className="flex flex-col gap-0">
          {shelves.map((shelf, idx) => {
            const { total, processed, complete } = shelfStats(shelf);
            const pct = total > 0 ? Math.round((processed / total) * 100) : 0;

            return (
              <button
                key={shelf.id}
                onClick={() => onOpenShelf(shelf.id)}
                className="group text-left border-t border-sinc-border py-8 hover:bg-sinc-ink/[0.02] transition-colors"
              >
                <div className="flex items-start justify-between gap-8">
                  <div className="flex items-start gap-8 min-w-0">
                    <span className="font-serif text-6xl font-bold text-sinc-border/50 leading-none select-none mt-1 w-16 shrink-0 text-right">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <div className="min-w-0">
                      <div className="font-serif text-2xl font-semibold text-sinc-ink mb-1 group-hover:text-sinc-ink leading-tight">
                        {shelf.domain}
                      </div>
                      <div className="text-sm text-sinc-muted mb-3">{shelf.description}</div>
                      <div className="flex items-center gap-4">
                        <span className={`text-xs font-medium ${complete ? 'text-sinc-done' : 'text-sinc-secondary'}`}>
                          {complete ? 'Complete' : `${processed} of ${total} processed`}
                        </span>
                        {!complete && (
                          <div className="w-24 h-px bg-sinc-border relative">
                            <div
                              className="absolute inset-y-0 left-0 bg-sinc-ink transition-all duration-300"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="shrink-0 self-center">
                    {complete ? (
                      <span className="text-xs tracking-widest uppercase text-sinc-done font-medium border border-sinc-done/40 px-3 py-1">
                        Done
                      </span>
                    ) : (
                      <span className="text-xs text-sinc-muted group-hover:text-sinc-ink transition-colors">
                        Open →
                      </span>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
          <div className="border-t border-sinc-border" />
        </div>
      </main>
    </div>
  );
}
