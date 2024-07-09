import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

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
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
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
  color: var(--font-black) !important !important;

  input {
    padding: 10px;
    font-size: 16px;
  }

  p {
    margin: 0;
    padding: 10px;
    font-size: 14px;
    color: var(--font-black) !important !important;
  }
`;

const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: white;
  border: 1px solid #ccc;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
`;

const DropdownItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  color: var(--font-black) !important !important;

  &:hover {
    background-color: #f0f0f0;
  }

  img {
    width: 40px;
    height: 40px;
    object-fit: cover;
    margin-right: 10px;
  }

  p {
    margin: 0;
    font-size: 14px;
    color: var(--font-black) !important !important;
  }
`;

export default SearchBar;
