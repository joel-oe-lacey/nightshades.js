// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { apiCall } from './utils/fetchCalls';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import PlantCard from './PlantCard';
import Typography from '@material-ui/core/Typography';
import { tdwgRegionsLookup } from './utils/tdwg_regions';
import PlantDetails from './PlantDetails';

const useStyles = makeStyles(() => ({
    grid: {
        marginTop: '1rem'
    },
    title: {
        color: 'lightgrey'
    }
}));

const RegionDisplay = ({id}) => {
    const classes = useStyles();
    const [plantData, setPlantData] = useState({})
    const [open, setOpen] = useState(false);
    const [chosenPlant, choosePlant] = useState(1);
    // const [pageNum, setPageNum] = useState(1);


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
                    Plants Native To {tdwgRegionsLookup[id.toUpperCase()]}
                </Typography>
            </Grid>
            {
                Object.keys(plantData).length ?
                    <React.Fragment>
                        {plantData.map(plant => {
                            return (
                                <PlantCard PlantDetails={plant} choosePlant={choosePlant} setOpen={setOpen} />
                            )
                        })}
                        <PlantDetails open={open} setOpen={setOpen} id={chosenPlant} />
                    </React.Fragment>
                : <CircularProgress />
            }
        </Grid>
    );
}

export default RegionDisplay;