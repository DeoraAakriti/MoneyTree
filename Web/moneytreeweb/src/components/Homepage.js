import React, { useState } from "react";
import NavigationBar from "./NavigationBar";
import { Carousel, Card, Row, Button, Col } from "react-bootstrap";
import "../styles/Styles.scss";
import carousel1 from "../images/Carouselimg1.png";
import carousel2 from "../images/Carouselimg2.png";
import carousel3 from "../images/Carouselimg3.png";
import Login from "./Login";
import Signup from "./Signup";

const Homepage = () => {
  const [buttonClick, setButtonClick] = useState("Login");
  // const [buttonText, setButtonText] = useState("Sign Up");

  const handleSignup = () => {
    // setButtonText("Login instead");
    setButtonClick("Sign Up");
  };

  return (
    <div>
      <Row >
      <Col>
      <Carousel
      prevLabel
      nextLabel
        fade
        style={{
          marginTop: "10rem",
          width: "95%",
          marginLeft: "2rem",
          marginRight: "2rem",
        }}
      >
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={carousel1}
            alt="First slide"
            height={500}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={carousel2}
            alt="Second slide"
            height={500}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={carousel3}
            alt="Third slide"
            height={500}
          />
        </Carousel.Item>
      </Carousel>
      </Col>
      </Row>
    </div>
  );
};

export default Homepage;
