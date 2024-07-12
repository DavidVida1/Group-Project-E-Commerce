import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import QuantityBtns from "./QuantityBtns";
import { CartContext } from "./CartContext";
import { useNavigate } from "react-router-dom";

const Item = ({ userId }) => {
  const { itemId } = useParams();
  const [itemData, setItemData] = useState(null);
  const [companyData, setCompanyData] = useState(null);
  const [itemQuantity, setItemQuantity] = useState(1);
  // disables button AddToCart while fetching
  const [isFetching, setIsFetching] = useState(false);
  const {
    state,
    actions: { addItem, changeQuantity },
  } = useContext(CartContext);
  const navigate = useNavigate();

  // fetching item data
  // and after that fetch company with the companyId from item
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

  // sending item data to BE
  // and changing cart data in context after receiving response
  const handleAddToCart = (e) => {
    // check if the stock has the required quantity
    if (itemQuantity > itemData.numInStock) {
      window.alert(`The seller only has ${itemData.numInStock} items.`);
      setItemQuantity(1);
      return;
    }
    // disable btns
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
        // enable btns
        setIsFetching(false);
        if (data.status === 201) {
          // if item already in cart then change quantity
          // otherwise add new item to the cart
          if (
            state.find((item) => Number(item.itemId) === Number(itemData._id))
          ) {
            changeQuantity(data.data);
          } else {
            addItem(data.data);
          }
          // reset input
          setItemQuantity(1);
        } else {
          window.alert(data.message);
        }
      })
      .catch((error) => {
        window.alert(error);
      });
  };

  // buttons and input handlers, change only local state
  const handleQuantityChange = (e, action) => {
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
  };
  const handleCompanyClick = (e) => {
    navigate(`/company-profile/${companyData._id}`);
  };

  return (
    <ItemContainer className="container">
      <div className="test"></div>
      {itemData ? (
        <>
          <div className="itemWrapper">
            <div className="itemImg">
              <img src={itemData.imageSrc} alt={itemData.name} />
            </div>

            <div className="itemData">
              <p>{itemData.name}</p>
              <p>{itemData.price}</p>

              {itemData.numInStock > 0 ? (
                <div className="cartWrapper">
                  <QuantityBtns
                    handleQuantityChange={handleQuantityChange}
                    itemQuantity={itemQuantity}
                  />

                  <div
                    className="cartButton"
                    onClick={handleAddToCart}
                    disabled={isFetching}
                  >
                    Add To Cart
                  </div>
                  {/* <h3>Item added to the cart.</h3> */}
                </div>
              ) : (
                <p>Out of stock.</p>
              )}

              {companyData ? (
                <div onClick={handleCompanyClick} className="companyData">
                  <p>Seller: </p>
                  <p>{companyData.name}</p>
                  <a
                    href={companyData.url}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {companyData.url}
                  </a>
                  <p>Country: {companyData.country}</p>
                </div>
              ) : (
                <h2>Loading...</h2>
              )}
            </div>
          </div>
        </>
      ) : (
        <h2>Loading...</h2>
      )}
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

  & .itemWrapper {
    display: grid;
    grid-template-columns: 70% 30%;
    grid-template-rows: 1fr;
    align-items: center;
    justify-items: center;
    height: 100%;
    width: 100%;
    border: 1px solid red;
    margin: 100px 0px;
    background-color: var(--bg-card);

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
      box-shadow: var(--sdw-black-card);

      &:after {
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
        background: var(--bg-overlay);
      }

      img {
        height: 200px;
        width: 200px;
      }
    }

    & .itemData {
      position: relative;

      & .cartWrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        background-color: blue;

        & .cartButton {
          transition: 0.5s ease-in-out;
          background-color: red;

          :hover {
            color: rgb(71, 103, 161);
            transform: translateY(2px);
          }
        }
      }

      & .companyData {
        background-color: green;
      }
    }
  }
`;

export default Item;
