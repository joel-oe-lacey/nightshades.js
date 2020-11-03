// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import ProTip from './ProTip';
import PlantSelector from './PlantSelector';
import { apiCall } from './utils/fetchCalls';
import { getPlantIDTuples } from './utils/plantIDs';

const App = () => {
  const [plantData, setPlantData] = useState([])
  // const [selectedPlant, choosePlant] = useState(false)

  useEffect(() => {
    retrieveInitialCollection()
  }, [])

  const retrieveInitialCollection = async () => {
    const tokenFetch = await apiCall(`http://localhost:8080/`);
    const tokenData = await tokenFetch.json();
    // eslint-disable-next-line no-console
    console.log('token', tokenData)
    const plantList = await apiCall(`https://trefle.io/api/v1/plants?filter_not%5Bedible_part%5D=null&token=${tokenData.token}`);
    const rawPlantData = await plantList.json();
    const plantIDData = getPlantIDTuples(rawPlantData.data);
    
    if (rawPlantData.links.next) {
      retrieveSubseqCollections(plantIDData, rawPlantData.links.next, tokenData.token)
    } else {
      setPlantData(plantIDData)
    }
  }

  const retrieveSubseqCollections = async (dataSoFar, link, token) => {
    const plantList = await apiCall(`https://trefle.io${link}&token=${token}`)
    const rawPlantData = await plantList.json();
    const plantIDData = getPlantIDTuples(rawPlantData.data);
    const totalPlantData = [...plantIDData, ...dataSoFar]

    if (rawPlantData.links.next) {
      retrieveSubseqCollections(totalPlantData, rawPlantData.links.next, token)
    } else {
      setPlantData(totalPlantData)
    }
  }

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Preact v4-beta example
        </Typography>
        {
          plantData.length ? 
          <PlantSelector plantData={plantData} /> 
          // <PlantSelector plantData={plantData} choosePlant={choosePlant} /> 
          : <CircularProgress />
        }
        <ProTip />
      </Box>
    </Container>
  );
}

export default App;