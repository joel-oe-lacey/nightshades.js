// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { apiCall } from './utils/fetchCalls';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import PlantCard from './PlantCard';
import Typography from '@material-ui/core/Typography';
import { tdwgRegionsLookup } from './utils/tdwg_regions';
import PlantDetails from './PlantDetails';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import Pagination from '@material-ui/lab/Pagination';
import { route } from 'preact-router';

const useStyles = makeStyles(() => ({
    grid: {
        marginTop: '1rem'
    },
    title: {
        color: 'lightgrey'
    },
    homeCont: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    home: {
        color: 'lightgrey'
    }
}));

const fetchPageCount = lastPath => {
    // uses regex to find total page count via last link
    // example url structure
    // /api/v1/plants?filter%5Bestablishment%5D=native&filter_not%5Bimage_url%5D=null&page=96&zone_id=ari
    
    const pageRegex = /page=(\d*)/;
    const pageCount = pageRegex.exec(lastPath)[1];
    return Number(pageCount);
}


const RegionDisplay = ({id}) => {
    const classes = useStyles();
    const [plantData, setPlantData] = useState({})
    const [open, setOpen] = useState(false);
    const [chosenPlant, choosePlant] = useState(1);
    const [page, setPageNum] = useState(1);
    
    useEffect(() => {
        retrieveRegionPlantData(page)
    }, [])

    const changePage = (event, value) => {
        setPageNum(value)
    }

    const retrieveRegionPlantData = async (page) => {
        const tokenFetch = await apiCall(`http://localhost:8080/`);
        const tokenData = await tokenFetch.json();
        const plantList = await apiCall(`https://trefle.io/api/v1/distributions/${id}/plants?filter%5Bestablishment%5D=native&filter_not[image_url]=null&page=${page}&token=${tokenData.token}`);
        const fetchedPlantData = await plantList.json();
        
        setPlantData(fetchedPlantData);
    }

    // eslint-disable-next-line no-console
    console.log(plantData)
    
    return (
        <Grid container spacing={3} className={classes.grid}>
            <Grid item xs={6}>
                <Typography 
                    variant="h4" 
                    component="h1" 
                    gutterBottom 
                    className={classes.title}
                >
                    Plants Native To {tdwgRegionsLookup[id.toUpperCase()]}
                </Typography>
            </Grid>
            <Grid item xs={6} className={classes.homeCont}>
                <IconButton 
                    color="default" 
                    aria-label="return home"
                    onClick={() => route(`/`)}
                >
                    <HomeIcon />
                </IconButton>
            </Grid>
            {
                Object.keys(plantData).length ?
                    <React.Fragment>
                        {plantData?.data.map(plant => {
                            return (
                                <PlantCard PlantDetails={plant} choosePlant={choosePlant} setOpen={setOpen} />
                            )
                        })}
                        <PlantDetails open={open} setOpen={setOpen} id={chosenPlant} />
                        { plantData?.links?.last && 
                            <Pagination 
                                count={fetchPageCount(plantData?.links?.last)}
                                page={page}
                                onChange={changePage}
                                variant="outlined" 
                                color="primary"
                                size="large"
                                boundaryCount={2}
                            /> 
                        }
                    </React.Fragment>
                : <CircularProgress />
            }
        </Grid>
    );
}

export default RegionDisplay;