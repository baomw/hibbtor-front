import React from 'react';
import { Redirect } from 'react-router-dom';

/**
 * 创建重定向组件
 * @param to
 * @return {function(): *}
 */
export default function redirect(to) {
  return function () {
    return <Redirect to={to}/>;
  };
}
