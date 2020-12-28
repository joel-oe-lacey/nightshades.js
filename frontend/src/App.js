// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import RegionSelector from './RegionSelector';
import RegionDisplay from './RegionDisplay';

const useStyles = makeStyles(() => ({
  appWrapper: {
    height: '100%',
    width: '100%',
  }
}));

const App = () => {
  const classes = useStyles();
  const [chosenRegion, submitRegion] = useState('')


  return (
    <Container className={classes.appWrapper}>
        {
          chosenRegion ? <RegionDisplay chosenRegion={chosenRegion} submitRegion={submitRegion} /> 
          : <RegionSelector submitRegion={submitRegion} />
        }
    </Container>
  );
}

export default App;