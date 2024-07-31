import { NavLink, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import entertainmentImg from "../assets/entertainment.jpg";
import fitnessImg from "../assets/fitness.jpg";
import gamingImg from "../assets/gaming.jpg";
import industrialImg from "../assets/industrial.jpg";
import lifestyleImg from "../assets/lifestyle.jpg";
import medicalImg from "../assets/medical.jpg";
import petsImg from "../assets/pets.jpg";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper/modules";

const ExploreCategory = () => {
  const [itemsCategory, setItemsCategory] = useState(null);
  const categoryImages = {
    entertainment: entertainmentImg,
    fitness: fitnessImg,
    gaming: gamingImg,
    industrial: industrialImg,
    lifestyle: lifestyleImg,
    medical: medicalImg,
    "pets-and-animals": petsImg,
  };

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
    <ExploreCategoryContainer className="container">
      <h2 className="subHeader">Explore</h2>
      <Swiper
        slidesPerView={3}
        spaceBetween={40}
        navigation={true}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 30,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
        modules={[Navigation]}
        className="mySwiper"
      >
        {itemsCategory ? (
          itemsCategory.map((category) => {
            const normalizedCategory = category
              .toLowerCase()
              .replace(/ /g, "-");
            const backgroundImage = categoryImages[normalizedCategory];

            return (
              <SwiperSlide key={category}>
                <CategoryCard
                  style={{
                    backgroundImage: `url(${backgroundImage})`,
                  }}
                >
                  <p>{category}</p>
                  <a href={`/category/${category}`} className="button">
                    Explore
                  </a>
                </CategoryCard>
              </SwiperSlide>
            );
          })
        ) : (
          <h2 className="loading">Loading categories...</h2>
        )}
      </Swiper>
    </ExploreCategoryContainer>
  );
};

export default ExploreCategory;

const ExploreCategoryContainer = styled.section`
  display: flex;
  flex-direction: column;
  width: 100dvw;
  height: 100dvh;

  & .subHeader {
    text-align: start;
    color: var(--font-grey);
  }

  & .mySwiper {
    width: 100%;

    & .swiper-button-next,
    .swiper-button-prev {
      height: 30px;
      width: 30px;
      border-radius: var(--radius-button);
      padding: 10px;
      color: #333;
      background-color: hsla(0, 0%, 100%, 0.75);

      &::after {
        font-size: 30px;
        font-weight: 800;
      }
    }
  }
`;

const CategoryCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  border-radius: var(--radius-card);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  box-shadow: var(--sdw-black-card2);
  -webkit-filter: grayscale(30%);
  filter: grayscale(30%);
  transition: all 0.5s ease;
  height: 665px;
  width: 546px;

  &:hover {
    -webkit-filter: grayscale(0%);
    filter: grayscale(0%);
    filter: saturate(2);
  }

  & .button {
    color: var(--btn-black);
    background-color: var(--btn-white);
    padding: 15px 25px;
    border: 2px solid var(--btn-white);
    box-shadow: 0 0 10px var(--font-sdw);

    &:hover {
      color: var(--btn-white);
      background-color: var(--btn-black);
    }
  }

  & p {
    color: var(--font-white);
    font-size: var(--font-size-logo);
    font-weight: var(--font-weight-500);
    text-shadow: 0 0 10px var(--font-sdw);
    padding: 5px;
  }
`;
