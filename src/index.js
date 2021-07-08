import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Container } from "semantic-ui-react";

// CSS
import "semantic-ui-css/semantic.min.css";

const MainContainer = () => {
  return (
    <Container>
      <App />
    </Container>
  );
};

ReactDOM.render(<MainContainer />, document.getElementById("root"));
