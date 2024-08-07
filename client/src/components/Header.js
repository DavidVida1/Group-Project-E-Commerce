import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import SearchBar from "./SearchBar";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom"; // Import useLocation
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { GiWatch } from "react-icons/gi";
import { CiLocationOn } from "react-icons/ci";
import { FaDev } from "react-icons/fa";
import Sidebar from "./Sidebar";
import BottomHeader from "./BottomHeader";

const Header = ({ setBodyLocation }) => {
  // State to hold the category items fetched from the API
  const [itemsCategory, setItemsCategory] = useState(null);

  // State to hold the category items fetched from the API
  const [locationArr, setLocationArr] = useState(null);

  // State to track if the sidebar is open or closed
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // State to manage the visibility of the promotion banner
  const [isPromotionVisible, setIsPromotionVisible] = useState(true);

  // State to determine if the screen width is 1280px or less (for mobile view)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1280);

  // State to manage the CSS position of the HeaderContainer (absolute or fixed)
  const [headerPosition, setHeaderPosition] = useState("absolute");

  // State to store the previous scroll position for scroll direction detection
  const [prevScrollY, setPrevScrollY] = useState(0);

  // Refs for the dropdown and background elements
  const dropdownRef = useRef(null);
  const bgRef = useRef(null);
  const timeoutRef = useRef(null);

  const location = useLocation(); // Get the current location

  // Fetch category data from the API and set it to state
  useEffect(() => {
    fetch(`/api/get-categories`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          // Map the data to a sorted list of categories
          const categories = data.Categories.map((obj) => obj.category);
          setItemsCategory(categories.sort());
        } else {
          // Show an alert if there is an error
          window.alert(data.message);
          throw new Error(data.message);
        }
      })
      .catch((error) => {
        // Show an alert if there is a fetch error
        window.alert(error);
      });
  }, []); // Empty dependency array to run only on mount

  // Fetch category data from the API and set it to state
  useEffect(() => {
    fetch(`/api/get-bodyLocation`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          // Map the data to a sorted list of categories
          setLocationArr(data.bodyLocations.map((obj) => obj.name));
        } else {
          // Show an alert if there is an error
          window.alert(data.message);
          throw new Error(data.message);
        }
      })
      .catch((error) => {
        // Show an alert if there is a fetch error
        window.alert(error);
      });
  }, []); // Empty dependency array to run only on mount

  // Handle window resizing to adjust the mobile view
  useEffect(() => {
    const handleResize = () => {
      // Update the isMobile state based on the window width
      setIsMobile(window.innerWidth <= 1280);

      // Close the sidebar if the window width is greater than 1280px
      if (window.innerWidth > 1280) setIsSidebarOpen(false);
    };

    // Add event listener for resize
    window.addEventListener("resize", handleResize);

    // Call handleResize to set initial state
    handleResize();

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array to run only on mount

  // Handle scroll events to manage promotion visibility and header position
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (window.innerWidth > 1280) {
        if (currentScrollY > prevScrollY) {
          setHeaderPosition("absolute");
        } else if (currentScrollY < prevScrollY) {
          setHeaderPosition("fixed");
        }

        // Update prevScrollY to the current scroll position
        setPrevScrollY(currentScrollY);

        // Show or hide the promotion banner based on scroll position
        if (currentScrollY === 0) {
          setIsPromotionVisible(true);
        } else {
          setIsPromotionVisible(false);
        }
      } else {
        // Manage promotion visibility for mobile view
        setIsPromotionVisible(currentScrollY === 0);
        setHeaderPosition(currentScrollY > 0 ? "fixed" : "absolute");
      }

      // Add or remove 'showBg' class based on scroll position
      if (window.scrollY > 0 || location.pathname !== "/") {
        bgRef.current.classList.add("showBg");
      } else if (window.scrollY === 0 && isSidebarOpen === "true") {
        bgRef.current.classList.add("showBg");
      } else {
        bgRef.current.classList.remove("showBg");
      }
    };

    // Add event listener for scroll
    window.addEventListener("scroll", handleScroll);

    // Call handleScroll to set initial state based on the current scroll position
    handleScroll();

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollY]); // Dependency array includes prevScrollY for scroll direction detection

  /* Handle mouse enter on the navigation bar */
  const handleMouseEnterNav = () => {
    if (isMobile) return;
    // Clear any existing timeouts for hiding the background
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    // Add the 'showBg' class to the background element
    bgRef.current.classList.add("showBg");
  };

  /* Handle mouse leave from the navigation bar */
  const handleMouseLeaveNav = () => {
    if (isMobile) return;

    if (location.pathname === "/") {
      timeoutRef.current = setTimeout(() => {
        bgRef.current.classList.remove("showBg");
      }, 500);
    }
    // Set a timeout to remove the 'showBg' class after 500ms
  };

  /* 
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
  };*/

  /* Toggle the sidebar open/close state */
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    setIsPromotionVisible(isSidebarOpen);
    if (isSidebarOpen && window.scrollY === 0) {
      bgRef.current.classList.add("showBg");
    } else {
      bgRef.current.classList.remove("showBg");
    }
  };

  useEffect(() => {
    if (location.pathname !== "/" && window.scrollY === 0) {
      bgRef.current.classList.add("showBg");
    } else {
      bgRef.current.classList.remove("showBg");
    }
  }, [location.pathname]);

  return (
    <HeaderContainer position={headerPosition}>
      <div
        ref={bgRef}
        className={`headerWrapper ${isSidebarOpen ? "showBg" : ""}`}
        onMouseEnter={handleMouseEnterNav}
        onMouseLeave={handleMouseLeaveNav}
      >
        {isPromotionVisible && (
          <div className="promotion">
            <p>
              DISCOVER THE THE POLAR RC3 GPS FITNESS WATCH <span>HERE</span>
            </p>
          </div>
        )}

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
                  {/*<p>Collection</p>*/}
                </a>
              </li>
              <li>
                <a>
                  <CiLocationOn />
                  {/*<p>Location</p>*/}
                </a>
              </li>
              <li>
                <SearchBar />
              </li>
              <li>
                <a href={"/cart"}>
                  <AiOutlineShoppingCart />
                  {/*<p>Cart</p>*/}
                </a>
              </li>
            </ul>

            {isMobile && (
              <div className="burgerMenu" onClick={toggleSidebar}>
                {isSidebarOpen ? (
                  <div className="closeButton">
                    <AiOutlineClose />
                    <p>Close</p>
                  </div>
                ) : (
                  <div className="menuButton">
                    <AiOutlineMenu />
                    <p>Menu</p>
                  </div>
                )}
              </div>
            )}
          </nav>
        </div>

        {!isMobile && (
          <BottomHeader
            itemsCategory={itemsCategory}
            locationArr={locationArr}
            setBodyLocation={setBodyLocation}
          />
        )}
      </div>
      <SidebarContainer
        className={isSidebarOpen ? "sidebarOpen" : "sidebarClosed"}
      >
        {isSidebarOpen && (
          <Sidebar itemsCategory={itemsCategory} locationArr={locationArr} />
        )}
      </SidebarContainer>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.section`
  /* Positioning based on the prop passed from the component */
  position: ${({ position }) => position};
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;

  & .headerWrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    background: transparent;
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
      width: 100%;
      background-color: var(--bg-purple);

      & p {
        font-size: var(--font-size-15);
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

      & .rightMenu .burgerMenu .menuButton {
        color: var(--font-black) !important;
      }

      & section input {
        &::placeholder {
          color: var(--font-black) !important;
        }
      }
    }

    & .sidebarOpen {
      right: 0;
      transition: right 0.3s ease-in-out;
    }

    & .sidebarClosed {
      right: -100%;
      transition: right 0.3s ease-in-out;
    }

    & .headerTop {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: 1fr;
      height: var(--header-height);
      padding-top: 10px;
      width: 100%;
      margin-bottom: 5px;

      & .leftHeader {
        display: flex;
        align-items: center;
        justify-self: start;
        font-size: var(--font-size-30);
        transition: color 0.2s ease-in;
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
          align-items: center;
          font-size: var(--font-size-30);

          @media screen and (max-width: 1280px) {
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
              transition: color 0.2s ease-in;

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

        & .burgerMenu {
          display: none;
          font-size: var(--font-size-30);
          font-weight: var(--font-weight-500);
          cursor: pointer;

          & .menuButton,
          & .closeButton {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 5px;
            transition: color 0.2s ease-in;
          }

          & .menuButton {
            color: var(--font-white);
            &:hover {
              color: var(--font-purple);
            }
          }

          & .closeButton {
            color: var(--font-black);
            &:hover {
              color: var(--font-purple);
            }
          }

          & p {
            font-size: var(--font-size-15);
            font-weight: var(--font-weight-500);
          }

          @media screen and (max-width: 1280px) {
            display: flex;
            flex-direction: column;
            justify-content: center;
            justify-self: end;
            align-items: center;
          }
        }
      }
    }
  }
`;

const SidebarContainer = styled.div`
  position: fixed;
  width: 100%;
  right: -100%; // Start off-screen to the right
  width: 100%;
  top: calc(var(--promotion-height) +5px);
  height: 100%;
  background-color: var(--bg-header);
  z-index: 200;
  display: flex;
  flex-direction: column;
  align-items: left;
  transition: right 0.3s ease-in-out; // Transition for sliding effect

  &.sidebarOpen {
    right: 0; // Moves sidebar into view
  }
`;

export default Header;
