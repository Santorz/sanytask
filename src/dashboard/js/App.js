import React, { useRef, useEffect, useState, createContext } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import DashboardBody from './DashboardBody';

import Profile from './Profile';

// CSS
import 'animate.css';
import '../index.css';

// Vars
export const TaskViewContext = createContext(null);
export const TaskIDStringContext = createContext(null);

const subHashArray = ['profile', '', 'account'];

const App = () => {
  // Hooks
  let currentLocation = useLocation();
  const history = useNavigate();
  const isMobileOnly = useMediaQuery({ query: '(max-width:768px)' });

  // Use States
  const [subHash, setSubHash] = useState('');
  const [taskViewString, setTaskviewString] = useState('listView');
  const [taskIDString, setTaskIDString] = useState(null);

  // Refs
  const mobileNavRef = useRef(null);
  const todosSegmentRef = useRef(null);

  // useEffect for redirecting to home page if user is not logged in

  // useEffect for changing taskViewString
  useEffect(() => {
    taskViewString !== 'listView' &&
      taskViewString !== 'calendarView' &&
      setTaskviewString('listView');
  }, [taskViewString]);
  // Use effect for setting subHash state value
  useEffect(() => {
    let subHash = currentLocation.hash;
    if (subHash.indexOf('#') !== -1) {
      let subHashSplit = subHash.split('#')[1];
      if (subHashSplit === 'account' || subHashSplit === 'drafts') {
        setSubHash(subHashSplit);
      } else {
        history.push({
          pathname: '/dashboard',
        });
      }
    } else {
      setSubHash('');
    }
  }, [currentLocation, subHash, history]);
  // useEffect and function for adjusting margin bottom if it's mobile only
  const adjustMarginBottom = () => {
    if (document.readyState === 'complete') {
      if (mobileNavRef.current) {
        let mobileNavHeight = mobileNavRef.current.clientHeight;
        todosSegmentRef.current.style.marginBottom = `${
          mobileNavHeight + 20
        }px`;
      }
    }
  };
  useEffect(() => {
    if (isMobileOnly) {
      document.addEventListener('readystatechange', adjustMarginBottom);
    }
    return () =>
      document.removeEventListener('readystatechange', adjustMarginBottom);
  }, [isMobileOnly]);

  return (
    <TaskViewContext.Provider
      value={{
        taskViewString: taskViewString,
        setTaskViewString: setTaskviewString,
      }}
    >
      <TaskIDStringContext.Provider
        value={{
          taskIDString: taskIDString,
          setTaskIDString: setTaskIDString,
        }}
      >
        {subHashArray.indexOf(subHash) < 0 && <Navigate to='/dashboard' />}

        <DashboardBody subHash={subHash} />
        <Profile subHash={subHash} />
      </TaskIDStringContext.Provider>
    </TaskViewContext.Provider>
  );
};

export default App;
