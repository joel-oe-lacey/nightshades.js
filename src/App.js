// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ProTip from './ProTip';
import PlantSelector from './PlantSelector';
import { apiCall } from './utils/fetchCalls';
import { getPlantIDTuples } from './utils/plantIDs';

export const App = () => {
  const [plantData, setPlantData] = useState([])

  useEffect(() => {
    retrieveInitialCollection()
  }, [])

  const retrieveInitialCollection = async () => {
      const plantList = await apiCall(`https://trefle.io/api/v1/plants?filter_not%5Bedible_part%5D=null&token=kCpt8a54u3_VH15-OQPjwAirxVx0L3TEfy2BYm7eXCY`)
      const rawPlantData = await plantList.json();
      const plantIDData = getPlantIDTuples(rawPlantData);
      if (plantList.links.next) {
          retrieveSubseqCollections(plantIDData, plantList.links.next)
      } else {
        setPlantData(plantIDData)
      }
  }

  const retrieveSubseqCollections = async (dataSoFar, link) => {
      const plantList = await apiCall(`${link}`)
      const rawPlantData = await plantList.json();
      const plantIDData = getPlantIDTuples(rawPlantData);
      const totalPlantData = [...plantIDData, ...dataSoFar]

      if (plantList.links.next) {
        retrieveSubseqCollections(totalPlantData, plantList.links.next)
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
        <PlantSelector plantData={plantData} />
        <ProTip />
      </Box>
    </Container>
  );
}
