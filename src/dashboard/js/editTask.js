import React, { useContext } from 'react';
import { useModal, Modal } from 'react-morphing-modal';
import EditTaskForm from './components/editTaskForm';
import { DarkThemeContext } from '../..';
import { FreshPageLoadContext } from './DashboardBody';

// CSS
import 'react-morphing-modal/dist/ReactMorphingModal.min.css';

const EditTaskModal = () => {
  // Hooks
  const { isDarkTheme, tealColorString } = useContext(DarkThemeContext);
  const setIsFreshPageLoad = useContext(FreshPageLoadContext);

  const { modalProps, open, close } = useModal({
    background: isDarkTheme ? '#003043' : tealColorString,
    onOpen() {
      setIsFreshPageLoad(false);
      setDocTitle('Edit task | my-next-task');
    },
    onClose() {
      setDocTitle('Dashboard | my-next-task');
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
