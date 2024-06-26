import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import modelDisplayitemImg from "../assets/polar_rc3gps.jpg";

const ItemDisplay = () => {
  const [itemDisplayData, setItemDisplayData] = useState(null);

  const fetchItemDisplayData = async () => {
    const item = await fetch(`/api/get-item/6951`).then((res) => res.json());
    if (item.status !== 200) {
      window.alert(item.message);
      throw new Error(item.message);
    }
    setItemDisplayData(item.data);
  };

  useEffect(() => {
    fetchItemDisplayData();
  }, []);

  return (
    <ItemDisplayContainer className="container">
      <div className="itemDisplayWrapper">
        <aside className="imgWrapper">
          <img
            className="modelWatchDisplay"
            src={modelDisplayitemImg}
            alt="modelDisplayItem"
            loading="lazy"
          />
        </aside>

        {itemDisplayData ? (
          <div className="displayWatchText">
            <div className="new">New</div>
            <div className="displayWatchName">{itemDisplayData.name}</div>
            <div className="displayWatchOptions">
              <a href="/item/6951">Buy now</a>
              <a href="/category/Entertainment">Explore More</a>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </ItemDisplayContainer>
  );
};
export default ItemDisplay;

const ItemDisplayContainer = styled.section`
  width: 100%;
  height: 100dvh;
  padding: 50px 0px 0px 0px;
  color: var(--font-white);

  & .itemDisplayWrapper {
    position: relative;
    display: flex;
    justify-content: space-around;
    height: 100%;
    width: 100%;

    & .imgWrapper {
      height: 90%;
      width: 95%;
      box-shadow: var(--sdw-black-card);
      border-radius: var(--radius-display);

      & .modelWatchDisplay {
        height: 100%;
        width: 100%;
        object-fit: cover;
        border-radius: var(--radius-display);
      }
    }

    & .displayWatchText {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-85%, -30%);
      text-shadow: 0 0 10px var(--font-sdw);

      & .new {
        border-radius: 40px;
        background-color: var(--bg-white);
        width: max-content;
        color: var(--color-black);
        padding: 10px 20px;
        font-size: var(--font-size-15);
        margin-bottom: 15px;
        font-weight: var(--font-weight-500);
      }

      & .displayWatchName {
        font-size: clamp(1.8rem, 4.2vw, 4rem);
        font-weight: var(--font-weight-500);
      }

      & .displayWatchOptions {
        display: flex;
        flex-direction: row;
        margin-top: 40px;
        font-size: clamp(1.8rem, 3.5vw, 1.8rem);
        gap: 20px;

        & :first-child {
          background-color: var(--color-purple);
          padding: 15px 25px;
          border-radius: var(--radius-button);
          box-shadow: 0 0 10px black;
          border: 2px solid var(--color-purple);
          transition: background-color 0.3s linear;

          &:hover {
            background-color: var(--color-black);
            border: 2px solid var(--color-white);
          }
        }
        & :nth-child(2) {
          color: var(--color-black);
          background-color: var(--color-white);
          padding: 15px 25px;
          border-radius: var(--radius-button);
          border: 2px solid var(--color-white);
          box-shadow: 0 0 10px black;
          transition: background-color 0.3s linear;

          &:hover {
            color: var(--color-white);
            background-color: var(--color-black);
          }
        }
      }
    }
  }
`;
