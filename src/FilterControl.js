import React from 'react';
import _ from 'lodash'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import { useChartState, useChartDispatch } from './contexts/ChartContext'

const useStyles = makeStyles({
  formControl: {
    minWidth: 120,
    padding: '.5rem'
  }
});


export function FilterControl() {
  const chartState = useChartState()
  const { chartData } = chartState
  const chartDispatch = useChartDispatch()
  const classes = useStyles();
  
 /*todo

the reduce below flattens a singel event obj
I think I need to when the payload is loaded into the context
is generate a filter obj that has keys of filter obj and the valu is a array of uniq
results I got 

I may even consider flattening the event object just to make filtering easier

// ? I also think this filterControll should only dispatch the new filter filterSelections
// ? it could read the uniq types, and create the selection and then dispatch the new selection


 then I can say:
 useEffect( () => {
    filterJSON = inputJSON.filterBy (  all my selections  ) 
    dispatch({ type: 'newFilter', filerJSON })
  }, [ filterSelections ])

  // ! below , .reduce is not a function ????
  const filteredChartState = 
    chartState.reduce((acc, obj) => {
      const {event: { event_type, resource_name }, response_status, outcome} = obj
      acc.push({event_type, resource_name, response_status, outcome})
      return acc
    }, [])
 */
  const handleResourceName = (e) => {
    console.log(`${e.target.value} was clicked for filter`)
    chartDispatch({ type: 'setFilter', filters: { resourceName: e.target.value } })
  }
  const handleEventType = (e) => {
    console.log(`${e.target.value} was clicked for filter`)
    chartDispatch({ type: 'setFilter', filters: { eventType: e.target.value} })
  }
  const handleOutcome = (e) => {
    console.log(`${e.target.value} was clicked for filter`)
    chartDispatch({ type: 'setFilter', filters: { outcome: e.target.value} })
  }

  console.log(JSON.stringify(chartState.filters, null, 2))
  return (
    <>
      <Grid style={{ border: '2px solid red' }} container item justify="space-evenly" alignItems='center' xs={12} md={12} lg={12}>
        <Grid item>
          <FormControl className={classes.formControl}>
            <InputLabel>Resource Name</InputLabel>
            <Select onChange={handleResourceName}>
              <MenuItem value="none"><em>None</em></MenuItem>
              {chartState.resourceNames.map( (r,i) => (
                <MenuItem key={i} value={r}>{r}</MenuItem> )
              )}
            </Select>
          </FormControl>
        </Grid>

        <Grid item>
          <FormControl className={classes.formControl}>
            <InputLabel>Event Type</InputLabel>
            <Select onChange={handleEventType}>
              <MenuItem value="none"><em>None</em></MenuItem>
              {chartState.eventTypes.map( (t,i) => ( <MenuItem key={i} value={t}>{t}</MenuItem> ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item>
          <FormControl className={classes.formControl}>
            <InputLabel>Event Outcome</InputLabel>
            <Select onChange={handleOutcome}>
              <MenuItem value="none"><em>None</em></MenuItem>
              {chartState.outcome.map( (o,i) => ( <MenuItem key={i} value={o}>{o}</MenuItem> ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid style={{border: '2px red solid'}} item xs={1} md={1} lg={1}>
          <Tooltip title='Close Filter Options'>
            <IconButton component='div' onClick={() => chartDispatch({ type: 'toggleFilterBar' })} aria-label="Close Filter Options" color="primary">
              <CloseIcon />
            </IconButton>
          </Tooltip> 
        </Grid>      
      </Grid>
    </>
  );
}
