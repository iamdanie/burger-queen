import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'

function PrivateRoute({ component: Component, redirectTo, ...rest }) {
  const { user } = useSelector(state => state.user)

  return (
    <Route
      {...rest}
      render={props =>
        user ? (
          <Component {...props} />
        ) : (
            <Redirect
              to={{
                pathname: redirectTo,
                state: { from: props.location }
              }}
            />
          )
      }
    />
  )
}

export default PrivateRoute
