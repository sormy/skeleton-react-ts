import * as React from 'react';

import { Hello } from './Hello';
import { Counter } from './Counter';

export class App extends React.Component<void, void> {
  render() {
    return (
      <div style={{ margin: '20px' }}>
        <Hello compiler="TypeScript" framework="React" />
        <Counter />
      </div>
    );
  }
}
