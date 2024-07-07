import { useState } from "react";
import styled from "styled-components";
import SearchBar from "./SearchBar";
import { NavLink } from "react-router-dom";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";

const Sidebar = ({ itemsCategory }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <SidebarWrapper>
      <div className="buttonDropdown" onClick={toggleDropdown}>
        <p>Collections</p>
        {isDropdownOpen ? <RiArrowDropUpLine /> : <RiArrowDropDownLine />}
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

  & :hover:not(.categoryTitle) {
    color: var(--font-purple);
  }

  .buttonDropdown {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    overflow: hidden;

    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 0.1em;
      background-color: var(--bg-purple);
      opacity: 1;
      transform: translate3d(-100%, 0, 0);
      transition: opacity 300ms, transform 300ms;
    }

    &:hover::after,
    &:focus::after {
      transform: translate3d(0, 0, 0);
    }

    svg {
      font-size: 2.5rem;
      transition: transform 0.3s ease;
    }
  }

  .dropdown {
    display: flex;
    flex-direction: column;
    margin-left: 20px; /* To indent the dropdown items */

    .categoryTitle {
      position: relative;
      color: var(--font-purple);
      padding-bottom: 15px;

      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        height: 5px;
        width: 100%;
        border-top: 1px solid var(--purple-light);
      }
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
