import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid';

import { Chart } from './Chart';
import PayloadField from './PayloadField';



function App() {
  return (
    <>
      <CssBaseline />
      <Grid container justify='center' alignItems="center" spacing={2}>

        <Grid item xs={12} md={12} lg={12}>
          <Typography align='center' variant="h3">
          Chart Procore Webhook Deliveries
          </Typography>
        </Grid>

        <Router basename={process.env.PUBLIC_URL}>
          <Switch>
            <Route exact path='/' component={PayloadField} />
            <Route path='/chart' component={Chart} />
            <Route render={ () => <Typography variant='h2'>404 Not found.</Typography>} />
          </Switch>
        </Router> 
      </Grid>
    </>
  );
}

export default App;
