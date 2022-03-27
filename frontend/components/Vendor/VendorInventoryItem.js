import React, { Component } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import styled from "styled-components";
import { InventoryItemStyles } from "../styles/InventoryItemStyles";
import PriceTag from "../styles/PriceTag";
import formatMoney from "../../lib/formatMoney";
import AddToCart from "../AddToCart/AddToCart";
import DeleteItem from "../DeleteItem/DeleteItem";

const InventoryItemTitle = styled.h3`
  margin: 0 1rem;
  text-align: center;
  transform: skew(-5deg) rotate(-1deg);
  margin-top: -3rem;
  text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
  a {
    background: ${props => props.theme.red};
    display: inline;
    line-height: 1.3;
    font-size: 2.5rem;
    text-align: center;
    color: white;
    padding: 0 1rem;
  }
`;

const InventoryItemPriceTag = styled.span`
  background: ${props => props.theme.red};
  transform: rotate(3deg);
  color: white;
  font-weight: 600;
  padding: 5px;
  line-height: 1;
  font-size: 2rem;
  display: inline-block;
  position: absolute;
  top: -3px;
  right: 3px;
`;

class VendorInventoryItem extends Component {
  render() {
    const { item } = this.props;

    return (
      <InventoryItemStyles>
        {item.image && <img src={item.image} alt={item.title} />}
        <InventoryItemTitle>
          <Link
            href={{
              pathname: "/item",
              query: { id: item.id }
            }}
          >
            <a>{item.title}</a>
          </Link>
        </InventoryItemTitle>
        <InventoryItemPriceTag>{formatMoney(item.price)}</InventoryItemPriceTag>
        <p>{item.description}</p>
        <div className="buttonList">
          <Link
            href={{
              pathname: "/admin/update",
              query: { id: item.id }
            }}
          >
            <a>Edit ✏️</a>
          </Link>
          {/* TODO: add optimisticResponse to AddToCart */}
          {/* TODO: Refetch userCart when item is removed */}
          <DeleteItem id={item.id}>Delete this item</DeleteItem>
        </div>
      </InventoryItemStyles>
    );
  }
}

VendorInventoryItem.propTypes = {
  item: PropTypes.object.isRequired
};

export default VendorInventoryItem;
