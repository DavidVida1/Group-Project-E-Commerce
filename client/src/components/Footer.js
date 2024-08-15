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
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (emailPattern.test(email)) {
      setIsSubmitted(true);
    } else {
      alert("Please enter a valid email address.");
    }
  };

  return (
    <FooterContainer>
      <FooterTop>
        <div className="wrapper container">
          <h2>
            Join our family become an <span className="logo">Allstar</span>
          </h2>
          <p>
            Sign up to discover new collections and stay updated with the latest
            news from the brand.
          </p>
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="input-container">
              <input
                type="email"
                value={email}
                onChange={handleChange}
                placeholder="Enter your email address"
                required
              />
              <button type="submit" className="button">
                Send
              </button>
            </form>
          ) : (
            <p className="messageContainer">Email sent, thank you.</p>
          )}
        </div>
      </FooterTop>

      <div className="footerBottom ">
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
              <h4 className="headerList">
                <AiFillGithub />
                &nbsp;Github
              </h4>
              <li>
                <a href="https://github.com/DavidVida1">
                  David Vidal - Frontend
                </a>
              </li>
              <li>
                <a href="https://github.com/MTLFibbs">
                  Philippe Pellerin - Backend
                </a>
              </li>
              <li>
                <a href="https://github.com/durandal1409">
                  Mariia Kladova - Frontend
                </a>
              </li>
              <li>
                <a href="https://github.com/Mansurmohamed">
                  Mansuer Mohamed - Backend
                </a>
              </li>
            </ul>

            <ul className="footerNavList">
              <h4 className="headerList">Company</h4>
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
              <h4 className="headerList">Customer Support</h4>
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
              <h4 className="headerList">Order & Returns</h4>
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
      </div>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  position: relative;
  display: grid;
  grid-template-rows: 30dvh 70dvh;
  grid-template-columns: 1fr;
  bottom: 0;

  & .footerBottom {
    width: 100%;
    height: 100%;
    padding-top: 20px;
    box-shadow: var(--bg-footer-sdw);
    background-color: var(--bg-black);

    & .wrapper {
      position: relative;
      display: flex;
      flex-direction: column;
      height: fit-content;
      width: 100%;
      height: 100%;
      gap: 40px;
      color: var(--font-white);

      & .logoAndMedia {
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        & .media {
          display: flex;
          gap: var(--gap-25);
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
        height: 75%;

        & .footerNavList {
          display: flex;
          gap: 10%;
          flex-direction: column;
          height: 75%;
          width: 100%;

          & .headerList {
            margin: 20px 0px;
          }

          & li a {
            font-size: var(--font-size-18);
            font-weight: var(--font-weight-500);

            &:hover {
              color: var(--bg-grey);
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
      height: 30px;
      bottom: 0;
      color: var(--font-white);

      &:before {
        content: "";
        height: 10px;
        align-self: center;
        width: 90%;
        border-top: 1px solid var(--bg-grey);
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
  }
`;

const FooterTop = styled.div`
  /* box-shadow: var(--bg-footer-sdw);*/
  background-color: var(--bg-grey);
  width: 100%;
  height: 100%;

  & .wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    color: var(--font-white);
    gap: var(--gap-10);

    & h2  {
      padding: 0px;
    }

    & .logo {
      &:hover {
        color: var(--font-white);
        filter: none;
        text-shadow: none;
      }
    }

    & p {
      font-size: clamp(2rem, 4.2vw, 2.5rem);
    }

    .input-container {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      gap: var(--gap-15);
      width: 100%;
      height: 100%;

      & input {
        height: 50px;
        width: 30%;
        border-radius: var(--radius-button);
        border: none;
        padding: 5px 15px;
        &::placeholder {
          text-transform: uppercase;
          font-weight: 700;
        }
        box-shadow: 0 0 10px var(--font-sdw);
      }
      & .button {
        padding: 17px 50px;
        color: var(--font-white);
      }
    }
    .messageContainer {
      font-size: 2rem;
      color: green;
    }
  }
`;

export default Footer;
