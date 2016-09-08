import * as React from 'react';

import { Hello } from './Hello';

export class App extends React.Component<void, void> {
  render() {
    return (
      <Hello compiler="TypeScript" framework="React" />
    );
  }
}
