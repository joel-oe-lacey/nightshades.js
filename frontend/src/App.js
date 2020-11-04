// eslint-disable-next-line no-unused-vars
import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PlantSelector from './PlantSelector';
import Router from 'preact-router';

const App = () => {
  return (
    <Container maxWidth="sm">
      <Router>
        <PlantSelector path="/" /> 
        <Box my={4} path="/id/:id">
            <Typography variant="h4" component="h1" gutterBottom>
              Test
            </Typography>
        </Box>
      </Router>
    </Container>
  );
}

export default App;