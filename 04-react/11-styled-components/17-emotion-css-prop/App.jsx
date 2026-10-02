/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";

const buttonStyle = css`
  background: #3057b9;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
`;

const filledStyle = css`
  background: #3057b9;
  color: white;
  padding: 10px 20px;
  border: 2px solid #3057b9;
  border-radius: 5px;
`;

const outlineStyle = css`
  background: transparent;
  color: #3057b9;
  padding: 10px 20px;
  border: 2px solid #3057b9;
  border-radius: 5px;
`;

function App() {
    const variant = "outline";

    return (
        <div>
            <h2>Emotion CSS Prop</h2>
            {/* React inline style property */}
            <button
                style={{
                    backgroundColor: "blue",
                    color: "white",
                    padding: "10px 20px",
                }}
            >
                Save
            </button>
            {/* Emotion CSS prop */}
            <button
                css={`
    background: blue;
    color: white;
    padding: 10px 20px;
  `}
            >
                Save
            </button>

            {/* Basic CSS prop */}
            <button css={buttonStyle}>
                Basic Button
            </button>

            <br />
            <br />

            {/* Conditional CSS */}
            <button
                css={
                    variant === "outline"
                        ? outlineStyle
                        : filledStyle
                }
            >
                Conditional Button
            </button>
        </div>
    );
}

export default App;