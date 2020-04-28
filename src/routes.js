import redirect from './modules/router/redirect';
import {routeGuard} from "./modules/router/route-guard";

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
        path: '/home/:type?',
        component: routeGuard((props, next) => {
          if (window.isLogin) {
            next();
          } else {
            next('/login')
          }
        }, require('./pages/home').default)
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
