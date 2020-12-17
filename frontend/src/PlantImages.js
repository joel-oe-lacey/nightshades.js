// eslint-disable-next-line no-unused-vars
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';

const useStyles = makeStyles(() => ({

}));

const PlantImages = ({ PlantImages, PlantName }) => {
    const classes = useStyles();

    return (
        <GridList cellHeight={180} className={classes.gridList}>
            <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                <ListSubheader component="div">{PlantName}</ListSubheader>
            </GridListTile>
            {
                generateImageSections(PlantImages, PlantName)
            }
        </GridList>
    );
}

export default PlantImages;