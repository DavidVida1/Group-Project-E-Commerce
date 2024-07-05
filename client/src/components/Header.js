import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import SearchBar from "./SearchBar";
import { NavLink } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { GiWatch } from "react-icons/gi";
import { CiLocationOn } from "react-icons/ci";
import { FaDev } from "react-icons/fa";

const Header = ({ setBodyLocation }) => {
  const [itemsCategory, setItemsCategory] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
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

    /*BURGER BREAKPOINT*/
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  /*HEADER HOVER EFECT*/
  const handleMouseEnterNav = () => {
    if (isMobile) return;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    bgRef.current.classList.add("showBg");
  };

  const handleMouseLeaveNav = () => {
    if (isMobile) return;
    timeoutRef.current = setTimeout(() => {
      bgRef.current.classList.remove("showBg");
    }, 500);
  };

  const handleMouseEnterCollections = () => {
    if (isMobile) return;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    dropdownRef.current.classList.add("show");
  };

  const handleMouseLeaveCollections = () => {
    if (isMobile) return;
    timeoutRef.current = setTimeout(() => {
      dropdownRef.current.classList.remove("show");
    }, 300);
  };

  /*OPENING SIDEBAR*/
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    bgRef.current.classList.add("showBg");
  };

  return (
    <HeaderContainer
      ref={bgRef}
      className={isSidebarOpen ? "showBg" : ""}
      onMouseEnter={handleMouseEnterNav}
      onMouseLeave={handleMouseLeaveNav}
    >
      <div className="promotion">
        <p className="">
          DISCOVER THE T-TOUCH CONNECT SPORT COLLECTION <span>HERE</span>
        </p>
      </div>

      <div className="headerTop headerContainer">
        <div className="leftHeader">
          <a href={"https://github.com/DavidVida1"}>
            <FaDev />
          </a>
        </div>
        <div className="middleHeader">
          <a className="logo" href={"/"}>
            AllStar
          </a>
        </div>
        <nav className="rightMenu">
          <ul>
            <li>
              <a>
                <GiWatch />
                <p>Collection</p>
              </a>
            </li>
            <li>
              <a>
                <CiLocationOn />
                <p>Location</p>
              </a>
            </li>
            <li>
              <a>
                <SearchBar />
                <p>Search</p>
              </a>
            </li>
            <li>
              <a href={"/cart"}>
                <AiOutlineShoppingCart />
                <p>Cart</p>
              </a>
            </li>
          </ul>

          {isMobile && (
            <div className="burgerMenu" onClick={toggleSidebar}>
              {isSidebarOpen ? (
                <div className="burgerButton">
                  <AiOutlineClose />
                  <p>Close</p>
                </div>
              ) : (
                <div className="burgerButton">
                  <AiOutlineMenu />
                  <p>Menu</p>
                </div>
              )}
            </div>
          )}
        </nav>
      </div>

      <div className="bottomHeader">
        {!isMobile && (
          <div
            className="dropdown"
            onMouseEnter={handleMouseEnterCollections}
            onMouseLeave={handleMouseLeaveCollections}
          >
            <div className="dropbtn">Collection</div>
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
        )}
      </div>

      {isSidebarOpen && (
        <Sidebar>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/collections">Collections</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/cart">Cart</NavLink>

          <SearchBar />
        </Sidebar>
      )}
    </HeaderContainer>
  );
};

const HeaderContainer = styled.section`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  top: var(--promotion-height);
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  color: var(--font-white);
  font-size: var(--font-size-25);
  transition-property: background-color;
  transition-duration: 0.3s;

  & .promotion {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: var(--promotion-height);
    margin-top: 30px;
    width: 100%;
    background-color: var(--bg-purple);

    & p {
      font-size: 1.5rem;
      color: var(--font-white);
      & span {
        cursor: pointer;
        text-decoration: underline;
      }
    }
  }

  &.showBg {
    background-color: var(--bg-header);
    color: var(--font-black);
    & section input {
      &::placeholder {
        color: var(--font-black);
      }
    }
  }

  & .headerTop {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr;
    height: var(--header-height);
    padding-top: 5px;
    width: 100%;

    & .leftHeader {
      display: flex;
      align-items: center;
      justify-self: start;
      font-size: var(--font-size-30);

      &:hover {
        color: var(--font-purple);
      }
    }

    & .middleHeader {
      justify-self: center;
    }

    & .rightMenu {
      display: flex;
      flex-direction: row;
      justify-self: end;

      & ul {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-template-rows: 1fr;
        font-size: var(--font-size-30);

        @media screen and (max-width: 768px) {
          display: none;
        }

        & li {
          & a {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            text-transform: uppercase;

            & svg {
              margin-bottom: 5px;
            }

            &:hover {
              color: var(--font-purple);

              & p {
                visibility: visible;
              }
            }

            & p {
              visibility: hidden;
              font-size: var(--font-size-15);
              font-weight: var(--font-weight-500);
            }
          }
        }
      }

      & .burgerMenu .burgerButton {
        display: none;
        font-size: var(--font-size-30);
        cursor: pointer;
        color: var(--font-white);

        &:hover {
          color: var(--font-purple);
        }

        @media screen and (max-width: 768px) {
          display: flex;
          flex-direction: column;
          justify-content: center;
          justify-self: end;
          align-items: center;
        }

        & svg {
          margin-bottom: 5px;
        }

        & p {
          font-size: var(--font-size-15);
          font-weight: var(--font-weight-500);
        }
      }
    }
  }

  & .bottomHeader {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    justify-self: center;
    height: 100%;
    width: 100%;

    & .dropdown {
      & .dropbtn {
        padding-top: 10px;
        border: none;
        cursor: pointer;
        text-transform: uppercase;
        font-size: var(--font-size-18);
        font-weight: 500;
      }

      & .dropdown-content {
        position: absolute;
        left: 0;
        background-color: var(--bg-header);
        width: 100%;
        height: 0%;
        top: calc(var(--header-height)+var(--promotion-height));
        z-index: 1;
        -webkit-transition: height 0.3s ease-in-out;
        transition: height 0.3s ease-in-out;
        overflow: hidden;
        border-radius: 0px 0px 15px 15px;

        & .categoryTitle {
          padding: 10px 0px 0px 16px;
          font-size: var(--font-size-25);
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
`;

const Sidebar = styled.div`
  position: fixed;
  width: 250px;
  top: calc(
    var(--header-height) + var(--promotion-height)
  ); /* Place it directly under the header */
  right: 0;
  height: calc(100dvh - 72px);
  background-color: var(--bg-black);
  z-index: 200;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;

  & a {
    margin: 10px 0;
    font-size: 1.5rem;
    color: var(--font-white);
    text-decoration: none;

    &:hover {
      color: var(--font-purple);
    }
  }
`;

export default Header;
