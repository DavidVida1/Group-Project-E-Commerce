import React from "react";
import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { IoIosSearch } from "react-icons/io";

const SearchBar = () => {
  return (
    <SearchBarContainer>
      <IoIosSearch className="searchIcone" />
    </SearchBarContainer>
  );
};
export default SearchBar;

const SearchBarContainer = styled.section`
  position: relative;
  display: flex;
  align-items: center;
`;
