import { useState } from "react";
import styled from "styled-components";
import SearchBar from "./SearchBar";
import { NavLink } from "react-router-dom";
import { RiArrowDropDownLine } from "react-icons/ri";
import { RiArrowDropUpLine } from "react-icons/ri";

const Sidebar = ({ itemsCategory }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <SidebarContainer>
      <div className="sidebarWrapper">
        <div className="collectionsDropdown" onClick={toggleDropdown}>
          <p>Collections</p>
          <RiArrowDropDownLine />
        </div>
        {isDropdownOpen && (
          <Dropdown>
            {itemsCategory.map((category) => (
              <DropdownItem key={category} to={`/category/${category}`}>
                {category}
              </DropdownItem>
            ))}
          </Dropdown>
        )}
        <NavLink to="/location">Location</NavLink>
        <NavLink to="/cart">Cart</NavLink>
        <SearchBar />
      </div>
    </SidebarContainer>
  );
};

const SidebarContainer = styled.div`
  position: fixed;
  width: 100%;
  top: calc(var(--header-height) + var(--promotion-height) + 5px);
  height: 100dvh;
  background-color: var(--bg-header);
  z-index: 200;
  display: flex;
  flex-direction: column;
  align-items: left;
  border-top: 1px solid var(--bg-grey);

  .sidebarWrapper {
    width: 98%;
    & a {
      margin: 10px 0;
      font-size: var(--font-size-30);
      font-weight: var(--font-weight-500);
      color: var(--font-black);
      text-decoration: none;

      &:hover {
        color: var(--font-purple);
      }
    }

    .collectionsDropdown {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
  }
`;

const Dropdown = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px; /* To indent the dropdown items */
`;

const DropdownItem = styled(NavLink)`
  margin: 5px 0;
  font-size: var(--font-size-20);
  color: var(--font-black);
  text-decoration: none;

  &:hover {
    color: var(--font-purple);
  }
`;

export default Sidebar;
