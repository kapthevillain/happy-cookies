import styled from "styled-components";

const ItemPreviewContainerStyles = styled.div`
align-self: center;
  /* display: grid; */
  /* grid-template-columns: 1fr 1fr; */
  /* grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); */
  /* grid-gap: 60px; */
  /* grid-gap: 30px; */
  /* max-width: ${props => props.theme.maxWidth}; */
  /* margin: 0 10px auto; */
  /* display: grid; */
  /* @media (max-width: 700px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  } */
`;

const ItemPreviewStyles = styled.div`
  background: white;
  border: 1px solid ${props => props.theme.offWhite};
  box-shadow: ${props => props.theme.bs};
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  /* .test {
    width: 300px;
  } */
  x img {
    /* width: 50%; */
    height: 250px;
    object-fit: cover;
  }
  p {
    font-size: 12px;
    line-height: 2;
    font-weight: 300;
    flex-grow: 1;
    padding: 0 3rem;
    font-size: 1.5rem;
  }
  .buttonList {
    display: grid;
    width: 100%;
    border-top: 1px solid ${props => props.theme.lightgrey};
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    grid-gap: 1px;
    background: ${props => props.theme.lightgrey};
    & > * {
      background: white;
      border: 0;
      font-size: 1rem;
      padding: 1rem;
    }
  }
`;

export { ItemPreviewStyles, ItemPreviewContainerStyles };
