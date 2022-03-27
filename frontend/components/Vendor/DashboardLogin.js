import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Form from "../styles/Form";
import Error from "../ErrorMessage/ErrorMessage";
import { CURRENT_VENDOR_QUERY } from "../Vendor/Vendor";

const VENDOR_SIGNIN_MUTATION = gql`
  mutation VENDOR_SIGNIN_MUTATION($email: String!, $password: String!) {
    vendorSignIn(email: $email, password: $password) {
      id
      companyName
      email
    }
  }
`;

class DashboardLogin extends Component {
  state = {
    password: "",
    email: ""
  };

  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <Mutation
        mutation={VENDOR_SIGNIN_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_VENDOR_QUERY }]}
      >
        {(vendorSignIn, { error, loading }) => {
          return (
            <Form
              method="post"
              onSubmit={async e => {
                e.preventDefault();
                const res = await vendorSignIn();
                console.log(res);

                this.setState({ email: "", password: "" });
              }}
            >
              <fieldset disabled={loading} aria-busy={loading}>
                <h2>Sign into your Vendor account</h2>
                <Error error={error} />
                <label htmlFor="email">
                  Email
                  <input
                    type="email"
                    name="email"
                    placeholder="email"
                    value={this.state.email}
                    onChange={this.saveToState}
                  />
                </label>
                <label htmlFor="password">
                  Password
                  <input
                    type="password"
                    name="password"
                    placeholder="password"
                    value={this.state.password}
                    onChange={this.saveToState}
                  />
                </label>
                <button type="submit">Sign In</button>
              </fieldset>
            </Form>
          );
        }}
      </Mutation>
    );
  }
}

export default DashboardLogin;
