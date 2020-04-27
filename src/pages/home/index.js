import React from 'react';
import './home.css'

export default class Home extends React.PureComponent {
  render() {
    return (
      <div className="shopping-list" id='home-main'>
        {Array(20).fill().map(item => (
          <div className="section">
            <h5>静夜思</h5>
            <ul style={{listStyle: "none"}}>
              <li>床前明月光</li>
              <li>疑是地上霜</li>
              <li>举头望明月</li>
              <li>低头思故乡</li>
            </ul>
          </div>
        ))}
      </div>
    );
  }
}
