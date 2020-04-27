import React from 'react';

export default class ErrorBoundary extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  static getDerivedStateFromError(e) {
    if (process.env.NODE_ENV === 'development') {
      return { hasError: true };
    }

    // chunk加载失败
    if (e && e.name === 'ChunkLoadError') {
      return { hasError: true };
    }
    return { hasError: false };
  }

  render() {
    if (this.state.hasError) {
      return (<div>加载失败</div>);
    }
    return this.props.children;
  }
}
