import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Form from "../styles/Form";
import Error from "../ErrorMessage/ErrorMessage";
import { CURRENT_VENDOR_QUERY } from "../Vendor/Vendor";

const VENDOR_SIGNUP_MUTATION = gql`
  mutation VENDOR_SIGNUP_MUTATION(
    $companyName: String!
    $zipCode: Int!
    $name: String!
    $email: String!
    $password: String!
  ) {
    vendorSignUp(
      companyName: $companyName
      zipCode: $zipCode
      email: $email
      name: $name
      password: $password
    ) {
      id
      companyName
      email
    }
  }
`;

// companyName: String!, zipCode: Int!, name: String!, email: String!, password: String!

class CreateVendor extends Component {
  state = {
    companyName: "",
    zipCode: "",
    name: "",
    email: "",
    password: ""
  };
  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <Mutation
        mutation={VENDOR_SIGNUP_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_VENDOR_QUERY }]}
      >
        {(vendorSignUp, { error, loading }) => (
          <Form
            method="post"
            onSubmit={async e => {
              e.preventDefault();
              await vendorSignUp();
              this.setState({
                companyName: "",
                zipCode: "",
                name: "",
                email: "",
                password: ""
              });
            }}
          >
            <fieldset disabled={loading} aria-busy={loading}>
              <h2>Let's set up your vendor account!</h2>
              <Error error={error} />
              <label htmlFor="companyName">
                Company Name
                <input
                  type="text"
                  name="companyName"
                  placeholder="Company Name"
                  value={this.state.companyName}
                  onChange={this.saveToState}
                />
              </label>
              <label htmlFor="zipCode">
                Zip Code
                <input
                  type="text"
                  name="zipCode"
                  maxLength="5"
                  placeholder="Zip Code"
                  value={this.state.zipCode}
                  onChange={this.saveToState}
                />
              </label>
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
              <label htmlFor="name">
                Name
                <input
                  type="text"
                  name="name"
                  placeholder="name"
                  value={this.state.name}
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

              <button type="submit">Continue</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default CreateVendor;
export { VENDOR_SIGNUP_MUTATION };
