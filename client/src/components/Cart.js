import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import QuantityBtns from "./QuantityBtns";
import { CartContext } from "./CartContext";
import { FaRegTrashAlt } from "react-icons/fa";

const Cart = ({ userId, setOrderId }) => {
  // disable btns and input while fetching
  const [isFetching, setIsFetching] = useState(false);
  const {
    state,
    actions: { removeItem, changeQuantity, emptyCart },
  } = useContext(CartContext);
  const navigate = useNavigate();

  // calculating the quantity of one item to send it to the BE
  const newNumToBuy = (e, itemId, action) => {
    let currNumToBuy = state.find((item) => item.itemId === itemId).numToBuy;
    if (action === "plus") {
      currNumToBuy++;
      return currNumToBuy;
    } else if (action === "minus") {
      if (currNumToBuy > 1) {
        currNumToBuy--;
      }
      return currNumToBuy;
    } else if (action === "input") {
      if (currNumToBuy > 0) {
        return Number(e.target.value);
      } else {
        return 1;
      }
    }
  };

  // sending new quantity data to BE
  // and changing cart data in context after receiving response
  const handleQuantityChange = (e, action, itemId) => {
    setIsFetching(true);
    const numToBuy = newNumToBuy(e, itemId, action);
    fetch("/api/update-cart", {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: userId,
        itemId: itemId,
        numToBuy: numToBuy,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsFetching(false);
        if (data.status === 200) {
          changeQuantity(data.data);
        } else {
          window.alert(data.message);
        }
      })
      .catch((error) => {
        window.alert(error);
      });
  };

  // sending info about removed item to the BE
  // and changing cart data in context after receiving response
  const handleRemove = (itemId) => {
    setIsFetching(true);

    fetch("/api/delete-cart-item", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: userId,
        itemId: itemId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsFetching(false);
        if (data.status === 200) {
          removeItem(itemId);
        } else {
          window.alert(data.message);
        }
      })
      .catch((error) => {
        window.alert(error);
      });
  };

  // sending purchase info to the BE
  // emptying cart after responce
  // and navigating to confirmation page
  const handleBuy = () => {
    setIsFetching(true);
    fetch("/api/add-to-bought-items", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: userId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsFetching(false);
        if (data.status === 201) {
          setOrderId(data.data._id);
          emptyCart();
          navigate(`/confirmation`);
        } else {
          window.alert(data.message);
        }
      })
      .catch((error) => {
        window.alert(error);
      });
  };

  return (
    <CartContainer className="container">
      {state.length === 0 ? (
        <h2>Cart is empty.</h2>
      ) : (
        <>
          <h2>Cart </h2>
          <>
            {state.map((item, ind) => {
              return (
                <div className="cartWrapper" key={item.itemId}>
                  <div className="cartItemImg" />

                  <p>{item.name}</p>

                  <div className="quantityWrapper">
                    <span>QTY:</span>
                    <QuantityBtns
                      handleQuantityChange={handleQuantityChange}
                      itemQuantity={state[ind].numToBuy}
                      disabled={isFetching}
                      itemId={item.itemId}
                    />
                  </div>

                  <div className="priceWrapper">
                    <span>Price: {item.price}</span>
                    <span>
                      Total: $
                      {(
                        Number(item.price.slice(1)) * state[ind].numToBuy
                      ).toFixed(2)}
                    </span>
                  </div>

                  <div
                    className="removeBtn"
                    onClick={() => handleRemove(item.itemId)}
                  >
                    <FaRegTrashAlt />
                  </div>
                </div>
              );
            })}
          </>

          <div>
            <p>Total:</p>
            <p>
              $
              {state
                .reduce(
                  (acc, item) =>
                    acc + Number(item.price.slice(1)) * item.numToBuy,
                  0
                )
                .toFixed(2)}
            </p>
          </div>
          <div className="buyBtn" onClick={handleBuy} disabled={isFetching}>
            Buy
          </div>
        </>
      )}
    </CartContainer>
  );
};

const CartContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 100px;
  width: 100%;
  height: 100dvh;
  color: var(--color);
  font-family: var(--font-text);

  & .cartWrapper {
    display: flex;
    flex-direction: column;

    & .cartItemImg {
      height: 164px;
      width: 164px;
      background-color: grey;
    }

    & .quantityWrapper {
      width: 20%;
      padding-left: 40px;
      display: flex;
      font-weight: bold;
      flex-direction: column;
      align-items: center;
    }

    & .priceWrapper {
      width: 20%;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }
    & .removeBtn {
      cursor: pointer;
      font-size: 18px;
      transition: 0.5s ease-in-out;
      &:hover {
        color: rgb(71, 103, 161);
        transform: translateY(2px);
      }
    }
  }

  & .buyBtn {
    width: 100%;
    height: 5%;
    font-family: var(--Font-heading-title);
    font-weight: bold;
    font-size: 20px;
    cursor: pointer;
    border-width: 1px;
    border-style: solid;
    transition: 0.5s ease-in-out;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    &:hover {
      color: rgb(71, 103, 161);
      transform: translateY(2px);
    }
  }
`;

export default Cart;
