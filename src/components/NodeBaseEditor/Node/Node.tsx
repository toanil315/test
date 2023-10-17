import InputNode from './InputNode';
import OutputNode from './OutputNode';
import styles from './styles.module.css';

interface NodeProps {
  id: string;
  x: number;
  y: number;
  numberInputs: number;
  numberOutputs: number;
  selected: boolean;
  onMouseDownNode: (id: string, event: any) => void;
  onMouseDownOutput: (
    outputPositionX: number,
    outputPositionY: number,
    nodeId: string,
    outputIndex: number,
  ) => void;
  onMouseEnterInput: (
    inputPositionX: number,
    inputPositionY: number,
    nodeId: string,
    outputIndex: number,
  ) => void;
  onMouseLeaveInput: (nodeId: string, inputIndex: number) => void;
}

const NodeComponent = (props: NodeProps) => {
  return (
    <div
      className={props.selected ? styles.nodeSelected : styles.node}
      style={{
        transform: `translate(${props.x}px, ${props.y}px)`,
      }}
      onMouseDown={(event: any) => {
        event.stopPropagation();
        props.onMouseDownNode(props.id, event);
      }}
    >
      <div className={styles.inputsWrapper}>
        {[...Array(Number(props.numberInputs)).keys()].map((_, index) => {
          return (
            <InputNode
              key={`node-${props.id}-input-${index}`}
              nodeId={props.id}
              index={index}
              onMouseEnterInput={props.onMouseEnterInput}
              onMouseLeaveInput={props.onMouseLeaveInput}
            />
          );
        })}
      </div>
      <div className={styles.outputsWrapper}>
        {[...Array(Number(props.numberOutputs)).keys()].map((_, index) => {
          return (
            <OutputNode
              key={`node-${props.id}-output-${index}`}
              nodeId={props.id}
              index={index}
              onMouseDownOutput={props.onMouseDownOutput}
            />
          );
        })}
      </div>
    </div>
  );
};

export default NodeComponent;
