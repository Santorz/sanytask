import React from "react";
import { Segment } from "semantic-ui-react";

const MainNav = () => {
  return (
    <Segment
      className="position-relative px-2 px-md-3 px-lg-4 px-xl-5 my-0 w-100 rounded-0"
      id="landing-page-nav"
      raised
    >
      <h2 id="landing-page-nav-app-name" className="">
        my-next-task
      </h2>
    </Segment>
  );
};

export default MainNav;
