import styled from 'styled-components';

export const StyledVideoContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  gap: 30px;
`;

export const StyledVideoItem = styled.div`
  h2 {
    color: white;
    text-decoration: none;

    font-size: 24px;
    margin-bottom: 10px;

    text-transform: capitalize;
  }

  video {
    width: 1040px;
    border-radius: 20px;
    background-color: #1b1b1b;
    border-radius: 20px;
  }

  @media screen and (max-width: 768px) {
    width: 512px;
  }

  @media screen and (max-width: 512px) {
    width: 336px;
  }
`;
