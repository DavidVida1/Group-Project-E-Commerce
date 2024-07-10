import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { IoMdSearch } from "react-icons/io";

const SearchBar = () => {
  const [itemsArr, setItemsArr] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchBarRef = useRef(null);

  useEffect(() => {
    setIsLoading(true);
    fetch(`/api/get-items`)
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        if (data.status === 200) {
          setItemsArr(data.data);
        } else {
          window.alert(data.message);
          throw new Error(data.message);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        window.alert(error);
      });
  }, []);

  useEffect(() => {
    if (searchTerm) {
      setIsLoading(true);
      const results = itemsArr.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredItems(results.slice(0, 3));
      setIsLoading(false);
    } else {
      setFilteredItems([]);
    }
  }, [searchTerm, itemsArr]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target)
      ) {
        setFilteredItems([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <SearchBarWrapper ref={searchBarRef}>
      <div className="inputWrapper">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <IoMdSearch className="searchIcon" />
      </div>

      {isLoading && searchTerm && <p>Searching...</p>}
      {filteredItems.length > 0 && (
        <Dropdown>
          {filteredItems.map((item) => (
            <DropdownItem key={item._id}>
              <a href={`/item/${item._id}`}>
                <img src={item.imageSrc} alt={item.name} />
                <p>{item.name}</p>
              </a>
            </DropdownItem>
          ))}
        </Dropdown>
      )}
    </SearchBarWrapper>
  );
};

const SearchBarWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  & .inputWrapper {
    position: relative;
    width: 100%;

    & input {
      width: 100%;
      min-width: 300px;
      padding: 10px 5px 10px 10px;
      font-size: 16px;
      border-radius: var(--radius-button);
      background: rgba(255, 255, 255, 0.15);
      mix-blend-mode: difference;
      border: none;

      &::placeholder {
        color: white;
        mix-blend-mode: difference;
      }
    }

    & .searchIcon {
      position: absolute;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
      pointer-events: none;
      color: var(--font-white);
      mix-blend-mode: difference;
    }
  }
`;

const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: white;
  max-height: 300px;
  padding: 0px 5px;
  z-index: 1000;
`;

const DropdownItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;

  & a {
    display: flex;
    flex-direction: row !important;
    align-items: center;
    width: 100%;
    text-decoration: none;

    & img {
      width: 40px;
      height: 40px;
      object-fit: cover;
      margin-right: 10px;
    }

    & p {
      margin: 0;
      font-size: 14px;
      visibility: visible !important;
      color: var(--font-black);
      &:hover {
        color: var(--font-purple);
      }
    }
  }
`;

export default SearchBar;
