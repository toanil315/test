import styled from 'styled-components';

export const StyledMansoryLayout = styled.div<{ gap: number }>`
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-content: stretch;
  gap: ${({ gap }) => `${gap}px`};
`;

export const StyledMansoryColumn = styled.div<{ gap: number }>`
  flex: 1;
  box-sizing: border-box;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-content: stretch;
  width: 0;
  gap: ${({ gap }) => `${gap}px`};
`;

export const StyledHiddenSection = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  width: 100px; // we need to align all items to same width to get the correct height
`;
