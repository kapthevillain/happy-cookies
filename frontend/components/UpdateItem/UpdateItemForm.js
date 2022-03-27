import React, { Component } from "react";
import { Mutation, Query } from "react-apollo";

import TagsCheckbox from "../Common/TagsCheckbox";
import Form from "../styles/Form";
import formatMoney from "../../lib/formatMoney";
import Error from "../ErrorMessage/ErrorMessage";
import PropTypes from "prop-types";
import { UPDATE_ITEM_MUTATION, UPDATE_SINGLE_ITEM_QUERY } from "./UpdateItem";

class UpdateItemForm extends Component {
  render() {
    return (
      <Mutation mutation={UPDATE_ITEM_MUTATION} variables={this.state}>
        {(updateItem, { loading, error }) => (
          <Form
            className="updateForm"
            onSubmit={e => this.props.updateItem(e, updateItem)}
          >
            <h3>Edit item:</h3>
            <Error error={error} />
            <fieldset disabled={loading} aria-busy={loading}>
              <label htmlFor="title">
                Title
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="title"
                  required
                  defaultValue={this.props.itemData.title}
                  onChange={this.props.handleChange}
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
                  defaultValue={this.props.itemData.price}
                  onChange={this.props.handleChange}
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
                  defaultValue={this.props.itemData.description}
                  onChange={this.props.handleChange}
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
                  defaultChecked={
                    this.props.itemData.cbdType[0] === "FULLSPECTRUM"
                  }
                  onChange={this.props.handleChange}
                />
              </label>
              <label id="cbdType" htmlFor="cbdType-bs">
                Broad-Spectrum
                <input
                  type="radio"
                  name="cbdType"
                  id="cbdType-bs"
                  value="BROADSPECTRUM"
                  defaultChecked={
                    this.props.itemData.cbdType[0] === "BROADSPECTRUM"
                  }
                  onChange={this.props.handleChange}
                />
              </label>
              <label id="cbdType" htmlFor="cbdType-iso">
                Isolate
                <input
                  type="radio"
                  name="cbdType"
                  id="cbdType-iso"
                  value="ISOLATE"
                  defaultChecked={this.props.itemData.cbdType[0] === "ISOLATE"}
                  onChange={this.props.handleChange}
                />
              </label>
              <TagsCheckbox
                existingTags={this.props.itemData.tags}
                handleChange={this.props.handleChange}
                setTags={this.props.setTags}
              />
              <button type="submit">Submit</button>
              <button type="cancel" className="CancelEdit">
                Cancel
              </button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}

UpdateItemForm.propTypes = {
  id: PropTypes.string.isRequired,
  itemData: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  setTags: PropTypes.func.isRequired,
  updateItem: PropTypes.func.isRequired
};

export default UpdateItemForm;
