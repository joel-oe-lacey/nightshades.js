// eslint-disable-next-line no-unused-vars
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const PlantSelector = ({plantData, choosePlant}) => {
    return (
        <Autocomplete
            id="plant-selector"
            options={plantData}
            getOptionLabel={(option) => option.name}
            onChange={(event, plant) => {
                choosePlant(plant);
            }}
            renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />
            }
        />    
    );
}

export default PlantSelector;