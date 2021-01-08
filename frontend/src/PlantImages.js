// eslint-disable-next-line no-unused-vars
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

const useStyles = makeStyles(() => ({
}));

const PlantImages = ({ plantImages, plantName }) => {
    const classes = useStyles();

    return (
        <GridList cellHeight={400} className={classes.gridList}>
            {
                Object.keys(plantImages).map(imageType => {
                    return plantImages[imageType].map(image => {
                        return (
                            <GridListTile key={image.id}>
                                <a href={image.image_url} target="_blank" rel="noopener noreferrer"><img src={image.image_url} alt={`${plantName} - ${imageType}`} /></a>
                                <GridListTileBar
                                title={imageType}
                                subtitle={<span>{image.copyright}</span>}
                                />
                            </GridListTile>
                        )
                    })
                })
            }
        </GridList>
    );
}

export default PlantImages;