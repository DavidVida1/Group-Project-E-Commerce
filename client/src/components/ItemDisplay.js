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
    <ItemDisplayContainer>
      <img
        className="modelWatchDisplay"
        src={modelDisplayitemImg}
        alt="modelDisplayItem"
      />
      {itemDisplayData ? (
        <div className="displayWatchText">
          <div>{itemDisplayData.name}</div>
          <a>Discover This Watch</a>
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </ItemDisplayContainer>
  );
};
export default ItemDisplay;

const ItemDisplayContainer = styled.section`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 50px;
  background-color: var(--color-white);
  border: 1px solid red;

  .displayWatchText {
    position: absolute;
    color: red;
  }
`;
