import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";
import Form from "../styles/Form";
import Error from "../ErrorMessage/ErrorMessage";
import availableTags from "../../lib/availableTags";

const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String
    $cbdType: Extract
    $tags: [Tag]
  ) {
    createItem(
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
      cbdType: $cbdType
      tags: $tags
    ) {
      id
    }
  }
`;

class CreateItem extends Component {
  state = {
    title: "",
    description: "",
    image: "",
    largeImage: "",
    price: 0,
    cbdType: "",
    tags: []
  };

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === "number" ? parseFloat(value) : value;
    if (type === "checkbox") {
      let checkbox = e.target.checked;
      let checkedTags = [...this.state.tags];
      if (checkbox) {
        // add it in!
        checkedTags.push(value);
      } else {
        checkedTags = checkedTags.filter(tag => tag !== value);
      }
      this.setState({ tags: checkedTags });
    } else {
      this.setState({ [name]: val });
    }
  };

  uploadFile = async e => {
    // TODO: wait until image finishes uploading before use is able to submit
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "happycookies");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/happycookies/image/upload",
      {
        method: "POST",
        body: data
      }
    );
    const file = await res.json();
    this.setState({
      image: file.secure_url,
      largeImage: file.eager[0].secure_url
    });
  };

  render() {
    // TODO: add refetchQueries to mutation for cache invalidation
    return (
      <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
        {(createItem, { loading, error, called, data }) => (
          <Form
            data-test="form"
            onSubmit={async e => {
              // stop form from submitting
              e.preventDefault();
              // call the mutation
              const res = await createItem();
              // change them to single item page
              Router.push({
                pathname: "/item",
                query: { id: res.data.createItem.id }
              });
            }}
          >
            <Error error={error} />
            <fieldset disabled={loading} aria-busy={loading}>
              <label htmlFor="file">
                Image
                <input
                  type="file"
                  id="file"
                  name="file"
                  placeholder="Upload an image"
                  required
                  onChange={this.uploadFile}
                />
                {this.state.image && (
                  <img
                    width="200"
                    src={this.state.image}
                    alt="Upload Preview"
                  />
                )}
              </label>
              <label htmlFor="title">
                Title
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="title"
                  required
                  value={this.state.title}
                  onChange={this.handleChange}
                />
              </label>
              <label htmlFor="price">
                Price
                <input
                  type="number"
                  id="price"
                  name="price"
                  placeholder="price"
                  required
                  value={this.state.price}
                  onChange={this.handleChange}
                />
              </label>
              <label htmlFor="description">
                Description
                <textarea
                  type="text"
                  id="description"
                  name="description"
                  placeholder="Enter a description"
                  required
                  value={this.state.description}
                  onChange={this.handleChange}
                />
              </label>
              <p>CBD Type?</p>
              <label id="cbdType" htmlFor="cbdType-fs">
                Full-Spectrum
                <input
                  type="radio"
                  name="cbdType"
                  id="cbdType-fs"
                  value="FULLSPECTRUM"
                  onChange={this.handleChange}
                />
              </label>
              <label id="cbdType" htmlFor="cbdType-bs">
                Broad-Spectrum
                <input
                  type="radio"
                  name="cbdType"
                  id="cbdType-bs"
                  value="BROADSPECTRUM"
                  onChange={this.handleChange}
                />
              </label>
              <label id="cbdType" htmlFor="cbdType-iso">
                Isolate
                <input
                  type="radio"
                  name="cbdType"
                  id="cbdType-iso"
                  value="ISOLATE"
                  onChange={this.handleChange}
                />
              </label>
              {availableTags.map(tag => (
                <label key={tag} htmlFor={`tag-${tag}`}>
                  {tag}
                  <input
                    id={`tag-${tag}`}
                    type="checkbox"
                    name={tag}
                    value={tag}
                    onChange={this.handleChange}
                  />
                </label>
              ))}
              <button type="submit">Submit</button>
            </fieldset>
            <h2>Sell an item.</h2>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default CreateItem;
export { CREATE_ITEM_MUTATION };
