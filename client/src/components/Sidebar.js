import { useState } from "react";
import styled from "styled-components";
import SearchBar from "./SearchBar";
import { NavLink } from "react-router-dom";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";

const Sidebar = ({ itemsCategory, locationArr }) => {
  const [isCollectionsOpen, setIsCollectionsOpen] = useState(false);
  const [isBodyLocationOpen, setIsBodyLocationOpen] = useState(false);
  const [isCustomerSupportOpen, setIsCustomerSupportOpen] = useState(false);

  const toggleDropdown = (dropdown) => {
    if (dropdown === "collections") {
      setIsCollectionsOpen(!isCollectionsOpen);
      setIsBodyLocationOpen(false);
      setIsCustomerSupportOpen(false);
    } else if (dropdown === "bodyLocation") {
      setIsBodyLocationOpen(!isBodyLocationOpen);
      setIsCollectionsOpen(false);
      setIsCustomerSupportOpen(false);
    } else if (dropdown === "customerSupport") {
      setIsCustomerSupportOpen(!isCustomerSupportOpen);
      setIsCollectionsOpen(false);
      setIsBodyLocationOpen(false);
    }
  };

  return (
    <SidebarWrapper>
      <section className="firstSection">
        <div
          className="buttonDropdown"
          onClick={() => toggleDropdown("collections")}
        >
          <p>Collections</p>
          {isCollectionsOpen ? <RiArrowDropUpLine /> : <RiArrowDropDownLine />}
        </div>

        {isCollectionsOpen && (
          <div className="dropdown">
            <div className="categoryTitle">Categories</div>
            {itemsCategory.map((category) => (
              <DropdownItem key={category} to={`/category/${category}`}>
                {category}
              </DropdownItem>
            ))}
          </div>
        )}

        <div
          className="buttonDropdown"
          onClick={() => toggleDropdown("bodyLocation")}
        >
          <p>Body Location</p>
          {isBodyLocationOpen ? <RiArrowDropUpLine /> : <RiArrowDropDownLine />}
        </div>

        {isBodyLocationOpen && (
          <div className="dropdown">
            {locationArr.map((location) => (
              <DropdownItem key={location}>{location}</DropdownItem>
            ))}
          </div>
        )}

        <div
          className="buttonDropdown"
          onClick={() => toggleDropdown("customerSupport")}
        >
          <p>Customer Support</p>
          {isCustomerSupportOpen ? (
            <RiArrowDropUpLine />
          ) : (
            <RiArrowDropDownLine />
          )}
        </div>

        {isCustomerSupportOpen && (
          <div className="dropdown">
            <DropdownItem>
              <NavLink to="/customer-service">Customer Service</NavLink>
              <NavLink to="/need-a-repair">Need a Repair</NavLink>
              <NavLink to="/repair-order-status">Repair Order Status</NavLink>
              <NavLink to="/faqs">FAQs</NavLink>
              <NavLink to="/warranty">Warranty</NavLink>
              <NavLink to="/watch-size-guide">Watch Size Guide</NavLink>
              <NavLink to="/contact-us">Contact Us</NavLink>
            </DropdownItem>
          </div>
        )}
      </section>

      <NavLink to="/location" className="test">
        Location
      </NavLink>
      <NavLink to="/cart">Cart</NavLink>
      <SearchBar />
    </SidebarWrapper>
  );
};

const SidebarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 40px;
  margin: 40px 0;
  gap: 20px;
  font-size: var(--font-size-25);
  font-weight: var(--font-weight-500);
  color: var(--font-black);
  text-decoration: none;
  text-transform: uppercase;

  & .firstSection {
    display: flex;
    flex-direction: column;
    gap: 20px;
    font-size: var(--font-size-25);
    font-weight: var(--font-weight-500);
    color: var(--font-black);
    text-decoration: none;
    text-transform: uppercase;

    & :hover:not(.categoryTitle) {
      color: var(--font-purple);
    }
    & .buttonDropdown {
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

    & .dropdown {
      display: flex;
      flex-direction: column;
      margin-left: 20px; /* To indent the dropdown items */

      & .categoryTitle {
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

    &:after {
      content: "";
      height: 10px;
      align-self: center;
      width: 100%;
      border-top: 1px solid var(--purple);
      padding-bottom: 5px;
    }
  }
`;

const DropdownItem = styled(NavLink)`
  display: flex;
  flex-direction: column;
  margin: 15px 0;
  font-size: var(--font-size-20);
  color: var(--font-black);
  text-decoration: none;

  &:hover {
    color: var(--font-purple);
  }
`;

export default Sidebar;
