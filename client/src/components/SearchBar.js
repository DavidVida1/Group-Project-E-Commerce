import React from "react";
import { useEffect, useState, useRef } from "react";
import styled from "styled-components";

const SearchBar = () => {
  return (
    <SearchBarContainer>
      <input type="text" placeholder="Search.." />
    </SearchBarContainer>
  );
};
export default SearchBar;

const SearchBarContainer = styled.section`
  & input {
    background-color: #f1f1f14d;
    padding: 10px 15px;
    border-radius: 15px;
    border: none;

    &::placeholder {
      color: var(--color-white);
    }

    &:focus {
      color: red;
    }
  }
`;
