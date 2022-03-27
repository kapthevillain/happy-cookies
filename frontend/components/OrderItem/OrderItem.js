import React, { Component } from "react";
import PropTypes from "prop-types";
import formatMoney from "../../lib/formatMoney";

class OrderItem extends Component {
  static propTypes = {
    orderItem: PropTypes.object.isRequired
  };
  render() {
    const item = this.props.orderItem;
    return (
      <div className="order-item" key={item.id}>
        <img src={item.image} alt={item.title} />
        <div className="item-details">
          <h2>{item.title}</h2>
          <p>Qty: {item.quantity}</p>
          <p>Each: {formatMoney(item.price)}</p>
          <p>SubTotal: {formatMoney(item.price * item.quantity)}</p>
          <p>Description: {item.description}</p>
        </div>
      </div>
    );
  }
}

OrderItem.propTypes = {};

export default OrderItem;
