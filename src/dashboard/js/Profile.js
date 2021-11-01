import React, { useState, useContext } from 'react';
import { Grid, Segment, Icon, Header, Image, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { getCurrentLocalUser } from '../../parse-sdk/userVars';
import { invokeSignOut, useCheckUserStatus } from '../../parse-sdk/actions';
import { X, Menu } from 'react-feather';
import { DarkModeToggle } from '../../utils/DarkModeToggle';
import { DarkThemeContext } from '../..';

// CSS
import '../css/profile.css';
// Media
// import defaultUserAvatar from '../../media/avatar.png';
import saintAvatar from '../../media/saintAvatar.png';

const Profile = ({ subHash }) => {
  // Hooks
  const [, localUser] = useCheckUserStatus();
  const { isDarkTheme } = useContext(DarkThemeContext);

  // useEffects

  // States
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Vars
  const { firstName, lastName, email, accountType } = localUser
    ? localUser
    : {};

  // Main return
  return (
    <>
      {
        /* Profile Container */
        subHash === 'account' && getCurrentLocalUser() && (
          <div id='profile-container' className='my-primary-bg'>
            <Grid
              textAlign='center'
              className='flex-column align-items-center'
              padded
              verticalAlign='middle'
              id='profile-body'
            >
              <Grid.Column
                mobile={16}
                tablet={11}
                computer={10}
                largeScreen={9}
                widescreen={8}
                id='profile-main-grid'
              >
                <Segment
                  className='d-flex justify-content-between align-items-center mt-0 bg-transparent'
                  style={{ border: 'none', boxShadow: 'none' }}
                >
                  <section className='d-flex align-items-center'>
                    <Link
                      to='/dashboard'
                      className='p-1 rounded shadow-sm my-primary-bg'
                    >
                      <Icon
                        name='angle left'
                        className='my-primary-text'
                        size='big'
                      />
                    </Link>
                    <Header
                      as='h2'
                      className='my-0 open-sans-font user-select-none ms-4 my-primary-text'
                    >
                      My Account
                    </Header>
                  </section>
                  <Button
                    onClick={() => setIsSidebarOpen(true)}
                    className='p-0 m-0 bg-transparent my-primary-text'
                  >
                    <Menu size={37}></Menu>
                  </Button>
                </Segment>
                {/* End of profile Heading */}

                {/* Use info part */}
                <Segment
                  className='d-flex mt-4 align-items-center pt-2'
                  style={{ border: 'none', boxShadow: 'none' }}
                  inverted={isDarkTheme}
                >
                  <section
                    id='user-account-pic-section'
                    className='d-flex mt-2'
                  >
                    <Image
                      circular
                      src={saintAvatar}
                      width={50}
                      id='user-account-pic'
                    />
                  </section>
                  <section className='d-flex flex-column ms-3'>
                    <h3
                      className='open-sans-font'
                      style={{ fontSize: '1.45rem' }}
                    >
                      {firstName} {lastName}
                    </h3>
                    <div
                      className='user-plan-status-div'
                      style={{ textAlign: 'left' }}
                    >
                      <h4 className='my-0'>
                        {accountType && accountType.toUpperCase()}
                      </h4>
                    </div>
                  </section>
                  {/*  */}
                </Segment>
                {/* Profile main body */}
                <Segment
                  raised
                  className='d-flex mt-3 flex-column'
                  id='profile-main-body'
                  style={{ border: 'none' }}
                  inverted={isDarkTheme}
                >
                  <section className='profile-detail-section'>
                    <span>
                      <h5 className='mb-0 pb-1 my-teal-text'>Display Name</h5>
                      <h3 className='open-sans-font my-0'>
                        {firstName} {lastName}
                      </h3>
                    </span>
                    <span>
                      <Button
                        className='profile-detail-edit-button'
                        inverted={isDarkTheme}
                      >
                        Request Edit
                      </Button>
                    </span>
                  </section>

                  <section className='profile-detail-section'>
                    <span>
                      <h5 className='mb-0 pb-1 my-teal-text'>Email Address</h5>
                      <h3 className='open-sans-font my-0'>{email}</h3>
                    </span>
                    <span>
                      <Button
                        className='profile-detail-edit-button'
                        inverted={isDarkTheme}
                      >
                        Edit
                      </Button>
                    </span>
                  </section>

                  <section className='profile-detail-section'>
                    <span>
                      <h5 className='mb-0 pb-1 my-teal-text'>Password</h5>
                      <h3
                        className='open-sans-font my-0'
                        dangerouslySetInnerHTML={{
                          __html: '&#8226;'.repeat(22),
                        }}
                      />
                    </span>
                    <span>
                      <Button
                        className='profile-detail-edit-button'
                        inverted={isDarkTheme}
                      >
                        Change
                      </Button>
                    </span>
                  </section>
                </Segment>
                {/*  */}
                {/* Pro plan segment */}
                {accountType === 'free' && (
                  <Segment
                    raised
                    className='d-flex mt-3 flex-column px-0 pb-0'
                    style={{
                      border: 'none',
                      borderBottomLeftRadius: '0.7rem',
                      borderBottomRightRadius: '0.7rem',
                    }}
                    inverted={isDarkTheme}
                  >
                    <section
                      className='profile-detail-section subscription-section px-3'
                      style={{
                        marginBottom: '1rem',
                      }}
                    >
                      <span>
                        <h5 className='mb-0 pb-1 my-teal-text'>Subscription</h5>
                        <h3 className='open-sans-font my-0'>Free Plan</h3>
                      </span>
                      <span>
                        <Button
                          toggle
                          className='profile-detail-edit-button'
                          inverted={isDarkTheme}
                          id='pro-upgrade-btn'
                        >
                          Upgrade to Pro
                        </Button>
                      </span>
                    </section>
                    <Segment
                      as='section'
                      inverted={isDarkTheme}
                      className='text-center mt-2 py-0'
                      style={{
                        borderBottomLeftRadius: '0.7rem',
                        borderBottomRightRadius: '0.7rem',
                      }}
                    >
                      <Link to='/pricing' className='my-teal-text d-block py-3'>
                        <h3>
                          See the Pro Features &nbsp; <Icon name='external' />
                        </h3>
                      </Link>
                    </Segment>
                  </Segment>
                )}

                {/*  */}
                <Button
                  inverted={isDarkTheme}
                  size='big'
                  id='profile-signout-btn'
                  onClick={() => {
                    invokeSignOut();
                  }}
                >
                  Sign out
                </Button>
              </Grid.Column>
              {/*  */}
            </Grid>

            {/* Grid for sidebar */}
            {isSidebarOpen && (
              <Grid
                className='m-0 p-0 position-fixed w-100 d-flex user-select-none'
                padded
                id='profile-sidebar'
              >
                <section id='backdrop' />
                <section
                  id='content'
                  className='d-flex flex-column animate__animated animate__slideInRight animate__faster my-primary-bg'
                >
                  <div className='d-flex justify-content-between pt-4'>
                    <h1 className='my-primary-text m-0 mb-2'>
                      Settings &nbsp;
                      <Icon name='setting' size='small' />
                    </h1>
                    <Button
                      className='my-red-text m-0 p-0 bg-transparent'
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      <X size={30} strokeWidth={3}></X>
                    </Button>
                  </div>

                  <h4 className='my-teal-text my-1 '>Appearance:</h4>
                  <Segment
                    className='d-flex justify-content-between mt-0'
                    inverted={isDarkTheme}
                  >
                    <h3 className='open-sans-font my-0 my-primary-text'>
                      App theme : {isDarkTheme ? 'Dark' : 'Light'}
                    </h3>
                    <section className='d-flex align-items-center my-primary-text'>
                      <DarkModeToggle />
                    </section>
                  </Segment>
                </section>
              </Grid>
            )}
          </div>
        )
      }
    </>
  );
};

export default Profile;
