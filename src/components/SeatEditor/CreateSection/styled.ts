import styled from 'styled-components';

export const StyledCreateSection = styled.div`
  .point {
    fill: red;
    cursor: pointer;

    &.end-point {
      fill: blue !important;
      cursor: grab;
    }
  }

  .rotation-point {
    cursor: move;
  }

  .section-group {
    transform-box: fill-box;
    transform-origin: 50% 50%;
  }
`;
