import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";

const Header = ({ setBodyLocation }) => {
  const [itemsCategory, setItemsCategory] = useState(null);
  const dropdownRef = useRef(null);

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

  const handleDropdownClick = () => {
    dropdownRef.current.classList.toggle("show");
  };

  return (
    <HeaderContainer className="container">
      <a className="logo" href={"/"}>
        AllStar
      </a>

      <div className="nav">
        <div>Home</div>
        <div className="dropdown" onClick={handleDropdownClick}>
          <div className="dropbtn">Collections</div>
          <div className="dropdown-content" ref={dropdownRef}>
            <div>Watches</div>
            {itemsCategory ? (
              itemsCategory.map((category) => {
                return (
                  <NavLink
                    key={category}
                    activeClassName="active"
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
        {/*
          <NavLink to={"/user"}>
            <AiOutlineUser />
          </NavLink>
          */}

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

  &:hover {
    background-color: var(--color-white);
    color: var(--color-black);
    border-radius: 15px 15px 5px 5px;
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
      box-shadow: rgba(71, 63, 244, 1) 0px 5px;
      text-shadow: 0 0 5px white;
    }

    & .dropdown {
      & .dropbtn {
        border: none;
        cursor: pointer;
      }

      & .dropdown-content {
        display: none;
        position: absolute;
        left: 0;
        background-color: #f1f1f1;
        width: 100%;
        top: 72px;

        box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
        z-index: 1;

        & a,
        div {
          padding: 12px 16px;
          text-decoration: none;
          display: block;
          &:hover:not(div) {
            background-color: green;
            box-shadow: none;
          }
          &:hover {
            box-shadow: none;
          }
        }
        &.show {
          display: block;
        }
      }
    }
  }

  & .userOptions {
    display: flex;
    flex-direction: row;

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
