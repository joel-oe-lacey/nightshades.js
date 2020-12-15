// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { apiCall } from './utils/fetchCalls';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import EcoIcon from '@material-ui/icons/Eco';
import Modal from '@material-ui/core/Modal';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    height: 'max-content',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  card: {
    height: '80%',
    width: '100%',
    margin: '3rem 0 3rem 0'
  },
  details: {
    height: '25rem',
    width: '100%',
    display: 'flex',
    flexFlow: 'column wrap',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  plantImg: {
    objectFit: 'contain',
    height: '100%',
    width: '50%'
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

const PlantDetails = ({open, setOpen, id}) => {
    const classes = useStyles();
    const [plantData, setPlantData] = useState({})
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const setClosed = () => {
        setPlantData({});
        setOpen(false);
    }

    useEffect(() => {
        if (open) {
            retrievePlantData();
        }
    }, [open])

    const retrievePlantData = async () => {
        const tokenFetch = await apiCall(`http://localhost:8080/`);
        const tokenData = await tokenFetch.json();
        const plantList = await apiCall(`https://trefle.io/api/v1/plants/${id}?token=${tokenData.token}`);
        const fetchedPlantData = await plantList.json();
        
        setPlantData(fetchedPlantData.data);
    }

    // eslint-disable-next-line no-console
    console.log(plantData)

    return (
        <Container className={classes.wrapper}>
            {
                Object.keys(plantData).length ? 
                <Modal
                    open={open}
                    onClose={setClosed}
                    aria-labelledby={plantData.main_species.common_name}
                    aria-describedby="A page of details about this plant."
                >
                    <Card className={classes.card}>
                        <CardHeader
                            title={plantData.main_species.common_name}
                            subheader={plantData.scientific_name}
                        />
                        <CardContent
                            className={classes.details}
                        >
                            <img 
                                className={classes.plantImg}
                                src={plantData.image_url}
                                alt={plantData.common_name}
                            />
                            <Typography variant="header2" color="textSecondary" component="p">
                                Can Tom Brady eat this?
                            </Typography>
                            <Typography variant="header1" color="textSecondary" component="p">
                                {plantData.family.id === 28 ? 'NO' : 'YES'}
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
                                <strong>Scientfic Name:</strong> {plantData.scientific_name}
                            </Typography>
                            <Typography paragraph>
                                <strong>Family:</strong> {plantData.family_common_name} ({plantData.family.name})
                            </Typography>
                            <Typography paragraph>
                                <strong>Genus:</strong> {plantData.genus.name} 
                            </Typography>
                            {
                                plantData?.main_species?.common_names?.en && (
                                    <React.Fragment>
                                        <Typography><strong>Other Names:</strong></Typography>
                                        <List>
                                            {plantData.main_species.common_names.en.map(name => {
                                                return (
                                                    <ListItem>
                                                        <ListItemIcon>
                                                            <EcoIcon />
                                                        </ListItemIcon>
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
                                        <Typography><strong>Native Distribution:</strong></Typography>
                                        <List>
                                            {plantData.main_species.distribution.native.map(name => {
                                                return (
                                                    <ListItem>
                                                        <ListItemIcon>
                                                            <EcoIcon />
                                                        </ListItemIcon>
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
                </Modal>
                : <CircularProgress />
            }
        </Container>
    );
}

export default PlantDetails;