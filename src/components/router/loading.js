import React, { useEffect, useState } from 'react';

const Loading = React.memo(({ delay = 200 }) => {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => {
      setReady(true);
    }, delay);
    return () => clearTimeout(t);
  }, [delay]);

  if (ready) {
    return (
      <div style={{
        fontSize: 12,
        color: '#999',
        padding: 10
      }}>Loading...
      </div>
    );
  }
  return null;
});

export default Loading;
