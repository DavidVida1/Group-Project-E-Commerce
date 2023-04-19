import styled from "styled-components";

const QuantityBtns = ({
  handleQuantityChange,
  itemQuantity,
  disabled,
  itemId,
}) => {
  return (
    <Wrapper>
      <ButtonDiv>
        <Button
          disabled={disabled}
          onClick={(e) => handleQuantityChange(e, "minus", itemId)}
        >
          -
        </Button>
        <Number
          disabled={disabled}
          type="number"
          value={itemQuantity}
          onChange={(e) => handleQuantityChange(e, "input", itemId)}
        />
        <Button
          disabled={disabled}
          onClick={(e) => handleQuantityChange(e, "plus", itemId)}
        >
          +
        </Button>
      </ButtonDiv>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  align-items: center;
  height: 5vh;
  width: 27vh;
  border-radius: 5px;
  background-color: var(--color-background);
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-width: 1px;
  border-style: solid;
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
const ButtonDiv = styled.div`
  display: flex;
  align-content: center;
  min-height: 10px;
  gap: 5px;
  justify-content: center;
  background-color: var(--color-background);
`;
const Button = styled.button`
  width: 100%;
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  border-style: none;
  background-color: transparent;
  padding: 0px 15px;
  :hover {
    background-color: #bfbfbf;
    border-radius: 5px;
  }
`;

export default QuantityBtns;
