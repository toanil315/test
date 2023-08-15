import styled from 'styled-components';

export const StyledEditor = styled.div`
  position: relative;
  border: 1px solid rgba(0, 0, 0, 0.3);
  margin: 44px;

  .content-editable {
    width: 100%;
    min-height: 300px;
    padding: 10px;
    outline: none;
  }
  .placeholder {
    position: absolute;
    top: 10px;
    left: 10px;
    pointer-events: none;
  }

  .base {
    font-size: 16px;
    user-select: none;
  }

  .font-bold {
    font-weight: 700;
  }

  .italic {
    font-style: italic;
  }

  .underline {
    text-decoration: underline;
  }

  .strikethrough {
    text-decoration: line-through;
  }

  .banner {
    background-color: rgba(0, 0, 0, 0.05);
    border-left: 3px solid rgba(0, 0, 0, 0.5);
    margin: 4px;
    padding: 4px;
  }

  ul {
    list-style-type: disc;
    padding-left: 20px;
  }

  .image {
    max-width: 90%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
  }

  .image > img {
    width: 100%;
    object-fit: cover;
  }
`;
