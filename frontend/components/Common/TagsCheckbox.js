import React from "react";
import PropTypes from "prop-types";
import availableTags from "../../lib/availableTags";

const TagsCheckbox = props => {
  props.setTags(props.existingTags);

  return availableTags.map(tag => (
    <label key={tag} htmlFor={`tag-${tag}`}>
      {tag}
      <input
        id={`tag-${tag}`}
        type="checkbox"
        name={tag}
        value={tag}
        defaultChecked={props.existingTags.includes(tag)}
        onChange={props.handleChange}
      />
    </label>
  ));
};

TagsCheckbox.propTypes = {
  existingTags: PropTypes.array,
  handleChange: PropTypes.func.isRequired,
  setTags: PropTypes.func
};

export default TagsCheckbox;
