import React from "react";
import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { IoIosSearch } from "react-icons/io";

const SearchBar = () => {
  return (
    <SearchBarContainer>
      <input type="text" placeholder="Search.." />
      <IoIosSearch className="searchIcone" />
    </SearchBarContainer>
  );
};
export default SearchBar;

const SearchBarContainer = styled.section`
  position: relative;
  display: flex;
  align-items: center;
  & input {
    background-color: var(--color-bgSearch);
    padding: 10px 15px;
    border-radius: 15px;
    border: none;

    &::placeholder {
      color: var(--color-white);
      font-family: var(--font-text);
    }

    &:focus {
      color: red;
    }
  }
  & .searchIcone {
    position: absolute;
    right: 5px;
  }
`;
