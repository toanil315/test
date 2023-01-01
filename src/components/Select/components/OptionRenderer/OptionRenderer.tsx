import { type OptionRendererProps } from '../../types';
import './OptionRenderer.scss';

const OptionRenderer = ({ option }: OptionRendererProps) => {
  if (option.render !== undefined) {
    return option.render();
  }

  if (option.html !== undefined) {
    return <div dangerouslySetInnerHTML={{ __html: option.html }}></div>;
  }

  return <div className='truncate'>{option.name}</div>;
};

export default OptionRenderer;
