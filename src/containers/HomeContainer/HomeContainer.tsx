import { TableOfContents } from '@/components/TableOfContents';
import React, { useRef, useState } from 'react';
import { StyledHomeContainer } from './styled';
import { VideosContainer } from '../VideosContainer';
import { MansoryLayout } from '@/components/MansoryLayout';

const images = [
  'https://picsum.photos/200/300?image=1050',
  'https://picsum.photos/400/400?image=1039',
  'https://picsum.photos/400/400?image=1080',
  'https://picsum.photos/200/200?image=997',
  'https://picsum.photos/500/400?image=287',
  'https://picsum.photos/400/500?image=955',
  'https://picsum.photos/200/300?image=916',
  'https://picsum.photos/300/300?image=110',
  'https://picsum.photos/300/300?image=206',
];

const HomeContainer = () => {
  return (
    <StyledHomeContainer>
      <MansoryLayout
        totalColumns={3}
        gap={20}
        optimizeItemOrders={true}
        breakpoints={{
          700: 2,
          1000: 3,
        }}
      >
        {images.map((image, i) => (
          <img
            key={image}
            src={image}
            alt=''
            style={{ width: '100%', display: 'block' }}
          />
        ))}
      </MansoryLayout>
    </StyledHomeContainer>
  );
};

export default HomeContainer;
