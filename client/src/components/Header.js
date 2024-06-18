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
      className="container"
      ref={bgRef}
      onMouseEnter={handleMouseEnterNav}
      onMouseLeave={handleMouseLeaveNav}
    >
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
        <NavLink to={"/cart"}>
          <AiOutlineShoppingCart />
        </NavLink>
      </div>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.section`
  position: absolute;
  width: 100%;
  top: 50px;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 72px;
  color: var(--color-white);
  font-size: 2.3rem;

  transition-property: background-color;
  transition-duration: 0.3s;
  border-radius: 15px 15px 0px 0px;

  &.showBg {
    background-color: var(--color-white);
    color: var(--color-black);
    & section input {
      color: red;
      background-color: #ebebeb;
      &::placeholder {
        color: var(--color-black);
      }
    }
  }

  & .logo {
    font-family: var(--font-heading-title);
    font-style: italic;
    font-weight: bold;
    font-size: 30px;

    &:hover {
      color: rgb(71, 63, 244, 1);
      filter: drop-shadow(0 0 10px var(--color-white));
      text-shadow: 0 0 5px white;
    }
  }

  & .nav {
    display: flex;
    flex-direction: row;
    gap: 15px;

    & :hover {
      text-shadow: 0 0 5px var(--color-black);
    }

    & .dropdown {
      &:hover {
        background-color: var(--color-white);
        color: var(--color-black);
      }

      & .dropbtn {
        border: none;
        cursor: pointer;
      }

      & .dropdown-content {
        position: absolute;
        left: 0;
        background-color: #f1f1f1;
        width: 100%;
        height: 0%;
        top: 72px;
        box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
        z-index: 1;

        -webkit-transition: height 0.3s ease-in-out;
        transition: height 0.3s ease-in-out;
        overflow: hidden;
        border-radius: 0px 0px 15px 15px;

        & .categoryTitle {
          padding: 10px 0px 0px 16px;
          font-size: 2rem;
          font-family: var(--font-heading-title);
          color: rgb(51, 43, 224, 1);
          box-shadow: none;
        }

        & a {
          padding: 12px 16px;
          text-decoration: none;
          display: block;
          color: var(--color-black);

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
    gap: 30px;

    & svg {
      padding: 5px 25px;
      border-radius: 15px;
      background-color: rgb(71, 63, 244, 1);
      &:hover {
        background-color: rgb(51, 43, 224, 1);
      }
    }
  }
`;

export default Header;
