import { useRef } from 'react';
import styles from './styles.module.css';

interface Props {
  nodeId: string;
  index: number;
  onMouseEnterInput: (
    inputPositionX: number,
    inputPositionY: number,
    nodeId: string,
    outputIndex: number,
  ) => void;
  onMouseLeaveInput: (nodeId: string, inputIndex: number) => void;
}

const InputNode = (props: Props) => {
  const nodeRef = useRef<HTMLDivElement>(null);

  function handleMouseEnterInput(inputIndex: number) {
    if (nodeRef.current) {
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
      props.onMouseEnterInput(centerX, centerY, props.nodeId, inputIndex);
    }
  }

  function handleMouseLeaveInput(inputIndex: number) {
    props.onMouseLeaveInput(props.nodeId, inputIndex);
  }

  return (
    <div
      ref={nodeRef}
      className={styles.input}
      onMouseEnter={() => handleMouseEnterInput(props.index)}
      onMouseLeave={() => handleMouseLeaveInput(props.index)}
    ></div>
  );
};

export default InputNode;
