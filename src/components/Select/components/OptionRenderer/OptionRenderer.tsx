import { type OptionRendererProps } from '@components/Select/types';
import { memo } from 'react';
import './OptionRenderer.scss';

const OptionRenderer = ({ option }: OptionRendererProps) => (
  <>
    {option.name && <div className='truncate'>{option.name}</div>}
    {option.render?.()}
    {option.html && <div dangerouslySetInnerHTML={{ __html: option.html }}></div>}
  </>
);

export default memo(OptionRenderer);
