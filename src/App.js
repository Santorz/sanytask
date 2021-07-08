import React from "react";
import { Grid, Segment, Header } from "semantic-ui-react";
import Todos from "./to-dos";

// CSS
import "semantic-ui-css/semantic.min.css";
import "./index.css";
const App = () => {
  return (
    <>
      <Grid textAlign="center" stackable padded verticalAlign="middle">
        <Grid.Column mobile={14} tablet={9} computer={8}>
          <Segment raised padded color="teal">
            <Header size="large" color="teal" style={{ marginTop: ".5rem" }}>
              Basic Todo App
            </Header>
            <h4 style={{ margin: "1rem 0" }}>
              All your todo items are displayed here
            </h4>
            {/* Todos Part */}
            <Todos />
            {/* End of Todos Part */}
          </Segment>
        </Grid.Column>
      </Grid>
    </>
  );
};

export default App;
