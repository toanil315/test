import styled from 'styled-components';

export const StyledTOC = styled.nav`
  margin-bottom: 40px;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;

  a {
    color: grey;
    text-decoration: none;

    font-size: 24px;
    line-height: 40px;

    text-transform: capitalize;
  }

  li.active > a {
    color: white;
  }

  li > a:hover {
    color: white;
  }
`;
