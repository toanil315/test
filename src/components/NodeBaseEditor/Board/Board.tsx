import React, { useEffect, useRef, useState } from 'react';
import { StyledBoard, StyledWrapper } from './styled';
import ButtonsComponent from '../Buttons/Button';

const Board = () => {
  const [grabbing, setGrabbing] = useState<boolean>(false);
  const [scale, setScale] = useState<number>(0);
  const [clickedPosition, setClickedPosition] = useState<{ x: number; y: number }>({
    x: -1,
    y: -1,
  });
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      let newScale = scale + e.deltaY * -0.0005;
      newScale = Math.min(Math.max(1, newScale), 2);
      if (boardRef.current) {
        boardRef.current.style.transform = `scale(${newScale})`;
        boardRef.current.style.marginTop = `${(newScale - 1) * 50}vh`;
        boardRef.current.style.marginLeft = `${(newScale - 1) * 50}vw`;
      }
      setScale(newScale);
    };

    boardRef.current?.addEventListener('wheel', handleWheel, { passive: true });

    return () => {
      boardRef.current?.removeEventListener('wheel', handleWheel);
    };
  }, [scale]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setGrabbing(true);
    setClickedPosition({
      x: e.clientX,
      y: e.clientY,
    });
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setGrabbing(false);
    setClickedPosition({
      x: -1,
      y: -1,
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (clickedPosition.x > 0 && clickedPosition.y) {
      const deltaX = e.clientX - clickedPosition.x;
      const deltaY = e.clientY - clickedPosition.y;

      if (wrapperRef.current) {
        wrapperRef.current.scrollBy(-deltaX, -deltaY);
        setClickedPosition({ x: e.clientX, y: e.clientY });
      }
    }
  };

  const handleAddNode = (numberInputs: number, numberOutputs: number) => {
    console.log(numberInputs, numberOutputs);
  };

  const handleDeleteNode = () => {};

  return (
    <StyledWrapper ref={wrapperRef}>
      <StyledBoard
        ref={boardRef as any}
        isGrabbing={grabbing}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        <ButtonsComponent
          showDelete={false}
          onClickAdd={handleAddNode}
          onClickDelete={handleDeleteNode}
        />
      </StyledBoard>
    </StyledWrapper>
  );
};

export default Board;
