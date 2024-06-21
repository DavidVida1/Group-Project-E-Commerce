import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import entertainmentImg from "../assets/entertainment.jpg";
import fitnessImg from "../assets/fitness.jpg";
import gamingImg from "../assets/gaming.jpg";
import industrialImg from "../assets/industrial.jpg";
import lifestyleImg from "../assets/lifestyle.jpg";
import medicalImg from "../assets/medical.jpg";
import petsImg from "../assets/pets.jpg";

const CategoryBento = () => {
  const [itemsCategory, setItemsCategory] = useState(null);

  useEffect(() => {
    fetch(`/api/get-categories`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          const categories = data.Categories.map((obj) => obj.category);
          setItemsCategory(categories.sort());
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
    <CategoryBentoContainer className="container">
      <h2 className="subHeader">Category</h2>
      <div class="categoryBentoWrapper">
        {itemsCategory ? (
          itemsCategory.map((category) => {
            return (
              <a href={`/category/${category}`} loading="lazy">
                <p>{category}</p>
              </a>
            );
          })
        ) : (
          <h1>Loading categories...</h1>
        )}
      </div>
    </CategoryBentoContainer>
  );
};
export default CategoryBento;

const CategoryBentoContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100dvw;
  height: 100%;

  & .subHeader {
    text-align: center;
    color: var(--grey-subHeader);
  }

  & .categoryBentoWrapper {
    height: 90%;
    width: 95%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    grid-auto-rows: minmax(202px, auto);

    a {
      display: flex;
      align-items: flex-end;
      border-radius: 15px;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      box-shadow: 0 0 5px var(--color-black);
      -webkit-filter: grayscale(30%);
      filter: grayscale(30%);
      transition: all 0.5s ease;

      &:hover {
        -webkit-filter: grayscale(0%);
        filter: grayscale(0%);
        filter: saturate(2);
      }

      & p {
        color: var(--color-white);
        font-size: clamp(4rem, 4.2vw, 4rem);
        font-weight: 500;
        text-shadow: 0 0 10px var(--color-black);
        padding: 5px;
      }

      &:first-child {
        grid-column: 1;
        grid-row: 1;
        background-image: url(${entertainmentImg});
      }
      &:nth-child(2) {
        grid-column: 1;
        grid-row: 2 /4;
        background-image: url(${fitnessImg});
      }
      &:nth-child(3) {
        grid-column: 1;
        grid-row: 4;
        background-image: url(${gamingImg});
      }
      &:nth-child(4) {
        grid-column: 2;
        grid-row: 1/5;
        background-image: url(${industrialImg});
      }
      &:nth-child(5) {
        grid-column: 3;
        grid-row: 1;
        background-image: url(${lifestyleImg});
      }
      &:nth-child(6) {
        grid-column: 3;
        grid-row: 2;
        background-image: url(${medicalImg});
      }
      &:nth-child(7) {
        grid-column: 3;
        grid-row: 3/5;
        background-image: url(${petsImg});
      }
    }
  }
`;
