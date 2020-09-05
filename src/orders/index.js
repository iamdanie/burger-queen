import React from 'react';
import { Route } from 'react-router-dom';

const createNestedRoutes = ordersPath => [
  {
    path: ordersPath,
    exact: true,
    component: React.lazy(() => import('./list-orders'))
  },
  {
    path: `${ordersPath}/register`,
    component: React.lazy(() => import('./register-order'))
  },
  {
    path: `${ordersPath}/edit/:id`,
    component: React.lazy(() => import('./register-order'))
  }
];

function Orders({ match }) {
  const routes = createNestedRoutes(match.path);

  return routes.map(({ path, exact = false, component }) => (
    <Route key={path} path={path} exact={exact} component={component} />
  ));
}

export default Orders;
