import React from "react";
import HeaderForm from "../containers/common/HeaderForm";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Button from "../components/common/Button";

const LandingPage = () => {
  const Wrapper = styled.div`
    font-size: 2rem;
    padding-top: 4rem;
    justify-content: center;
    // align-items: center;
    display: flex;
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
      {user ? (
        <Wrapper>
          사용자의 회원유형은{" "}
          {user.jointype === "user" ? "일반 사용자입니다." : "관리자입니다."}
        </Wrapper>
      ) : (
        ""
      )}
      {user ? (
        <Wrapper>
          {user.jointype === "admin" ? (
            <Button to="/admin">사용자 계정 관리버튼</Button>
          ) : (
            ""
          )}
        </Wrapper>
      ) : (
        ""
      )}
    </>
  );
};

export default LandingPage;
