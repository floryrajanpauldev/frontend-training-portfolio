import styled from "styled-components";

export const ProductPrice = styled.span`
  font-weight: bold;

  color: ${({ $price }) => {
    if ($price < 100) {
      return "green";
    }

    if ($price > 100) {
      return "red";
    }

    return "#232323";
  }};
`;