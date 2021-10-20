import React, { useContext } from 'react';
import { useModal, Modal } from 'react-morphing-modal';
import NewTodoForm from './utils/NewTodoForm';
import { DarkThemeContext } from '../..';

// CSS
import 'react-morphing-modal/dist/ReactMorphingModal.min.css';

const CreateNewTodoModal = () => {
  // Hooks
  const { isDarkTheme, tealColorString } = useContext(DarkThemeContext);

  const [docTitle, setDocTitle] = React.useState(document.title);
  React.useEffect(() => {
    document.title = docTitle;
  }, [docTitle]);

  const { modalProps, open, close } = useModal({
    background: isDarkTheme ? '#003043' : tealColorString,
    onOpen() {
      setDocTitle('Create new task | my-next-task');
    },
    onClose() {
      setDocTitle('Dashboard | my-next-task');
    },
  });
  // The main opener function
  const handleNewTodoModalTrigger = (ref) => {
    open(ref, 'create-new-todo-modal');
  };
  window._handleNewTodoModalTrigger_ = handleNewTodoModalTrigger;

  // Closer function
  const closeNewTodoModal = () => {
    close();
  };
  window._closeNewTodoModal_ = closeNewTodoModal;

  return (
    <Modal
      id='create-new-todo-modal'
      {...modalProps}
      padding={false}
      closeButton={false}
    >
      <NewTodoForm />
    </Modal>
  );
};

export default CreateNewTodoModal;
