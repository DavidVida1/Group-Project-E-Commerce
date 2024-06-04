import { NavLink, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import banner from "../assets/watchBanner.png";

const Home = () => {
  const [itemsArr, setItemsArr] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/get-items`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          let randomIndexArray = [];
          while (randomIndexArray.length < 6) {
            const randomIndex = Math.floor(Math.random() * data.data.length);
            if (!randomIndexArray.includes(randomIndex)) {
              randomIndexArray.push(randomIndex);
            }
          }
          setItemsArr(
            randomIndexArray.map((randomIndex) => {
              return data.data[randomIndex];
            })
          );
        } else {
          window.alert(data.message);
          throw new Error(data.message);
        }
      })
      .catch((error) => {
        window.alert(error);
      });
  }, []);

  return (
    <div>
      <Banner>
        <div className="bannerBg"></div>
      </Banner>

      <Explore>Discover</Explore>
      <Wrapper>
        {itemsArr &&
          itemsArr.map((randomItem) => {
            return (
              <DiscoverItem to={`/item/${randomItem._id}`} key={randomItem._id}>
                <img src={randomItem.imageSrc} />

                <button onClick={() => navigate(`/item/${randomItem._id}`)}>
                  More Info
                </button>
              </DiscoverItem>
            );
          })}
      </Wrapper>
    </div>
  );
};

const Banner = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;

  .bannerBg {
    border-radius: 5px;
    width: 100%;
    height: 650px;

    background: url(${banner});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
`;

const Explore = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding-top: 50px;
  color: var(--color-blackfont-titles);
  font-size: 40px;
  font-family: var(--Font-heading-title);
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  padding: 30px 50px 60px 50px;
`;
const DiscoverItem = styled(Link)`
  display: grid;
  position: relative;
  place-items: center;
  border-color: black;
  border-radius: 5px;
  width: 280px;
  height: 360px;
  transition: 0.5s ease-in-out;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;

  :hover {
    transform: translateY(10px);
  }
  :after {
    content: "";
    border-radius: 5px;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    transition: 1s all;
    opacity: 0;
    background: linear-gradient(
      to bottom,
      rgba(0, 204, 255, 0.1),
      rgba(191, 128, 64, 0.3)
    );
  }
  :hover:after {
    opacity: 1;
  }

  button {
    width: 130px;
    transition: 1s all;
    border-style: none;
    padding: 5px;
    border-radius: 5px;
    position: absolute;
    bottom: 5px;
    z-index: 10;
    color: var(--color-blackfont-text);
    opacity: 0;
    font-family: var(--font-text);
    font-weight: bold;
    font-size: 20px;
    box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset,
      rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset,
      rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset,
      rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px,
      rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px,
      rgba(0, 0, 0, 0.09) 0px 32px 16px;
  }
  :hover button {
    opacity: 1;
    color: white;
  }

  button:hover {
    color: rgba(0, 255, 255, 0.8);
  }
`;
export default Home;
