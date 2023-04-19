import { useState, useEffect } from "react";
import styled from "styled-components";

const Confirmation = ({ orderId }) => {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    fetch(`/api/get-bought-items/${orderId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status !== 200) {
          window.alert(data.message);
          throw new Error(data.message);
        } else setOrder(data.data.cart);
      });
  }, []);
  return (
    <>
      {order ? (
        <Wrapper>
          <h1>Your order is confirmed!</h1>
          <ol>
            {order.map((item) => {
              return (
                <li key={item.itemId}>
                  <p>{item.name}</p>
                  <div>
                    <span>Price: {item.price}</span>
                    <span>QTY: {item.numBought}</span>
                    <span>
                      Total: $
                      {(Number(item.price.slice(1)) * item.numBought).toFixed(
                        2
                      )}
                    </span>
                  </div>
                </li>
              );
            })}
          </ol>
          <div>
            <p>Total:</p>
            <p>
              $
              {order
                .reduce(
                  (acc, item) =>
                    acc + Number(item.price.slice(1)) * item.numBought,
                  0
                )
                .toFixed(2)}
            </p>
          </div>
        </Wrapper>
      ) : (
        <h2>Loading...</h2>
      )}
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  margin: 50px auto;
  width: 500px;
  height: 500px;
  color: var(--color-blackfont-text);
  font-family: var(--font-text);
  font-weight: bold;
  font-size: 1.3rem;
  h1 {
    font-size: 2rem;
    margin-bottom: 20px;
    border-bottom: 2px solid;
    color: var(--color-blackfont-titles);
    font-family: var(--Font-heading-title);
  }
  li {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    p {
      width: 60%;
    }
    div {
      width: 30%;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }
  }
  & > div {
    display: flex;
    justify-content: space-between;
    padding-top: 50px;
    border-top: 2px solid;
    font-size: 1.5rem;
  }
`;

export default Confirmation;
