import React from "react";
import styled from "styled-components";

const Container = styled.li`
  width: 22.2vw;
  height: 38vh;
  border: 2px solid black;
  margin: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Img = styled.img`
  width: 100%;
  height: 60%;
  border: 2px solid black;
`;
const Star = styled.div`
  align-self: flex-start;
`;
const ShopName = styled.div`
  margin-top: 2%;
  align-self: flex-start;
`;
const ShopAddress = styled.div`
  margin-top: 2%;
  align-self: flex-start;
`;
const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 2%;
  div {
    border: 2px solid black;
    margin: 0 10px 0 10px;
  }
`;
function SearchList({ shopInfo }) {
  const img = JSON.parse(shopInfo.image_src)[0].location
  const score = shopInfo.score_average ||0
  const reviewNum = shopInfo.total_views || 0

  return (
    <Container>
      <Star>☆</Star>
      <Img src={img}></Img>
      <ShopName>{shopInfo.shop_name}</ShopName>
      <ShopAddress>{shopInfo.shop_category_city}</ShopAddress>
      <FlexRow>
        <div>별점 : {score}</div>
        <div>리뷰 개수 : {reviewNum}</div>
      </FlexRow>
    </Container>
  );
}

export default SearchList;
