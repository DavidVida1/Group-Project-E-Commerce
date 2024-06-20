import { NavLink, Link } from "react-router-dom";
import styled from "styled-components";
import HeroVideo from "../assets/watchBanner2.mp4";

const Home = () => {
  return (
    <HomeContainer>
      <aside className="heroText">
        <div className="logo">AllStar</div>
        <div className="heroSubText">Stay Active, Stay Timed</div>
        <a href="*" className="heroButton">
          Discover
        </a>
      </aside>
      <video
        className="bannerHero"
        src={HeroVideo}
        autoPlay
        loop
        muted
        alt="hero-video"
      />
    </HomeContainer>
  );
};

const HomeContainer = styled.section`
  position: relative;
  width: 100vw;

  & video {
    width: 100%;
    height: 100vh;
    object-fit: cover;
    -webkit-mask-image: linear-gradient(transparent 0, #000000 8%);
    mask-image: linear-gradient(transparent 0, #000000 9%);
    background-repeat: no-repeat;
    background-size: cover;
  }

  & .heroText {
    display: flex;
    flex-direction: column;
    position: absolute;
    bottom: 50px;
    left: 50px;
    z-index: 30;
    color: var(--color-white);
    text-transform: uppercase;
    text-shadow: 0 0 10px black;
    letter-spacing: 5px;

    & .logo {
      font-family: var(--font-heading-title);
      font-style: italic;
      font-weight: bold;
      font-size: clamp(3rem, 4.2vw, 4rem);
    }

    & .heroSubText {
      font-size: clamp(5rem, 4.2vw, 6rem);
      font-weight: 500;
    }

    & .heroButton {
      width: fit-content;
      height: fit-content;
      margin-top: 50px;
      font-size: clamp(1.8rem, 3.5vw, 1.8rem);
      padding: 2% 18%;
      border-radius: 40px;
      background-color: var(--color-purple);
      box-shadow: 0 0 10px black;
      transition: background-color 0.3s linear;

      &:hover {
        background-color: var(--color-black);
      }
    }
  }
`;
export default Home;
