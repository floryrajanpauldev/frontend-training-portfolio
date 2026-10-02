import styled from "styled-components";
import {
  colors,
  spacing,
  borderRadius,
  getStatusColor,
} from "./StyledUtils";

export const Card = styled.div`
  background: ${colors.white};
  color: ${colors.dark};
  padding: ${spacing.medium};
  border-radius: ${borderRadius.medium};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  margin: 20px;
`;

export const CardTitle = styled.h2`
  color: ${colors.primary};
`;

export const StatusText = styled.span`
  color: ${({ isError, isSuccess }) =>
    getStatusColor({
      isError,
      isSuccess,
    })};
`;