import PleaseSignIn from "../components/PleaseSignIn/PleaseSignIn";
import OrderList from "../components/OrderList/OrderList";

const OrdersPage = props => (
  <div>
    <PleaseSignIn>
      <OrderList />
    </PleaseSignIn>
  </div>
);

export default OrdersPage;
