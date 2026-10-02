import { ThemeProvider } from "styled-components";
import { appTheme } from "./app.theme";
import { Card, Title } from "./styled-css";

function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <Card>
        <Title>Styled Components Theme</Title>

        <p>
          Theme values are available to styled
          components through props.theme.
        </p>
      </Card>
    </ThemeProvider>
  );
}

export default App;