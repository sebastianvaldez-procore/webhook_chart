import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

export default function PayloadField() {
  const [payload, setPayload] = React.useState('');

  const handlePayload = (e) => {
    e.preventDefault();
    alert(`payload is: ${payload}`);
  };

  return (
    <>
      <Grid item xs={2} md={2} lg={2} />

      <Grid item align='center' xs={8} md={8} lg={8}>
        <form onSubmit={handlePayload}>
          <TextField
            multiline
            variant="outlined"
            fullWidth
            label='Webhook JSON'
            onChange={e => setPayload(e.target.value)}
            value={payload}
            rows={8}
            placeholder="Paste Webhook delivery payload here...." />
          <br />
          <Link to='/chart'>
            <Button type='submit' disabled={payload !== '' ? false : true} color='primary'>Chart Webhook Deliveries</Button>
          </Link>
        </form>
      </Grid>

      <Grid item xs={2} md={2} lg={2} />
    </>
  );
}
