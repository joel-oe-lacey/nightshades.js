// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { apiCall } from './utils/fetchCalls';
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Modal from '@material-ui/core/Modal';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PlantImages from './PlantImages';
import PlantInfo from './PlantInfo';

const useStyles = makeStyles(() => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    outline: 0
  },
  card: {
    height: '80%',
    width: '80%',
    margin: '3rem 0 3rem 0'
  },
  details: {
    height: '80%',
    width: '100%',
  },
  tab: {
    height: '100%',
    width: '100%',
    overflow: 'scroll'
  }
}));

function a11yProps(index) {
  return {
    id: `plant-details-tab-${index}`,
    'aria-controls': `plant-details-tabpanel-${index}`,
  };
}

function TabPanel(props) {
  const { children, tab, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={tab !== index}
      id={`plant-details-tabpanel-${index}`}
      aria-labelledby={`plant-details-tab-${index}`}
      {...other}
    >
      {tab === index && (
        <React.Fragment>
          {children}
        </React.Fragment>
      )}
    </div>
  );
}

const PlantDetails = ({open, setOpen, id}) => {
    const classes = useStyles();
    const [plantData, setPlantData] = useState({})
    const [tab, setTab] = React.useState(0);

    const selectTab = (event, newTab) => {
      setTab(newTab);
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

    return (
        <Modal
            className={classes.wrapper}
            open={open}
            onClose={setClosed}
            aria-labelledby={plantData.main_species?.common_name}
            aria-describedby="A page of details about this plant."
        >
            {
                Object.keys(plantData).length ? 
                    <Card className={classes.card}>
                        <CardHeader
                            title={plantData.main_species?.common_name ? plantData.main_species?.common_name : plantData.scientific_name}
                            subheader={plantData.scientific_name}
                        />
                        <CardContent
                            className={classes.details}
                        >
                          <Tabs 
                            value={tab} 
                            onChange={selectTab} 
                            aria-label="Plant Details Selector"
                            centered
                          >
                            <Tab label="Images" {...a11yProps(0)} />
                            <Tab label="Info" {...a11yProps(1)} />      
                          </Tabs>
                          <TabPanel className={classes.tab} tab={tab} index={0}>
                            <PlantImages 
                              plantImages={plantData.main_species?.images}
                              plantName={plantData.main_species.common_name}
                            />
                          </TabPanel>
                          <TabPanel className={classes.tab} tab={tab} index={1}>
                            <PlantInfo 
                              plantData={plantData}
                            />
                          </TabPanel>
                        </CardContent>
                    </Card> 
                : <CircularProgress 
                    className={classes.wrapper}
                  />
            }
        </Modal>
    );
}

export default PlantDetails;