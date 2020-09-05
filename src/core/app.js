import React, { Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Layout, Loader } from './components'
import routes from './routes'

export default function App() {
  return (
    <Layout>
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route
            path="/"
            exact={true}
            render={() => <Redirect to="/orders" />}
          />
          {routes.map(({ path, exact = false, component }) => (
            <Route key={path} path={path} exact={exact} component={component} />
          ))}
          <Route render={() => <h1>404 Page Not Found</h1>} />
        </Switch>
      </Suspense>
    </Layout>
  )
}
