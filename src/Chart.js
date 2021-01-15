import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import RefreshIcon from '@material-ui/icons/Refresh';
import Settings from '@material-ui/icons/Settings';
import Tooltip from '@material-ui/core/Tooltip';
import { Chart as ReactChart } from 'react-charts'

import { useChartDispatch, useChartState } from './contexts/ChartContext'
import ResizableBox from "./ResizableBox";
import { FilterControl } from './FilterControl';

const useStyles = makeStyles({
  Grid: {
    border: '3px solid black',
    paddingLeft: '4rem',
    minWidth: '900px'
  },
  filterContainer: {
    border: '3px solid orange',
    justifyContent: 'center'

  }

})


function ChartNavigator({min, max, handleBrush}) {
  const chartDispatch = useChartDispatch()
  const resetBrush = () => handleBrush({min: null, max: null})
  const classes = useStyles()

  const handleFilterBar = () => {
    chartDispatch({ type: 'toggleFilterBar' })
  }

  // console.log(`char nav: \n ${JSON.stringify(chartState, null, 2)}`)

  return (
      <Grid className={classes.Grid} container direction='column' justify='center' align='center' spacing={1}>
        <Grid style={{border: '2px red solid'}} item xs={4} md={4} lg={4}>
          <Link to='/'>
              <Typography>
                <Button color='primary'>&lt; Back</Button>
              </Typography>
          </Link>
        </Grid>

          <Grid className={classes.filterContainer} container item xs={4} md={4} lg={4}>
            <Tooltip title='Filter Controls'>
              <IconButton component='div' onClick={handleFilterBar} aria-label="Toggle Filter controls" color="primary">
                <Settings />
              </IconButton>
            </Tooltip> 
          </Grid>

          <Grid style={{border: '2px red solid'}} item xs={4} md={4} lg={4}>
            <Tooltip title='Reset zoom'>
              <IconButton component='div' disabled={max === null && min === null} onClick={resetBrush} aria-label="reset zoom" color="primary">
                <RefreshIcon />
              </IconButton>
            </Tooltip> 
          </Grid>
      </Grid>
  )
}

export function Chart(props) {
  const chartState = useChartState()
  const { showFilterBar } = chartState

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

    setCurrenSelection([{label: 'webhook durations', data: finalData}])
  }, [deliveries])
  
  const axes = React.useMemo(
    () => [
      {
        primary: true,
        type: 'utc',
        position: 'bottom',
        hardMin: min,
        hardMax: max,
      },
    { type: 'linear', position: 'left' },
  ], [min, max])

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

  return (
    <>
      <ChartNavigator min={min} max={max} handleBrush={setBrushState} />
      <Grid style={{border: '2px red solid'}} item align='center' xs={12} md={12} lg={12}>
        { showFilterBar && <FilterControl /> }
        <ResizableBox width='900' style={{ padding: '.5rem'}}>
          <ReactChart data={currentSelection} axes={axes} series={series} primaryCursor={{showLabel: true}} tooltip brush={brush} />
        </ResizableBox>
      </Grid>
    </>
  );
}
