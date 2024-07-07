import { useRef } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const BottomHeader = ({ itemsCategory, locationArr, setBodyLocation }) => {
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);

  /* Handle mouse enter on the collections dropdown */
  const handleMouseEnterCollections = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    dropdownRef.current.classList.add("show");
  };

  /* Handle mouse leave from the collections dropdown */
  const handleMouseLeaveCollections = () => {
    timeoutRef.current = setTimeout(() => {
      dropdownRef.current.classList.remove("show");
    }, 300);
  };

  return (
    <BottomHeaderWrapper>
      <div
        className="dropdown"
        onMouseEnter={handleMouseEnterCollections}
        onMouseLeave={handleMouseLeaveCollections}
      >
        <div className="dropbtn">Collection</div>
        <div className="dropdownContent" ref={dropdownRef}>
          <div className="dropdownWrapper">
            <h3>Categories</h3>
            {itemsCategory ? (
              itemsCategory.map((category) => (
                <NavLink
                  key={category}
                  to={`/category/${category}`}
                  onClick={() => setBodyLocation(null)}
                >
                  {category}
                </NavLink>
              ))
            ) : (
              <h1>Loading categories...</h1>
            )}
          </div>

          <div className="dropdownBodyWrapper">
            <h3>Body Location</h3>
            {locationArr ? (
              locationArr.map((location) => (
                <NavLink key={location}>{location}</NavLink>
              ))
            ) : (
              <h1>Loading locations...</h1>
            )}
          </div>
        </div>
      </div>
    </BottomHeaderWrapper>
  );
};

const BottomHeaderWrapper = styled.section`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  justify-self: center;
  padding-bottom: 10px;
  height: 100%;
  width: 100%;
  z-index: 100;

  & .dropdown {
    & .dropbtn {
      position: relative;
      display: block;
      height: 100%;
      padding-top: 10px;
      border: none;
      cursor: pointer;
      text-transform: uppercase;
      font-size: var(--font-size-18);
      font-weight: 500;
      padding: 0.2em 0;
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
    }

    & .dropdownContent {
      position: absolute;
      display: flex;
      flex-direction: row;
      left: 0;
      background-color: var(--bg-header);
      width: 100%;
      height: 0%;
      top: 100%;
      z-index: 100;
      -webkit-transition: height 0.3s ease-in-out;
      transition: height 0.3s ease-in-out;
      overflow: hidden;
      border-radius: 0px 0px 15px 15px;

      & .dropdownWrapper,
      .dropdownBodyWrapper {
        display: flex;
        flex-direction: column;
        padding: 10px 0px 0px 16px;
        gap: 15px;
        font-size: var(--font-size-25);
        color: var(--font-purple);
        box-shadow: none;
      }

      & .dropdownBodyWrapper {
        width: 250px;
        border: 1px solid red;

        a {
          display: flex;
          flex-wrap: wrap;
          border: 1px solid blue;
        }
      }

      & a {
        text-decoration: none;
        display: block;
        color: var(--font-black);

        &:hover {
          background-color: green;
          box-shadow: none;
        }
      }

      &.show {
        height: 400px;
      }
    }
  }
`;

export default BottomHeader;
