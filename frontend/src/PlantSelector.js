// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { apiCall } from './utils/fetchCalls';
import { makeStyles } from '@material-ui/core/styles';
import { getPlantIDTuples } from './utils/plantIDs';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import { route } from 'preact-router';

const useStyles = makeStyles(() => ({
    wrapper: {
        height: '100%',
        width: '100%'
    },
    title: {
        textAlign: 'center'
    },
    root: {
        height: '80%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space around'
    },
}));

const PlantSelector = () => {
    const classes = useStyles();
    const [plantData, setPlantData] = useState([])
    const [selectedPlant, choosePlant] = useState(false)

    useEffect(() => {
        retrieveInitialCollection()
    }, [])

    const retrieveInitialCollection = async () => {
        const tokenFetch = await apiCall(`http://localhost:8080/`);
        const tokenData = await tokenFetch.json();
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

        <Box my={4} className={classes.wrapper}>
            <Typography variant="h4" component="h1" gutterBottom className={classes.title}>
              Can Tom Brady Eat This?
            </Typography>
            {
              plantData.length ?
                <Container className={classes.root}>
                    <Autocomplete
                        id="plant-selector"
                        options={plantData}
                        getOptionLabel={(option) => option.name}
                        onChange={(event, plant) => {
                            choosePlant(plant);
                        }}
                        renderInput={(params) => <TextField {...params} label="Choose A Plant" variant="outlined" />
                        }
                    />    
                    <Button variant="contained" onClick={() => route(`/id/${selectedPlant.id}`)}>Submit</Button>
                </Container>
              : <CircularProgress />
            }
        </Box>

    );
}

export default PlantSelector;