// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';

const PlantDetails = ({plantData, choosePlant}) => {
    const retrievePlantData = async () => {
        const token = process.env.TOKEN;
        const plantList = await apiCall(`https://trefle.io/api/v1/plants?filter_not%5Bedible_part%5D=null` + token)
        const rawPlantData = await plantList.json();
        const plantIDData = getPlantIDTuples(rawPlantData.data);
        
        if (rawPlantData.links.next) {
        retrieveSubseqCollections(plantIDData, rawPlantData.links.next, token)
        } else {
        setPlantData(plantIDData)
        }
    }

    return (
        <Container maxWidth="sm">
            <section>
                <image src="" alt="A image of the selected plant"></image>
                <Container>
                    <h2></h2>
                    <h1></h1>
                </Container>
            </section>
        </Container>
    );
}

export default PlantDetails;