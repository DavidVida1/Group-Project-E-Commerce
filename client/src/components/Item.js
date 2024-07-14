import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import QuantityBtns from "./QuantityBtns";
import { CartContext } from "./CartContext";
import { useNavigate } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper/modules";

const Item = ({ userId }) => {
  const { itemId } = useParams();
  const [itemsArr, setItemsArr] = useState([]);
  const [itemData, setItemData] = useState(null);
  const [companyData, setCompanyData] = useState(null);
  const [itemQuantity, setItemQuantity] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const {
    state,
    actions: { addItem, changeQuantity },
  } = useContext(CartContext);
  const navigate = useNavigate();

  const fetchItemAndCompany = async () => {
    const item = await fetch(`/api/get-item/${itemId}`).then((res) =>
      res.json()
    );
    if (item.status !== 200) {
      window.alert(item.message);
      throw new Error(item.message);
    }
    setItemData(item.data);
    const company = await fetch(`/api/get-company/${item.data.companyId}`).then(
      (res) => res.json()
    );
    if (company.status !== 200) {
      window.alert(company.message);
      throw new Error(company.message);
    }
    setCompanyData(company.data);
  };

  useEffect(() => {
    fetchItemAndCompany();
  }, []);

  const handleAddToCart = (e) => {
    if (itemQuantity > itemData.numInStock) {
      window.alert(`The seller only has ${itemData.numInStock} items.`);
      setItemQuantity(1);
      return;
    }
    setIsFetching(true);
    fetch("/api/add-to-cart", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: itemData._id,
        numToBuy: itemQuantity,
        userEmail: userId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsFetching(false);
        if (data.status === 201) {
          if (
            state.find((item) => Number(item.itemId) === Number(itemData._id))
          ) {
            changeQuantity(data.data);
          } else {
            addItem(data.data);
          }
          setItemQuantity(1);
        } else {
          window.alert(data.message);
        }
      })
      .catch((error) => {
        window.alert(error);
      });
  };

  /* const handleQuantityChange = (e, action) => {
    if (action === "plus") {
      setItemQuantity(itemQuantity + 1);
    } else if (action === "minus") {
      if (itemQuantity > 1) {
        setItemQuantity(itemQuantity - 1);
      }
    } else if (action === "input") {
      if (e.target.value > 0) {
        setItemQuantity(Number(e.target.value));
      } else {
        setItemQuantity(1);
      }
    }
  };*/

  const handleCompanyClick = (e) => {
    navigate(`/company-profile/${companyData._id}`);
  };

  /*This UseEffect chatGpt*/
  useEffect(() => {
    if (itemData) {
      fetch(`/api/get-items`)
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            const filteredItems = data.data.filter(
              (item) => item.category === itemData.category
            );

            let randomIndexArray = [];
            while (
              randomIndexArray.length < 10 &&
              randomIndexArray.length < filteredItems.length
            ) {
              const randomIndex = Math.floor(
                Math.random() * filteredItems.length
              );
              if (!randomIndexArray.includes(randomIndex)) {
                randomIndexArray.push(randomIndex);
              }
            }
            setItemsArr(
              randomIndexArray.map((randomIndex) => {
                return filteredItems[randomIndex];
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
    }
  }, [itemData]);

  return (
    <ItemContainer className="container">
      <div className="test"></div>
      {itemData ? (
        <>
          <div className="itemWrapper">
            <div>
              <div className="itemImg">
                <img src={itemData.imageSrc} alt={itemData.name} />
              </div>

              {companyData ? (
                <div className="companyData">
                  <p className="companyCountry">{companyData.country}</p>
                  <a
                    className="companyUrl"
                    href={companyData.url}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {companyData.url}
                  </a>
                </div>
              ) : (
                <h2>Loading...</h2>
              )}
            </div>

            <div className="itemData">
              <div className="topItemData">
                {companyData ? (
                  <div onClick={handleCompanyClick}>
                    <p className="companyName">{companyData.name}</p>
                  </div>
                ) : (
                  <h2>Loading...</h2>
                )}
                <h4 className="itemName">{itemData.name}</h4>
                <h4 className="itemPrice">{itemData.price}</h4>
              </div>

              <div className="bottomItemData">
                {itemData.numInStock > 0 ? (
                  <div className="cartWrapper">
                    <div
                      className="cartButton"
                      onClick={handleAddToCart}
                      disabled={isFetching}
                    >
                      Add To Cart
                    </div>
                  </div>
                ) : (
                  <p>Out of stock.</p>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <h2>Loading...</h2>
      )}

      <div className="sliderSection">
        <h2 className="featureHeader">You might also like </h2>
        <Swiper
          slidesPerView={3}
          spaceBetween={15}
          navigation={true}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 15,
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
                  <p className="featuredItemName">{randomItem.name}</p>
                  <p className="featuredItemPrice">{randomItem.price}</p>
                </SwiperSlide>
              );
            })
          ) : (
            <h2 className="loading">Loading ...</h2>
          )}
        </Swiper>
      </div>
    </ItemContainer>
  );
};

