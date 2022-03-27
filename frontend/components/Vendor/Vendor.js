import { Query } from "react-apollo";
import gql from "graphql-tag";
import PropTypes from "prop-types";

const CURRENT_VENDOR_QUERY = gql`
  query CURRENT_VENDOR_QUERY($withDetailedInventory: Boolean = false) {
    vendor(withDetailedInventory: $withDetailedInventory) {
      id
      companyName
      email
      permissions
      inventory {
        id
        title @include(if: $withDetailedInventory)
        description @include(if: $withDetailedInventory)
        price @include(if: $withDetailedInventory)
        image @include(if: $withDetailedInventory)
      }
    }
  }
`;

const Vendor = props => (
  <Query {...props} query={CURRENT_VENDOR_QUERY}>
    {payload => props.children(payload)}
  </Query>
);

Vendor.propTypes = {
  children: PropTypes.func.isRequired
};

export default Vendor;
export { CURRENT_VENDOR_QUERY };
