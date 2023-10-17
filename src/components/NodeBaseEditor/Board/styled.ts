import styled from 'styled-components';

interface BoardProps extends Partial<HTMLDivElement> {
  isGrabbing?: boolean;
  children: any;
}

export const StyledWrapper = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  overflow: scroll;
`;

export const StyledBoard = styled.div<BoardProps>`
  width: 100%;
  height: 100%;
  background-size: 30px 30px;
  background-image: radial-gradient(circle, #b8b8b8bf 1px, rgba(0, 0, 0, 0) 1px);
  cursor: ${({ isGrabbing }) => (isGrabbing ? 'grabbing' : 'grab')};
`;
