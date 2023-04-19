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
    <Wrapper>
      {itemData ? (
        <>
          {itemData.numInStock > 0 ? (
            <ToCart>
              <QuantityBtns
                handleQuantityChange={handleQuantityChange}
                itemQuantity={itemQuantity}
              />
              <ButtonCart onClick={handleAddToCart} disabled={isFetching}>
                Add To Cart
              </ButtonCart>
              {/* <h3>Item added to the cart.</h3> */}
            </ToCart>
          ) : (
            <p>Out of stock.</p>
          )}{" "}
          <DiscoverItem>
            <h1>{itemData.name}</h1>
            <img src={itemData.imageSrc} alt={itemData.name} />{" "}
            <h2>{itemData.price}</h2>{" "}
          </DiscoverItem>
        </>
      ) : (
        <h2>Loading...</h2>
      )}
      {companyData ? (
        <Location onClick={handleCompanyClick}>
          <h3>Seller: </h3>
          <p>{companyData.name}</p>
          <a href={companyData.url} onClick={(e) => e.stopPropagation()}>
            {companyData.url}
          </a>
          <p>Country: {companyData.country}</p>
        </Location>
      ) : (
        <h2>Loading...</h2>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: row-reverse;
  padding-left: 150px;
  padding-right: 150px;
  padding-top: 30px;
  padding-bottom: 50px;
  justify-content: space-around;
  flex-wrap: wrap;
  width: 100%;
  row-gap: 10px;
  column-gap: 0px;
  min-height: 400px;
  p {
    font-family: var(--Font-heading-title);
    font-weight: bold;
    font-size: 30px;
  }
`;
const ToCart = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  font-family: var(--Font-heading-title);
  font-weight: bold;
  font-size: 20px;
  border-radius: 5px;
  width: 250px;
  height: 100px; ;
`;

const ButtonCart = styled.button`
  height: 5vh;
  width: 27vh;
  border-radius: 5px;
  border-style: none;
  font-family: var(--Font-heading-title);
  font-size: 20px;
  font-weight: bold;
  transition: 0.5s ease-in-out;
  background-color: var(--color-background);
  border-style: solid;
  border-width: 1px;

  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  :hover {
    color: rgb(71, 103, 161);
    transform: translateY(2px);
  }
  :after {
    content: "";
    border-radius: 5px;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    /* width: 100%;*/
    height: 100%;
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
`;
const Location = styled.div`
  display: grid;
  align-self: flex-start;
  place-items: center;
  border-style: solid;
  border-color: black;
  font-family: var(--Font-heading-title);
  font-weight: bold;
  font-size: 20px;
  border-radius: 5px;
  width: 250px;
  height: 360px;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  cursor: pointer;
  transition: 0.5s ease-in-out;
  :hover {
    transform: translateY(2px);
  }
  h3 {
    font-size: 25px;
    box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px;
  }
  a:hover {
    color: rgba(0, 153, 255);
    box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px;
  }
  p {
    box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px;
  }
  a {
    box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px;
  }
`;
const DiscoverItem = styled.div`
  display: grid;
  position: relative;
  place-items: center;
  font-family: var(--Font-heading-title);
  font-weight: bold;
  font-size: 20px;
  border-radius: 5px;
  width: 600px;
  height: 360px;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  h2 {
    text-align: center;
    font-size: 25px;
  }
  h1 {
    text-align: center;
    font-size: 25px;
    box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px;
  }
  :after {
    content: "";
    border-radius: 5px;
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom,
      rgba(0, 204, 255, 0.1),
      rgba(191, 128, 64, 0.3)
    );
  }
`;
export default Item;
