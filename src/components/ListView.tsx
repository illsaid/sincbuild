import { useState } from 'react';
import { Shelf, Item, ItemStatus } from '../types';

const STATUS_LABELS: Record<Exclude<ItemStatus, 'unprocessed'>, string> = {
  saved: 'Kept',
  dismissed: 'Skipped',
  'wrong-fit': 'Wrong fit',
  'already-seen': 'Already seen',
  finished: 'Done',
  abandoned: 'Removed',
};

const INLINE_ACTIONS: { status: Exclude<ItemStatus, 'unprocessed'>; label: string; danger?: boolean }[] = [
  { status: 'saved', label: 'Keep' },
  { status: 'finished', label: 'Done' },
  { status: 'dismissed', label: 'Skip' },
  { status: 'wrong-fit', label: 'Wrong fit', danger: true },
  { status: 'already-seen', label: 'Seen it' },
  { status: 'abandoned', label: 'Remove', danger: true },
];

interface ItemRowProps {
  item: Item;
  index: number;
  onAction: (status: ItemStatus) => void;
  onEncounter: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  isFirst: boolean;
  isLast: boolean;
}

function ItemRow({ item, index, onAction, onEncounter, onMoveUp, onMoveDown, isFirst, isLast }: ItemRowProps) {
  const [expanded, setExpanded] = useState(false);
  const processed = item.status !== 'unprocessed';

  return (
    <div className={['border-t border-sinc-border py-7 transition-opacity duration-200', processed ? 'opacity-35' : ''].join(' ')}>
      <div className="flex items-start gap-6 md:gap-8">
        <span className="font-serif text-4xl md:text-5xl font-bold text-sinc-border/35 leading-none select-none mt-1 w-12 md:w-14 shrink-0 text-right">
          {String(index + 1).padStart(2, '0')}
        </span>

        <div className="flex-1 min-w-0">
          <div className={['font-serif text-lg md:text-xl font-semibold mb-1 leading-tight', processed ? 'line-through text-sinc-muted' : 'text-sinc-ink'].join(' ')}>
            {item.title}
          </div>
          <div className="text-xs text-sinc-muted mb-2 tracking-wide">{item.source}</div>

          {item.note && !processed && (
            <p className="text-sm text-sinc-secondary leading-relaxed max-w-xl mt-2 mb-3">
              {item.note}
            </p>
          )}

          {processed ? (
            <div className="mt-2 text-xs tracking-widest text-sinc-border uppercase font-medium">
              {STATUS_LABELS[item.status as Exclude<ItemStatus, 'unprocessed'>]}
            </div>
          ) : (
            <div className="mt-3 flex items-center gap-4 flex-wrap">
              <button
                onClick={onEncounter}
                className="text-xs font-medium text-sinc-ink underline underline-offset-2 hover:text-sinc-secondary transition-colors"
              >
                Open →
              </button>
              <span className="text-sinc-border text-xs">·</span>
              {!expanded ? (
                <button
                  onClick={() => setExpanded(true)}
                  className="text-xs text-sinc-muted hover:text-sinc-ink transition-colors"
                >
                  Decide now
                </button>
              ) : (
                <div className="flex flex-wrap gap-x-4 gap-y-1">
                  {INLINE_ACTIONS.map((action) => (
                    <button
                      key={action.status}
                      onClick={() => { onAction(action.status); setExpanded(false); }}
                      className={['text-xs font-medium transition-colors', action.danger ? 'text-sinc-danger hover:text-sinc-danger/70' : 'text-sinc-secondary hover:text-sinc-ink'].join(' ')}
                    >
                      {action.label}
                    </button>
                  ))}
                  <button onClick={() => setExpanded(false)} className="text-xs text-sinc-border hover:text-sinc-muted transition-colors ml-1">
                    ×
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {!processed && (
          <div className="flex flex-col gap-1 shrink-0 self-start pt-1">
            <button
              onClick={onMoveUp}
              disabled={isFirst}
              className="w-6 h-6 flex items-center justify-center text-sinc-border hover:text-sinc-secondary transition-colors disabled:opacity-20 disabled:cursor-not-allowed text-sm"
            >
              ↑
            </button>
            <button
              onClick={onMoveDown}
              disabled={isLast}
              className="w-6 h-6 flex items-center justify-center text-sinc-border hover:text-sinc-secondary transition-colors disabled:opacity-20 disabled:cursor-not-allowed text-sm"
            >
              ↓
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

interface Props {
  shelf: Shelf;
  onAction: (itemId: string, status: ItemStatus) => void;
  onEncounter: (itemId: string) => void;
  onReorder: (fromIndex: number, toIndex: number) => void;
  onBack: () => void;
  onAddItem: () => void;
  onComplete: () => void;
}

export default function ListView({ shelf, onAction, onEncounter, onReorder, onBack, onAddItem, onComplete }: Props) {
  const unprocessed = shelf.items.filter((i) => i.status === 'unprocessed');
  const processed = shelf.items.filter((i) => i.status !== 'unprocessed');
  const total = shelf.items.length;
  const processedCount = processed.length;
  const allDone = total > 0 && processedCount === total;

  return (
    <div className="min-h-screen bg-sinc-cream flex flex-col">
      <header className="px-8 md:px-12 pt-8 pb-5 border-b border-sinc-border flex items-center justify-between">
        <div className="flex items-center gap-5">
          <button onClick={onBack} className="text-sm text-sinc-muted hover:text-sinc-ink transition-colors">
            ←
          </button>
          <div className="w-px h-4 bg-sinc-border" />
          <span className="font-serif text-base font-semibold text-sinc-ink">{shelf.domain}</span>
        </div>
        <div className="flex items-center gap-5">
          <span className="text-xs text-sinc-muted hidden md:inline">
            {processedCount} of {total} processed
          </span>
          <button onClick={onAddItem} className="text-xs tracking-wide text-sinc-muted hover:text-sinc-ink transition-colors uppercase font-medium">
            Add
          </button>
          {allDone && (
            <button
              onClick={onComplete}
              className="px-4 py-2 bg-sinc-ink text-sinc-cream text-xs font-medium hover:bg-sinc-ink/90 transition-colors tracking-wide uppercase"
            >
              Shelf complete →
            </button>
          )}
        </div>
      </header>

      <main className="flex-1 px-8 md:px-12 py-10 max-w-3xl w-full">
        <div className="mb-1 text-xs tracking-widest text-sinc-muted uppercase font-medium">
          {shelf.description}
        </div>
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-sinc-ink mt-2 mb-3 leading-tight">
          {shelf.domain}
        </h1>

        <div className="flex items-center gap-4 mb-10">
          <span className="text-sm text-sinc-secondary">
            {unprocessed.length > 0 ? `${unprocessed.length} still to process` : 'All processed'}
          </span>
          <div className="flex-1 max-w-28 h-px bg-sinc-border relative">
            <div
              className="absolute inset-y-0 left-0 bg-sinc-ink transition-all duration-500"
              style={{ width: total > 0 ? `${Math.round((processedCount / total) * 100)}%` : '0%' }}
            />
          </div>
          <span className="text-xs text-sinc-border tabular-nums">
            {total > 0 ? Math.round((processedCount / total) * 100) : 0}%
          </span>
        </div>

        <div className="flex flex-col">
          {unprocessed.map((item) => {
            const globalIndex = shelf.items.findIndex((i) => i.id === item.id);
            const unprocessedIndex = unprocessed.findIndex((i) => i.id === item.id);
            return (
              <ItemRow
                key={item.id}
                item={item}
                index={globalIndex}
                onAction={(status) => onAction(item.id, status)}
                onEncounter={() => onEncounter(item.id)}
                onMoveUp={() => {
                  if (unprocessedIndex > 0) {
                    const prev = unprocessed[unprocessedIndex - 1];
                    onReorder(
                      shelf.items.findIndex((i) => i.id === item.id),
                      shelf.items.findIndex((i) => i.id === prev.id)
                    );
                  }
                }}
                onMoveDown={() => {
                  if (unprocessedIndex < unprocessed.length - 1) {
                    const next = unprocessed[unprocessedIndex + 1];
                    onReorder(
                      shelf.items.findIndex((i) => i.id === item.id),
                      shelf.items.findIndex((i) => i.id === next.id)
                    );
                  }
                }}
                isFirst={unprocessedIndex === 0}
                isLast={unprocessedIndex === unprocessed.length - 1}
              />
            );
          })}

          {processed.length > 0 && (
            <>
              <div className="border-t border-sinc-border pt-6 mt-2 mb-4">
                <span className="text-xs tracking-widest text-sinc-muted uppercase font-medium">
                  Processed
                </span>
              </div>
              {processed.map((item) => {
                const globalIndex = shelf.items.findIndex((i) => i.id === item.id);
                return (
                  <ItemRow
                    key={item.id}
                    item={item}
                    index={globalIndex}
                    onAction={() => {}}
                    onEncounter={() => {}}
                    onMoveUp={() => {}}
                    onMoveDown={() => {}}
                    isFirst={true}
                    isLast={true}
                  />
                );
              })}
            </>
          )}

          <div className="border-t border-sinc-border" />

          {allDone && (
            <div className="py-10 text-center">
              <p className="text-sinc-secondary text-sm mb-1">This shelf is finished.</p>
              <p className="text-sinc-muted text-xs mb-6">Now choose deliberately.</p>
              <button
                onClick={onComplete}
                className="px-8 py-3 bg-sinc-ink text-sinc-cream text-sm font-medium hover:bg-sinc-ink/90 transition-colors"
              >
                Continue →
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
