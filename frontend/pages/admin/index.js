import AdminPleaseSignIn from "../../components/PleaseSignIn/AdminPleaseSignIn";
import Dashboard from "../../components/Vendor/Dashboard";

const AdminPage = props => (
  <AdminPleaseSignIn>
    <Dashboard />
  </AdminPleaseSignIn>
);

export default AdminPage;
