// eslint-disable-next-line no-unused-vars
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import PlantSelector from './PlantSelector';
import PlantDetails from './PlantDetails';
import Router from 'preact-router';

const useStyles = makeStyles(() => ({
  appWrapper: {
    height: '100%',
    width: '100%',
  }
}));

const App = () => {
  const classes = useStyles();

  return (
    <Container className={classes.appWrapper}>
      <Router>
        <PlantSelector path="/" /> 
        <PlantDetails path="/id/:id" />
      </Router>
    </Container>
  );
}

export default App;