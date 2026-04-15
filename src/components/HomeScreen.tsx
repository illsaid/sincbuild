import { Shelf, Item } from '../types';

interface Props {
  shelves: Shelf[];
  onEncounter: (shelfId: string, itemId: string) => void;
  onOpenShelf: (shelfId: string) => void;
  onOpenShelves: () => void;
  onAddItem: () => void;
  onReset: () => void;
}

function getNextItem(shelves: Shelf[]): { shelf: Shelf; item: Item } | null {
  for (const shelf of shelves) {
    const next = shelf.items.find((i) => i.status === 'unprocessed');
    if (next) return { shelf, item: next };
  }
  return null;
}

function shelfProgress(shelf: Shelf) {
  const total = shelf.items.length;
  const processed = shelf.items.filter((i) => i.status !== 'unprocessed').length;
  const remaining = total - processed;
  const complete = total > 0 && processed === total;
  return { total, processed, remaining, complete };
}

function SignalTypeTag({ note }: { note: string }) {
  const lower = note.toLowerCase();
  let tag = 'Worth reading';
  if (lower.includes('film') || lower.includes('cinema') || lower.includes('documentary')) tag = 'Worth watching';
  else if (lower.includes('story') || lower.includes('fiction')) tag = 'Worth reading';
  else if (lower.includes('book') || lower.includes('essay') || lower.includes('writing')) tag = 'Worth reading';
  else if (lower.includes('research') || lower.includes('science') || lower.includes('biology')) tag = 'Worth knowing';
  return (
    <span className="text-xs tracking-widest uppercase text-sinc-muted font-medium">{tag}</span>
  );
}

