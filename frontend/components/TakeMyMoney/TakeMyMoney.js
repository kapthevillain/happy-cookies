import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import { Mutation } from "react-apollo";
import Router from "next/router";
import NProgress from "nprogress";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import calcTotalPrice from "../../lib/calcTotalPrice";
import Error from "../ErrorMessage/ErrorMessage";
import User, { CURRENT_USER_QUERY } from "../User/User";
import { stripePubKey } from "../../config";
import { responsePathAsArray } from "graphql";

function totalItem(cart) {
  return cart.reduce((tally, cartItem) => tally + cartItem.quantity, 0);
}

const CREATE_ORDER_MUTATION = gql`
  mutation CREATE_ORDER_MUTATION($token: String!) {
    createOrder(token: $token) {
      id
      charge
      total
      items {
        id
        title
      }
    }
  }
`;
// TODO: Add CC testing
class TakeMyMoney extends Component {
  onToken = async (res, createOrder) => {
    NProgress.start();
    // manually call mutation once we have the stripe token
    const order = await createOrder({
      variables: { token: res.id }
    }).catch(err => {
      alert(err.message);
    });
    Router.push({
      pathname: "/order",
      query: {
        id: order.data.createOrder.id
      }
    });
  };
  render() {
    return (
      <User>
        {({ data: { me }, loading }) => {
          if (loading) return null;
          return (
            <Mutation
              mutation={CREATE_ORDER_MUTATION}
              refetchQueries={[{ query: CURRENT_USER_QUERY }]}
            >
              {createOrder => (
                <StripeCheckout
                  amount={calcTotalPrice(me.cart)}
                  name="Happy Cookies"
                  description={`Order of ${totalItem(me.cart)} item${
                    totalItem(me.cart) === 1 ? "" : "s"
                  }`}
                  image={
                    me.cart.length && me.cart[0].item && me.cart[0].item.image
                  }
                  stripeKey={stripePubKey}
                  currency="USD"
                  email={me.email}
                  token={res => this.onToken(res, createOrder)}
                >
                  {this.props.children}
                </StripeCheckout>
              )}
            </Mutation>
          );
        }}
      </User>
    );
  }
}

export default TakeMyMoney;
export { CREATE_ORDER_MUTATION };
