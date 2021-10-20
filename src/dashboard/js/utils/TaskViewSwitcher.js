import React, { useContext } from 'react';
import { Button } from 'semantic-ui-react';
import { DarkThemeContext } from '../../..';
import { TaskViewContext } from '../App';

// CSS
import '../../css/task-view-switcher.css';

export const TaskViewSwitcher = () => {
  // Hooks
  const { isDarkTheme } = useContext(DarkThemeContext);
  const { taskViewString, setTaskViewString } = useContext(TaskViewContext);

  return (
    <section>
      <Button
        inverted={isDarkTheme}
        as='button'
        compact
        attached='left'
        content='List View'
        id='list-view-switch-button'
        labelPosition='left'
        className={`task-view-switch-button ${
          taskViewString === 'listView' ? 'active' : ''
        }`}
        type='button'
        icon='list layout'
        style={{
          color: `${!isDarkTheme && '#222'}`,
          borderTopLeftRadius: '1rem',
          borderBottomLeftRadius: '1rem',
          border: 'none',
        }}
        onClick={() =>
          taskViewString !== 'listView' && setTaskViewString('listView')
        }
      />

      <Button
        inverted={isDarkTheme}
        compact
        attached='right'
        as='button'
        type='button'
        content='Calendar View'
        id='calendar-view-switch-button'
        labelPosition='right'
        className={`task-view-switch-button ${
          taskViewString === 'calendarView' ? 'active' : ''
        }`}
        icon='calendar alternate outline'
        style={{
          color: `${!isDarkTheme && '#222'}`,
          borderTopRightRadius: '1rem',
          borderBottomRightRadius: '1rem',
          border: 'none',
        }}
        onClick={() =>
          taskViewString !== 'calendarView' && setTaskViewString('calendarView')
        }
      />
    </section>
  );
};
