// eslint-disable-next-line no-unused-vars
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
// import PlantSelector from './PlantSelector';
import RegionSelector from './RegionSelector';
import PlantDetails from './PlantDetails';
import RegionDisplay from './RegionDisplay';
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
        <RegionSelector path="/" /> 
        <PlantDetails path="/plant/:id" />
        <RegionDisplay path="/region/:id" />
      </Router>
    </Container>
  );
}

export default App;