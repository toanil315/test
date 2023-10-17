import { MouseEvent, MouseEventHandler, useRef } from 'react';
import styles from './styles.module.css';

interface Props {
  nodeId: string;
  index: number;
  onMouseDownOutput: (
    outputPositionX: number,
    outputPositionY: number,
    nodeId: string,
    outputIndex: number,
  ) => void;
}

const OutputNode = (props: Props) => {
  const nodeRef = useRef<HTMLDivElement>(null);

  function handleMouseDownOutput(event: MouseEvent<HTMLDivElement>, outputIndex: number) {
    if (nodeRef.current) {
      event.stopPropagation();
      const centerX =
        nodeRef.current.getBoundingClientRect().left +
        Math.abs(
          nodeRef.current.getBoundingClientRect().right -
            nodeRef.current.getBoundingClientRect().left,
        ) /
          2;
      const centerY =
        nodeRef.current.getBoundingClientRect().top +
        Math.abs(
          nodeRef.current.getBoundingClientRect().bottom -
            nodeRef.current.getBoundingClientRect().top,
        ) /
          2;
      props.onMouseDownOutput(centerX, centerY, props.nodeId, outputIndex);
    }
  }

  return (
    <div
      ref={nodeRef}
      className={styles.output}
      onMouseDown={(event) => handleMouseDownOutput(event, props.index)}
    ></div>
  );
};

export default OutputNode;
