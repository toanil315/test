import React, { useState } from 'react';
import { Card, Props } from './components/Card';
import { DropArea } from './components/DropArea';
import { Column, Columns } from './components/Column';
import { initialCardsPosition } from './data';
import useBoardStore from './components/boardStore';
import { moveCardToColumn } from './components/util';

const columnTitles: { [key in Columns]: string } = {
  [Columns.IDEAS]: '💡 Ideas',
  [Columns.IN_PROGRESS]: '⏳ In Progress',
  [Columns.DONE]: '✅ Done',
};

const columns = Object.entries(columnTitles) as unknown as [Columns, string][];

const HomeContainer = () => {
  const [cards, setCards] = useState(initialCardsPosition);
  const draggingCard = useBoardStore((state) => state.draggingCard);

  const onDrop = (column: Columns, index: number) => {
    if (!draggingCard) return;

    const newCards = moveCardToColumn({
      cards,
      cardId: draggingCard,
      column,
      index,
    });

    setCards(newCards);
  };

  return (
    <div className='h-screen bg-gray-900 p-5 text-white'>
      <div className='grid grid-cols-[repeat(3,300px)] gap-4 overflow-auto'>
        {columns.map(([columnId, columnTitle]) => (
          <Column
            title={columnTitle}
            id={columnId}
            cards={cards[columnId]}
            onDrop={onDrop}
          />
        ))}
      </div>
      <pre>{draggingCard}</pre>
    </div>
  );
};

export default HomeContainer;
