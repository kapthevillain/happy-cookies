import styled from "styled-components";

const StyledHeader = styled.header`
  /* position: fixed; */
  width: 100%;
  background-color: white;

  .bar {
    border-bottom: 10px solid ${props => props.theme.black};
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: stretch;
    display: flex;
    span.logo-header > img {
      width: 250px;
    }
    span.logo-header-vendor > img {
      width: 150px;
    }
    @media (max-width: 1300px) {
      grid-template-columns: 1fr;
      justify-content: space-between;
    }
    @media (max-width: 900px) {
      span.logo-header > img {
        width: 190px;
      }
    }
    @media (max-width: 700px) {
      span.logo-header > img {
        width: 180px;
      }
    }
    @media (max-width: 400px) {
      span.logo-header > img {
        width: 150px;
      }
    }
  }

  .sub-bar {
    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: 1px solid ${props => props.theme.lightgrey};
  }
`;

export default StyledHeader;
