import React from 'react';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import RefreshIcon from '@material-ui/icons/Refresh';
import Tooltip from '@material-ui/core/Tooltip';
import { Chart as ReactChart } from 'react-charts'
import moment from 'moment'

function dateRanges(dates) {
  const moments = dates.map(d => moment(d))
  const startDate = moment.min(moments)
  const endDate = moment.max(moments)
 
  var range = [];
  var currDate = moment(startDate).startOf('day');
  var lastDate = moment(endDate).startOf('day');

  while(currDate.add(1, 'days').diff(lastDate) < 0) {
      range.push(currDate.clone().toISOString());
  }

  return range;
}

export function Chart(props) {
  const [ toggle, setToggle ] = React.useState(false)
  const [ dateTicks, setDateTicks ] = React.useState([])
  const [ currentSelection, setCurrenSelection ] = React.useState({})
  const [{ min, max }, setBrushState] = React.useState({
    min: null,
    max: null,
  });
  const deliveries = props.location.state

  React.useEffect(() => {
    // id, completed_at, response_status, event, started_at
    const events = deliveries.map(({ id, completed_at, response_status, event, started_at }) => ({ id, completed_at, response_status, ...event, started_at }))
    
    
    // create a duration key calculated from completed_at and start_at, return object that with keys for axsis
    const finalData =
    events.map((event) => {
      event.time_total =  (Date.parse(event.completed_at) - Date.parse(event.started_at)) / 1000
      return { primary: new Date(event.timestamp), secondary: event.time_total, radius: (event.time_total * 1.5), ...event }
    } , {})

    setDateTicks(
      dateRanges(events.map(e => e.timestamp))
    )

    setCurrenSelection([{label: 'webhook durations', data: finalData}])
    console.log('useEffect chart')
  }, [deliveries])
  
  const axes = React.useMemo(
    () => [
      {
        primary: true,
        type: 'utc',
        position: 'bottom',
        tickValues: dateTicks,
        hardMin: min,
        hardMax: max,
      },
    { type: 'linear', position: 'left' },
  ], [dateTicks, min, max])

  const series = React.useMemo(() => ({ type: 'bubble' }), [])

  const brush = React.useMemo(
    () => ({
      onSelect: (brushData) => {
        console.log(brushData);
        setBrushState({
          min: Math.min(brushData.start, brushData.end),
          max: Math.max(brushData.start, brushData.end),
        });
      },
    }),
    []
  );

  const resetBrush = () => setBrushState({min: null, max: null})

  const handleToggle = () => setToggle(t => !t) //! debug, can remove

  return (
    <>
      <Link to='/'>
        <Typography>
          <Button color='primary'>&lt; Back</Button>
        </Typography>
      </Link>

      <Grid container justify='center'>
        <Grid item xs={8} md={8} lg={8}>
          <Paper>
          <div
            style={{
            width: '960px',
            height: '800px',
          }}>

          <Tooltip title='Reset zoom'>
            <IconButton disabled={max === null && min === null} onClick={resetBrush} aria-label="reset zoom" color="primary">
              <RefreshIcon />
            </IconButton>
          </Tooltip>

            <ReactChart data={currentSelection} axes={axes} series={series} primaryCursor={{showLabel: true}} tooltip brush={brush} />
          </div>
          <button onClick={handleToggle}>{toggle === true ? 'Hide JSON' : 'Show JSON'}</button>
          {toggle && <pre>{JSON.stringify(currentSelection, null, 2)}</pre> }
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
