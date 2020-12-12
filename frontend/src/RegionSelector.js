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
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    title: {
        textAlign: 'center',
        fontFamily: 'Decovar Alpha Regular24',
    },
    root: {
        height: '50%',
        width: '80%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
    loading: {
        alignSelf: 'center'
    }
}));

const RegionSelector = () => {
    const classes = useStyles();
    const [regionData, setRegionData] = useState([])
    const [selectedRegion, chooseRegion] = useState(false)

    //If names aren't optimal, can use TDWG location mapping
    //https://www.tdwg.org/standards/wgsrpd/

    useEffect(() => {
        retrieveRegions()
    }, [])

    const retrieveRegions = async () => {
        const tokenFetch = await apiCall(`http://localhost:8080/`);
        const tokenData = await tokenFetch.json();
        const regionList = await apiCall(`https://trefle.io/api/v1/distributions&token=${tokenData.token}`);
        const rawRegionData = await regionList.json();
        setRegionData(rawRegionData)
    }

    return (

        <Box className={classes.wrapper}>
            <Typography variant="h4" component="h1" gutterBottom className={classes.title}>
              Select your region
            </Typography>
            {
              regionData.length ?
                <Container className={classes.root}>
                    <Autocomplete
                        id="plant-selector"
                        options={regionData}
                        getOptionLabel={(option) => option.name}
                        onChange={(event, region) => {
                            chooseRegion(region);
                        }}
                        renderInput={(params) => <TextField {...params} label="Choose A Region" variant="outlined" />
                        }
                    />    
                    <Button variant="contained" onClick={() => route(`/region/${selectedRegion.id}`)}>Submit</Button>
                </Container>
              : 
                <Container className={classes.root}>
                    <CircularProgress className={classes.loading} />
                </Container>
            }
        </Box>

    );
}

export default RegionSelector;