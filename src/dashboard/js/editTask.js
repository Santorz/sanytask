import React, { useContext } from 'react';
import { useModal, Modal } from 'react-morphing-modal';
import EditTaskForm from './utils/editTaskForm';
import { DarkThemeContext } from '../..';

// CSS
import 'react-morphing-modal/dist/ReactMorphingModal.min.css';
const initialDocTitle = document.title;

const EditTaskModal = () => {
  // Hooks
  const { isDarkTheme, tealColorString } = useContext(DarkThemeContext);
  const { modalProps, open, close } = useModal({
    background: isDarkTheme ? '#003043' : tealColorString,
    onOpen() {
      setDocTitle('Edit task | my-next-task');
    },
    onClose() {
      setDocTitle(initialDocTitle);
    },
  });

  const [docTitle, setDocTitle] = React.useState(document.title);
  React.useEffect(() => {
    document.title = docTitle;
  }, [docTitle]);

  // The main opener function
  const handleEditTaskModalTrigger = (ref) => {
    open(ref, 'edit-task-modal');
  };
  window._handleEditTaskModalTrigger_ = handleEditTaskModalTrigger;

  // Closer function
  const closeEditTaskModal = () => {
    close();
  };
  window._closeEditTaskModal_ = closeEditTaskModal;

  return (
    <Modal
      id='edit-task-modal'
      {...modalProps}
      padding={false}
      closeButton={false}
    >
      <EditTaskForm />
    </Modal>
  );
};

export default EditTaskModal;
