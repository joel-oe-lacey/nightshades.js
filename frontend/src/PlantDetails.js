// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';

const PlantDetails = ({id}) => {
    // const [plantData, setPlantData] = useState([])

    // useEffect(() => {
    //     retrievePlantData()
    // }, [])

    // const retrievePlantData = async () => {
    //     const tokenFetch = await apiCall(`http://localhost:8080/`);
    //     const tokenData = await tokenFetch.json();
    //     const plantList = await apiCall(`https://trefle.io/api/v1/plants?filter_not%5Bedible_part%5D=null&token=${tokenData.token}`);
    //     const rawPlantData = await plantList.json();
    //     const plantIDData = getPlantIDTuples(rawPlantData.data);
        
    //     setPlantData(plantIDData)
    // }

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