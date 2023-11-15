import styled from 'styled-components';

export const StyledVideoContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  gap: 30px;
`;

export const StyledVideoItem = styled.div`
  width: 1040px;
  border-radius: 20px;
  background-color: #1b1b1b;

  h2 {
    margin-bottom: 0;
    opacity: 0;
    text-transform: capitalize;
  }

  video {
    width: 100%;
    border-radius: 20px;
  }

  @media screen and (max-width: 768px) {
    width: 512px;
  }

  @media screen and (max-width: 512px) {
    width: 336px;
  }
`;
