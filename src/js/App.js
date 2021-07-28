import React, { useRef, useEffect } from "react";
import { Grid, Segment, Header, Ref } from "semantic-ui-react";
import { useMediaQuery } from "react-responsive";
import Navbar from "./navbar";
import Todos from "./to-dos";
import CreateNewTodoModal from "./createNewTodo";

// CSS
import "semantic-ui-css/semantic.min.css";
import "animate.css";
import "../index.css";

const App = () => {
  const isMobileOnly = useMediaQuery({ query: "(max-width:768px)" });
  const mobileNavRef = useRef(null);
  const todosContainerRef = useRef(null);

  const adjustMarginBottom = () => {
    if (document.readyState === "complete") {
      let mobileNavHeight = mobileNavRef.current.clientHeight;
      todosContainerRef.current.style.marginBottom = `${
        mobileNavHeight + 20
      }px`;
      console.log(todosContainerRef.current.style.marginBottom);
    }
  };
  useEffect(() => {
    if (isMobileOnly) {
      document.addEventListener("readystatechange", adjustMarginBottom);
    }
    return () =>
      document.removeEventListener("readystatechange", adjustMarginBottom);
  }, [isMobileOnly]);

  return (
    <>
      {isMobileOnly && (
        <Header size="large" className="mt-2 my-0 text-teal" textAlign="center">
          what-to-do.app
        </Header>
      )}
      <Navbar ref={mobileNavRef} />
      <Grid
        textAlign="center"
        stackable
        padded
        verticalAlign="middle"
        id="app-main-body"
      >
        <Grid.Column mobile={15} tablet={9} computer={6}>
          <Ref innerRef={todosContainerRef}>
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
          </Ref>
        </Grid.Column>
      </Grid>

      <CreateNewTodoModal />
    </>
  );
};

export default App;
