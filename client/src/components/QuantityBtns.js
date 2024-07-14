import styled from "styled-components";

const QuantityBtns = ({
  handleQuantityChange,
  itemQuantity,
  disabled,
  itemId,
}) => {
  return (
    <QuantityBtnsContainer>
      <div className="buttonDiv">
        <button
          disabled={disabled}
          onClick={(e) => handleQuantityChange(e, "minus", itemId)}
        >
          -
        </button>

        <Number
          disabled={disabled}
          type="number"
          value={itemQuantity}
          onChange={(e) => handleQuantityChange(e, "input", itemId)}
        />

        <button
          disabled={disabled}
          onClick={(e) => handleQuantityChange(e, "plus", itemId)}
        >
          +
        </button>
      </div>
    </QuantityBtnsContainer>
  );
};

const QuantityBtnsContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  align-items: center;
  height: 5vh;
  width: 27vh;
  border-radius: 5px;
  background-color: var(--color-background);
  border-width: 1px;

  & .buttonDiv {
    display: flex;
    flex-direction: row;
    justify-content: center;
    background-color: var(--color-background);

    & button {
      width: 100%;
      height: 100%;
      text-align: center;
      font-size: var(--font-size-30);
      font-weight: bold;
      border-style: none;
      background-color: transparent;
      padding: 0px 15px;
      border: 1px solid red;
      border-radius: 40px;

      & :hover {
        background-color: #bfbfbf;
        border-radius: 5px;
      }
    }
  }
`;

const Number = styled.input`
  font-size: 20px;
  border-left: 2px solid #f5f5f5;
  border-right: 2px solid #f5f5f5;
  border-color: grey;
  padding: 0px 8px;
  width: 12vh;
  text-align: center;
`;

export default QuantityBtns;
