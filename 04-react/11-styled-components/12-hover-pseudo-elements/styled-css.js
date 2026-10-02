import styled from "styled-components";

export const Card = styled.div`
  width: 300px;
  padding: 20px;
  margin: 20px;
  border: 1px solid #ccc;

  &:hover {
    transform: scale(1.03);
  }
`;

export const RecipeName = styled.h2`
  color: #3057b9;

  &::before {
    content: "Recipe: ";
    color: #008000;
  }
`;