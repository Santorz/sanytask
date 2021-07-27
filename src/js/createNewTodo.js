import React from "react";
import { useModal, Modal } from "react-morphing-modal";
import NewTodoForm from "./utils/NewTodoForm";

// CSS
import "react-morphing-modal/dist/ReactMorphingModal.min.css";

const CreateNewTodoModal = () => {
  const [docTitle, setDocTitle] = React.useState(document.title);
  React.useEffect(() => {
    document.title = docTitle;
  }, [docTitle]);

  const { modalProps, open } = useModal({
    background:
      "linear-gradient(90deg, rgba(0,36,41,1) 0%, rgba(0,105,118,1) 51%, rgba(1,182,204,1) 100%)",
    onOpen() {
      setDocTitle("Create new to-do | what-to-do.app");
      // alert("Opened");
    },
    onClose() {
      setDocTitle("Dashboard | what-to-do.app");
      // alert("Closed");
    },
  });
  // const triggerCreateNewTodoModalRef = useRef(null);
  const handleNewTodoModalTrigger = (ref) => {
    open(ref, "create-new-todo-modal");
  };
  window._handleNewTodoModalTrigger_ = handleNewTodoModalTrigger;

  return (
    <Modal id="create-new-todo-modal" {...modalProps}>
      <NewTodoForm />
    </Modal>
  );
};

export default CreateNewTodoModal;
