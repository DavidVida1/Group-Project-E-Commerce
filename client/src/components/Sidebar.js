import { useState, useEffect } from "react";
import styled from "styled-components";
import SearchBar from "./SearchBar";
import { NavLink } from "react-router-dom";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { CiLocationOn } from "react-icons/ci";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { SiAircanada } from "react-icons/si";

const Sidebar = ({ itemsCategory, locationArr }) => {
  const [isCollectionsOpen, setIsCollectionsOpen] = useState(false);
  const [isBodyLocationOpen, setIsBodyLocationOpen] = useState(false);
  const [isCustomerSupportOpen, setIsCustomerSupportOpen] = useState(false);
  const [montrealTime, setMontrealTime] = useState("");

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

  useEffect(() => {
    const updateTime = () => {
      const options = {
        timeZone: "America/Montreal",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      };
      const formatter = new Intl.DateTimeFormat([], options);
      setMontrealTime(formatter.format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <SidebarWrapper>
      <section className="firstSection">
        <div
          className="buttonDropdown"
          onClick={() => toggleDropdown("collections")}
        >
          <p>Collection</p>
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
            {[
              "/customer-service",
              "/need-a-repair",
              "/repair-order-status",
              "/faqs",
              "/warranty",
              "/watch-size-guide",
              "/contact-us",
            ].map((link, index) => (
              <DropdownItem key={index} to={link}>
                {link.replace("/", "").replace(/-/g, " ")}
              </DropdownItem>
            ))}
          </div>
        )}
      </section>

      <section className="secondSection">
        <NavLink to="/location" className="test">
          <CiLocationOn />
          <p>Location</p>
        </NavLink>

        <a href={"/cart"}>
          <AiOutlineShoppingCart />
          <p>Cart</p>
        </a>
        <div>
          <SiAircanada />
          <p>Montreal: {montrealTime}</p>
        </div>
      </section>

      <section className="thirdSection">
        <SearchBar />
      </section>
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
    gap: 30px;
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

  & .secondSection {
    display: flex;
    flex-direction: column;
    gap: 30px;
    font-size: var(--font-size-25);
    font-weight: var(--font-weight-500);
    color: var(--font-black);
    text-decoration: none;
    text-transform: uppercase;

    & a {
      display: flex;
      flex-direction: row;
      gap: 5px;
    }

    & div {
      display: flex;
      flex-direction: row;
      gap: 5px;
    }
    & :hover:not(.categoryTitle) {
      color: var(--font-purple);
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

  & .thirdSection {
    border-radius: var(--radius-button);
    border: 2px solid var(--purple);
    padding: 0px 15px 0px 0px;

    & .inputWrapper {
      background: rgba(255, 255, 255, 1);
      border-radius: var(--radius-button);
    }
  }
`;

const DropdownItem = styled(NavLink)`
  margin: 15px 0;
  padding: 10px;
  font-size: var(--font-size-20);
  color: var(--font-black);
  text-decoration: none;

  &:hover {
    color: var(--font-purple);
  }

  & > a {
    margin: 15px 0;
    padding: 10px;
    font-size: var(--font-size-20);
    color: var(--font-black);
    text-decoration: none;

    &:hover {
      color: var(--font-purple);
    }
  }
`;

export default Sidebar;
