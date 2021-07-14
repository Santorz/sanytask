import React from "react";
import { Grid, Segment, Header /*Accordion*/ } from "semantic-ui-react";
import Navbar from "./navbar";
import Todos from "./to-dos";

// CSS
import "semantic-ui-css/semantic.min.css";
import "animate.css";
import "../index.css";

const App = () => {
  return (
    <>
      <Navbar />
      <Grid textAlign="center" stackable padded verticalAlign="middle">
        <Grid.Column mobile={14} tablet={8} computer={6}>
          <Segment
            padded
            color="teal"
            className="animate__animated animate__fadeIn animate__fast"
          >
            <Header size="large" color="black">
              Pending tasks
            </Header>
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
