import React from 'react';
import { Redirect } from 'react-router-dom';

/**
 * 创建路由守卫组件，可用于授权拦截等
 * @param {Function} beforeEnter 进入路由前执行，回调参数为(props: Object, next: Function(to))
 * @param {Function|Class} Component 渲染的组件
 * @param {Object} [externalProps] 组件额外的props
 * @return {*}
 */
export function routeGuard(beforeEnter, Component, externalProps = {}) {
  function RouteGuard(props) {
    let nextComp = null;

    function next(to) {
      if (to) {
        nextComp = <Redirect to={to}/>;
      } else {
        nextComp = <Component {...props} {...externalProps}/>;
      }
    }

    beforeEnter(props, next);
    return nextComp;
  }

  return React.memo(RouteGuard);
}
