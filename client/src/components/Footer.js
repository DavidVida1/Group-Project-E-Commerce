import { useEffect, useState } from "react";
import styled from "styled-components";
import { NavLink, Link } from "react-router-dom";
import items from "../assets/items.json";
import { AiFillGithub } from "react-icons/ai";
import { FaPinterest } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { SiYoutubeshorts } from "react-icons/si";
import { FaInstagram } from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <FooterContainer>
      <div className="wrapper container">
        <aside className="logoAndMedia">
          <a className="logo" href={"/"}>
            AllStar
          </a>

          <div className="media">
            <FaInstagram />

            <FaPinterest />
            <FaFacebookF />
            <SiYoutubeshorts />
            <FaXTwitter />
            <AiFillGithub />
          </div>
        </aside>

        <aside className="footerNav">
          <ul className="footerNavList">
            <h3 className="headerList">
              <AiFillGithub />
              &nbsp;Github
            </h3>
            <li>
              <a href="https://github.com/DavidVida1">David Vidal -Frontend</a>
            </li>
            <li>
              <a href="https://github.com/MTLFibbs">
                Philippe Pellerin -Backend
              </a>
            </li>
            <li>
              <a href="https://github.com/durandal1409">
                Mariia Kladova -Frontend
              </a>
            </li>
            <li>
              <a href="https://github.com/Mansurmohamed">
                Mansuer Mohamed -Backend
              </a>
            </li>
          </ul>

          <ul className="footerNavList">
            <h3 className="headerList">Company</h3>
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
            <h3 className="headerList">Customer Support</h3>
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
            <h3 className="headerList">Order & Returns</h3>
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
  height: 100%;
  background-color: var(--bg-black);

  & .wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    height: fit-content;
    width: 90%;
    height: 80dvh;
    gap: 50px;
    color: var(--font-white);
    padding-top: 100px;
    box-shadow: var(--bg-footer-sdw);

    & .logoAndMedia {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      & .logo {
        font-family: var(--font-heading-title);
        font-style: italic;
        font-weight: bold;
        font-size: var(--font-size-logo);
        letter-spacing: 5px;

        &:hover {
          color: var(--font-purple);
          filter: drop-shadow(0 0 10px var(--black));
          text-shadow: 0 0 5px var(--black);
        }
      }
      & .media {
        display: flex;
        gap: 25px;
        font-size: var(--font-size-25);

        & :hover {
          color: var(--font-purple);
          filter: drop-shadow(0 0 10px var(--black));
          text-shadow: 0 0 5px var(--black);
          cursor: pointer;
        }
      }
    }

    & .footerNav {
      display: flex;
      flex-direction: row;
      height: 80%;

      & .footerNavList {
        display: grid;
        flex-direction: column;
        height: 75%;
        width: 100%;

        & .headerList {
          margin: 20px 0px;
        }

        & li a {
          font-size: var(--font-size-18);

          &:hover {
            color: var(--font-purple);
            filter: drop-shadow(0 0 10px var(--black));
            text-shadow: 0 0 5px var(--black);
            cursor: pointer;
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
    font-size: var(--font-size-15);
    width: 100%;
    height: 40px;
    bottom: 0;

    color: var(--font-white);

    &:before {
      content: "";
      height: 10px;
      align-self: center;
      width: 90%;
      border-top: 1px solid var(--purple);
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
    color: var(--font-white);

    font-size: var(--font-size-logo);
    letter-spacing: 2.5rem;
    rotate: 180deg;
    writing-mode: vertical-rl;
    &:hover {
      color: var(--font-purple);
      filter: drop-shadow(0 0 10px var(--black));
      text-shadow: 0 0 5px var(--font-sdw);
    }
  }
`;

export default Footer;
