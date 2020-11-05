// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import { apiCall } from './utils/fetchCalls';
// eslint-disable-next-line no-unused-vars
import CircularProgress from '@material-ui/core/CircularProgress';

const PlantDetails = ({id}) => {
    const [plantData, setPlantData] = useState({})

    useEffect(() => {
        retrievePlantData()
    }, [])

    const retrievePlantData = async () => {
        const tokenFetch = await apiCall(`http://localhost:8080/`);
        const tokenData = await tokenFetch.json();
        const plantList = await apiCall(`https://trefle.io/api/v1/plants/${id}?token=${tokenData.token}`);
        const fetchedPlantData = await plantList.json();
        
        setPlantData(fetchedPlantData.data);
    }

    return (
        <Container maxWidth="sm">
            {
                Object.keys(plantData).length ? 
                    <section>
                        <image src="" alt="A image of the selected plant" />
                        <Container>
                            <h2>{id}</h2>
                        </Container>
                    </section> :
                    <CircularProgress />
            }
        </Container>
    );
}

export default PlantDetails;