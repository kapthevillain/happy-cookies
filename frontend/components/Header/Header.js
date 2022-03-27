import Link from "next/link";
import Router from "next/router";
import NProgress from "nprogress";
import styled from "styled-components";
import MainHeader from "../styles/HeaderStyles";
// import VendorStyles from "../styles/VendorStyles";
import Nav from "../Nav/Nav";
import MiniNav from "../Nav/MiniNav";
import Cart from "../Cart/Cart";
import Search from "../Search/Search";
import Vendor from "../Vendor/Vendor";
import VendorNav from "../Vendor/VendorNav";

Router.onRouteChangeStart = () => {
  console.log("onRouteChangeStart triggered");
  NProgress.start();
};
Router.onRouteChangeComplete = () => {
  console.log("onRouteChangeComplete triggered");
  NProgress.done();
};
Router.onRouteChangeError = () => {
  console.log("onRouteChangeError triggered");
  NProgress.done();
};

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

const VendorHeader = styled.header`
  /* position: fixed; */
  width: 100%;
  background-color: ${props => props.theme.green};

  .bar {
    border-bottom: 5px solid ${props => props.theme.black};
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

const Header = () => (
  <Vendor>
    {({ data: { vendor } }) => (
      <>
        {!vendor && (
          <MainHeader>
            <div className="bar">
              <Link href="/">
                <a>
                  <span className="logo-header">
                    <img src="/static/header-without-leaf.png" alt="Happy Cookies logo" />
                  </span>
                </a>
              </Link>
              <Nav />
            </div>
            <div className="sub-bar">
              <Search />
            </div>
            <Cart />
            <MiniNav />
          </MainHeader>
        )}
        {vendor && (
          <>
            <VendorHeader>
              <div className="bar vendor">
                <Link href="/">
                  <a>
                    <span className="logo-header-vendor">
                      <img src="/static/header-without-leaf.png" alt="Happy Cookies logo" />
                    </span>
                  </a>
                </Link>
                <VendorNav />
              </div>
              <div className="sub-bar vendor">
                <Search />
              </div>
            </VendorHeader>
          </>
        )}
      </>
    )}
  </Vendor>
);

export default Header;
