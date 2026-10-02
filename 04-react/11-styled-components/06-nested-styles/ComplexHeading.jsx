import { Wrapper } from "./styled-css";

function ComplexHeading({ title }) {
  return (
    <Wrapper>
      <h2>{title}</h2>

      <div className="underline"></div>
    </Wrapper>
  );
}

export default ComplexHeading;