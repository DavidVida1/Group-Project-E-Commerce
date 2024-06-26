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
    background-color: var(--bg-search);
    padding: 10px 15px;
    border-radius: var(--radius-button);
    border: none;

    &::placeholder {
      color: var(--font-white);
      font-family: var(--font-text);
    }

    &:focus {
      color: var(--font-black);
    }
  }
  & .searchIcone {
    position: absolute;
    right: 5px;
  }
`;
