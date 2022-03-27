import PleaseSignIn from "../components/PleaseSignIn/PleaseSignIn";
import Permissions from "../components/Permissions/Permissions";

const PermissionsPage = props => (
  <div>
    <PleaseSignIn>
      <Permissions />
    </PleaseSignIn>
  </div>
);

export default PermissionsPage;
