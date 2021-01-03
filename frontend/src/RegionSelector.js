// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import { tdwgRegionsData } from './utils/tdwg_regions';

const useStyles = makeStyles(() => ({
    wrapper: {
        height: '75vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    inner: {
        height: '75%',
        width: '75%',
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

const RegionSelector = ({ submitRegion }) => {
    const classes = useStyles();
    const [selectedRegion, chooseRegion] = useState(false)

    return (
        <Box className={classes.wrapper}>
            <Box className={classes.inner} component={Paper}>
                <Typography variant="h4" component="h1" gutterBottom className={classes.title}>
                Select Your Region
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
                    <Button variant="contained" color="primary" onClick={() => {
                        if(selectedRegion) {                        
                            submitRegion(selectedRegion.L3Code.toLowerCase())
                        }
                    }}>Submit</Button>
                </Container>
            </Box>
        </Box>
    );
}

export default RegionSelector;