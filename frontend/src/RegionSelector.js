// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { route } from 'preact-router';
import { tdwgRegionsData } from './utils/tdwg_regions';

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
    // const [regionData, setRegionData] = useState([])
    const [selectedRegion, chooseRegion] = useState(false)

    //If names aren't optimal, can use TDWG location mapping
    //https://www.tdwg.org/standards/wgsrpd/
    //going to need to do this as regions don't map to traditional "countries"

    //you have a backend for client side apps, can this do some of the handling?
    //express server have DB to load the TDWG regions
    //can also just have JSON of L3 Code: L3 Region pair 

    //document as you go
    //tdwg has many levels, each one has a different ID format, these correspond as IDs in trefle for distributions
    //we're going with level 3
    //take the id hit distribution/id 
    //this will give you all the plants to render in a menu 

    return (
        <Box className={classes.wrapper}>
            <Typography variant="h4" component="h1" gutterBottom className={classes.title}>
              Select your region
            </Typography>
            <Container className={classes.root}>
                <Autocomplete
                    id="plant-selector"
                    options={tdwgRegionsData}
                    getOptionLabel={(option) => option.L3Area}
                    onChange={(event, region) => {
                        chooseRegion(region);
                    }}
                    renderInput={(params) => <TextField {...params} label="Choose A Region" variant="outlined" />
                }
                />    
                <Button variant="contained" onClick={() => {
                    if(selectedRegion) {                        
                        route(`/region/${selectedRegion.L3Code}`)
                    }
                }}>Submit</Button>
            </Container>
        </Box>

    );
}

export default RegionSelector;