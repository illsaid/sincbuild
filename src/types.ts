export type ItemStatus =
  | 'unprocessed'
  | 'saved'
  | 'dismissed'
  | 'wrong-fit'
  | 'already-seen'
  | 'finished'
  | 'abandoned';

export interface Item {
  id: string;
  title: string;
  source: string;
  note: string;
  status: ItemStatus;
}

export interface Shelf {
  id: string;
  domain: string;
  description: string;
  items: Item[];
}

export type AppView =
  | { screen: 'onboarding' }
  | { screen: 'home' }
  | { screen: 'shelves' }
  | { screen: 'list'; shelfId: string }
  | { screen: 'encounter'; shelfId: string; itemId: string }
  | { screen: 'complete'; shelfId: string }
  | { screen: 'add'; shelfId?: string };
