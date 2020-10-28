export const getPlantIDTuples = (plantData) => {
    return plantData.map(plant => {
        return ({
            name : plant.common_name,
            id : plant.id
        })
    })
}