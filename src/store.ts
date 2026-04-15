import { useState, useEffect } from 'react';
import { Shelf, Item, ItemStatus, AppView } from './types';
import { DOMAIN_OPTIONS } from './data/domains';
import { createSeededItems, createRefillItems } from './data/seeds';

const STORAGE_KEY = 'sinc_v0';

interface AppState {
  shelves: Shelf[];
  view: AppView;
}

function loadState(): AppState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function saveState(state: AppState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {}
}

const makeId = () => Math.random().toString(36).slice(2, 10);

export function useAppState() {
  const [state, setState] = useState<AppState>(() => {
    const saved = loadState();
    if (saved) return saved;
    return { shelves: [], view: { screen: 'onboarding' } };
  });

  useEffect(() => {
    saveState(state);
  }, [state]);

  const setView = (view: AppView) => setState((s) => ({ ...s, view }));

  const completeOnboarding = (domainIds: string[]) => {
    const shelves: Shelf[] = domainIds.map((id) => {
      const domain = DOMAIN_OPTIONS.find((d) => d.id === id)!;
      return {
        id: makeId(),
        domain: domain.domain,
        description: domain.description,
        items: createSeededItems(id),
      };
    });
    setState({ shelves, view: { screen: 'home' } });
  };

  const setItemStatus = (shelfId: string, itemId: string, status: ItemStatus) => {
    setState((s) => ({
      ...s,
      shelves: s.shelves.map((shelf) =>
        shelf.id !== shelfId
          ? shelf
          : { ...shelf, items: shelf.items.map((item) => (item.id !== itemId ? item : { ...item, status })) }
      ),
    }));
  };

  const reorderItems = (shelfId: string, fromIndex: number, toIndex: number) => {
    setState((s) => ({
      ...s,
      shelves: s.shelves.map((shelf) => {
        if (shelf.id !== shelfId) return shelf;
        const items = [...shelf.items];
        const [moved] = items.splice(fromIndex, 1);
        items.splice(toIndex, 0, moved);
        return { ...shelf, items };
      }),
    }));
  };

  const addItem = (shelfId: string, title: string, source: string, note: string) => {
    const newItem: Item = { id: makeId(), title, source, note, status: 'unprocessed' };
    setState((s) => ({
      ...s,
      shelves: s.shelves.map((shelf) =>
        shelf.id !== shelfId ? shelf : { ...shelf, items: [...shelf.items, newItem] }
      ),
    }));
  };

  const refillShelf = (shelfId: string) => {
    setState((s) => ({
      ...s,
      shelves: s.shelves.map((shelf) => {
        if (shelf.id !== shelfId) return shelf;
        const domainId = DOMAIN_OPTIONS.find((d) => d.domain === shelf.domain)?.id ?? '';
        const existingTitles = shelf.items.map((i) => i.title);
        const newItems = createRefillItems(domainId, existingTitles);
        return { ...shelf, items: [...shelf.items, ...newItems] };
      }),
      view: { screen: 'list', shelfId },
    }));
  };

  const resetOnboarding = () => {
    localStorage.removeItem(STORAGE_KEY);
    setState({ shelves: [], view: { screen: 'onboarding' } });
  };

  return {
    state,
    setView,
    completeOnboarding,
    setItemStatus,
    reorderItems,
    addItem,
    refillShelf,
    resetOnboarding,
  };
}