export default function HomeScreen({ shelves, onEncounter, onOpenShelf, onOpenShelves, onAddItem, onReset }: Props) {
  const next = getNextItem(shelves);
  const allComplete = shelves.every((s) => shelfProgress(s).complete);

  const secondaryShelf = next
    ? shelves.find((s) => {
        if (s.id === next.shelf.id) return false;
        return s.items.some((i) => i.status === 'unprocessed');
      })
    : null;

  const secondaryItem = secondaryShelf?.items.find((i) => i.status === 'unprocessed') ?? null;

  return (
    <div className="min-h-screen bg-sinc-cream flex flex-col">
      <header className="px-8 md:px-12 pt-8 pb-5 border-b border-sinc-border flex items-center justify-between">
        <div className="flex items-baseline gap-3">
          <span className="font-serif text-xl font-bold tracking-tight text-sinc-ink">Sinc</span>
          <span className="hidden md:inline text-xs text-sinc-muted font-light tracking-wider">
            human signal · finite by design
          </span>
        </div>
        <nav className="flex items-center gap-6">
          <button
            onClick={onOpenShelves}
            className="text-xs tracking-wide text-sinc-muted hover:text-sinc-ink transition-colors uppercase font-medium"
          >
            All shelves
          </button>
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
        </nav>
      </header>

      <main className="flex-1 px-8 md:px-12 py-12 md:py-16 max-w-3xl w-full">

        {allComplete ? (
          <div className="py-20">
            <div className="mb-3 text-xs tracking-widest text-sinc-muted uppercase font-medium">
              All clear
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-sinc-ink mb-4 leading-tight">
              You're through everything.
            </h1>
            <p className="text-sinc-secondary text-base mb-10 leading-relaxed max-w-md">
              Every shelf is processed. You can stop here. Or add something worth keeping.
            </p>
            <div className="flex gap-4">
              <button
                onClick={onOpenShelves}
                className="px-6 py-3 border border-sinc-ink text-sinc-ink text-sm font-medium hover:bg-sinc-ink hover:text-sinc-cream transition-colors"
              >
                Review shelves
              </button>
              <button
                onClick={onAddItem}
                className="px-6 py-3 border border-sinc-border text-sinc-secondary text-sm font-medium hover:border-sinc-ink hover:text-sinc-ink transition-colors"
              >
                Add something
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-10">
              <p className="text-xs tracking-widest text-sinc-muted uppercase font-medium mb-1">
                You're out of the feed
              </p>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-sinc-ink leading-tight">
                Here's what made it through.
              </h1>
            </div>

            {next && (
              <section className="mb-12">
                <div className="mb-3 flex items-center gap-3">
                  <span className="text-xs tracking-widest text-sinc-muted uppercase font-medium">
                    Continue
                  </span>
                  <span className="text-sinc-border text-xs">·</span>
                  <span className="text-xs text-sinc-muted">{next.shelf.domain}</span>
                </div>

                <div className="border border-sinc-border bg-sinc-cream group">
                  <div className="px-8 py-8 md:py-10">
                    <div className="mb-1">
                      <SignalTypeTag note={next.item.note} />
                    </div>
                    <h2 className="font-serif text-2xl md:text-3xl font-bold text-sinc-ink mt-3 mb-2 leading-tight">
                      {next.item.title}
                    </h2>
                    <div className="text-xs text-sinc-muted mb-4 tracking-wide">{next.item.source}</div>
                    {next.item.note && (
                      <p className="text-sinc-secondary text-sm leading-relaxed max-w-lg mb-8 border-l-2 border-sinc-border pl-4">
                        {next.item.note}
                      </p>
                    )}
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => onEncounter(next.shelf.id, next.item.id)}
                        className="px-6 py-3 bg-sinc-ink text-sinc-cream text-sm font-medium hover:bg-sinc-ink/90 transition-colors"
                      >
                        Open this →
                      </button>
                      <button
                        onClick={() => onOpenShelf(next.shelf.id)}
                        className="text-sm text-sinc-muted hover:text-sinc-ink transition-colors"
                      >
                        See full shelf
                      </button>
                    </div>
                  </div>

                  <div className="px-8 py-3 border-t border-sinc-border flex items-center justify-between">
                    <ShelfProgressLine shelf={next.shelf} />
                  </div>
                </div>
              </section>
            )}

            {secondaryItem && secondaryShelf && (
              <section className="mb-12">
                <div className="mb-3 text-xs tracking-widest text-sinc-muted uppercase font-medium">
                  Also waiting
                </div>
                <button
                  onClick={() => onEncounter(secondaryShelf.id, secondaryItem.id)}
                  className="w-full text-left border border-sinc-border px-6 py-5 hover:border-sinc-ink transition-colors group"
                >
                  <div className="flex items-start justify-between gap-6">
                    <div className="min-w-0">
                      <div className="text-xs text-sinc-muted mb-1 tracking-wide">{secondaryShelf.domain}</div>
                      <div className="font-serif text-lg font-semibold text-sinc-ink mb-1 group-hover:text-sinc-ink leading-tight">
                        {secondaryItem.title}
                      </div>
                      <div className="text-xs text-sinc-muted">{secondaryItem.source}</div>
                    </div>
                    <span className="text-sinc-border group-hover:text-sinc-muted transition-colors text-sm shrink-0 self-center">
                      →
                    </span>
                  </div>
                </button>
              </section>
            )}

            <section>
              <div className="mb-4 text-xs tracking-widest text-sinc-muted uppercase font-medium">
                Your shelves
              </div>
              <div className="flex flex-col border-t border-sinc-border">
                {shelves.map((shelf) => {
                  const { remaining, complete } = shelfProgress(shelf);
                  return (
                    <button
                      key={shelf.id}
                      onClick={() => onOpenShelf(shelf.id)}
                      className="text-left border-b border-sinc-border py-4 flex items-center justify-between hover:bg-sinc-ink/[0.02] transition-colors group"
                    >
                      <div>
                        <span className="font-serif text-base font-semibold text-sinc-ink">{shelf.domain}</span>
                        <span className="ml-3 text-xs text-sinc-muted">
                          {complete ? 'Complete' : `${remaining} remaining`}
                        </span>
                      </div>
                      {complete ? (
                        <span className="text-xs text-sinc-done font-medium tracking-wide uppercase">Done</span>
                      ) : (
                        <span className="text-xs text-sinc-border group-hover:text-sinc-muted transition-colors">Open →</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </section>
          </>
        )}
      </main>

      <footer className="px-8 md:px-12 py-6 border-t border-sinc-border">
        <p className="text-xs text-sinc-border leading-relaxed max-w-md">
          Selected against the flood. Finite by design. You can stop.
        </p>
      </footer>
    </div>
  );
}

function ShelfProgressLine({ shelf }: { shelf: Shelf }) {
  const total = shelf.items.length;
  const processed = shelf.items.filter((i) => i.status !== 'unprocessed').length;
  const remaining = total - processed;
  const pct = total > 0 ? Math.round((processed / total) * 100) : 0;

  return (
    <div className="flex items-center gap-4 w-full">
      <span className="text-xs text-sinc-muted">{remaining} left in this shelf</span>
      <div className="flex-1 h-px bg-sinc-border relative">
        <div
          className="absolute inset-y-0 left-0 bg-sinc-ink/40 transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs text-sinc-muted tabular-nums">{pct}%</span>
    </div>
  );
}
