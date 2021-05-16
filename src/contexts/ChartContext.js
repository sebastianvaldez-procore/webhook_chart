import React from 'react';
import _ from 'lodash';
const ChartStateContext = React.createContext()
const ChartDispatchContext = React.createContext()

function chartReducer( state, action) {
  switch(action.type) {
    case 'validJSON': {
      const chartData = JSON.parse(action.data)
      const eventProperties = filterEventProperties(chartData)

      return { ...state, chartData, ...eventProperties, filters: [] }
    }
    case 'setFilter': {
      const newFilters = Object.values(action.filters)[0] === 'none'
      ? _.omit(state.filters, _.keys(action.filters))
      : _.assign({}, state.filters, action.filters)

      return {...state, filters: newFilters }
    }
    case 'clearJSON': {
      console.log('clear json')
      return { ...state, chartData: null, filters: [] }
    }
    case 'toggleFilterBar': {
      return {...state, showFilterBar: !state.showFilterBar, filters: [] }
    }
    default: {
      throw new Error(`Action type: ${action.type} not supported.`)
    }
  }
}

function filterEventProperties(data) {
  const outcome = [...new Set( data.map(e => e.outcome ) )]
  const events = data.map(({event}) => ({...event}))
  const eventTypes = [...new Set( events.map(e => e.event_type ) )]
  const projects = [...new Set( events.map(e => e.project_id ) )]
  const resources = [...new Set( events.map(e => e.resource_id ) )]
  const resourceNames = [...new Set( events.map(e => e.resource_name ) )]
  return { outcome, eventTypes, projects, resources, resourceNames }
}

function ChartProvider({ children }) {
  const [state, dispatch] = React.useReducer(chartReducer, { showFilterBar: false });
  return (
    <ChartStateContext.Provider value={state}>
      <ChartDispatchContext.Provider value={dispatch} >
        { children }
      </ChartDispatchContext.Provider>
    </ChartStateContext.Provider>
  )
}

function useChartState() {
  const context = React.useContext(ChartStateContext);
  if ( context === undefined ) {
    throw new Error('useChartState must be used within a ChartProvider!')
  }
  return context
}

function useChartDispatch() {
  const context = React.useContext(ChartDispatchContext);
  if ( context === undefined ) {
    throw new Error('useChartDispatch must be used within a ChartProvider!')
  }
  return context
}

export { ChartProvider, useChartState, useChartDispatch }