import React, { Component } from "react";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";
import PropTypes from "prop-types";
import Form from "../styles/Form";
import UpdateItemStyles from "../styles/UpdateItemStyles";
import formatMoney from "../../lib/formatMoney";
import Error from "../ErrorMessage/ErrorMessage";
import Vendor from "../Vendor/Vendor";
import UpdateItemForm from "./UpdateItemForm";
import ItemPreview from "../Common/ItemPreview";

const UPDATE_SINGLE_ITEM_QUERY = gql`
  query UPDATE_SINGLE_ITEM_QUERY($id: ID!) {
    vendorUpdateItemQuery(id: $id) {
      id
      title
      description
      price
      image
      cbdType
      createdAt
      updatedAt
      tags
    }
  }
`;

const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION(
    $id: ID!
    $title: String
    $description: String
    $price: Int
    $cbdType: Extract
    $tags: [Tag]
  ) {
    updateItem(
      id: $id
      title: $title
      description: $description
      price: $price
      cbdType: $cbdType
      tags: $tags
    ) {
      id
      title
      description
      price
      cbdType
      tags
    }
  }
`;

class UpdateItem extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired
  };

  state = {
    isFirstRender: true,
    tags: []
  };

  setTags = tags => {
    if (this.state.isFirstRender) {
      this.setState({ tags: [...tags], isFirstRender: false });
    }
  };

  // setPreviewState = tags => {
  // if (this.state.isFirstRender) {
  // this.setState({ ...itemData, isFirstRender: false });
  // }
  // };

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === "number" ? parseFloat(value) : value;
    let checkedTags = [...this.state.tags];

    if (type === "checkbox") {
      let isChecked = e.target.checked;

      if (isChecked) {
        // add it in!
        checkedTags.push(value);
      } else {
        checkedTags = checkedTags.filter(tag => tag !== value);
      }
      this.setState({ tags: checkedTags });
    } else {
      this.setState({ [name]: val });
    }
  };

  updateItem = async (e, updateItemMutation) => {
    e.preventDefault();
    console.log(">>> this.state", this.state);
    const res = await updateItemMutation({
      variables: {
        id: this.props.id,
        ...this.state
      }
    });
  };

  render() {
    return (
      <>
        <h2 style={{ textAlign: "center" }}>Edit and Preview</h2>
        <Vendor variables={{ withDetailedInventory: false }}>
          {({ data: { vendor }, loading, error }) => {
            if (vendor.inventory.length === 0) {
              return (
                <div>
                  Oops, {vendor.companyName} has no products. Please add some
                  inventory.
                </div>
              );
            }

            return (
              <Query
                query={UPDATE_SINGLE_ITEM_QUERY}
                variables={{ id: this.props.id }}
                // onCompleted={data =>
                //   this.props.initItemPreview(data.vendorUpdateItemQuery)
                // }
              >
                {({ data, loading, error }) => {
                  const itemData = data.vendorUpdateItemQuery;
                  // const handleChange = this.props.handleChange;

                  if (loading) return <p>Loading...</p>;
                  if (error) return <Error error={error} />;
                  if (!itemData)
                    return <p>No item found for ID {this.props.id}</p>;
                  // return (
                  return (
                    <UpdateItemStyles>
                      <UpdateItemForm
                        id={this.props.id}
                        itemData={itemData}
                        handleChange={this.handleChange}
                        setTags={this.setTags}
                        updateItem={this.updateItem}
                      />
                      <ItemPreview itemData={itemData} itemState={this.state} />
                    </UpdateItemStyles>
                  );
                }}
              </Query>
            );
          }}
        </Vendor>
      </>
    );
  }
}

export default UpdateItem;
export { UPDATE_ITEM_MUTATION, UPDATE_SINGLE_ITEM_QUERY };
