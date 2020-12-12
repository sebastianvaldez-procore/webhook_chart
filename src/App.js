import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper'
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';



function App() {
  const [payload, setPayload] = React.useState('')

  const handlePayload = (e) => {
    e.preventDefault()
    alert(`payload is: ${payload}`)
  }
  return (
    <>
      <CssBaseline />
      <Grid container justify='center' alignItems="center" spacing={2}>

        <Grid item xs={12} md={12} lg={12}>
          <Typography align='center' variant="h3">
          Chart Procore Webhook Deliveries
          </Typography>
        </Grid>

          <Grid item xs={2} md={2} lg={2}/>
          
          <Grid item align='center' xs={8} md={8} lg={8}>
            <form onSubmit={handlePayload}>
              <TextField
              multiline
              variant="outlined"
              fullWidth
              label='Webhook JSON'
              onChange={e => setPayload(e.target.value)}
              value={payload}
              placeholder="Paste Webhook delivery payload here...."
              />
              <br />
              <Button type='submit' disabled={payload !== '' ? false : true} color='primary'>Chart Webhook Deliveries</Button>
            </form>            
          </Grid>

          <Grid item xs={2} md={2} lg={2}/>

      </Grid>
    </>
  );
}

export default App;
