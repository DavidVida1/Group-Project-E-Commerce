import { useEffect, useState } from "react";
import styled from "styled-components";
import { NavLink, Link } from "react-router-dom";
import items from "../assets/items.json";
import { AiFillGithub } from "react-icons/ai";
const Footer = () => {
  return (
    <Wrapper>
      <BlackBanner>
        <AnchorTitle href="/">AllStar</AnchorTitle>
        <UList>
          <Git>
            <AiFillGithub />
            &nbsp;Github
          </Git>
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
        </UList>
        <DivVerticalTitle>
          <VerticalTitle>AllStar</VerticalTitle>
        </DivVerticalTitle>
      </BlackBanner>
      <Terms>
        Terms Of Service | Privacy Policy | Accessibility Statement | 2023
        AllStar inc.
      </Terms>
    </Wrapper>
  );
};
const Wrapper = styled.footer`
  position: relative;
  bottom: 0;
  width: 100%;
`;

const BlackBanner = styled.div`
  position: relative;
  display: flex;
  gap: 40px;
  background-color: rgba(31, 31, 31);
  color: white;
  padding: 30px;
  box-shadow: rgba(0, 0, 0, 0.45) 0px -25px 20px -20px;
`;
const AnchorTitle = styled.a`
  text-decoration: none;
  font-size: 35px;
  font-family: var(--Font-heading-title);
  font-style: italic;
  color: white;
  letter-spacing: 0.5rem;
  :hover {
    color: gray;
  }
`;

const UList = styled.div`
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
`;

const DivVerticalTitle = styled.div`
  display: flex;
  position: absolute;
  right: 0;
  top: 0;
`;
const VerticalTitle = styled.div`
  font-size: 35px;
  font-family: var(--Font-heading-title);
  letter-spacing: 1.2rem;
  rotate: 180deg;
  writing-mode: vertical-rl;
  :hover {
    color: gray;
  }
`;
const Git = styled.li`
  display: flex;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  padding: 20px 20px;
  color: white;
`;

const Terms = styled.div`
  display: flex;
  justify-content: space-around;
  color: white;
  background-color: rgba(31, 31, 31);
`;
export default Footer;
