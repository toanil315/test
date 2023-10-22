import React, { useEffect, useRef, useState } from 'react';
import { StyledBoard, StyledWrapper } from './styled';
import ButtonsComponent from '../Buttons/Button';
import NodeComponent from '../Node/Node';
import EdgeComponent from '../Edge/Edge';

interface Node {
  id: string;
  numberInputs: number;
  numberOutputs: number;
  prevPosition: { x: number; y: number };
  currPosition: { x: number; y: number };
  inputEdgeIds: string[];
  outputEdgeIds: string[];
}

interface Edge {
  id: string;
  nodeStartId: string;
  nodeEndId: string;
  inputIndex: number;
  outputIndex: number;
  prevStartPosition: { x: number; y: number };
  currStartPosition: { x: number; y: number };
  prevEndPosition: { x: number; y: number };
  currEndPosition: { x: number; y: number };
}

const Board = () => {
  const [grabbing, setGrabbing] = useState<boolean>(false);
  const [scale, setScale] = useState<number>(1);
  const [clickedPosition, setClickedPosition] = useState<{ x: number; y: number }>({
    x: -1,
    y: -1,
  });
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [insideInput, setInsideInput] = useState<{
    nodeId: string;
    inputIndex: number;
    positionX: number;
    positionY: number;
  } | null>(null);
  const [newEdge, setNewEdge] = useState<Edge | null>(null);
  const [edges, setEdges] = useState<Edge[]>([]);

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
    // Deselect node
    setSelectedNode(null);

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
    if (selectedNode) {
      const newNodes = [...nodes];
      const nodeIndex = newNodes.findIndex((node) => node.id === selectedNode);
      if (nodeIndex !== -1) {
        newNodes[nodeIndex].prevPosition = {
          x: newNodes[nodeIndex].currPosition.x,
          y: newNodes[nodeIndex].currPosition.y,
        };

        const node = newNodes[nodeIndex];

        // Update input edges positions
        for (let i = 0; i < node.inputEdgeIds.length; i++) {
          const edgeId = node.inputEdgeIds[i];
          const edge = edges.find((edge) => edge.id === edgeId);
          if (edge) {
            edge.prevEndPosition = {
              x: edge.currEndPosition.x * scale,
              y: edge.currEndPosition.y * scale,
            };
          }
        }

        // Update output edges positions
        for (let i = 0; i < node.outputEdgeIds.length; i++) {
          const edgeId = node.outputEdgeIds[i];
          const edge = edges.find((edge) => edge.id === edgeId);
          if (edge) {
            edge.prevStartPosition = {
              x: edge.currStartPosition.x * scale,
              y: edge.currStartPosition.y * scale,
            };
          }
        }

        setNodes(newNodes);
      }
    }

    if (newEdge !== null && insideInput !== null) {
      const nodeStartId = newEdge!.nodeStartId;
      const nodeEndId = insideInput!.nodeId;

      const nodeStart = nodes.find((node) => node.id === nodeStartId);
      const nodeEnd = nodes.find((node) => node.id === nodeEndId);

      console.log(nodeStart, nodeEnd);

      if (nodeStart && nodeEnd && boardRef.current) {
        const edgeId = `edge_${nodeStart.id}_${newEdge?.outputIndex}_${nodeEnd.id}_${insideInput?.inputIndex}`;

        if (nodeStart.outputEdgeIds.includes(edgeId) && nodeEnd.inputEdgeIds.includes(edgeId)) {
          console.log('fail');
          setNewEdge(null);
          return;
        }

        nodeStart.outputEdgeIds = [...nodeStart.outputEdgeIds, edgeId];
        nodeEnd.inputEdgeIds = [...nodeEnd.inputEdgeIds, edgeId];

        // Update edge current positions
        newEdge!.prevStartPosition = {
          x: (newEdge!.currStartPosition.x + boardRef.current.scrollLeft) / scale,
          y: (newEdge!.currStartPosition.y + boardRef.current.scrollTop) / scale,
        };

        newEdge!.prevEndPosition = {
          x: (insideInput!.positionX + boardRef.current.scrollLeft) / scale,
          y: (insideInput!.positionY + boardRef.current.scrollTop) / scale,
        };

        newEdge!.currEndPosition = {
          x: (insideInput!.positionX + boardRef.current.scrollLeft) / scale,
          y: (insideInput!.positionY + boardRef.current.scrollTop) / scale,
        };

        console.log('work');

        // Add new edge
        setEdges([
          ...edges,
          {
            ...newEdge!,
            id: edgeId,
            nodeEndId: nodeEnd.id,
            inputIndex: insideInput!.inputIndex,
          },
        ]);
      }
    }

    setNewEdge(null);
    setSelectedNode(null);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (clickedPosition.x > 0 && clickedPosition.y) {
      const deltaX = e.clientX - clickedPosition.x;
      const deltaY = e.clientY - clickedPosition.y;

      if (selectedNode !== null) {
        const newNodes = [...nodes];
        const nodeIndex = newNodes.findIndex((node) => node.id === selectedNode);
        if (nodeIndex !== -1) {
          newNodes[nodeIndex].currPosition = {
            x: (newNodes[nodeIndex].prevPosition.x + deltaX) / scale,
            y: (newNodes[nodeIndex].prevPosition.y + deltaY) / scale,
          };

          const node = newNodes[nodeIndex];

          // Update input edges positions
          for (let i = 0; i < node.inputEdgeIds.length; i++) {
            const edgeId = node.inputEdgeIds[i];
            const edge = edges.find((edge) => edge.id === edgeId);
            if (edge) {
              edge.currEndPosition = {
                x: (edge.prevEndPosition.x + deltaX) / scale,
                y: (edge.prevEndPosition.y + deltaY) / scale,
              };
            }
          }

          // Update output edges positions
          for (let i = 0; i < node.outputEdgeIds.length; i++) {
            const edgeId = node.outputEdgeIds[i];
            const edge = edges.find((edge) => edge.id === edgeId);
            if (edge) {
              edge.currStartPosition = {
                x: (edge.prevStartPosition.x + deltaX) / scale,
                y: (edge.prevStartPosition.y + deltaY) / scale,
              };
            }
          }

          setNodes(newNodes);
        }
      } else {
        if (wrapperRef.current) {
          wrapperRef.current.scrollBy(-deltaX, -deltaY);
          setClickedPosition({ x: e.clientX, y: e.clientY });
        }
      }
    }

    if (newEdge !== null) {
      if (boardRef.current) {
        const movedNewEdge = { ...newEdge };
        movedNewEdge.currEndPosition = {
          x: (e.clientX + boardRef.current.scrollLeft) / scale,
          y: (e.clientY + boardRef.current.scrollTop) / scale,
        };
        setNewEdge(movedNewEdge);
      }
    }
  };

  const handleAddNode = (numberInputs: number, numberOutputs: number) => {
    // Create random positions
    const randomX = Math.random() * window.innerWidth;
    const randomY = Math.random() * window.innerHeight;

    // Update global nodes array
    setNodes([
      ...nodes,
      {
        id: `node_${Math.random().toString(36).substring(2, 8)}`,
        numberInputs: numberInputs,
        numberOutputs: numberOutputs,
        prevPosition: {
          x: randomX,
          y: randomY,
        },
        currPosition: {
          x: randomX,
          y: randomY,
        },
        inputEdgeIds: [],
        outputEdgeIds: [],
      },
    ]);
  };

  const handleDeleteNode = () => {};

  const handleOnMouseDownNode = (id: string, event: any) => {
    // Update first click position
    setClickedPosition({ x: event.clientX, y: event.clientY });

    // Select node
    setSelectedNode(id);

    if (selectedNode !== null) {
      const newNodes = [...nodes];
      const nodeIndex = newNodes.findIndex((node) => node.id === selectedNode);
      if (nodeIndex !== -1) {
        const node = newNodes[nodeIndex];

        node.prevPosition = {
          x: node.currPosition.x * scale,
          y: node.currPosition.y * scale,
        };

        // Update input edges positions
        for (let i = 0; i < node.inputEdgeIds.length; i++) {
          const edgeId = node.inputEdgeIds[i];
          const edge = edges.find((edge) => edge.id === edgeId);
          if (edge) {
            edge.prevEndPosition = {
              x: edge.currEndPosition.x * scale,
              y: edge.currEndPosition.y * scale,
            };
          }
        }

        // Update output edges positions
        for (let i = 0; i < node.outputEdgeIds.length; i++) {
          const edgeId = node.outputEdgeIds[i];
          const edge = edges.find((edge) => edge.id === edgeId);
          if (edge) {
            edge.prevStartPosition = {
              x: edge.currStartPosition.x * scale,
              y: edge.currStartPosition.y * scale,
            };
          }
        }

        setNodes(newNodes);
      }
    }
  };

  const handleOnMouseDownOutput = (
    outputPositionX: number,
    outputPositionY: number,
    nodeId: string,
    outputIndex: number,
  ) => {
    // Deselect node
    setSelectedNode(null);

    if (boardRef.current) {
      const positionX = (outputPositionX + boardRef.current.scrollLeft) / scale;
      const positionY = (outputPositionY + boardRef.current.scrollTop) / scale;

      setNewEdge({
        id: '',
        nodeStartId: nodeId,
        outputIndex: outputIndex,
        nodeEndId: '',
        inputIndex: -1,
        prevStartPosition: { x: positionX, y: positionY },
        currStartPosition: { x: positionX, y: positionY },
        prevEndPosition: { x: positionX, y: positionY },
        currEndPosition: { x: positionX, y: positionY },
      });
    }
  };

  const handleOnMouseEnterInput = (
    inputPositionX: number,
    inputPositionY: number,
    nodeId: string,
    inputIndex: number,
  ) => {
    setInsideInput({ nodeId, inputIndex, positionX: inputPositionX, positionY: inputPositionY });
  };

  const handleOnMouseLeaveInput = (nodeId: string, inputIndex: number) => {
    if (
      insideInput !== null &&
      insideInput?.nodeId === nodeId &&
      insideInput?.inputIndex === inputIndex
    )
      setInsideInput(null);
  };

  return (
    <StyledWrapper ref={wrapperRef}>
      <ButtonsComponent
        showDelete={false}
        onClickAdd={handleAddNode}
        onClickDelete={handleDeleteNode}
      />
      <StyledBoard
        ref={boardRef as any}
        isGrabbing={grabbing}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {nodes.map((node) => {
          return (
            <NodeComponent
              id={node.id}
              x={node.currPosition.x}
              y={node.currPosition.y}
              numberInputs={node.numberInputs}
              numberOutputs={node.numberOutputs}
              selected={selectedNode === node.id}
              onMouseDownNode={handleOnMouseDownNode}
              onMouseDownOutput={handleOnMouseDownOutput}
              onMouseEnterInput={handleOnMouseEnterInput}
              onMouseLeaveInput={handleOnMouseLeaveInput}
            />
          );
        })}
        {newEdge !== null && (
          <EdgeComponent
            isNew={true}
            onClickDelete={() => {}}
            onMouseDownEdge={() => {}}
            selected={false}
            position={{
              x0: newEdge.currStartPosition.x,
              y0: newEdge.currStartPosition.y,
              x1: newEdge.currEndPosition.x,
              y1: newEdge.currEndPosition.y,
            }}
          />
        )}
        {edges.map((edge) => (
          <EdgeComponent
            selected={false}
            isNew={false}
            position={{
              x0: edge.currStartPosition.x,
              y0: edge.currStartPosition.y,
              x1: edge.currEndPosition.x,
              y1: edge.currEndPosition.y,
            }}
            onMouseDownEdge={() => {}}
            onClickDelete={() => {}}
          />
        ))}
      </StyledBoard>
    </StyledWrapper>
  );
};

export default Board;
