import { TableOfContents } from '@/components/TableOfContents';
import React from 'react';
import { StyledHomeContainer } from './styled';
import { VideosContainer } from '../VideosContainer';

const HomeContainer = () => {
  return (
    <StyledHomeContainer>
      <TableOfContents />
      <VideosContainer />
    </StyledHomeContainer>
  );
};

export default HomeContainer;