const ItemContainer = styled.section`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 100dvh;
  background-color: var(--bg-white);

  & .test {
    background-color: black;
    height: 140px;
    width: 100%;
  }

  & .companyData {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 5px;
    font-weight: var(--font-weight-500);
    font-size: var(--font-size-18);

    & .companyCountry {
      margin: 0px 0px;
    }

    & .companyUrl {
      margin: 0px 0px;
    }
  }

  & .itemWrapper {
    display: grid;
    grid-template-columns: 60% 35%;
    grid-template-rows: 1fr;
    align-items: center;
    justify-items: center;
    height: 100%;
    width: 100%;
    margin: 50px 0px;
    background-color: var(--bg-white);

    & .itemImg {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: var(--bg-card);
      border-radius: var(--radius-card);
      width: 800px;
      height: 650px;
      transition: 0.5s ease-in-out;
      box-shadow: var(--sdw-black-card2);

      /*   &:after {
        content: "";
        border-radius: var(--radius-card);
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 2;
        transition: 1s all;
        opacity: 1;
        background: var(--bg-overlay2);
      }*/

      & img {
        height: 300px;
        width: 300px;
      }
    }

    & .itemData {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      height: 100%;

      & .topItemData {
        display: flex;
        flex-direction: column;
        gap: 20px;

        & .companyName {
          border-radius: 10px;
          background-color: var(--bg-purple);
          width: max-content;
          color: var(--font-white);
          letter-spacing: 2px;
          padding: 10px 20px;
          font-size: var(--font-size-18);
          font-weight: var(--font-weight-500);
          text-transform: uppercase;
          cursor: pointer;
        }

        & .itemName {
          font-size: 3.5rem;
          width: 100%;
          color: var(--black);
          margin: 0px 0px;
        }

        & .itemPrice {
          margin: 20px 0px;
          font-size: var(--font-size-30);
        }
      }

      & .bottomItemData {
        display: flex;
        flex-direction: column;
        width: 100%;
        gap: 20px;

        & .cartWrapper {
          display: flex;
          flex-direction: column;
          gap: 20px;

          & .cartButton {
            width: 100%;
            font-size: var(--font-size-18);
            text-align: center;
            padding: 15px 0px;
            text-transform: uppercase;
            font-weight: var(--font-weight-500);
            color: var(--font-white);
            border-radius: 10px;
            background-color: var(--btn-purple);
            border: 2px solid var(--purple);
            box-shadow: 0 0 10px var(--font-sdw);
            transition: background-color 0.3s linear;
            cursor: pointer;

            &:hover {
              border: 2px solid var(--white);
              background-color: var(--btn-black);
            }
          }
        }
      }
    }
  }

  & .sliderSection {
    height: 90dvh;
    width: 100%;
    padding: 0px 0px 50px 0px;

    & .featureHeader {
      display: flex;
      flex-direction: row;
      align-self: flex-start;
      align-items: center;
      padding: 50px 0px 50px 0px;
      color: var(--font-grey);
      font-size: var(--font-size-40);
      font-family: var(--Font-heading-title);
    }

    & .swiper {
      height: 75%;
      width: 100%;

      & .swiper-button-next,
      .swiper-button-prev {
        color: var(--purple);
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
          align-items: center;
          justify-content: space-around;
          background-color: var(--bg-card);
          border-radius: var(--radius-card);
          width: 450px;
          height: 650px;
          transition: 0.5s ease-in-out;
          box-shadow: var(--sdw-black-card2);

          &:hover {
            transform: translateY(10px);
          }
          /* &:after {
            content: "";
            border-radius: var(--radius-card);
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 2;
            transition: 1s all;
            opacity: 0;
            background: var(--bg-overlay2);
          }

          &:hover:after {
            opacity: 1;
          }*/
          img {
            height: 200px;
            width: 200px;
          }
        }

        & .featuredItemName {
          width: 450px;
          text-align: center;
          padding: 15px 0px;
          font-size: var(--font-size-18);
          font-weight: var(--font-weight-500);
        }
        & .featuredItemPrice {
          font-size: var(--font-size-15);
          color: var(--font-purple);
        }
      }
    }
  }
`;

export default Item;
