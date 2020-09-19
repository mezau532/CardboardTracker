import React from 'react';
import logo from './logo.svg';
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
import Icon from "@material-ui/core/Icon";
import SvgIcon from "@material-ui/core/SvgIcon";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
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
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
      <div className="App">
        <header className="App-header" className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <SvgIcon component={logoIcon} viewBox="200 -70 700 700" height="100%"/>
              <Typography variant="h6" className={classes.title}>
                Cardboard Tracker
              </Typography>
              <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                <Tab label="CHARTS" {...a11yProps(0)} />
                <Tab label="MY CARDS" {...a11yProps(1)} />
              </Tabs>
              <div className={classes.grow}/>
              <Button color="inherit">Login</Button>
              <Button color="inherit">JOIN</Button>
            </Toolbar>
          </AppBar>
          <TabPanel value={value} index={0}>
            Item One
          </TabPanel>
          <TabPanel value={value} index={1}>
            Item Two
          </TabPanel>
          <img src={logo} className="App-logo" alt="logo"/>
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
