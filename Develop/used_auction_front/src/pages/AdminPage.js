import React from "react";
import HeaderForm from "../containers/common/HeaderForm";
import styled from "styled-components";
import Button from "../components/common/Button";
import removeUser from "../api/auth";

const AdminPage = () => {
  const Wrapper = styled.div`
    font-size: 2rem;
    padding-top: 4rem;
    justify-content: center;
    // align-items: center;
    display: flex;
  `;
  return(
    <>
    <HeaderForm />
      <Wrapper>사용자 목록</Wrapper>
      <Wrapper><Button to='/admin'>삭제</Button></Wrapper>
    </>
  )
  /*
  const Remove = async () => {
     try {
        await removeUser(Id);
      } catch (e) { console.log(e); } };
  return (
    <>
      <HeaderForm />
      <Wrapper>used-Auction의 메인 페이지입니다.</Wrapper>
      
      <div className="right">
        <Button onRemove={Remove}>삭제</Button>
      </div>
    </>
  );
  */
};

export default AdminPage;

