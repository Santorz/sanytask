import React from 'react';
import App from './js/App';
import { Container } from 'semantic-ui-react';

const Dashboard = () => {
  return (
    <Container fluid className='force-margin-0' id='dashboard-container'>
      <App />
    </Container>
  );
};

export default Dashboard;
