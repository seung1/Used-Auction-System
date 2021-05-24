import React from "react";
import HeaderForm from "../containers/common/HeaderForm";
import { useSelector } from "react-redux";
import styled from "styled-components";

const LandingPage = () => {
  const Wrapper = styled.div`
    font-size: 2rem;
  `;
  const { user } = useSelector(({ user }) => ({ user: user.user }));
  return (
    <>
      <HeaderForm />
      <Wrapper>used-Auction의 메인 페이지입니다.</Wrapper>
      {user ? (
        <Wrapper>사용자 아이디는 {user.username} 입니다.</Wrapper>
      ) : (
        <Wrapper>로그인 해주세요!!</Wrapper>
      )}
    </>
  );
};

export default LandingPage;
