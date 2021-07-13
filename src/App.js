import React from "react";
import { Grid, Segment, Header /*Accordion*/ } from "semantic-ui-react";
import Todos from "./to-dos";

// CSS
import "semantic-ui-css/semantic.min.css";
import "animate.css";
import "./index.css";

/*const panels = [
  {
    key: "what-is-dog",
    title: "What is a dog?",
    content: [
      "A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome",
      "guest in many households across the world.",
    ].join(" "),
  },
  {
    key: "kinds-of-dogs",
    title: "What kinds of dogs are there?",
    content: [
      "There are many breeds of dogs. Each breed varies in size and temperament. Owners often select a breed of dog",
      "that they find to be compatible with their own lifestyle and desires from a companion.",
    ].join(" "),
  },
  {
    key: "acquire-dog",
    title: "How do you acquire a dog?",
    content: {
      content: (
        <div>
          <p>
            Three common ways for a prospective owner to acquire a dog is from
            pet shops, private owners, or shelters.
          </p>
          <p>
            A pet shop may be the most convenient way to buy a dog. Buying a dog
            from a private owner allows you to assess the pedigree and
            upbringing of your dog before choosing to take it home. Lastly,
            finding your dog from a shelter, helps give a good home to a dog who
            may not find one so readily.
          </p>
        </div>
      ),
    },
  },
]; */

const App = () => {
  return (
    <>
      <Grid textAlign="center" stackable padded verticalAlign="middle">
        <Grid.Column mobile={14} tablet={9} computer={8}>
          <Segment
            raised
            padded
            color="teal"
            className="animate__animated animate__fadeIn animate__fast"
          >
            <Header size="large" color="teal" style={{ marginTop: ".5rem" }}>
              what-todo.app
            </Header>
            {/* Todos Part */}
            <Todos />
            {/* End of Todos Part */}
          </Segment>
        </Grid.Column>
      </Grid>
      {/* <Accordion styled fluid panels={panels} /> */}
    </>
  );
};

export default App;
