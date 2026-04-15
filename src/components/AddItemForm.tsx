import { useState } from 'react';
import { Shelf } from '../types';

interface Props {
  shelves: Shelf[];
  defaultShelfId?: string;
  onAdd: (shelfId: string, title: string, source: string, note: string) => void;
  onCancel: () => void;
}

export default function AddItemForm({ shelves, defaultShelfId, onAdd, onCancel }: Props) {
  const [title, setTitle] = useState('');
  const [source, setSource] = useState('');
  const [note, setNote] = useState('');
  const [shelfId, setShelfId] = useState(defaultShelfId ?? shelves[0]?.id ?? '');

  const canSubmit = title.trim().length > 0 && shelfId;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    onAdd(shelfId, title.trim(), source.trim(), note.trim());
  };

  return (
    <div className="min-h-screen bg-sinc-cream flex flex-col">
      <header className="px-10 pt-10 pb-6 border-b border-sinc-border flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button
            onClick={onCancel}
            className="text-sm text-sinc-muted hover:text-sinc-ink transition-colors"
          >
            ← Back
          </button>
          <div className="w-px h-4 bg-sinc-border" />
          <span className="font-serif text-lg font-semibold text-sinc-ink">Add an item</span>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-16">
        <div className="w-full max-w-lg">
          <div className="mb-2 text-xs tracking-widest text-sinc-muted uppercase font-medium">
            Manual entry
          </div>
          <h1 className="font-serif text-4xl font-bold text-sinc-ink mb-10 leading-tight">
            Add one thing.
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-7">
            <div>
              <label className="block text-xs tracking-widest text-sinc-muted uppercase font-medium mb-2">
                Title <span className="text-sinc-danger">*</span>
              </label>
              <input
                autoFocus
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What is it called?"
                className="w-full bg-transparent border-b border-sinc-border focus:border-sinc-ink outline-none py-2 text-sinc-ink font-serif text-xl placeholder:text-sinc-border transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs tracking-widest text-sinc-muted uppercase font-medium mb-2">
                Source
              </label>
              <input
                type="text"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                placeholder="Author, publication, year..."
                className="w-full bg-transparent border-b border-sinc-border focus:border-sinc-ink outline-none py-2 text-sinc-ink text-sm placeholder:text-sinc-border transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs tracking-widest text-sinc-muted uppercase font-medium mb-2">
                Note
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Why does this belong here?"
                rows={3}
                className="w-full bg-transparent border-b border-sinc-border focus:border-sinc-ink outline-none py-2 text-sinc-ink text-sm placeholder:text-sinc-border transition-colors resize-none leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-xs tracking-widest text-sinc-muted uppercase font-medium mb-2">
                Shelf
              </label>
              <select
                value={shelfId}
                onChange={(e) => setShelfId(e.target.value)}
                className="w-full bg-sinc-cream border-b border-sinc-border focus:border-sinc-ink outline-none py-2 text-sinc-ink text-sm transition-colors cursor-pointer"
              >
                {shelves.map((shelf) => (
                  <option key={shelf.id} value={shelf.id}>
                    {shelf.domain}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={onCancel}
                className="text-sm text-sinc-muted hover:text-sinc-ink transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!canSubmit}
                className={[
                  'px-8 py-3 text-sm font-medium transition-colors',
                  canSubmit
                    ? 'bg-sinc-ink text-sinc-cream hover:bg-sinc-ink/90 cursor-pointer'
                    : 'bg-sinc-border text-sinc-cream/50 cursor-not-allowed',
                ].join(' ')}
              >
                Add to shelf
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
