import styled from "styled-components";

const WorkWithUsStyles = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  border: 1px solid ${props => props.theme.offWhite};
  box-shadow: ${props => props.theme.bs};
  padding: 2rem;
  border-top: 10px solid red;
  margin: auto;

  .wwu-main-1 {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    /* margin: auto; */
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
  }
`;

export default WorkWithUsStyles;
