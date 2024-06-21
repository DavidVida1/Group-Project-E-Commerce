import { useEffect, useState } from "react";
import styled from "styled-components";
import { NavLink, Link } from "react-router-dom";
import items from "../assets/items.json";
import { AiFillGithub } from "react-icons/ai";
const Footer = () => {
  return (
    <FooterContainer>
      <div className="wrapper container">
        <aside className="logoAndMedia">
          <a className="logo" href={"/"}>
            AllStar
          </a>

          <div className="media">
            <AiFillGithub />
            <AiFillGithub />
            <AiFillGithub />
            <AiFillGithub />
            <AiFillGithub />
          </div>
        </aside>

        <aside className="footerNav">
          <ul className="footerNavList">
            <div className="headerList">
              <AiFillGithub />
              &nbsp;Github
            </div>
            <li>
              <a href="https://github.com/DavidVida1">David Vidal</a>
            </li>
            <li>
              <a href="https://github.com/MTLFibbs">Philippe Pellerin</a>
            </li>
            <li>
              <a href="https://github.com/durandal1409">Mariia Kladova</a>
            </li>
            <li>
              <a href="https://github.com/Mansurmohamed">Mansuer Mohamed</a>
            </li>
          </ul>

          <ul className="footerNavList">
            <div className="headerList">Company</div>
            <li>
              <a>Categories</a>
            </li>
            <li>
              <a>About Us</a>
            </li>
            <li>
              <a>Team</a>
            </li>
            <li>
              <a>Work Here</a>
            </li>
          </ul>

          <ul className="footerNavList">
            <div className="headerList">Customer Support</div>
            <li>
              <a>Customer Service</a>
            </li>
            <li>
              <a>Need a Repair</a>
            </li>
            <li>
              <a>Repair Order Status</a>
            </li>
            <li>
              <a>FAQs</a>
            </li>
            <li>
              <a>Warranty</a>
            </li>
            <li>
              <a>Watch Size Guide</a>
            </li>
            <li>
              <a>Contact Us</a>
            </li>
          </ul>

          <ul className="footerNavList">
            <div className="headerList">Order & Returns</div>
            <li>
              <a>Shipping</a>
            </li>
            <li>
              <a>Returns</a>
            </li>
            <li>
              <a>Track Your Order</a>
            </li>
            <li>
              <a>promotions</a>
            </li>
          </ul>
        </aside>
      </div>

      <div className="terms">
        Terms Of Service | Privacy Policy | Accessibility Statement | 2023
        AllStar inc.
      </div>
      <a className="verticalLogo" href={"/"}>
        AllStar
      </a>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  position: relative;
  bottom: 0;
  width: 100%;
  height: 70dvh;
  background-color: var(--footer-bg);

  & .wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    height: fit-content;
    width: 100%;
    gap: 40px;
    color: var(--color-white);
    padding-top: 50px;
    box-shadow: rgba(0, 0, 0, 0.45) 0px -25px 20px -20px;

    & .logoAndMedia {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      & .logo {
        font-family: var(--font-heading-title);
        font-style: italic;
        font-weight: bold;
        font-size: 4rem;
        letter-spacing: 5px;

        &:hover {
          color: rgb(71, 63, 244, 1);
          filter: drop-shadow(0 0 10px var(--color-black));
          text-shadow: 0 0 5px black;
        }
      }
      & .media {
        display: flex;
        gap: 25px;
        font-size: 3rem;
      }
    }

    & .footerNav {
      display: flex;
      flex-direction: row;
      gap: 20%;

      & .footerNavList {
        display: flex;
        flex-direction: column;
        list-style-type: none;
        gap: 25px;

        & .headerList {
          font-family: var(--font-heading-title);
          letter-spacing: 5px;
          font-size: 2rem;
          margin: 20px 0px;
          color: white;
        }

        & li a {
          font-size: 1.8rem;
          & :hover {
            color: var(--color-purple);
          }
        }
      }
    }
  }

  & .terms {
    position: absolute;
    display: flex;
    flex-direction: column;
    text-align: center;
    font-size: 1.5rem;
    width: 100%;
    height: 40px;
    bottom: 0;

    color: var(--color-white);

    &:before {
      content: "";
      height: 10px;
      align-self: center;
      width: 90%;
      border-top: 1px solid var(--color-purple);
      padding-bottom: 5px;
    }
  }
  & .verticalLogo {
    display: flex;
    position: absolute;
    right: 0;
    bottom: 20px;
    font-family: var(--font-heading-title);
    font-style: italic;
    font-weight: bold;
    color: var(--color-white);

    font-size: 4rem;
    letter-spacing: 1.2rem;
    rotate: 180deg;
    writing-mode: vertical-rl;
    &:hover {
      color: var(--color-purple);
      filter: drop-shadow(0 0 10px var(--color-black));
      text-shadow: 0 0 5px black;
    }
  }
`;

export default Footer;
