import { NavLink, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import HeroVideo from "../assets/watchBanner2.mp4";
import casioLogo from "../assets/casioLogo.png";
import fitbitLogo from "../assets/fitbitLogo.png";
import garminLogo from "../assets/garminLogo.png";
import gshockLogo from "../assets/gshockLogo.png";
import jawboneLogo from "../assets/jawboneLogo.png";
import magellanLogo from "../assets/magellanLogo.png";
import polarLogo from "../assets/polarLogo.png";
import samsungLogo from "../assets/samsungLogo.png";
import skechersLogo from "../assets/skechersLogo.png";
import nikeLogo from "../assets/nikeLogo.png";

const logos = [
  { src: casioLogo, href: "/company-profile/13334" },
  { src: fitbitLogo, href: "/company-profile/10759" },
  { src: garminLogo, href: "/company-profile/10713" },
  { src: gshockLogo, href: "/company-profile/13334" },
  { src: jawboneLogo, href: "/company-profile/18834" },
  { src: magellanLogo, href: "/company-profile/16475" },
  { src: polarLogo, href: "/company-profile/11837" },
  { src: samsungLogo, href: "/company-profile/18432" },
  { src: skechersLogo, href: "/company-profile/15211" },
  { src: nikeLogo, href: "/company-profile/11939" },
];

const Home = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current.src = HeroVideo;
          observer.disconnect();
        }
      },
      {
        rootMargin: "200px",
      }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  return (
    <HomeContainer>
      <aside className="heroText">
        <div className="logo">AllStar</div>
        <h1 className="heroSubText">Stay Active, Stay Timed</h1>
        <a href="*" className="heroButton">
          Discover
        </a>
      </aside>
      <video
        className="bannerHero"
        ref={videoRef}
        autoPlay
        loop
        muted
        alt="hero-video"
        loading="lazy"
      />
      <div className="wrapperSlider">
        <div className="slider" reverse="false">
          <div className="list">
            {logos.map((logo, index) => (
              <SliderItem key={index} position={index + 1} href={logo.href}>
                <img src={logo.src} alt="company-logo" loading="lazy" />
              </SliderItem>
            ))}
          </div>
        </div>
      </div>
    </HomeContainer>
  );
};

const HomeContainer = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--bg-home);
  width: 100vw;
  height: 100vh;

  & video {
    width: 100%;
    height: 85%;
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
    bottom: 200px;
    left: 50px;
    z-index: 30;
    color: var(--font-white);
    text-transform: uppercase;
    text-shadow: 0 0 10px var(--font-sdw);
    letter-spacing: 5px;

    & .logo {
      font-family: var(--font-heading-title);
      font-style: italic;
      font-weight: bold;
      font-size: clamp(2rem, 4.2vw, 3rem);
    }

    & .heroSubText {
      font-size: clamp(5rem, 4.2vw, 6rem);
      font-weight: var(--font-weight-500);
    }

    & .heroButton {
      width: fit-content;
      height: fit-content;
      margin-top: 40px;
      font-size: var(--font-size-18);
      padding: 2% 18%;
      border-radius: var(--radius-button);
      background-color: var(--btn-purple);
      border: 2px solid var(--purple);
      box-shadow: 0 0 10px var(--font-sdw);
      transition: background-color 0.3s linear;

      &:hover {
        border: 2px solid var(--white);
        background-color: var(--btn-black);
      }
    }
  }
  & .wrapperSlider {
    display: flex;
    align-items: center;
    height: 100%;
    width: 100%;
    background-color: var(--bg-white);

    & .slider {
      width: 100%;
      height: var(--slider-height);
      overflow: hidden;
      mask-image: linear-gradient(
        to right,
        transparent,
        var(--black) 10% 90%,
        transparent
      );

      & .list {
        position: relative;
        display: flex;
        width: 100%;
        min-width: calc(var(--slider-width) * var(--slider-quantity));
      }

      &:hover a {
        animation-play-state: paused !important;
      }

      a:hover {
        filter: opacity(1);
      }
    }
    /*.slider[reverse="true"] a {
      animation: reverseRun var(--slider-time) linear infinite;
    }*/

    @keyframes autoRun {
      from {
        left: calc(var(--slider-width) * -1);
      }
      to {
        left: 100%;
      }
    }
    /*
    @keyframes reverseRun {
      from {
        left: 100%;
      }
      to {
        left: calc(var(--slider-width) * -1);
      }
    }*/
  }
`;

const SliderItem = styled.a`
  position: absolute;
  width: var(--slider-width);
  height: var(--slider-height);
  left: 100%;
  animation: autoRun var(--slider-time) linear infinite;
  transition: filter 0.5s;
  animation-delay: ${({ position }) =>
    `calc((var(--slider-time) / var(--slider-quantity)) * ${
      position - 1
    })`}!important;
  filter: opacity(0.2);

  & img {
    width: 100%;
    height: 100%;
  }
`;

export default Home;
