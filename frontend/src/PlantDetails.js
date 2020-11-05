// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import { apiCall } from './utils/fetchCalls';

const PlantDetails = ({id}) => {
    // eslint-disable-next-line no-console
    // const [plantData, setPlantData] = useState([])

    useEffect(() => {
        retrievePlantData()
    }, [])

    const retrievePlantData = async () => {
        const tokenFetch = await apiCall(`http://localhost:8080/`);
        const tokenData = await tokenFetch.json();
        const plantList = await apiCall(`https://trefle.io/api/v1/plants/${id}&token=${tokenData.token}`);
        const rawPlantData = await plantList.json();
        
        // eslint-disable-next-line no-console
        console.log(rawPlantData)
    }

    return (
        <Container maxWidth="sm">
            <section>
                <image src="" alt="A image of the selected plant" />
                <Container>
                    <h2>{id}</h2>
                </Container>
            </section>
        </Container>
    );
}

export default PlantDetails;