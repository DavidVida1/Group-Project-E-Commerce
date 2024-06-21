import { NavLink, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper/modules";

const FeaturedItems = () => {
  const [itemsArr, setItemsArr] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/get-items`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          let randomIndexArray = [];
          while (randomIndexArray.length < 10) {
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
    <FeaturedItemsContainer className="container">
      <h2 className="discover">Featured </h2>
      <Swiper
        slidesPerView={3}
        spaceBetween={0}
        navigation={true}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 0,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 0,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 0,
          },
        }}
        modules={[Navigation]}
        className="mySwiper"
      >
        {itemsArr &&
          itemsArr.map((randomItem) => {
            return (
              <SwiperSlide>
                <a
                  className="featuredItemCards"
                  href={`/item/${randomItem._id}`}
                  key={randomItem._id}
                >
                  <img src={randomItem.imageSrc} />
                </a>
                <p className="featuredItemName">{randomItem.name}</p>
                <p className="featuredItemPrice">{randomItem.price}</p>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </FeaturedItemsContainer>
  );
};

const FeaturedItemsContainer = styled.section`
  width: 100dvw;
  height: 100dvh;

  & .discover {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 50px 0px 50px 0px;
    color: var(--grey-subHeader);
    font-size: 4rem;
    font-family: var(--Font-heading-title);
  }

  & .swiper {
    height: 75%;
    width: 100%;

    & .swiper-slide {
      /* Center slide text vertically */
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      overflow: hidden;

      & .featuredItemCards {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-around;
        background-color: white;
        border-radius: 15px;
        width: 500px;
        height: 800px;
        transition: 0.5s ease-in-out;
        overflow: hidden;
        box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
          rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
          rgba(0, 0, 0, 0.2) 0px -3px 0px inset;

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
        img {
        }
      }

      & .featuredItemName {
        text-align: center;
        padding: 15px 0px;
        font-size: 1.8rem;
        font-weight: 500;
      }
      & .featuredItemPrice {
        font-size: 1.5rem;
      }
    }
  }
`;

export default FeaturedItems;
