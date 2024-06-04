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
      <a className="logo" to={"/"}>
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
        <NavLink to={"/user"}>
          <AiOutlineUser />
        </NavLink>

        <NavLink to={"/cart"}>
          <AiOutlineShoppingCart />
        </NavLink>
      </div>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.section`
  display: flex;
  flex-direction: row;
  height: 75px;
  justify-content: space-between;
  padding: 0 20px 0 20px;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.45) 0px 25px 20px -20px;
  background: var(--color-background);
  font-size: 2rem;

  .logo {
    font-family: var(--font-heading-title);
    font-style: italic;
    font-weight: bold;
    font-size: 20px;
    &:hover {
      box-shadow: rgba(0, 102, 255, 0.4) 0px 5px;
    }
  }

  .nav {
    display: flex;
    flex-direction: row;
    gap: 30px;
    & :hover {
      box-shadow: rgba(0, 102, 255, 0.4) 0px 5px;
    }

    .dropdown {
      .dropbtn {
        border: none;
        cursor: pointer;
        &:hover {
          box-shadow: rgba(0, 102, 255, 0.4) 0px 5px;
        }
      }

      .dropdown-content {
        display: none;
        position: absolute;
        left: 0;
        background-color: #f1f1f1;
        width: 100dvw;
        top: 75px;

        box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
        z-index: 1;

        a,
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

  .userOptions {
    display: flex;
    flex-direction: row;
    gap: 20px;
  }
`;

export default Header;
