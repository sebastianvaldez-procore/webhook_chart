import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles({
  formControl: {
    minWidth: 120,
  }
});

export function FilterControl() {
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
      </Grid>
    </>
  );
}
