import React, { Component } from "react";
import WorkWithUsStyles from "../styles/WorkWithUsStyles";
import WorkWithUsCards from "./WorkWithUsCards";
import DashboardLoginButton from "../Vendor/DashboardLoginButton";

class WorkWithUs extends Component {
  render() {
    return (
      <WorkWithUsStyles>
        <DashboardLoginButton />
        <WorkWithUsCards />
      </WorkWithUsStyles>
    );
  }
}

export default WorkWithUs;
