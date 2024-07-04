import { NavLink, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import styled from "styled-components";

import montreal from "../assets/montreal.jpg";
import shipping from "../assets/shipping.jpg";

const FindUs = () => {
  return (
    <FindUsContainer>
      <div className="image-wrapper ">
        <img src={montreal} alt="Image 1" />
        <div className="centered-text">
          <h2>Find a Store</h2>
          <a href="" className="button">
            Our Store
          </a>
        </div>
      </div>
      <div className="image-wrapper">
        <img src={shipping} alt="Image 2" />
        <div className="centered-text">
          <h2>Customer Service</h2>
          <a href="" className="button">
            information{" "}
          </a>
        </div>
      </div>
    </FindUsContainer>
  );
};

const FindUsContainer = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 450px;
  height: 100%;

  & .image-wrapper {
    width: 100%;
    height: 100%;
    position: relative;

    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: grayscale(0);
      transition: filter 0.3s ease;
    }

    & .centered-text {
      position: absolute;
      display: flex;
      flex-direction: column;
      align-items: center;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-transform: uppercase;
      color: var(--font-white);

      & .button {
        display: flex;
        justify-content: center;
      }
    }
  }
`;
export default FindUs;
