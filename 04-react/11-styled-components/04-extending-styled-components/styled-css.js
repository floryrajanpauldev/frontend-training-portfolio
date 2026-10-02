import styled from "styled-components";

export const Button = styled.button`
  background: blue;
  color: white;
  padding: 10px 20px;
  width: 120px;
  height: 40px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

export const NewButton = styled(Button)`
  background: white;
  color: black;
  border: 2px solid black;
`;