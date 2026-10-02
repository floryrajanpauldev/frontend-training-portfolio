import styled from "styled-components";

export const Card = styled.div`
  background: ${({ theme }) =>
    theme.colors.background};

  color: ${({ theme }) =>
    theme.colors.text};

  padding: ${({ theme }) =>
    theme.spacing.medium};

  border-radius: ${({ theme }) =>
    theme.borderRadius.medium};
`;

export const Title = styled.h2`
  color: ${({ theme }) =>
    theme.colors.primary};
`;