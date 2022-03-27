import PleaseSignIn from "../components/PleaseSignIn/PleaseSignIn";
import Order from "../components/Order/Order";

const OrderPage = props => (
  <div>
    <PleaseSignIn>
      <Order id={props.query.id} />
    </PleaseSignIn>
  </div>
);

export default OrderPage;
