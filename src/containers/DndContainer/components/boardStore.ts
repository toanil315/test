import { create } from 'zustand';

interface BoardStore {
  draggingCard: string | null;
  setDraggingCard: (cardId: string | null) => void;
}

const useBoardStore = create<BoardStore>((set) => ({
  draggingCard: null,
  setDraggingCard: (cardId: string | null) => set({ draggingCard: cardId }),
}));

export default useBoardStore;
