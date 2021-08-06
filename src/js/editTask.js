import React from "react";
import { useModal, Modal } from "react-morphing-modal";
import EditTaskForm from "./utils/editTaskForm";

// CSS
import "react-morphing-modal/dist/ReactMorphingModal.min.css";
const initialDocTitle = document.title;

const EditTaskModal = () => {
  const [docTitle, setDocTitle] = React.useState(document.title);
  React.useEffect(() => {
    document.title = docTitle;
  }, [docTitle]);

  const { modalProps, open, close } = useModal({
    background: "#006976",
    onOpen() {
      setDocTitle("Edit task | my next task");
    },
    onClose() {
      setDocTitle(initialDocTitle);
    },
  });
  // The main opener function
  const handleEditTaskModalTrigger = (ref) => {
    open(ref, "edit-task-modal");
  };
  window._handleEditTaskModalTrigger_ = handleEditTaskModalTrigger;

  // Closer function
  const closeEditTaskModal = () => {
    close();
  };
  window._closeEditTaskModal_ = closeEditTaskModal;

  return (
    <Modal
      id="edit-task-modal"
      {...modalProps}
      padding={false}
      closeButton={false}
    >
      <EditTaskForm />
    </Modal>
  );
};

export default EditTaskModal;
