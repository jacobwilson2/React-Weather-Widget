import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import RefreshIcon from '@material-ui/icons/Refresh';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Moment from 'react-moment';
import 'moment-timezone';
import Skeleton from 'react-loading-skeleton';

const useStyles = makeStyles({
  body: {
    backgroundColor: 'blue',
  },
  root: {
    minWidth: 275,
    maxWidth: 325,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  avatar: {
    backgroundColor: '#03c6fc',
  },
  temp: {
    textAlign: 'center',
  }
});

const App = () => {
    const classes = useStyles();

    const [metric, setMetric] = React.useState("imperial");
    const [icon, setIcon] = React.useState();
    const [temp, setTemp] = React.useState(0);
    const [time, setTime] = React.useState(Date);
   

    const fetchData = async () => {
      const apiCall = await fetch('http://api.openweathermap.org/data/2.5/weather?zip=60654,us&appid=01b3a0896412b589bb9c00bc74c14ccc&units=' + metric)
      const data = await apiCall.json();
      
      setTemp(data.main.temp)
      setTime(data.dt)
      setIcon("http://openweathermap.org/img/wn/" + (data.weather[0].icon) + ".png")
      
    }


    const handleMetric = (event, newMetric) => {
      if (newMetric === "fahrenheit") {
        setMetric("imperial");
      } 
      if (newMetric === "celsius") {
        setMetric("metric");
      }
    };

    function refreshPage() {
      window.location.reload(false)
    }
  
    
    React.useEffect(() =>{
        fetchData();
    })
  
    return (
      <Card className={classes.root} variant="outlined" ari-label="weather card">
        <CardHeader 
          avatar={
            <img aria-label="weather icon" src={icon} alt="weather icon"></img>
          }
          action={
              <IconButton aria-label="refresh button" onClick={refreshPage}>
                  <RefreshIcon />
              </IconButton>
          }
          title="Weather"
          subheader={<Moment unix tz="America/Chicago" format="dddd, MMMM Do YYYY, h:mm:ss a" aria-label="date and time">{time || "Loading..."}</Moment>}
        />
  
        <CardContent aria-label="weather content">
          <Typography variant="h1" component="h1" className={classes.temp} aria-label="temperature">
            {temp || <Skeleton />}°
          </Typography>
        </CardContent>
  
        <CardActions>
          <ToggleButtonGroup
              value={metric}
              exclusive
              onChange={handleMetric}
              aria-label="toggle metric"
          >
              <ToggleButton value="fahrenheit" aria-label="toggle farenheit">
                  <p>F°</p>
              </ToggleButton>
              <ToggleButton value="celsius" aria-label="toggle celsius">
                  <p>C°</p>
              </ToggleButton>
          </ToggleButtonGroup>
        </CardActions>
  
      </Card>
    );

}
export default App;