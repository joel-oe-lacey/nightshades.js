// eslint-disable-next-line no-unused-vars
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export const PlantSelector = (plantData) => {
    return (
        <Autocomplete
            id="plant-selector"
            options={plantData}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
        />    
    );
}