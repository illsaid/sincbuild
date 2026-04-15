import { useAppState } from './store';
import Onboarding from './components/Onboarding';
import HomeScreen from './components/HomeScreen';
import ShelfView from './components/ShelfView';
import ListView from './components/ListView';
import EncounterPanel from './components/EncounterPanel';
import CompletionPanel from './components/CompletionPanel';
import AddItemForm from './components/AddItemForm';

export default function App() {
  const {
    state,
    setView,
    completeOnboarding,
    setItemStatus,
    reorderItems,
    addItem,
    refillShelf,
    resetOnboarding,
  } = useAppState();

  const { shelves, view } = state;

  if (view.screen === 'onboarding') {
    return <Onboarding onComplete={completeOnboarding} />;
  }

  if (view.screen === 'home') {
    return (
      <HomeScreen
        shelves={shelves}
        onEncounter={(shelfId, itemId) => setView({ screen: 'encounter', shelfId, itemId })}
        onOpenShelf={(shelfId) => setView({ screen: 'list', shelfId })}
        onOpenShelves={() => setView({ screen: 'shelves' })}
        onAddItem={() => setView({ screen: 'add' })}
        onReset={resetOnboarding}
      />
    );
  }

  if (view.screen === 'shelves') {
    return (
      <ShelfView
        shelves={shelves}
        onOpenShelf={(shelfId) => setView({ screen: 'list', shelfId })}
        onAddItem={() => setView({ screen: 'add' })}
        onReset={resetOnboarding}
        onHome={() => setView({ screen: 'home' })}
      />
    );
  }

  if (view.screen === 'list') {
    const shelf = shelves.find((s) => s.id === view.shelfId);
    if (!shelf) return null;
    return (
      <ListView
        shelf={shelf}
        onAction={(itemId, status) => setItemStatus(shelf.id, itemId, status)}
        onEncounter={(itemId) => setView({ screen: 'encounter', shelfId: shelf.id, itemId })}
        onReorder={(from, to) => reorderItems(shelf.id, from, to)}
        onBack={() => setView({ screen: 'home' })}
        onAddItem={() => setView({ screen: 'add', shelfId: shelf.id })}
        onComplete={() => setView({ screen: 'complete', shelfId: shelf.id })}
      />
    );
  }

  if (view.screen === 'encounter') {
    const shelf = shelves.find((s) => s.id === view.shelfId);
    if (!shelf) return null;
    const item = shelf.items.find((i) => i.id === view.itemId);
    if (!item) return null;

    const unprocessed = shelf.items.filter((i) => i.status === 'unprocessed');
    const currentIdx = unprocessed.findIndex((i) => i.id === item.id);
    const nextItem = currentIdx >= 0 && currentIdx < unprocessed.length - 1
      ? unprocessed[currentIdx + 1]
      : null;

    const allDoneAfterAction = (status: string) => {
      if (status === 'unprocessed') return false;
      const remaining = shelf.items.filter((i) => i.id !== item.id && i.status === 'unprocessed');
      return remaining.length === 0;
    };

    return (
      <EncounterPanel
        shelf={shelf}
        item={item}
        onAction={(status) => {
          setItemStatus(shelf.id, item.id, status);
          if (allDoneAfterAction(status)) {
            setView({ screen: 'complete', shelfId: shelf.id });
          } else if (nextItem) {
            setView({ screen: 'encounter', shelfId: shelf.id, itemId: nextItem.id });
          } else {
            setView({ screen: 'list', shelfId: shelf.id });
          }
        }}
        onBack={() => setView({ screen: 'list', shelfId: shelf.id })}
        onNext={nextItem ? () => setView({ screen: 'encounter', shelfId: shelf.id, itemId: nextItem.id }) : null}
      />
    );
  }

  if (view.screen === 'complete') {
    const shelf = shelves.find((s) => s.id === view.shelfId);
    if (!shelf) return null;
    return (
      <CompletionPanel
        shelf={shelf}
        onRefill={() => refillShelf(shelf.id)}
        onOpenShelves={() => setView({ screen: 'home' })}
        onAddItem={() => setView({ screen: 'add', shelfId: shelf.id })}
      />
    );
  }

  if (view.screen === 'add') {
    const defaultShelfId = view.shelfId;
    return (
      <AddItemForm
        shelves={shelves}
        defaultShelfId={defaultShelfId}
        onAdd={(shelfId, title, source, note) => {
          addItem(shelfId, title, source, note);
          setView({ screen: 'list', shelfId });
        }}
        onCancel={() => {
          if (defaultShelfId) {
            setView({ screen: 'list', shelfId: defaultShelfId });
          } else {
            setView({ screen: 'home' });
          }
        }}
      />
    );
  }

  return null;
}
