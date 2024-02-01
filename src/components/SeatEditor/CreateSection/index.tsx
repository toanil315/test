import React, { MouseEventHandler, useEffect, useMemo, useRef, useState } from 'react';
import { StyledCreateSection } from './styled';

interface Point {
  x: number;
  y: number;
}

function calculateAngle(...points: Point[]) {
  const [pointA, pointB, pointC, pointD] = points;
  // Calculate vectors
  const vector1 = { x: pointB.x - pointA.x, y: pointB.y - pointA.y };
  const vector2 = { x: pointD.x - pointC.x, y: pointD.y - pointC.y };

  // Calculate dot product
  const dotProduct = vector1.x * vector2.x + vector1.y * vector2.y;

  // Calculate magnitudes
  const magnitude1 = Math.sqrt(vector1.x ** 2 + vector1.y ** 2);
  const magnitude2 = Math.sqrt(vector2.x ** 2 + vector2.y ** 2);

  // Calculate cosine of angle
  const cosAngle = dotProduct / (magnitude1 * magnitude2);

  // Calculate angle in radians
  const angleRadians = Math.acos(cosAngle);

  // Convert angle to degrees
  const angleDegrees = angleRadians * (180 / Math.PI);

  return angleDegrees;
}

const CreateSection = () => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [points, setPoints] = useState<Point[]>([]);
  const [previewPoints, setPreviewPoints] = useState<Point[] /* [startPoint, endPoint] */>([]);
  const [angle, setAngle] = useState(0);
  const canvasRef = useRef<SVGSVGElement>(null);
  const endpointRef = useRef<SVGCircleElement>(null);
  const rotatePointRef = useRef<SVGCircleElement>(null);
  const rectBoundBoxRef = useRef<SVGRectElement>(null);

  const handleMouseDown = (event: MouseEvent) => {
    if (
      isDrawing &&
      event.target === canvasRef.current &&
      endpointRef.current !== event.target &&
      rotatePointRef.current !== event.target
    ) {
      setPoints((prevPoints) => {
        prevPoints.push({ x: event.clientX, y: event.clientY });
        return [...prevPoints];
      });
      setPreviewPoints([{ x: event.clientX, y: event.clientY }]);
    }

    if (rotatePointRef.current === event.target) {
      setIsRotating(true);
    }
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (isDrawing && previewPoints.length >= 1) {
      setPreviewPoints((prevPoints) => {
        prevPoints[1] = { x: event.clientX, y: event.clientY };
        return [...prevPoints];
      });
    }

    if (!isDrawing && isRotating) {
      if (rectBoundBoxRef.current) {
        const rect = rectBoundBoxRef.current.getBoundingClientRect();
        const centerX = (rect.left + rect.right) / 2;
        const centerY = (rect.top + rect.bottom) / 2;
        const dx = event.clientX - centerX;
        const dy = event.clientY - centerY;
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);
        setAngle(angle);
      }
    }
  };

  const handleMouseUp = () => {
    setIsRotating(false);
  };

  useEffect(() => {
    canvasRef.current?.addEventListener('mousedown', handleMouseDown);
    canvasRef.current?.addEventListener('mousemove', handleMouseMove);
    canvasRef.current?.addEventListener('mouseup', handleMouseUp);

    return () => {
      canvasRef.current?.removeEventListener('mousedown', handleMouseDown);
      canvasRef.current?.removeEventListener('mousemove', handleMouseMove);
      canvasRef.current?.removeEventListener('mouseup', handleMouseUp);
    };
  }, [points, previewPoints, isDrawing, isRotating]);

  const endDraw = () => {
    setPoints((prevPoints) => {
      prevPoints.push(prevPoints[0]);
      return [...prevPoints];
    });
    setPreviewPoints([]);
    setIsDrawing(false);
  };

  const renderPreviewLine = () => {
    if (previewPoints.length < 2) return null;
    const [start, end] = previewPoints;

    return (
      <path
        d={`M ${start.x} ${start.y} L ${end.x} ${end.y}`}
        stroke='black'
        strokeWidth='2'
      />
    );
  };

  const renderLines = () => {
    if (points.length < 2) return null;
    const lines = [];
    for (let i = 0; i < points.length - 1; i++) {
      lines.push(
        <path
          key={i}
          d={`M ${points[i].x} ${points[i].y} L ${points[i + 1].x} ${points[i + 1].y}`}
          stroke='black'
          strokeWidth='2'
        />,
      );
    }
    return lines;
  };

  const renderPoints = () => {
    if (points.length < 2) return null;
    return points.map((point, index) => {
      return (
        <circle
          key={index}
          cx={point.x}
          cy={point.y}
          r='5'
          className={`${index === 0 ? 'end-point' : ''} point`}
          onClick={endDraw as any}
          ref={index === 0 ? endpointRef : null}
        />
      );
    });
  };

  const renderBoundingBox = () => {
    if (isDrawing) return null;
    if (points.length < 3) return null;

    const xCoords = points.map((point) => point.x);
    const yCoords = points.map((point) => point.y);
    const minX = Math.min(...xCoords);
    const maxX = Math.max(...xCoords);
    const minY = Math.min(...yCoords);
    const maxY = Math.max(...yCoords);
    const centerX = (minX + maxX) / 2;

    const rectPoints = [
      { x: minX, y: minY },
      { x: maxX, y: maxY },
    ];

    return (
      <g>
        <circle
          r={5}
          cx={centerX}
          cy={minY - 30}
          fill='blue'
          className='rotation-point'
          ref={rotatePointRef}
        />
        <path
          d={`M ${centerX} ${minY - 30} L ${centerX} ${minY}`}
          stroke='blue'
          strokeWidth='1'
        />
        ,
        <rect
          x={rectPoints[0].x}
          y={rectPoints[0].y}
          width={rectPoints[1].x - rectPoints[0].x}
          height={rectPoints[1].y - rectPoints[0].y}
          fill='transparent'
          stroke='blue'
          strokeWidth='0.5'
          ref={rectBoundBoxRef}
        />
      </g>
    );
  };

  return (
    <StyledCreateSection>
      <button onClick={() => setIsDrawing(true)}>Start Draw</button>
      <svg
        height='100vh'
        width='100vw'
        ref={canvasRef}
        className='bg-gray-50 mt-4'
      >
        <g
          className='section-group'
          transform={`rotate(${angle})`}
        >
          {renderPreviewLine()}
          {renderLines()}
          {renderPoints()}
          {renderBoundingBox()}
        </g>
      </svg>
    </StyledCreateSection>
  );
};

export default CreateSection;
