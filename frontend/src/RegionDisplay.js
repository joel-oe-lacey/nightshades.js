// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { apiCall } from './utils/fetchCalls';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import PlantCard from './PlantCard';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
    grid: {
        margin: '1rem'
    },
    title: {
        color: 'lightgrey'
    }
}));

const RegionDisplay = ({id}) => {
    const classes = useStyles();
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
        <Grid container spacing={3} className={classes.grid}>
            <Grid item xs={12}>
                <Typography 
                    variant="h4" 
                    component="h1" 
                    gutterBottom 
                    className={classes.title}
                >
                    Select Your Region
                </Typography>
            </Grid>
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