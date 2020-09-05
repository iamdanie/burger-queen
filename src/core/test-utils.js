// test-utils.js
import React from 'react'
import {render as rtlRender} from '@testing-library/react'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {initialState as reducerInitialState, reducer} from 'core/redux/reducers'
import {SnackbarProvider} from 'core/contexts/snackbar-context'
import {ThemeProvider} from 'core/contexts/theme-context'

function render(
  ui,
  {
    initialState = reducerInitialState,
    store = createStore(reducer, initialState),
    ...renderOptions
  } = {}
) {
  function Wrapper({children}) {
    return (
      <ThemeProvider>
        <SnackbarProvider>
          <Provider store={store}>{children}</Provider>
        </SnackbarProvider>
      </ThemeProvider>
    )
  }
  return rtlRender(ui, {wrapper: Wrapper, ...renderOptions})
}

export * from '@testing-library/react'

export {render}
