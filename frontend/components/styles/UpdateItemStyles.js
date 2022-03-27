import styled from "styled-components";

const UpdateItemStyles = styled.div`
  width: 100%;
  display: flex;
  justify-items: center;
  justify-content: space-evenly;
  div {
    border: 2px solid ${props => props.theme.lightgrey};
    /* margin-bottom: 30px; */
    width: 400px;
    img {
      width: 100%;
      margin: auto;
    }
  }
  @media (max-width: 1050px) {
    grid-template-columns: repeat(2, minmax(1fr, 2fr));
    div {
      width: 1.5fr;
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

export default UpdateItemStyles;
