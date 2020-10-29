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
    const token = '&token=eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo4OTk0LCJvcmlnaW4iOiJodHRwOi8vbG9jYWxob3N0OjMwMDAiLCJpcCI6bnVsbCwiZXhwaXJlIjoiMjAyMC0xMC0zMCAxOToxMzoyMiArMDAwMCIsImV4cCI6MTYwNDA4NTIwMn0.cuwIv8OqCEHVnE12ig17BPWmt1YAtDcoDX9dKL0t0XA'
    const plantList = await apiCall(`https://trefle.io/api/v1/plants?filter_not%5Bedible_part%5D=null` + token)
    const rawPlantData = await plantList.json();
    const plantIDData = getPlantIDTuples(rawPlantData.data);
    
    if (rawPlantData.links.next) {
      retrieveSubseqCollections(plantIDData, rawPlantData.links.next, token)
    } else {
      setPlantData(plantIDData)
    }
  }

  const retrieveSubseqCollections = async (dataSoFar, link, token) => {
    const plantList = await apiCall('https://trefle.io' + link + token)
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
          : <CircularProgress />
        }
        <ProTip />
      </Box>
    </Container>
  );
}

export default App;