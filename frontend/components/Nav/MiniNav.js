import React, { Component } from "react";
import { Query, Mutation } from "react-apollo";
import { adopt } from "react-adopt";
import gql from "graphql-tag";
import Link from "next/link";
import Signout from "../Signout/Signout";
import calcTotalPrice from "../../lib/calcTotalPrice";
import formatMoney from "../../lib/formatMoney";
import User from "../User/User";
import CartItem from "../CartItem/CartItem";
import TakeMyMoney from "../TakeMyMoney/TakeMyMoney";
import CartStyles from "../styles/CartStyles";
import Supreme from "../styles/Supreme";
import CloseButton from "../styles/CloseButton";
import MenuButton from "../styles/MenuButton";
import MiniNavStyles from "../styles/MiniNavStyles";

const LOCAL_STATE_MININAV_QUERY = gql`
  query LOCAL_STATE_MININAV_QUERY {
    miniNavOpen @client
  }
`;

const TOGGLE_MININAV_MUTATION = gql`
  mutation TOGGLE_MININAV_MUTATION {
    toggleMiniNav @client
  }
`;

const Composed = adopt({
  user: ({ render }) => <User>{render}</User>,
  toggleMiniNav: ({ render }) => (
    <Mutation mutation={TOGGLE_MININAV_MUTATION}>{render}</Mutation>
  ),
  localState: ({ render }) => (
    <Query query={LOCAL_STATE_MININAV_QUERY}>{render}</Query>
  )
});

class MiniNav extends Component {
  handleClick = (e, toggleMiniNav) => {
    console.log("click fucker");
    toggleMiniNav();
    return true;
  };

  render() {
    return (
      <Composed>
        {({ user, toggleMiniNav, localState }) => {
          const me = user.data.me;
          // if (!me) return null;

          return (
            <MiniNavStyles open={localState.data.miniNavOpen}>
              <header>
                <CloseButton title="close" onClick={toggleMiniNav}>
                  &times;
                </CloseButton>
              </header>
              <ul>
                <li>
                  <MenuButton>
                    <Link href="/items">
                      <a
                        onClick={(e, toggleMiniNav) => {
                          this.handleClick(e, toggleMiniNav);
                        }}
                      >
                        Shop
                      </a>
                    </Link>
                  </MenuButton>
                </li>
                {me && (
                  <>
                    <li>
                      <MenuButton>
                        <Link href="/sell">
                          <a
                            onClick={(e, toggleMiniNav) => {
                              this.handleClick(e, toggleMiniNav);
                            }}
                          >
                            Sell
                          </a>
                        </Link>
                      </MenuButton>
                    </li>
                    <li>
                      <MenuButton>
                        <Link href="/orders">
                          <a
                            onClick={(e, toggleMiniNav) => {
                              this.handleClick(e, toggleMiniNav);
                            }}
                          >
                            Orders
                          </a>
                        </Link>
                      </MenuButton>
                    </li>
                    <li>
                      <MenuButton>
                        <Link href="/me">
                          <a
                            onClick={(e, toggleMiniNav) => {
                              this.handleClick(e, toggleMiniNav);
                            }}
                          >
                            Account
                          </a>
                        </Link>
                      </MenuButton>
                    </li>
                    <li>
                      {/* <MenuButton> */}
                      <Signout />
                      {/* </MenuButton> */}
                    </li>
                  </>
                )}
              </ul>
              <footer>
                <button onClick={toggleMiniNav}>Close</button>
              </footer>
            </MiniNavStyles>
            // <CartStyles open={localState.data.cartOpen}>
            // <header>
            //   <CloseButton title="close" onClick={toggleMiniNav}>
            //     &times;
            //   </CloseButton>
            //   <Supreme>{me.name}'s Cart</Supreme>
            //   <p>
            //     You have {me.cart.length} Item
            //     {me.cart.length === 1 ? "" : "s"} in your cart.
            //   </p>
            // </header>

            // <ul>
            //   {me.cart.map(cartItem => (
            //     <CartItem key={cartItem.id} cartItem={cartItem} />
            //   ))}
            // </ul>

            // <footer>
            //   <p>{formatMoney(calcTotalPrice(me.cart))}</p>
            //   {me.cart.length && (
            //     <TakeMyMoney>
            //       <MenuButton>Checkout</MenuButton>
            //     </TakeMyMoney>
            //   )}
            // </footer>
            // </CartStyles>
          );
        }}
      </Composed>
    );
  }
}

export default MiniNav;
export { LOCAL_STATE_MININAV_QUERY, TOGGLE_MININAV_MUTATION };
