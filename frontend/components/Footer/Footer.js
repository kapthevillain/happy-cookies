import Link from "next/link";
import Router from "next/router";
import NProgress from "nprogress";
import styled from "styled-components";
import Nav from "../Nav/Nav";
import MiniNav from "../Nav/MiniNav";
import Cart from "../Cart/Cart";
import Search from "../Search/Search";

const Logo = styled.h1`
  width: 100%;
  position: fixed;
  font-size: 3rem;
  margin-left: 2rem;
  position: relative;
  z-index: 2;
  transform: skew(-7deg);
  a {
    padding: 0.5rem 1rem;
    background: ${props => props.theme.red};
    color: white;
    text-transform: uppercase;
    text-decoration: none;
  }

  @media (max-width: 1300px) {
    margin: 0;
    text-align: center;
  }

  @media (max-width: 700px) {
    font-size: 2rem;
  }
`;

const StyledFooter = styled.footer`
  width: 100%;
  background-color: white;
  display: flex;
  justify-content: space-around;
  align-content: center;
  font-size: 1.5rem;
  box-shadow: 0px 2px #6c9d4b;
  align-items: center;
  @media (max-width: 700px) {
    font-size: 1.2rem;
    span.logo-footer > img {
      width: 100px;
    }
  }
`;

const Header = () => (
  <StyledFooter>
    <div className="footer-bar">
      <Link href="/">
        <a>
          <span className="logo-footer">
            <img width="200px" src="/static/header-without-leaf.png" alt="" />
          </span>
        </a>
      </Link>
    </div>
    <div className="copyright-footer">
      🍪🍪🍪... Copyright &copy; 2019 Happy Cookies
    </div>
    <div className="links-footer">
      <ul>
        <li>
          <Link href="/workwithus">
            <a>Want to work with us?</a>
          </Link>
        </li>
      </ul>
    </div>
  </StyledFooter>
);

export default Header;
