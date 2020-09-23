import React from 'react';
import Ebay from 'ebay-node-api';
import { ReactComponent as logoIcon } from './logo.svg';
import './App.css';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import SvgIcon from "@material-ui/core/SvgIcon";
import HomePage from "./Home";
import ChartsPage from "./Charts";
import MyCardsPage from "./MyCards";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  toolbar: {
    backgroundColor: "#0c2340",
    color: "#fff"
  },
  grow: {
    flexGrow: 1,
  },
  title: {
    marginRight: theme.spacing(5),
  },
}));

function App() {
  const classes = useStyles();
  const [value, setValue] = React.useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function homeClicked(e) {
    setValue(false);
  }

  return (
      <div className="App">
        <header className="App-header" className={classes.root}>
          <AppBar position="static">
            <Toolbar className={classes.toolbar}>
              <SvgIcon component={logoIcon} viewBox="200 -70 700 700" height="100%"/>
              <Button variant="h6" color="inherit" className={classes.title} onClick={homeClicked}>
                Cardboard Tracker
              </Button>
              <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                <Tab tabIndex={1} label="CHARTS" {...a11yProps(1)} />
                <Tab tabIndex={2} label="MY CARDS" {...a11yProps(2)} />
              </Tabs>
              <div className={classes.grow}/>
              <Button color="inherit">Login</Button>
              <Button color="inherit">JOIN</Button>
            </Toolbar>
          </AppBar>
          <TabPanel value={value} index={0}>
            <ChartsPage/>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <MyCardsPage visi/>
          </TabPanel>
          <div hidden={value !== false}>
            <HomePage/>
          </div>
        </header>
      </div>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
      <div
          role="tabpanel"
          hidden={value !== index}
          id={`simple-tabpanel-${index}`}
          aria-labelledby={`simple-tab-${index}`}
          {...other}
      >
        {value === index && (
            <Box p={3}>
              <Typography>{children}</Typography>
            </Box>
        )}
      </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export default App;
