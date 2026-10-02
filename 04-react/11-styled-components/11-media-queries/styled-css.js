import styled from "styled-components";

export const Card = styled.article`
  padding: 20px;
  margin: 20px;
  background: lightgray;

  @media (max-width: 768px) {
    padding: 10px;
    margin: 10px;
    background: lightblue;
  }
`;