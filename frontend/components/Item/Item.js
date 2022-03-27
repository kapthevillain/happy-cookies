import React, { Component } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import Title from "../styles/Title";
import ItemStyles from "../styles/ItemStyles";
import PriceTag from "../styles/PriceTag";
import formatMoney from "../../lib/formatMoney";
import AddToCart from "../AddToCart/AddToCart";
import DeleteItem from "../DeleteItem/DeleteItem";

class item extends Component {
  render() {
    const { item } = this.props;

    return (
      <ItemStyles>
        {item.image && <img src={item.image} alt={item.title} />}
        <Title>
          <Link
            href={{
              pathname: "/item",
              query: { id: item.id }
            }}
          >
            <a>{item.title}</a>
          </Link>
        </Title>
        <PriceTag>{formatMoney(item.price)}</PriceTag>
        <p>{item.description}</p>
        <div className="buttonList">
          <Link
            href={{
              pathname: "/update",
              query: { id: item.id }
            }}
          >
            <a>Edit ✏️</a>
          </Link>
          {/* TODO: add optimisticResponse to AddToCart */}
          <AddToCart id={item.id} />
          {/* TODO: Refetch userCart when item is removed */}
          <DeleteItem id={item.id}>Delete this item</DeleteItem>
        </div>
      </ItemStyles>
    );
  }
}

item.propTypes = {
  item: PropTypes.object.isRequired
};

export default item;
