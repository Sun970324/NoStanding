import React from "react";
import ReactLoading from "react-loading";
import styled from "styled-components";

const LoaderWrap = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
`;

const Loader = () => {
  return (
    <LoaderWrap>
      <ReactLoading type="spin" color="#154063" />
    </LoaderWrap>
  );
};
//데이터를 불러오는 중(로딩)일 때 원이 돌아가면서 로딩중이라는 것을 유저에게 보여줌

export default Loader;