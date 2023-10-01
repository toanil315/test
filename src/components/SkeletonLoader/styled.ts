import styled, { css } from 'styled-components';

interface Props {
  loading: boolean;
  animation: 'wave' | 'pulse' | 'none';
}

export const StyledSkeletonLoader = styled.div<Props>`
  ${({ loading, animation }) =>
    loading &&
    css`
      .sm-item-primary,
      .sm-item-secondary {
        display: block;

        border-color: transparent !important;
        color: transparent !important;
        cursor: wait;
        outline: none;
        position: relative;
        user-select: none;

        * {
          visibility: hidden;
        }

        &:empty::after {
          content: 'empty string';
        }

        *:empty::after {
          content: 'empty string';
        }
      }

      ${animation === 'wave' &&
      css`
        .sm-item-primary {
          animation: var(--sm-animation-wave);
          background: linear-gradient(
              90deg,
              transparent 40%,
              var(--sm-color-light-animation-primary) 50%,
              transparent 60%
            )
            rgba(var(--sm-color-light-primary));
          background-size: 200% 100%;
        }

        .sm-item-secondary {
          animation: var(--sm-animation-wave);
          background: linear-gradient(
              90deg,
              transparent 40%,
              var(--sm-color-light-animation-secondary) 50%,
              transparent 60%
            )
            rgba(var(--sm-color-light-secondary));
          background-size: 200% 100%;
        }
      `}

      ${animation === 'pulse' &&
      css`
        .sm-item-primary {
          animation: var(--sm-animation-pulse);
          background: linear-gradient(
              90deg,
              transparent 40%,
              var(--sm-color-light-animation-secondary) 50%,
              transparent 60%
            )
            rgba(var(--sm-color-light-secondary));
          background-size: 200% 100%;
        }

        .sm-item-secondary {
          animation: var(--sm-animation-pulse);
          background: linear-gradient(
              90deg,
              transparent 40%,
              var(--sm-color-light-animation-secondary) 50%,
              transparent 60%
            )
            rgba(var(--sm-color-light-secondary));
          background-size: 200% 100%;
        }
      `}

      ${animation === 'none' &&
      css`
        .sm-item-primary {
          animation: var(--sm-animation-none);
          background: rgba(var(--sm-color-light-primary));
        }

        .sm-item-secondary {
          animation: var(--sm-animation-none);
          background: rgba(var(--sm-color-light-secondary));
        }
      `}
    `}
`;
