import React from 'react';

export default [
  {
    path: '/orders',
    name: 'Orders',
    component: React.lazy(() => import('orders'))
  }
];
