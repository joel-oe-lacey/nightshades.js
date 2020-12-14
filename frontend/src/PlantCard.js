// eslint-disable-next-line no-unused-vars
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import { route } from 'preact-router';

const useStyles = makeStyles(() => ({
  card: {
    height: '450px',
  },
  actionArea: {
    height: '100%',
    width: '100%'
  },
  title: {
    height: '25%',
    width: '100%',
  },
  media: {
    height: '75%',
    width: '100%',
    objectFit: 'contain'
  },
}));

const PlantCard = ({ PlantDetails }) => {
    const classes = useStyles();
    const { id, common_name, scientific_name, image_url } = PlantDetails;

    return (
        <Grid item xs={3}>
            <Card className={classes.card}>
              <CardActionArea
                className={classes.actionArea}
                onClick={() => {
                  route(`/plant/${id}`)
                }}
              >
                <CardHeader
                  className={classes.title}
                  title={common_name}
                  subheader={scientific_name}
                />
                <CardMedia
                  className={classes.media}
                  component="img"
                  src={image_url}
                  title={common_name}
                />
              </CardActionArea>
            </Card>
        </Grid>
    );
}

export default PlantCard;