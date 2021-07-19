import React from "react";
import { Grid, Segment, Header } from "semantic-ui-react";
import { useMediaQuery } from "react-responsive";
import Navbar from "./navbar";
import Todos from "./to-dos";

// CSS
import "semantic-ui-css/semantic.min.css";
import "animate.css";
import "../index.css";

const App = () => {
  const isMobileOnly = useMediaQuery({ query: "(max-width:768px)" });

  return (
    <>
      {isMobileOnly && (
        <Header size="large" className="mt-2 my-0 text-teal" textAlign="center">
          what-to-do.app
        </Header>
      )}
      <Navbar />
      <Grid
        textAlign="center"
        stackable
        padded
        verticalAlign="middle"
        id="app-main-body"
      >
        <Grid.Column mobile={15} tablet={9} computer={6}>
          <Segment
            raised
            padded
            className="animate__animated animate__fadeIn animate__fast px-2 px-md-3"
            style={{
              backgroundColor: "whitesmoke",
              border: "2px solid #006976",
            }}
          >
            <Header size="medium" color="black">
              Pending Tasks
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
