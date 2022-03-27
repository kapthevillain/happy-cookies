import styled from "styled-components";
// const cbdImage = require("../../assets/Home/cbd.jpg");

const LandingBackgroud = styled.div`
  .parallax-1 {
    /* The image used */
    background-image: url("https://res.cloudinary.com/happycookies/image/upload/v1569188298/happycookies/cookie_wz7por.jpg");

    /* Set a specific height */
    min-height: 500px;
    width: 100%;

    /* Create the parallax scrolling effect */
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    @media (max-width: 700px) {
      background-image: url("https://res.cloudinary.com/happycookies/image/upload/f_auto,q_auto,w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1569188298/happycookies/cookie_wz7por.jpg");
    }
  }
  .parallax-2 {
    /* The image used */
    background-image: url("https://res.cloudinary.com/happycookies/image/upload/v1569188298/happycookies/cookie_wz7por.jpg");

    /* Set a specific height */
    min-height: 500px;
    width: 100%;

    /* Create the parallax scrolling effect */
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    @media (max-width: 700px) {
      background-image: url("https://res.cloudinary.com/happycookies/image/upload/f_auto,q_auto,w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1569188298/happycookies/cookie_wz7por.jpg");
    }
  }
  .intro {
    height: 800px;
    background-color: white;
    font-size: 36px;
  }
`;

export default LandingBackgroud;
