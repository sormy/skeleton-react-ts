import React from 'react';

import Counter from './Counter';
import Hello from './Hello';

export default class App extends React.Component<void, void> {
  public render() {
    return (
      <div style={{ margin: '20px' }}>
        <Hello compiler="TypeScript" framework="React" />
        <Counter />
      </div>
    );
  }
}
