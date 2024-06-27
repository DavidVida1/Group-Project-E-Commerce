import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import polarRc3gps from "../assets/polar_rc3gps.jpg";
import gearFit2 from "../assets/Gear-Fit2-Pro.jpg";
import casionAqw from "../assets/casion-aqw.jpg";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Mousewheel, Pagination } from "swiper/modules";

const ItemDisplay = () => {
  const [items, setItems] = useState([]);

  const fetchItemData = async (id) => {
    const item = await fetch(`/api/get-item/${id}`).then((res) => res.json());
    if (item.status !== 200) {
      window.alert(item.message);
      throw new Error(item.message);
    }
    return item.data;
  };

  const fetchItemsData = async () => {
    try {
      const data = await Promise.all([
        fetchItemData(6951),
        fetchItemData(7002),
        fetchItemData(6625),
      ]);

      const itemsWithImages = data.map((item, index) => {
        console.log(item);
        let imageUrl;
        switch (item._id) {
          case 6951:
            imageUrl = polarRc3gps;
            break;
          case 7002:
            imageUrl = gearFit2;
            break;
          case 6625:
            imageUrl = casionAqw;
            break;
          default:
            imageUrl = "";
        }
        return { ...item, imageUrl };
      });

      setItems(itemsWithImages);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchItemsData();
  }, []);

  return (
    <ItemDisplayContainer className="container">
      <Swiper
        direction={"vertical"}
        slidesPerView={1}
        /* height={window.innerHeight}*/
        spaceBetween={30}
        mousewheel={{
          forceToAxis: true,
          sensitivity: 1,
          releaseOnEdges: true,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Mousewheel, Pagination]}
        className="mySwiper"
      >
        {items ? (
          items.map((item) => {
            return (
              <>
                <SwiperSlide key={item.id}>
                  <div className="displayWatchText">
                    <div className="new">New</div>
                    <div className="displayWatchName">{item.name}</div>
                    <div className="displayWatchOptions">
                      <a href={`/item/${item._id}`}>Buy now</a>
                      <a href="/category/Entertainment">Explore More</a>
                    </div>
                  </div>
                  <img
                    className="modelWatchDisplay"
                    src={item.imageUrl}
                    alt={item.name}
                    loading="lazy"
                  />
                </SwiperSlide>
              </>
            );
          })
        ) : (
          <h2 className="loading">Loading ...</h2>
        )}
      </Swiper>
    </ItemDisplayContainer>
  );
};
export default ItemDisplay;

const ItemDisplayContainer = styled.section`
  position: relative;
  width: 100%;
  height: 100dvh;
  padding: 50px 0px 0px 0px;
  color: var(--font-white);

  & .swiper {
    height: 100%;
    width: 95%;
    border-radius: var(--radius-display);
    box-shadow: var(--sdw-black-card);

    & .swiper-pagination-bullet {
      background-color: var(--purple);
    }

    & .swiper-slide {
      width: 100%;
      height: 100%;

      & .modelWatchDisplay {
        display: block;
        height: 100%;
        width: 100%;
        object-fit: cover;
        border-radius: var(--radius-display);
      }

      & .displayWatchText {
        position: absolute;
        top: 75%;
        left: 48%;
        transform: translate(-85%, -30%);
        text-shadow: 0 0 10px var(--font-sdw);
        z-index: 10;

        & .new {
          border-radius: var(--radius-button);
          background-color: var(--bg-white);
          width: max-content;
          color: var(--font-black);
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
          gap: var(--gap-15);

          & :first-child {
            background-color: var(--btn-purple);
            padding: 15px 25px;
            border-radius: var(--radius-button);
            box-shadow: 0 0 10px var(--font-sdw);
            border: 2px solid var(--btn-purple);
            transition: background-color 0.3s linear;

            &:hover {
              background-color: var(--btn-black);
              border: 2px solid var(--btn-white);
            }
          }
          & :nth-child(2) {
            color: var(--btn-black);
            background-color: var(--btn-white);
            padding: 15px 25px;
            border-radius: var(--radius-button);
            border: 2px solid var(--btn-white);
            box-shadow: 0 0 10px var(--font-sdw);
            transition: background-color 0.3s linear;

            &:hover {
              color: var(--btn-white);
              background-color: var(--btn-black);
            }
          }
        }
      }
    }
  }
`;
