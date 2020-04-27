import redirect from './modules/router/redirect';

export default [
  {
    component: require('./pages/app').default,
    routes: [
      {
        path: '/',
        exact: true,
        component: redirect('/index')
      },
      {
        path: '/index',
        component: require('./pages/index').default
      },
      {
        path: '/home',
        component: require('./pages/home').default
      },
      {
        path: '/login',
        component: require('./pages/login').default
      },
      {
        path: '/register',
        component: require('./pages/register').default
      }
    ]
  }
];
