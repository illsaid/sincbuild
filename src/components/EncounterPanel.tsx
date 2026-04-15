import { Shelf, Item, ItemStatus } from '../types';

const ENCOUNTER_ACTIONS: {
  status: Exclude<ItemStatus, 'unprocessed'>;
  label: string;
  sublabel: string;
  danger?: boolean;
}[] = [
  { status: 'saved', label: 'Keep it', sublabel: 'Worth returning to' },
  { status: 'finished', label: 'Done with it', sublabel: 'Already consumed' },
  { status: 'dismissed', label: 'Skip it', sublabel: 'Not right now' },
  { status: 'wrong-fit', label: 'Wrong fit', sublabel: 'Not for me', danger: true },
  { status: 'already-seen', label: 'Seen it', sublabel: 'Already know this one' },
  { status: 'abandoned', label: 'Remove it', sublabel: 'Clear from shelf', danger: true },
];

interface Props {
  shelf: Shelf;
  item: Item;
  onAction: (status: ItemStatus) => void;
  onBack: () => void;
  onNext: (() => void) | null;
}

function getPositionLabel(shelf: Shelf, item: Item): string {
  const unprocessed = shelf.items.filter((i) => i.status === 'unprocessed');
  const idx = unprocessed.findIndex((i) => i.id === item.id);
  if (idx === -1) return '';
  return `${idx + 1} of ${unprocessed.length} remaining`;
}

function getSurvivalNote(item: Item): string {
  const lower = item.note.toLowerCase();
  if (lower.includes('foundational') || lower.includes('canonical') || lower.includes('best')) {
    return 'Considered essential in its field';
  }
  if (lower.includes('masterwork') || lower.includes('genuine')) {
    return 'Widely regarded, not just popular';
  }
  if (lower.includes('devastating') || lower.includes('impossible') || lower.includes('refuses')) {
    return 'Difficult to look away from';
  }
  if (lower.includes('short') || lower.includes('accessible')) {
    return 'Easy to start, hard to forget';
  }
  return 'Selected by human judgment, not by engagement';
}

export default function EncounterPanel({ shelf, item, onAction, onBack, onNext }: Props) {
  const positionLabel = getPositionLabel(shelf, item);
  const survivalNote = getSurvivalNote(item);

  return (
    <div className="min-h-screen bg-sinc-cream flex flex-col">
      <header className="px-8 md:px-12 pt-8 pb-5 border-b border-sinc-border flex items-center justify-between">
        <div className="flex items-center gap-5">
          <button
            onClick={onBack}
            className="text-sm text-sinc-muted hover:text-sinc-ink transition-colors"
          >
            ←
          </button>
          <div className="w-px h-4 bg-sinc-border" />
          <div className="flex items-center gap-2">
            <span className="text-xs text-sinc-muted tracking-wide">{shelf.domain}</span>
            {positionLabel && (
              <>
                <span className="text-sinc-border text-xs">·</span>
                <span className="text-xs text-sinc-border">{positionLabel}</span>
              </>
            )}
          </div>
        </div>
        {onNext && (
          <button
            onClick={onNext}
            className="text-xs tracking-wide text-sinc-muted hover:text-sinc-ink transition-colors uppercase font-medium"
          >
            Next →
          </button>
        )}
      </header>

      <main className="flex-1 flex flex-col justify-between px-8 md:px-12 py-12 md:py-16">
        <div className="max-w-2xl">
          <div className="mb-2 text-xs tracking-widest text-sinc-muted uppercase font-medium">
            {survivalNote}
          </div>

          <h1 className="font-serif text-4xl md:text-5xl font-bold text-sinc-ink mt-4 mb-3 leading-tight">
            {item.title}
          </h1>

          <div className="text-sm text-sinc-muted mb-8 tracking-wide">{item.source}</div>

          {item.note && (
            <div className="mb-12">
              <div className="border-l-2 border-sinc-ink/20 pl-5">
                <p className="text-sinc-secondary text-base leading-relaxed">{item.note}</p>
              </div>
            </div>
          )}

          <div className="mb-3 text-xs tracking-widest text-sinc-muted uppercase font-medium">
            What do you want to do with this?
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-3">
            {ENCOUNTER_ACTIONS.map((action) => (
              <button
                key={action.status}
                onClick={() => onAction(action.status)}
                className={[
                  'text-left px-4 py-4 border transition-all duration-150 group',
                  action.danger
                    ? 'border-sinc-border hover:border-sinc-danger/50 hover:bg-sinc-danger/[0.03]'
                    : 'border-sinc-border hover:border-sinc-ink hover:bg-sinc-ink/[0.02]',
                ].join(' ')}
              >
                <div
                  className={[
                    'text-sm font-medium mb-0.5',
                    action.danger
                      ? 'text-sinc-danger/80 group-hover:text-sinc-danger'
                      : 'text-sinc-ink',
                  ].join(' ')}
                >
                  {action.label}
                </div>
                <div className="text-xs text-sinc-muted leading-tight">{action.sublabel}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-sinc-border">
          <p className="text-xs text-sinc-border max-w-md leading-relaxed">
            This item was placed here deliberately. It is not ranked. It is not trending.
            It made it through because someone thought it was worth your time.
          </p>
        </div>
      </main>
    </div>
  );
}
