import React from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

const buttonStyle = css`
  border: none;
  border-radius: 4px;
  font-size: 1.5rem;
  font-weight: bold;
  // padding: -1rem 1rem;
  color: white;
  outline: none;
  padding: 0.25rem 1rem;
  cursor: pointer;
  background: #3e81f6 !important;
  &:hover {
    background: black !important;
  }
  ${(props) =>
    props.fullWidth &&
    css`
      padding-top: 0.75rem;
      padding-bottom: 0.75rem;
      width: 100%;
      font-size: 1.125rem;
    `}
  ${(props) =>
    props.cyan &&
    css`
      background: #3e81f6;
      &:hover {
        background: grey;
      }
    `}
    &:disabled {
    background: grey;
    color: grey;
    cursor: not-allowed;
  }
`;

const StyledButton = styled.button`
  ${buttonStyle}
`;

const StyledLink = styled(Link)`
  ${buttonStyle}
`;

const Button = (props) => {
  return props.to ? (
    <StyledLink {...props} cyan={props.cyan ? 1 : 0} />
  ) : (
    <StyledButton {...props} />
  );
};

export default Button;
