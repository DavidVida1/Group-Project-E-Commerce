import { useEffect, useState } from "react";
import styled from "styled-components";
import { NavLink, Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";

const Header = ({ setBodyLocation }) => {
  const [itemsCategory, setItemsCategory] = useState(null);

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

  return (
    <div>
      <Wrapper>
        <UList>
          <Nav>
            <AnchorTitle to={"/"}>AllStar</AnchorTitle>
          </Nav>
        </UList>
        <DivCategories>
          {itemsCategory ?
            itemsCategory.map((category) => {
              return (
                <Nav key={category}>
                  <Anchor
                    activeClassName="active"
                    to={`/category/${category}`}
                    // need to lift the state to make Category refresh items when header has been clicked
                    onClick={() => setBodyLocation(null)}
                  >
                    {category}
                  </Anchor>
                </Nav>
              );
            })
            : <h1>Loading categories...</h1>
            }
        </DivCategories>

        <UserList>
          <Nav>
            <Anchor to={"/user"}>
              <AiOutlineUser />
            </Anchor>
          </Nav>
          <Nav>
            <Anchor to={"/cart"}>
              <AiOutlineShoppingCart />
            </Anchor>
          </Nav>
        </UserList>
      </Wrapper>
    </div>
  );
};
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.45) 0px 25px 20px -20px;
`;
const UList = styled.div`
  width: 100%;
  padding: 25px;
  font-family: var(--font-text);
  font-weight: bold;
  font-size: 17px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  background-color: var(--color-background);
`;
const DivCategories = styled(UList)`
  word-wrap: break-word;
  flex-direction: row;
  font-size: 20px;
  justify-content: center;
  & nav a {
    width: max-content;
  }
`;
const UserList = styled.ul`
  display: flex;
  width: 100%;
  padding: 26px 25px;
  font-family: var(--font-text);
  font-weight: bold;
  font-size: 32px;
  align-items: center;
  justify-content: flex-end;
  background-color: var(--color-background);
`;
const Nav = styled.nav`
  display: flex;
  line-height: 35px;
  align-items: center;
  padding: 10px 15px;
  list-style-type: none;
  & {
    width: max-content;
  }
`;
const Anchor = styled(NavLink)`
  display: flex;
  text-decoration: none;
  color: white;
  width: max-content;
  color: var(--color-blackfont-text);
  &:hover {
    color: rgb(71, 103, 161);
    box-shadow: rgba(245, 245, 245, 10) 0px 5px, rgba(245, 245, 245, 1) 0px 10px,
      rgba(245, 245, 245, 1) 0px 15px, rgba(245, 245, 245, 1) 0px 20px,
      rgba(245, 245, 245, 1) 0px 25px, rgba(0, 102, 255, 0.4) 0px 30px;
  }
`;
const AnchorTitle = styled(Link)`
  text-decoration: none;
  font-size: 35px;
  font-family: var(--Font-heading-title);
  font-style: italic;
  color: white;
  color: var(--color-blackfont-text);
  letter-spacing: 0.5rem;
  &:hover {
    color: rgb(71, 103, 161);
  }
`;

export default Header;
