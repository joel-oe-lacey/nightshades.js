// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { apiCall } from './utils/fetchCalls';
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '75vw',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

const PlantDetails = ({id}) => {
    const classes = useStyles();
    const [plantData, setPlantData] = useState({})
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

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
        <React.Fragment>
            {
                Object.keys(plantData).length ? 
                    <Card className={classes.root}>
                        <CardHeader
                            title={plantData.common_name}
                            subheader={plantData.id}
                        />
                        <CardMedia
                            className={classes.media}
                            image={plantData.image_url}
                            title={plantData.common_name}
                        />
                        <CardContent>
                            <Typography variant="body2" color="textSecondary" component="p">
                            {plantData.scientific_name}
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <IconButton
                            className={clsx(classes.expand, {
                                [classes.expandOpen]: expanded,
                            })}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show details"
                            >
                            <ExpandMoreIcon />
                            </IconButton>
                        </CardActions>
                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                            <CardContent>
                            <Typography paragraph>
                                Scientfic Name: {plantData.scientific_name}
                            </Typography>
                            <Typography paragraph>
                                Family: {plantData.family_common_name}
                            </Typography>
                            {
                                plantData?.main_species?.common_names && (
                                    <React.Fragment>
                                        <Typography paragraph>Other Names:</Typography>
                                        <List>
                                            {plantData.main_species.common_names.en.map(name => {
                                                return (
                                                    <ListItem>
                                                        <ListItemText
                                                            primary={name}
                                                        />
                                                    </ListItem>
                                                )
                                            })}
                                        </List>
                                    </React.Fragment>
                                )
                            }
                            {
                                plantData?.main_species?.distribution?.native && (
                                    <React.Fragment>
                                        <Typography paragraph>Native Distribution:</Typography>
                                        <List>
                                            {plantData.main_species.distribution.native.map(name => {
                                                return (
                                                    <ListItem>
                                                        <ListItemText
                                                            primary={name}
                                                        />
                                                    </ListItem>
                                                )
                                            })}
                                        </List>
                                    </React.Fragment>
                                )
                            }
                            </CardContent>
                        </Collapse>
                    </Card> 
                : <CircularProgress />
            }
        </React.Fragment>
    );
}

export default PlantDetails;