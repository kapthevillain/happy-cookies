import React, { Component } from "react";
import CardStyles from "../styles/CardStyles";

class WorkWithUsCards extends Component {
  render() {
    return (
      <CardStyles>
        <div>
          <img
            src="/static/WorkWithUs/GetDiscovered-card.png"
            alt="Get Discovered by new customers"
          />
        </div>
        <div>
          <img
            src="/static/WorkWithUs/FocusOnProduct-card.png"
            alt="Focus on your product and not SEO or marketing"
          />
        </div>
        <div>
          <img
            src="/static/WorkWithUs/GrowYourBusiness-card.png"
            alt="Grow your business with online customers"
          />
        </div>
      </CardStyles>
    );
  }
}

export default WorkWithUsCards;
