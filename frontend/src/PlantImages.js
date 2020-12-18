// eslint-disable-next-line no-unused-vars
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';

const useStyles = makeStyles(() => ({

}));

const generateImageSections = (plantImages, plantName) => {
    return Object.keys(plantImages).map(imageType => {
        return plantImages[imageType].map(image => {
            return (
                <GridListTile key={image.id}>
                    <img src={image.image_url} alt={`${plantName} - ${imageType}`} />
                    <GridListTileBar
                    title={imageType}
                    subtitle={<span>{image.copyright}</span>}
                    />
                 </GridListTile>
            )
        })
    })
}

const PlantImages = ({ plantImages, plantName }) => {
    const classes = useStyles();

    return (
        <GridList cellHeight={180} className={classes.gridList}>
            <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                <ListSubheader component="div">{plantName}</ListSubheader>
            </GridListTile>
            {
                generateImageSections(plantImages, plantName)
            }
        </GridList>
    );
}

export default PlantImages;