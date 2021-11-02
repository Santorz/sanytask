import React, { useContext } from 'react';
import { Header } from 'semantic-ui-react';
import { Calendar } from 'react-feather';
import { DarkThemeContext } from '../..';

const Tasks_CalendarView = ({ taskViewString, usersTasks }) => {
  // Hooks
  const { tealColorString } = useContext(DarkThemeContext);
  return (
    <>
      {taskViewString === 'calendarView' && (
        <Header
          className='my-0 d-flex flex-column align-items-center justify-self-center mt-5 pt-5'
          size='medium'
        >
          <Calendar size={95} color={`${tealColorString}`} strokeWidth={0.75} />
          Calendar View coming soon...
          <h4>
            BTW, you have {usersTasks.length} task
            {`${usersTasks.length === 1 ? '' : 's'}`} left
          </h4>
        </Header>
      )}
    </>
  );
};

export default Tasks_CalendarView;
