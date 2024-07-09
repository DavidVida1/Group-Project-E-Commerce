import { useRef, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const BottomHeader = ({ itemsCategory, locationArr, setBodyLocation }) => {
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);
  const [headerItem, setHeaderItem] = useState(null);

  useEffect(() => {
    fetch(`/api/get-item/6951`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setHeaderItem(data.data); // Assuming data.items contains the array of items
        } else {
          throw new Error(data.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching item 6951:", error);
        window.alert(`Failed to fetch item 6951: ${error.message}`);
      });
    console.log(headerItem);
  }, []);

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
            <h4>Categories</h4>
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

          <div className="dropdownWrapper">
            <h4>Body Location</h4>
            {locationArr ? (
              locationArr.map((location) => (
                <NavLink key={location}>{location}</NavLink>
              ))
            ) : (
              <h1>Loading locations...</h1>
            )}
          </div>
          <div className="dropdownWrapper">
            <h4>Customer Support</h4>

            <NavLink>Customer Service</NavLink>

            <NavLink>Need a Repair</NavLink>

            <NavLink>Repair Order Status</NavLink>
            <NavLink>FAQs</NavLink>

            <NavLink>Warranty</NavLink>

            <NavLink>Watch Size Guide</NavLink>

            <NavLink>Contact Us</NavLink>
          </div>

          <a href={`/item/6951`} className="itemWrapper">
            {headerItem && (
              <>
                <img src={headerItem.imageSrc} alt={headerItem.name} />
                <h2>{headerItem.name}</h2>
              </>
            )}
          </a>
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
  text-transform: uppercase;

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
      font-weight: var(--font-weight-500);
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
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-template-rows: 1fr;
      left: 0;
      justify-items: center;
      background-color: var(--bg-header);
      width: 100%;
      height: 0%;
      top: 100%;
      z-index: 100;
      -webkit-transition: height 0.3s ease-in-out;
      transition: height 0.3s ease-in-out;
      overflow: hidden;
      border-radius: 0px 0px 15px 15px;

      & > :first-child {
        background-color: rgba(71, 63, 244, 0.04);
        border-radius: 0px 15px 0px 0px;
      }

      & .dropdownWrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 15px;
        width: 100%;
        font-size: var(--font-size-18);
        font-weight: var(--font-weight-500);
        color: var(--font-purple);
        box-shadow: none;

        & a {
          display: flex;
          flex-direction: column;
          align-self: left;
          text-decoration: none;
          width: 60%;
          display: block;
          color: var(--font-black);

          &:hover {
            color: var(--font-purple);
            box-shadow: none;
          }
        }
      }

      &.show {
        height: 500px;
      }

      & .itemWrapper {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        &:hover {
          color: var(--font-purple);
        }

        &:after {
          content: "";
          position: absolute;
          display: block;
          border-radius: 15px 0px 0px 0px;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 2;
          opacity: 1;
          background: linear-gradient(
            to bottom,
            rgba(0, 204, 255, 0.1),
            rgba(71, 63, 244, 0.04)
          );
        }

        & img {
          width: 350px;
          height: auto;
        }

        & h2 {
          font-size: var(--font-size-18);
        }
      }
    }
  }
`;

export default BottomHeader;
