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
      <h2 className="featureHeader">Featured </h2>
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
        {itemsArr ? (
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

                <a href={`/item/${randomItem._id}`} className="itemInfo">
                  <p className="featuredItemName">{randomItem.name}</p>
                  <p className="featuredItemPrice">{randomItem.price}</p>
                </a>
              </SwiperSlide>
            );
          })
        ) : (
          <h2 className="loading">Loading ...</h2>
        )}
      </Swiper>
    </FeaturedItemsContainer>
  );
};

const FeaturedItemsContainer = styled.section`
  width: 100dvw;
  height: 100dvh;

  & .featureHeader {
    text-align: start;
    color: var(--font-grey);
    font-size: var(--font-size-40);
    font-family: var(--Font-heading-title);
  }

  & .swiper {
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

    & .swiper-slide {
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      overflow: hidden;

      & .featuredItemCards {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        background-color: var(--bg-card);
        border-radius: var(--radius-card);
        width: 546px;
        height: 665px;
        transition: 0.5s ease-in-out;
        box-shadow: var(--sdw-black-card2);

        &:hover {
          transform: translateY(10px);
        }

        img {
          height: 200px;
          width: 200px;
        }
      }

      & .itemInfo {
        display: flex;
        flex-direction: column;
        gap: 15px;
        padding: 15px 0px;
        justify-content: flex-start;
        align-items: flex-start;

        & .featuredItemName {
          width: 500px;
          text-align: start;
          font-size: var(--font-size-18);
          font-weight: var(--font-weight-500);
        }

        & .featuredItemPrice {
          font-size: var(--font-size-15);
          font-weight: 300;
        }
      }
    }
  }
`;

export default FeaturedItems;
