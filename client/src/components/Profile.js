import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SmallItem from "./SmallItem";
import styled from "styled-components";

const Profile = () => {
  const { companyId } = useParams();
  const [companyData, setCompanyData] = useState(null);
  const [items, setItems] = useState(null);

  useEffect(() => {
    fetch(`/api/get-company/${companyId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status !== 200) {
          window.alert(data.message);
          throw new Error(data.message);
        }
        setCompanyData(data.data);
      });
  }, []);

  useEffect(() => {
    fetch(`/api/get-company-items/${companyId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status !== 200) {
          window.alert(data.message);
          throw new Error(data.message);
        }
        setItems(data.data);
      });
  }, []);

  return (
    <Wrapper>
      {companyData ? (
        <Location>
          <h3>Company: </h3>

          <p>{companyData.name}</p>
          <a href={companyData.url}>{companyData.url}</a>
          <p>Country: {companyData.country}</p>
        </Location>
      ) : (
        <h2>Loading...</h2>
      )}
      <div>
        {items ? (
          <SmallItemWrapper>
            {items.map((item) => (
              <SmallItem item={item} key={item._id} />
            ))}
          </SmallItemWrapper>
        ) : (
          <h2>Loading...</h2>
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
  padding-left: 150px;
  padding-top: 20px;
  padding-bottom: 50px;
  width: 100%;
  gap: 15px;
  min-height: 400px;
`;
const Location = styled.div`
  display: grid;
  position: absolute;
  align-self: flex-start;
  place-items: center;
  font-family: var(--Font-heading-title);
  font-weight: bold;
  font-size: 20px;
  border-radius: 5px;
  width: 240px;
  height: 360px;
  top: 30px;
  left: 20px;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  h3 {
    box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px;
  }
  p {
    box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px;
  }
  a {
    box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px;
  }
`;
const SmallItemWrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
  padding-left: 110px;
  padding-top: 10px;
  padding-bottom: 50px;
  width: 100%;
  row-gap: 10px;
  column-gap: 0px;
  min-height: 400px;
`;

export default Profile;
