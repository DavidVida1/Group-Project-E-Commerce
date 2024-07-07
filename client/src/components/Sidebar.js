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
    <SidebarWrapper>
      <div className="buttonDropdown" onClick={toggleDropdown}>
        <p>Collections</p>
        <RiArrowDropDownLine />
      </div>

      {isDropdownOpen && (
        <div className="dropdown">
          <div className="categoryTitle">Categories</div>
          {itemsCategory.map((category) => (
            <DropdownItem key={category} to={`/category/${category}`}>
              {category}
            </DropdownItem>
          ))}
        </div>
      )}
      <NavLink to="/location">Location</NavLink>
      <NavLink to="/cart">Cart</NavLink>
      <SearchBar />
    </SidebarWrapper>
  );
};

const SidebarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin: 10px 0;
  gap: 20px;
  font-size: var(--font-size-25);
  font-weight: var(--font-weight-500);
  color: var(--font-black);
  text-decoration: none;
  text-transform: uppercase;

  & :hover&:not(.categoryTitle) {
    color: var(--font-purple);
  }

  & .buttonDropdown {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 0.1em;
      background-color: var(--bg-purple);
      opacity: 1;
      transform: translate3d(-110%, 0, 0);
      transition: opacity 300ms, transform 300ms;
    }

    &:hover::after,
    &:focus::after {
      transform: translate3d(0, 0, 0);
    }
    & svg {
      font-size: 4rem;
    }
  }
  & .dropdown {
    display: flex;
    flex-direction: column;
    margin-left: 20px; /* To indent the dropdown items */

    & .categoryTitle {
      color: var(--font-purple);
    }
  }
`;

const DropdownItem = styled(NavLink)`
  margin: 15px 0;
  font-size: var(--font-size-20);
  color: var(--font-black);
  text-decoration: none;

  &:hover {
    color: var(--font-purple);
  }
`;

export default Sidebar;
