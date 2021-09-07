import React from 'react';
import { Grid, Segment, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const Profile = ({ subHash }) => {
  return (
    /* Profile Container */
    subHash === 'profile' && (
      <Grid
        textAlign='center'
        className='flex-column'
        padded
        verticalAlign='middle'
        id='profile-body'
      >
        <Segment
          raised
          className='rounded-0 d-flex justify-content-between justify-content-md-around align-items-center'
        >
          <Link to='/dashboard'>
            <Icon name='arrow left' className='text-teal' size='big' />
          </Link>
          <h2 className='text-teal my-0 open-sans-font user-select-none'>
            My Profile
          </h2>
          <Icon name='dot circle' size='big' className='text-teal' />
        </Segment>
        {/* End of profile Heading */}

        <Grid.Column></Grid.Column>
      </Grid>
    )
  );
};

export default Profile;
