import Items from "../components/Items/Items";

const ItemsPage = props => (
  <div>
    <Items page={parseFloat(props.query.page) || 1} />
  </div>
);

export default ItemsPage;
