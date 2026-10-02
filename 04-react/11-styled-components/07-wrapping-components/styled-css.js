import styled from "styled-components";
import ComponentA from "./ComponentA";

export const Wrapper = styled(ComponentA)`
  background: lightgray;
  padding: 20px;
  border-radius: 5px;
  text-align: center;

  h2 {
    color: blue;
    font-size: 20px;
  }
`;