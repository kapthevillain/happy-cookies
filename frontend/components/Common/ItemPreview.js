import React, { Component } from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import styled from "styled-components";
import formatMoney from "../../lib/formatMoney";

import {
  ItemPreviewStyles,
  ItemPreviewContainerStyles
} from "../styles/ItemPreviewStyles";

const InventoryItemTitle = styled.h3`
  margin: 0 1rem;
  text-align: center;
  /* transform: skew(-5deg) rotate(-1deg); */
  margin-top: -1rem;
  text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
  a {
    background: ${props => props.theme.green};
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

class ItemPreview extends Component {
  render() {
    const itemState = this.props.itemState;
    const itemData = this.props.itemData;
    return (
      <ItemPreviewContainerStyles>
        {console.log(">>> itemState", this.props.itemState)}
        {console.log(">>> itemState", this.props.itemData)}
        <ItemPreviewStyles>
          {itemData.image && <img src={itemData.image} alt={itemData.title} />}
          <InventoryItemTitle>
            <a>{!itemState.title ? itemData.title : itemState.title}</a>
          </InventoryItemTitle>
          <InventoryItemPriceTag>
            {formatMoney(!itemState.price ? itemData.price : itemState.price)}
          </InventoryItemPriceTag>
          <p>
            {!itemState.description
              ? itemData.description
              : itemState.description}
          </p>
          <ul>
            <li>{!itemState.cbdType ? itemData.cbdType : itemState.cbdType}</li>
          </ul>
          {!itemState.tags.length === 0 ? (
            <TagsComponent tags={itemData.tags} />
          ) : (
            <TagsComponent tags={itemState.tags} />
          )}
        </ItemPreviewStyles>
      </ItemPreviewContainerStyles>
    );
  }
}

const TagsComponent = props => {
  return props.tags.map(tag => <span key={tag}>{tag}</span>);
};

TagsComponent.propTypes = {
  tags: PropTypes.object
};

ItemPreview.propTypes = {
  itemData: PropTypes.object.isRequired,
  itemState: PropTypes.object
};

export default ItemPreview;
