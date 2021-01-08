import React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import RefreshIcon from '@material-ui/icons/Refresh';
import Settings from '@material-ui/icons/Settings';
import Tooltip from '@material-ui/core/Tooltip';
import { Chart as ReactChart } from 'react-charts'
import moment from 'moment'

import ResizableBox from "./ResizableBox";
import { FilterControl } from './FilterControl';

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
  const [ control, setControl ] = React.useState(false)
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
  }, [deliveries])
  
  const axes = React.useMemo(
    () => [
      {
        primary: true,
        type: 'utc',
        position: 'bottom',
        // tickValues: dateTicks,
        hardMin: min,
        hardMax: max,
      },
    { type: 'linear', position: 'left' },
  ], [dateTicks, min, max])

  const series = React.useMemo(() => ({ type: 'bubble' }), [])

  const brush = React.useMemo(
    () => ({
      onSelect: (brushData) => {
        setBrushState({
          min: Math.min(brushData.start, brushData.end),
          max: Math.max(brushData.start, brushData.end),
        });
      },
    }),
    []
  );

  const resetBrush = () => setBrushState({min: null, max: null})
  return (
    <>
      <Grid container direction='column' alignContent='center' justify='center' spacing={2}>
        <Grid xs={8} md={8} lg={8}>
          <Link to='/'>
              <Typography>
                <Button color='primary'>&lt; Back</Button>
              </Typography>
          </Link>
        </Grid>

          <Grid item xs={8} md={8} lg={8}>
            <Tooltip title='Filter Controls'>
              <IconButton component='div' onClick={() => setControl(!control)} aria-label="Toggle Filter controls" color="primary">
                <Settings />
              </IconButton>
            </Tooltip> 
            { control && (<FilterControl />)}
          </Grid>

        <Grid container item alignItems='center' justify='flex-start' xs={3} md={3} lg={3} spacing={2}>
          <Grid item xs={4} md={4} lg={4}>
            <Tooltip title='Reset zoom'>
              <IconButton component='div' disabled={max === null && min === null} onClick={resetBrush} aria-label="reset zoom" color="primary">
                <RefreshIcon />
              </IconButton>
            </Tooltip> 
          </Grid>
        </Grid>

        <Grid item align='center' xs={12} md={12} lg={12}>
          <ResizableBox width='900' style={{ padding: '.5rem'}}>
            <ReactChart data={currentSelection} axes={axes} series={series} primaryCursor={{showLabel: true}} tooltip brush={brush} />
          </ResizableBox>
        </Grid>
      </Grid>
    </>
  );
}
