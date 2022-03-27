import Link from "next/link";
import { NavStyles } from "../styles/NavStyles";
import Signout from "../Signout/Signout";
import CartCount from "../CartCount/CartCount";
import { Mutation } from "react-apollo";
import { TOGGLE_CART_MUTATION } from "../Cart/Cart";
import { TOGGLE_MININAV_MUTATION } from "../Nav/MiniNav";
import Vendor from "./Vendor";
import { VendorNavStyles } from "../styles/NavStyles";

const VendorNav = () => (
  <VendorNavStyles data-test="nav">
    <Mutation mutation={TOGGLE_MININAV_MUTATION}>
      {toggleMiniNav => (
        <button className="miniNav" onClick={toggleMiniNav}>
          Menu
        </button>
      )}
    </Mutation>
    <Link href="/admin">
      <a>Dashboard</a>
    </Link>
    <Link href="/admin/sell">
      <a>List a Product</a>
    </Link>
    <Link href="/admin/products">
      <a>My Products</a>
    </Link>
    {/* <Link href="/admin/products/add">
      <a></a>
    </Link> */}
    {/* <Link href="/me">
      <a>Account</a>
    </Link> */}
    <Signout />
  </VendorNavStyles>
);

export default VendorNav;
