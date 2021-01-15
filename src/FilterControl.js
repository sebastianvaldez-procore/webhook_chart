import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import { useChartDispatch } from './contexts/ChartContext'

const useStyles = makeStyles({
  formControl: {
    minWidth: 120,
    padding: '.5rem'
  }
});

export function FilterControl() {
  const chartDispatch = useChartDispatch()
  const classes = useStyles();
  return (
    <>
      <Grid style={{ border: '2px solid red' }} container item justify="space-evenly" alignItems='center' xs={12} md={12} lg={12}>
        <Grid item>
          <FormControl className={classes.formControl}>
            <InputLabel>Resource Name</InputLabel>
            <Select>
              <MenuItem value=""><em>None</em></MenuItem>
              <MenuItem value="project">Project</MenuItem>
              <MenuItem value="commitment">Commitment</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item>
          <FormControl className={classes.formControl}>
            <InputLabel>Event Type</InputLabel>
            <Select>
              <MenuItem value=""><em>None</em></MenuItem>
              <MenuItem value="create">Create</MenuItem>
              <MenuItem value="update">Update</MenuItem>
              <MenuItem value="delete">Delete</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item>
          <FormControl className={classes.formControl}>
            <InputLabel>Event Outcome</InputLabel>
            <Select>
              <MenuItem value=""><em>None</em></MenuItem>
              <MenuItem value="retried">Retried</MenuItem>
              <MenuItem value="ok">Ok</MenuItem>
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
