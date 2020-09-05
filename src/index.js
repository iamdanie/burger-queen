import React, {Suspense} from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {PersistGate} from 'redux-persist/integration/react'
import {Provider} from 'react-redux'
import {store, persistor} from './core/redux/store'
import {ThemeProvider} from './core/contexts/theme-context'
import {SnackbarProvider} from './core/contexts/snackbar-context'
import {Loader, PrivateRoute} from './core/components'
import {APP_PATH} from './core/constants'
import './index.css'

const App = React.lazy(() => import('./core/app'))
const Login = React.lazy(() => import('./core/login'))
const SignUp = React.lazy(() => import('./core/signup'))

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider>
        <SnackbarProvider>
          <Router>
            <Suspense fallback={<Loader fullScreen />}>
              <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={SignUp} />
                <PrivateRoute
                  path={APP_PATH}
                  redirectTo="/login"
                  component={App}
                />
              </Switch>
            </Suspense>
          </Router>
        </SnackbarProvider>
      </ThemeProvider>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
)
