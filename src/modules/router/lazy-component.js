import React from 'react';
import ErrorBoundary from '../../components/router/error-boundary';
import Loading from '../../components/router/loading';

/**
 * 异步加载组件
 * @param lazyLoader
 * @param extraProps
 * @return {*}
 */
export default function lazyComponent(lazyLoader, extraProps = {}) {
  const Component = React.lazy(lazyLoader);

  return React.memo(props => {
    return (
      <ErrorBoundary>
        <React.Suspense fallback={<Loading/>}>
          <Component {...props} {...extraProps}/>
        </React.Suspense>
      </ErrorBoundary>
    );
  });
}
