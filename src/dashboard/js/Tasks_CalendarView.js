import React, { useContext } from 'react';
import { Header } from 'semantic-ui-react';
import { Calendar } from 'react-feather';
import { DarkThemeContext } from '../..';

const Tasks_CalendarView = ({ taskViewString }) => {
  // Hooks
  const { tealColorString } = useContext(DarkThemeContext);
  return (
    <>
      {taskViewString === 'calendarView' && (
        <Header
          className='my-0 d-flex flex-column align-items-center'
          size='medium'
        >
          <Calendar size={90} color={`${tealColorString}`} strokeWidth={0.75} />
          Calendar View coming soon...
        </Header>
      )}
    </>
  );
};

export default Tasks_CalendarView;
