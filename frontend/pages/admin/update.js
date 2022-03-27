import UpdateItem from "../../components/UpdateItem/UpdateItem";
import AdminPleaseSignIn from "../../components/PleaseSignIn/AdminPleaseSignIn";

const Sell = props => (
  <AdminPleaseSignIn>
    <UpdateItem id={props.query.id} />
  </AdminPleaseSignIn>
);

export default Sell;
