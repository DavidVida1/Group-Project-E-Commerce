import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import SearchBar from "./SearchBar";
import { NavLink } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";

const Header = ({ setBodyLocation }) => {
  const [itemsCategory, setItemsCategory] = useState(null);
  const dropdownRef = useRef(null);
  const bgRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    fetch(`/api/get-categories`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          const categories = data.Categories.map((obj) => obj.category);
          setItemsCategory(categories.sort());
        } else {
          window.alert(data.message);
          throw new Error(data.message);
        }
      })
      .catch((error) => {
        window.alert(error);
      });
  }, []);

  const handleMouseEnterNav = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    bgRef.current.classList.add("showBg");
  };

  const handleMouseLeaveNav = () => {
    timeoutRef.current = setTimeout(() => {
      bgRef.current.classList.remove("showBg");
    }, 500);
  };

  const handleMouseEnterCollections = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    dropdownRef.current.classList.add("show");
  };

  const handleMouseLeaveCollections = () => {
    timeoutRef.current = setTimeout(() => {
      dropdownRef.current.classList.remove("show");
    }, 300);
  };

  return (
    <HeaderContainer
      ref={bgRef}
      onMouseEnter={handleMouseEnterNav}
      onMouseLeave={handleMouseLeaveNav}
    >
      <div className="headerWrapper container">
        <a className="logo" href={"/"}>
          AllStar
        </a>

        <div className="nav">
          <div>Home</div>
          <div
            className="dropdown"
            onMouseEnter={handleMouseEnterCollections}
            onMouseLeave={handleMouseLeaveCollections}
          >
            <div className="dropbtn">Collections</div>
            <div className="dropdown-content" ref={dropdownRef}>
              <div className="categoryTitle">Watches</div>
              {itemsCategory ? (
                itemsCategory.map((category) => {
                  return (
                    <NavLink
                      key={category}
                      to={`/category/${category}`}
                      onClick={() => setBodyLocation(null)}
                    >
                      {category}
                    </NavLink>
                  );
                })
              ) : (
                <h1>Loading categories...</h1>
              )}
            </div>
          </div>
          <div>About</div>
        </div>

        <div className="userOptions">
          <SearchBar />
          <a href={"/cart"} className="button">
            <AiOutlineShoppingCart />
          </a>
        </div>
      </div>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.section`
  position: absolute;
  display: flex;
  align-items: center;
  width: 100%;
  height: 72px;
  top: 36px;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  color: var(--font-white);
  font-size: var(--font-size-25);
  transition-property: background-color;
  transition-duration: 0.3s;
  /*border-radius: 15px 15px 0px 0px;*/
  &.showBg {
    background-color: var(--bg-header);
    color: var(--font-black);
    & section input {
      &::placeholder {
        color: var(--font-black);
      }
    }
  }

  & .headerWrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;

    & .nav {
      display: flex;
      flex-direction: row;
      gap: var(--gap-15);

      & .dropdown {
        & .dropbtn {
          border: none;
          cursor: pointer;
        }

        & .dropdown-content {
          position: absolute;
          left: 0;
          background-color: var(--bg-header);
          width: 100%;
          height: 0%;
          top: 72px;
          z-index: 1;
          -webkit-transition: height 0.3s ease-in-out;
          transition: height 0.3s ease-in-out;
          overflow: hidden;
          border-radius: 0px 0px 15px 15px;

          & .categoryTitle {
            padding: 10px 0px 0px 16px;
            font-size: 2rem;
            font-family: var(--font-heading-title);
            color: var(--font-purple);
            box-shadow: none;
          }

          & a {
            padding: 12px 16px;
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
    }

    & .userOptions {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: var(--gap-15);

      & .button {
        padding: 5px 30px;
        font-size: 2rem;
        box-shadow: 0 0 10px var(--font-sdw);

        &:hover {
          color: var(--white);
          border: 2px solid var(--btn-white);
          background-color: var(--btn-black);
        }
      }
    }
  }
`;

export default Header;
