import React, { Component } from "react";
import Link from "next/link";
import styled from "styled-components";

const LoginButtonStyles = styled.div`
  top: 50px;
  margin: 0;
  padding: 0;
  display: flex;
  justify-self: end;
  font-size: 1.7rem;
  justify-content: flex-end;
  background-color: lightblue;
  width: 80%;
  justify-content: space-around;
  align-items: center;
  a {
    padding: 1rem 3rem;
    display: flex;
    align-items: center;
    position: relative;
    font-weight: 500;
    font-size: 1em;
    background: none;
    border: 1px solid black;
    cursor: pointer;
    &:hover,
    &:focus {
      background-color: #ade1f9;
      outline: none;
      &:after {
        width: calc(100% + 60px);
      }
      @media (max-width: 700px) {
        width: calc(100% - 10px);
      }
    }
  }
`;

class DashboardLoginButton extends Component {
  render() {
    return (
      <LoginButtonStyles>
        Already a Vendor? 👉
        <Link href="/admin">
          <a>Sign in to Dashboard</a>
        </Link>
      </LoginButtonStyles>
    );
  }
}

export default DashboardLoginButton;
