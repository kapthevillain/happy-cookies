import React, { Component } from "react";
import PropTypes from "prop-types";

import CartItem from "../CartItem/CartItem";
import TakeMyMoney from "../TakeMyMoney/TakeMyMoney";
import CartStyles from "../styles/CartStyles";
import Supreme from "../styles/Supreme";
import CloseButton from "../styles/CloseButton";
import SickButton from "../styles/SickButton";

class GuestCart extends Component {
  render() {
    return (
      <CartStyles open={this.props.isOpen}>
        <header>
          <CloseButton title="close" onClick={this.props.triggerToggleCart}>
            &times;
          </CloseButton>
          <Supreme>Cart</Supreme>
          <p>
            {/* You have {me.cart.length} item
            {me.cart.length === 1 ? "" : "s"} in your cart. */}
            You have an item in your cart.
          </p>
        </header>

        <ul>
          {/* {me.cart.map(cartItem => (
            <CartItem key={cartItem.id} cartItem={cartItem} />
          ))} */}
          <li>what's updog</li>
        </ul>

        <footer>
          {/* <p>{formatMoney(calcTotalPrice(me.cart))}</p>
          {me.cart.length && ( */}
          {/* <TakeMyMoney> */}
          <SickButton>Checkout</SickButton>
          {/* </TakeMyMoney> */}
          {/* )} */}
        </footer>
      </CartStyles>
    );
  }
}

GuestCart.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  triggerToggleCart: PropTypes.func.isRequired
  // itemData: PropTypes.object.isRequired,
  // handleChange: PropTypes.func.isRequired,
  // setTags: PropTypes.func.isRequired,
  // updateItem: PropTypes.func.isRequired
};

export default GuestCart;
