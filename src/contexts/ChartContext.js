import React from 'react';


const ChartStateContext = React.createContext()
const ChartDispatchContext = React.createContext()

function chartReducer( state, action) {
  switch(action.type) {
    case 'validJSON': {
      return { ...state, chartData: JSON.parse(action.data) }
    }
    case 'toggleFilterBar': {
      console.log('toggleFilterBar reducer ran')
      return {...state, showFilterBar: !state.showFilterBar }
    }
    default: {
      throw new Error(`Action type: ${action.type} not supported.`)
    }
  }
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