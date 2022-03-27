import AdminPleaseSignIn from "../../components/PleaseSignIn/AdminPleaseSignIn";
import Dashboard from "../../components/Vendor/Dashboard";
import VendorProducts from "../../components/Vendor/VendorProducts";

const AdminPage = props => (
  <AdminPleaseSignIn>
    <VendorProducts />
  </AdminPleaseSignIn>
);

export default AdminPage;
