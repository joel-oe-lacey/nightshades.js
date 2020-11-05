// eslint-disable-next-line no-unused-vars
import React from 'react';
import Container from '@material-ui/core/Container';
import PlantSelector from './PlantSelector';
import PlantDetails from './PlantDetails';
import Router from 'preact-router';

const App = () => {
  return (
    <Container maxWidth="sm">
      <Router>
        <PlantSelector path="/" /> 
        <PlantDetails path="/id/:id" />
      </Router>
    </Container>
  );
}

export default App;