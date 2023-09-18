import React, { useEffect, useState } from 'react';
import { Card, Props } from './components/Card';
import { DropArea } from './components/DropArea';
import { Column, Columns } from './components/Column';
import { initialCardsPosition } from './data';
import useBoardStore from './components/boardStore';
import { moveCardToColumn } from './components/util';
import { useBroadCastChannel, usePersistentState, useSharedWorker } from '@/hooks';
import Worker from '@/workers/checkAnotherTabIsOpening';
import { PersistentStateKey } from '@/constants';

const columnTitles: { [key in Columns]: string } = {
  [Columns.IDEAS]: '💡 Ideas',
  [Columns.IN_PROGRESS]: '⏳ In Progress',
  [Columns.DONE]: '✅ Done',
};

const columns = Object.entries(columnTitles) as unknown as [Columns, string][];

const HomeContainer = () => {
  const [theme, setTheme] = usePersistentState(PersistentStateKey.ThemePreference, 'dark');

  // const [cards, setCards] = useState(initialCardsPosition);
  // const draggingCard = useBoardStore((state) => state.draggingCard);
  // const broadCastChannel = useBroadCastChannel({
  //   name: 'test',
  // });
  // const sharedWorker = useSharedWorker(Worker);
  // useEffect(() => {
  //   const broadCastMessageHandler = (eventMessage: MessageEvent) => {
  //     console.log(eventMessage);
  //   };
  //   broadCastChannel.addEventListener('message', broadCastMessageHandler);
  //   return () => {
  //     broadCastChannel.removeEventListener('message', broadCastMessageHandler);
  //   };
  // }, [broadCastChannel]);
  // useEffect(() => {
  //   if (sharedWorker) {
  //     sharedWorker.addEventListener('message', (e) => {
  //       console.log('=========shared worker: ', e);
  //     });
  //   }
  // }, [sharedWorker]);
  // const onDrop = (column: Columns, index: number) => {
  //   if (!draggingCard) return;
  //   const newCards = moveCardToColumn({
  //     cards,
  //     cardId: draggingCard,
  //     column,
  //     index,
  //   });
  //   setCards(newCards);
  // };
  // return (
  //   <div className='h-screen bg-gray-900 p-5 text-white'>
  //     <div className='grid grid-cols-[repeat(3,300px)] gap-4 overflow-auto'>
  //       {columns.map(([columnId, columnTitle]) => (
  //         <Column
  //           title={columnTitle}
  //           id={columnId}
  //           cards={cards[columnId]}
  //           onDrop={onDrop}
  //         />
  //       ))}
  //     </div>
  //     <pre>{draggingCard}</pre>
  //     <div>
  //       <button
  //         onClick={() => {
  //           console.log('click');
  //           broadCastChannel.postMessage('New tab is opening');
  //         }}
  //       >
  //         Send broadcast
  //       </button>
  //     </div>
  //     <div>
  //       <button
  //         onClick={() => {
  //           console.log('click');
  //           sharedWorker?.port.postMessage('New tab is opening');
  //         }}
  //       >
  //         Send worker
  //       </button>
  //     </div>
  //   </div>
  // );
  return <p>Home container: {theme}</p>;
};

export default HomeContainer;
