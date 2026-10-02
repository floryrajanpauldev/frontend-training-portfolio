import styled, { keyframes } from "styled-components";

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const Loader = styled.div`
  width: 40px;
  height: 40px;

  border: 4px solid #ccc;
  border-left-color: #3057b9;
  border-radius: 50%;

  animation: ${spin} 1s linear infinite;
`;