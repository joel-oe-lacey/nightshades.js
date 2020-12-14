// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { apiCall } from './utils/fetchCalls';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import PlantCard from './PlantCard';

const RegionDisplay = ({id}) => {
    const [plantData, setPlantData] = useState({})

    useEffect(() => {
        retrieveRegionPlantData()
    }, [])

    const retrieveRegionPlantData = async () => {
        const tokenFetch = await apiCall(`http://localhost:8080/`);
        const tokenData = await tokenFetch.json();
        const plantList = await apiCall(`https://trefle.io/api/v1/distributions/${id}/plants?filter%5Bestablishment%5D=native&filter_not[image_url]=null&token=${tokenData.token}`);
        const fetchedPlantData = await plantList.json();
        
        setPlantData(fetchedPlantData.data);
    }

    return (
        <Grid container spacing={3}>
            {
                Object.keys(plantData).length ?
                    plantData.map(plant => {
                        return (
                            <PlantCard PlantDetails={plant} />
                        )
                    }) 
                : <CircularProgress />
            }
        </Grid>
    );
}

export default RegionDisplay;