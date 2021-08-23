import React from "react";
import MainNav from "./MainNav";
import { Container, Image } from "semantic-ui-react";

// CSS
import "../css/404-page.css";

// MEDIA
import error404Pic from "../media/404.svg";

const Body = () => {
  React.useEffect(() => {
    document.title = "Error | my-next-task";
  }, []);
  return (
    <>
      <MainNav isMainPageNav={false} />
      <Container fluid className="mt-3">
        <h2 className="text-center user-select-none">Page not found</h2>
        <Image
          src={error404Pic}
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
          id="error-404-image"
          className="mx-auto"
          style={{ cursor: "not-allowed" }}
        />
      </Container>
    </>
  );
};

export default Body;
