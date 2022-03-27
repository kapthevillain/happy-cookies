import React, { Component } from "react";
import { Query } from "react-apollo";
import { formatDistance } from "date-fns";
import Link from "next/link";
import { adopt } from "react-adopt";
import styled from "styled-components";
import gql from "graphql-tag";
import formatMoney from "../../lib/formatMoney";
import Error from "../ErrorMessage/ErrorMessage";
import Vendor from "./Vendor";
import VendorInventoryItem from "./VendorInventoryItem";
import { InventoryItemsList } from "../styles/InventoryItemStyles";

const Center = styled.div`
  text-align: center;
`;

const AddNewInventoryItemStyles = styled.div`
  background-color: #4bb543;
  box-shadow: 0 12px 24px 0 rgba(0, 0, 0, 0.2);
  * {
    color: #fff;
  }
  p {
    font-size: 2.5rem;
    margin-bottom: -10px;
  }
  .bigPlus {
    display: inline;
    font-size: 10rem;
  }
`;

// const VENDOR_INVENTORY_QUERY = gql`
//   query VENDOR_INVENTORY_QUERY($ids: [ID!]!) {
//     vendorInventory(ids: $ids) {
//       id
//       title
//       price
//       description
//       image
//       vendor {
//         companyName
//       }
//     }
//   }
// `;

const AddNewInventoryItemCard = props => (
  <AddNewInventoryItemStyles>
    <p>Add a new item</p>
    <span className="bigPlus">
      <Link
        href={{
          pathname: "/admin/sell"
        }}
      >
        <a>&#43;</a>
      </Link>
    </span>
  </AddNewInventoryItemStyles>
);

class VendorProducts extends Component {
  render() {
    return (
      <Vendor variables={{ withDetailedInventory: true }}>
        {({ data, loading, error }) => {
          const vendor = data.vendor;
          if (loading) return <p>loading...</p>;
          if (error) return <Error error={error} />;
          if (!vendor) return <Error error={error} />;
          if (!vendor.inventory || vendor.inventory.length === 0)
            return (
              <Center>
                <p>You have no inventory. Please add some products.</p>
                <InventoryItemsList>
                  <AddNewInventoryItemCard />
                </InventoryItemsList>
              </Center>
            );

          return (
            <>
              <p>Hello, {vendor.companyName}</p>

              <Center>
                <InventoryItemsList>
                  <AddNewInventoryItemCard />
                  {vendor.inventory.map(item => (
                    <VendorInventoryItem item={item} key={item.id} />
                  ))}
                </InventoryItemsList>
              </Center>
            </>
          );
        }}
      </Vendor>
    );
  }
}

export default VendorProducts;
