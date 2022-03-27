import styled from "styled-components";

const NavStyles = styled.ul`
  top: 50px;
  margin: 0;
  padding: 0;
  display: flex;
  justify-self: end;
  font-size: 2rem;
  justify-content: flex-end;
  a,
  button {
    padding: 1rem 3rem;
    display: flex;
    align-items: center;
    position: relative;
    text-transform: uppercase;
    font-weight: 900;
    font-size: 1em;
    background: none;
    border: 0;
    cursor: pointer;
    @media (max-width: 1300px) {
      padding: 1rem 2rem;
    }
    @media (max-width: 900px) {
      padding: 1rem 1rem;
    }
    @media (max-width: 700px) {
      font-size: 10px;
      padding: 0 10px;
      display: none;
    }
    &:before {
      content: "";
      width: 2px;
      background: ${props => props.theme.lightgrey};
      height: 100%;
      left: 0;
      position: absolute;
      transform: skew(-10deg);
      top: 0;
      bottom: 0;
    }
    &:after {
      height: 2px;
      background: ${props => props.theme.green};
      content: "";
      width: 0;
      position: absolute;
      transform: translateX(-50%);
      transition: width 0.4s;
      transition-timing-function: cubic-bezier(1, -0.65, 0, 2.31);
      left: 50%;
      margin-top: 2rem;
    }
    &:hover:not(.miniNav),
    &:focus:not(.miniNav) {
      outline: none;
      &:after {
        width: calc(100% - 60px);
      }
      @media (max-width: 700px) {
        width: calc(100% - 10px);
      }
    }
  }
  @media (max-width: 1300px) {
    width: 100%;
    justify-content: end;
    font-size: 1.5rem;
  }
  @media (max-width: 700px) {
    width: 25%;
    .miniNav {
      display: flex;
      &:before {
        width: 0px;
      }
    }
  }
  @media (min-width: 700px) {
    .miniNav {
      display: none;
    }
  }
`;

const VendorNavStyles = styled.ul`
  top: 50px;
  margin: 0;
  padding: 0;
  display: flex;
  justify-self: end;
  font-size: 1.5rem;
  justify-content: flex-end;
  a,
  button {
    padding: 1rem 3rem;
    display: flex;
    align-items: center;
    position: relative;
    /* text-transform: uppercase; */
    font-weight: 900;
    font-size: 0.75em;
    background: none;
    border: 0;
    cursor: pointer;
    @media (max-width: 1300px) {
      padding: 1rem 2rem;
    }
    @media (max-width: 900px) {
      padding: 1rem 1rem;
    }
    @media (max-width: 700px) {
      font-size: 10px;
      padding: 0 10px;
      display: none;
    }
    &:before {
      content: "";
      width: 2px;
      background: ${props => props.theme.lightgrey};
      height: 100%;
      left: 0;
      position: absolute;
      /* transform: skew(-10deg); */
      top: 0;
      bottom: 0;
    }
    &:after {
      height: 2px;
      background: ${props => props.theme.green};
      content: "";
      width: 0;
      position: absolute;
      transform: translateX(-50%);
      transition: width 0.4s;
      transition-timing-function: cubic-bezier(1, -0.65, 0, 2.31);
      left: 50%;
      margin-top: 2rem;
    }
    &:hover:not(.miniNav),
    &:focus:not(.miniNav) {
      outline: none;
      &:after {
        width: calc(100% - 60px);
      }
      @media (max-width: 700px) {
        width: calc(100% - 10px);
      }
    }
  }
  @media (max-width: 1300px) {
    width: 100%;
    justify-content: end;
    font-size: 1.5rem;
  }
  @media (max-width: 700px) {
    width: 25%;
    .miniNav {
      display: flex;
      &:before {
        width: 0px;
      }
    }
  }
  @media (min-width: 700px) {
    .miniNav {
      display: none;
    }
  }
`;

export { NavStyles, VendorNavStyles };
