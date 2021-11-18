import React, { useEffect, useState, createContext } from 'react';
import ReactDOM from 'react-dom';
import {
  Navigate,
  HashRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Home from './pages/Home';
import Dashboard from './dashboard';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ErrorPage from './pages/404-page';
// import { setIntervalAsync } from './utils/customSchedulers';
import { useCheckUserStatus } from './parse-sdk/actions';
import { useLocalstorageState } from 'rooks';
import { useMediaQuery } from 'react-responsive';
import useDarkMode from 'use-dark-mode';
// Parse SDK
// Import Parse minified version
import Parse from 'parse/dist/parse.min.js';
import {
  PARSE_APPLICATION_ID,
  PARSE_JAVASCRIPT_KEY,
  PARSE_HOST_URL,
} from './parse-sdk/config';

// CSS
import 'semantic-ui-css/semantic.min.css';
import './css/bootstrap-utilities.min.css';
import './css/index.css';
import './css/cust-utils.css';

export const DarkThemeContext = createContext(null);
export const CurrentDateContext = createContext(null);

// Main Component
const MainBodyContainer = () => {
  // Hooks
  const [isLoggedIn] = useCheckUserStatus();
  const [darkThemeVar] = useLocalstorageState('darkMode');
  const systemPrefersDark = useMediaQuery({
    query: '(prefers-color-scheme: dark)',
    undefined,
  });
  const darkThemeObject = useDarkMode(
    typeof darkThemeVar === 'boolean' ? darkThemeVar : systemPrefersDark,
    {
      onChange: () => {
        document.body.setAttribute('darkTheme', darkThemeObject.value);
      },
    }
  );

  // State values
  const [currentDate, setCurrentDate] = useState(new Date());

  // useEffects
  // Initialize Parse
  useEffect(() => {
    if (!Parse.applicationId) {
      Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
      Parse.serverURL = PARSE_HOST_URL;
    }
  }, []);

  // Update currentDate
  useEffect(() => {
    const updater = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(updater);
  }, [currentDate]);

  return (
    <DarkThemeContext.Provider
      value={{
        isDarkTheme: darkThemeObject.value,
        darkThemeToggle: darkThemeObject.toggle,
        tealColorString: darkThemeObject.value ? '#00c6ee' : '#00637f',
      }}
    >
      <CurrentDateContext.Provider value={currentDate}>
        {/* router setup */}
        <Router hashType='noslash'>
          <Routes>
            <Route
              exact
              path='/'
              element={
                <>
                  <Helmet>
                    <title>Organize your tasks with ease | my-next-task</title>
                  </Helmet>
                  <Home />
                </>
              }
            ></Route>

            {/* Route path for dashboard*/}
            <Route
              exact
              path='/dashboard'
              element={
                <>
                  {isLoggedIn && (
                    <>
                      <Helmet>
                        <title>Dashboard | my-next-task</title>
                      </Helmet>
                      <Dashboard />
                    </>
                  )}
                  {!isLoggedIn && <Navigate to='/login?src=dashboard' />}
                </>
              }
            />
            {/* end of dashboard route path */}

            {/* Route Path for login */}
            <Route
              path='/login'
              element={
                isLoggedIn ? (
                  <Navigate to='/dashboard' />
                ) : (
                  <>
                    <Helmet>
                      <title>Login | my-next-task</title>
                    </Helmet>
                    <LoginPage />
                  </>
                )
              }
            />
            {/* end of login route path */}

            {/* Route path for signup page*/}
            <Route
              path='/signup'
              element={
                isLoggedIn ? (
                  <Navigate to='/dashboard' />
                ) : (
                  <>
                    <Helmet>
                      <title>Sign up for an account | my-next-task</title>
                    </Helmet>
                    <SignupPage />
                  </>
                )
              }
            />
            {/* end of signup route path */}

            <Route path='/*' element={<ErrorPage />} />
          </Routes>
        </Router>
        {/* end of router setup */}
      </CurrentDateContext.Provider>
    </DarkThemeContext.Provider>
  );
};

ReactDOM.render(<MainBodyContainer />, document.getElementById('root'));
