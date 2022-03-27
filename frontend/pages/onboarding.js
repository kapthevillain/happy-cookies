// import Reset from "../components/Reset/Reset";
import CreateVendor from "../components/Vendor/CreateVendor";

const OnboardingPage = props => (
  <div>
    <CreateVendor resetToken={props.query.resetToken} />
  </div>
);

export default OnboardingPage;
