import React from 'react';
import { Redirect } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { Controller, useForm } from 'react-hook-form'

import { useChartDispatch, useChartState } from './contexts/ChartContext'

const defaultValues = {
  WebhookPayload: ''
}

export default function PayloadField({ history }) {
  const chartDispatch = useChartDispatch()
  const chartState = useChartState()
  const { chartData } = chartState

  const [ jsonError, setJsonError ] = React.useState(null)
  const { handleSubmit, control, reset } = useForm({defaultValues})

  if ( chartData !== undefined && chartData !== null ) {
    return <Redirect to='/chart' />
  }

  const isValidJson = json => {
    try {
      if ( JSON.parse(json) ) {
        setJsonError(null)
        return true
      } else {
        throw(json)
      }
    }
    catch(error) {
      console.log(JSON.stringify(error, null, 2))
      setJsonError(true)
      return false
    }
  }

  const handlePayload = ({WebhookPayload}) => {
    chartDispatch({type: 'validJSON', data: WebhookPayload })
  };

  return (
    <>
    <Grid container>
      <Grid item xs={2} md={2} lg={2} />
        <Grid item align='center' xs={8} md={8} lg={8}>
          <form onSubmit={handleSubmit(handlePayload)}>
            <Controller
              name="WebhookPayload"
              control={control}
              rules={{
                validate: isValidJson
              }}
              as={
                <TextField
                error={jsonError}
                helperText={jsonError ? 'Not valid JSON' : ''}
                placeholder="Paste Webhook delivery payload here...." 
                multiline
                variant="outlined"
                fullWidth
                label='Webhook JSON'
                rows={8}
                />                
              }
            />
            <br />
              <Button type='submit' color='primary'>
                  Chart Webhook Deliveries
              </Button>
              <Button onClick={() => {
                reset(defaultValues)
                setJsonError(null)
              }} type='reset' color='secondary'>Cancel</Button>
          </form>
        </Grid>
      <Grid item xs={2} md={2} lg={2} />
    </Grid>
    </>
  );
}
