import { Query } from "react-apollo";
import { CURRENT_VENDOR_QUERY } from "../Vendor/Vendor";
import DashboardLogin from "../Vendor/DashboardLogin";

const AdminPleaseSignIn = props => (
  <Query query={CURRENT_VENDOR_QUERY}>
    {({ data, loading }) => {
      if (loading) return <p>Loading...</p>;
      if (!data.vendor) {
        return (
          <div>
            <p>Please sign in to Admin Dashboard to continue</p>
            <DashboardLogin />
          </div>
        );
      }

      return props.children;
    }}
  </Query>
);

export default AdminPleaseSignIn;
