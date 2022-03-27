import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";
import { CURRENT_USER_QUERY } from "../User/User";
import { CURRENT_VENDOR_QUERY } from "../Vendor/Vendor";

const SIGNOUT_MUTATION = gql`
  mutation SIGNOUT_MUTATION {
    signOut {
      message
    }
  }
`;

class Signout extends Component {
  signOutAndRouteToHome = async (e, signOut) => {
    signOut().catch(err => alert(err.message));
    Router.push({
      pathname: "/"
    });
  };

  render() {
    return (
      <Mutation
        mutation={SIGNOUT_MUTATION}
        refetchQueries={[
          { query: CURRENT_USER_QUERY },
          { query: CURRENT_VENDOR_QUERY }
        ]}
      >
        {signOut => (
          <button onClick={e => this.signOutAndRouteToHome(e, signOut)}>
            Sign out
          </button>
        )}
      </Mutation>
    );
  }
}

export default Signout;
