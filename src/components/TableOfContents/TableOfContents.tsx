import React, { useState } from 'react';
import { StyledTOC } from './styled';
import { useHeadingsData, useIntersectionObserver } from '@/hooks';
import { Headings } from './Heading';

const TableOfContents = () => {
  const [activeId, setActiveId] = useState<string>('');
  const { nestedHeadings } = useHeadingsData();
  useIntersectionObserver('0px 0px -40% 0px', '#content h2, #content h3', setActiveId);
  return (
    <StyledTOC>
      <Headings
        headings={nestedHeadings}
        activeId={activeId}
      />
    </StyledTOC>
  );
};

export default TableOfContents;
