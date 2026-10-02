import {
  StyledButton,
  Title,
} from "./styled-css";

function App() {
  return (
    <div>
      <Title>Styled Components</Title>

      <StyledButton>
        Normal Button
      </StyledButton>

      <br />

      {/* Render the styled button as a link */}
      <StyledButton
        as="a"
        href="https://react.dev"
      >
        React Documentation
      </StyledButton>

      <br />

      {/* Render the styled title as an h2 */}
      <Title as="h2">
        This is an H2 Heading
      </Title>
    </div>
  );
}

export default App;