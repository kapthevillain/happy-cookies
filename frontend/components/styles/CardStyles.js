import styled from "styled-components";

const CardStyles = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-template-rows: auto;
  justify-items: center;
  div {
    width: 300px;
    border: 2px solid ${props => props.theme.lightgrey};
    display: flex;
    margin-bottom: 30px;
    img {
      width: 200px;
      margin: auto;
    }
  }
  @media (max-width: 1050px) {
    grid-template-columns: repeat(3, minmax(250px, 1fr));
    div {
      width: 250px;
    }
  }
  @media (max-width: 900px) {
    grid-template-columns: repeat(1, minmax(300px, 1fr));
    div {
      width: 300px;
    }
  }
  @media (max-width: 380px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    div {
      width: 200px;
    }
  }
`;

export default CardStyles;
