import CreateItem from "../../components/CreateItem/CreateItem";
import AdminPleaseSignIn from "../../components/PleaseSignIn/AdminPleaseSignIn";

const Sell = props => (
  <div>
    <AdminPleaseSignIn>
      <h1>Create an item</h1>
      <CreateItem />
    </AdminPleaseSignIn>
  </div>
);

export default Sell;
