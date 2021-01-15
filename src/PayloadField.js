import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { Controller, useForm } from 'react-hook-form'
import { verify } from 'verify-json'

import { useChartDispatch } from './contexts/ChartContext'

const webhookSchema = `
[
  {
    "event": {
      "user_id": integer,
      "timestamp": string,
      "resource_name": string,
      "resource_id": integer,
      "project_id": integer,
      "id": integer,
      "ulid": string,
      "event_type": string,
      "company_id": integer,
      "api_version": string,
      "metadata": {
        "source_user_id": integer,
        "source_company_id": integer,
        "source_project_id": integer,
        "source_application_id": string,
        "source_operation_id": string
      }
    },
    "event_id": integer,
    "outcome": string,
    "response_body": string,
    "response_error": string,
    "started_at": string,
    "completed_at": string,
    "response_status": integer,
    "response_headers": {}
  }
]
`

const defaultValues = {
  WebhookPayload: ''
}

export default function PayloadField({ history }) {
  const chartDispatch = useChartDispatch()
  const [ jsonError, setJsonError ] = React.useState(null)
  const { handleSubmit, control, reset } = useForm({defaultValues})

  const isValidJson = json => {
    try {
      
      if ( JSON.parse(json) ) {
        setJsonError(null)
        chartDispatch({type: 'success', data: json })
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
    console.log('handlePayload...', WebhookPayload)
    history.push({
      pathname: '/chart',
      state: JSON.parse(WebhookPayload)
    })
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
