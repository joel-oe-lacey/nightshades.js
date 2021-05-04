export const getPlantIDTuples = (plantData) => {
    return plantData.reduce((allPlants, plant) => {
        if (plant.common_name && plant.id) {
            allPlants.push({
                name : plant.common_name,
                id : plant.id
            })
        }

        return allPlants;
    }, [])
}