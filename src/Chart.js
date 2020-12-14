import React from 'react';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

export function Chart(props) {
  const data = props.location.state
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
            <Typography>
            chart...
          </Typography>
          <pre>
            {data}
          </pre>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
