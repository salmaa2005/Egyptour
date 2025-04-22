import React from "react";
import heroImage from "../assets/21.jpg"; // Make sure this path is correct
import "./Hero.css";

function Hero(props) {
  return (
    <div className={props.cName}>
      <img alt="background" className="hero-bg" src={props.heroImg} />
      <div className="hero-content">
        <h1>{props.title}</h1>
        <p>{props.text}</p>
        <a href={props.url} className={props.btnClass}>
          {props.buttonText}
        </a>
      </div>
    </div>
  );
}

export default Hero;
