import { useEffect, useState } from "react";
import styled from "styled-components";
import { NavLink, Link } from "react-router-dom";
import items from "../assets/items.json";
import { AiFillGithub } from "react-icons/ai";
const Footer = () => {
  return (
    <FooterContainer>
      <div className="wrapper container">
        <a className="logo" href={"/"}>
          AllStar
        </a>

        <ul className="githubList">
          <div className="titleHub">
            <AiFillGithub />
            &nbsp;Github
          </div>
          <li>
            <a href="https://github.com/MTLFibbs">Philippe Pellerin</a>
          </li>
          <li>
            <a href="https://github.com/durandal1409">Mariia Kladova</a>
          </li>
          <li>
            <a href="https://github.com/Mansurmohamed">Mansuer Mohamed</a>
          </li>
          <li>
            <a href="https://github.com/DavidVida1">David Vidal</a>
          </li>
        </ul>

        <a className="verticalLogo" href={"/"}>
          AllStar
        </a>
      </div>
      <div className="terms">
        Terms Of Service | Privacy Policy | Accessibility Statement | 2023
        AllStar inc.
      </div>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  position: relative;
  bottom: 0;
  width: 100%;
  background-color: var(--color-footer);

  & .wrapper {
    position: relative;
    display: flex;
    gap: 40px;
    background-color: rgba(31, 31, 31);
    color: white;
    padding: 30px 65px;
    box-shadow: rgba(0, 0, 0, 0.45) 0px -25px 20px -20px;

    & .logo {
      font-family: var(--font-heading-title);
      font-style: italic;
      font-weight: bold;
      font-size: 30px;

      &:hover {
        color: rgb(71, 63, 244, 1);
        filter: drop-shadow(0 0 10px var(--color-white));
        text-shadow: 0 0 5px white;
      }
    }

    & .verticalLogo {
      display: flex;
      position: absolute;
      right: 0;
      top: 0;
      font-family: var(--font-heading-title);
      font-style: italic;
      font-weight: bold;

      font-size: 35px;
      letter-spacing: 1.2rem;
      rotate: 180deg;
      writing-mode: vertical-rl;
      &:hover {
        color: rgb(71, 63, 244, 1);
        filter: drop-shadow(0 0 10px var(--color-white));
        text-shadow: 0 0 5px white;
      }
    }
    & .githubList {
      display: flex;
      flex-direction: column;
      list-style-type: none;
      gap: 2px;
      text-align: start;
      text-decoration: none;
      color: white;
      & li a:hover {
        opacity: 0.75;
      }
      & .titleHub {
        display: flex;
        justify-content: center;
        font-size: 20px;
        font-weight: bold;
        padding: 20px 20px;
        color: white;
      }
    }
  }

  & .terms {
    display: flex;
    justify-content: space-around;
    color: white;
    background-color: rgba(31, 31, 31);
  }
`;

export default Footer;
