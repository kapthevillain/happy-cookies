import Link from "next/link";
import { NavStyles } from "../styles/NavStyles";
import User from "../User/User";
import Signout from "../Signout/Signout";
import CartCount from "../CartCount/CartCount";
import { Mutation } from "react-apollo";
import { TOGGLE_CART_MUTATION } from "../Cart/Cart";
import { TOGGLE_MININAV_MUTATION } from "./MiniNav";

const Nav = () => (
  <User>
    {({ data: { me } }) => (
      <NavStyles data-test="nav">
        <Mutation mutation={TOGGLE_MININAV_MUTATION}>
          {toggleMiniNav => (
            <button className="miniNav" onClick={toggleMiniNav}>
              Menu
            </button>
          )}
        </Mutation>
        {me && (
          <>
            <Mutation mutation={TOGGLE_CART_MUTATION}>
              {toggleCart => (
                <button className="miniNav" onClick={toggleCart}>
                  🛒
                  <CartCount
                    count={me.cart.reduce(
                      (tally, cartItem) => tally + cartItem.quantity,
                      0
                    )}
                  ></CartCount>
                </button>
              )}
            </Mutation>
          </>
        )}
        <Link href="/items">
          <a>Shop</a>
        </Link>
        {me && (
          <>
            {/* <Link href="/sell">
              <a>Sell</a>
            </Link> */}
            <Link href="/orders">
              <a>Orders</a>
            </Link>
            <Link href="/me">
              <a>Account</a>
            </Link>
            <Signout />
            <Mutation mutation={TOGGLE_CART_MUTATION}>
              {toggleCart => (
                <button onClick={toggleCart}>
                  My Cart{" "}
                  <CartCount
                    count={me.cart.reduce(
                      (tally, cartItem) => tally + cartItem.quantity,
                      0
                    )}
                  ></CartCount>
                </button>
              )}
            </Mutation>
          </>
        )}

        {!me && (
          <>
            <Link href="/signup">
              <a>Sign In</a>
            </Link>
            <Mutation mutation={TOGGLE_CART_MUTATION}>
              {toggleCart => (
                <button onClick={toggleCart}>
                  My Cart{" "}
                  {/* <CartCount
                    count={me.cart.reduce(
                      (tally, cartItem) => tally + cartItem.quantity,
                      0
                    )}
                  ></CartCount> */}
                </button>
              )}
            </Mutation>
          </>
        )}
      </NavStyles>
    )}
  </User>
);

export default Nav;
