import React from "react";
import AuthTemplate from "../components/auth/AuthTemplate";
import AdminForm from "../containers/auth/AdminForm";
import HeaderForm from "../containers/common/HeaderForm";
import styled from "styled-components";
import Button from "../components/common/Button";
import Users from "../api/auth";


const AdminPage = () => {
  return (
    <div className="AdminPage">
      <AuthTemplate>
        <AdminForm />
      </AuthTemplate>
    </div>
  );
};
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


export default AdminPage;

