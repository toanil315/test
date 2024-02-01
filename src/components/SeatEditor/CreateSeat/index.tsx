import React, { useEffect, useRef, useState } from 'react';

interface Point {
  x: number;
  y: number;
}

// Function to calculate a point at a certain fraction of the way between two other points
function interpolate(params: { start: Point; end: Point; fraction: number }): Point {
  const { start, end, fraction } = params;
  return {
    x: start.x + (end.x - start.x) * fraction,
    y: start.y + (end.y - start.y) * fraction,
  };
}

// Function to generate a specified number of evenly spaced points between A and B
function gen(params: { start: Point; end: Point; radius: number; gap: number }): Point[] {
  const { start, end, radius, gap } = params;
  const distance = Math.sqrt((end.x - start.x) ** 2 + (end.y - start.y) ** 2);
  const numPoints = Math.floor(distance / (2 * radius + gap));
  let points = [start];
  for (let i = 1; i <= numPoints; i++) {
    points.push(interpolate({ start, end, fraction: i / numPoints }));
  }
  points.push(end);
  return points;
}

const CreateSeat = () => {
  const [points, setPoints] = useState<Point[] /* [startPoint, endPoint] */>([]);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      setIsDrawing(true);
      setPoints([{ x: event.clientX, y: event.clientY }]);
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!isDrawing) return;

      setPoints((prevPoints) => {
        prevPoints[1] = { x: event.clientX, y: event.clientY };
        return [...prevPoints];
      });
    };

    const handleMouseUp = (event: MouseEvent) => {
      setIsDrawing(false);
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [points, isDrawing]);

  const renderSeats = () => {
    if (points.length < 2) return null;
    const pointsInRow = gen({ start: points[0], end: points[1], radius: 2, gap: 0.5 });
    return pointsInRow.map((point, index) => {
      return (
        <Seat
          key={index}
          x={point.x}
          y={point.y}
        />
      );
    });
  };

  return (
    <div className='w-screen h-screen bg-gray-50'>
      <svg
        width='100%'
        height='100%'
      >
        {renderSeats()}
      </svg>
    </div>
  );
};

interface SeatProps {
  x: number;
  y: number;
}

const Seat = ({ x, y }: SeatProps) => {
  return (
    <circle
      cx={x}
      cy={y}
      r='2'
      fill='red'
    />
  );
};

export default CreateSeat;
