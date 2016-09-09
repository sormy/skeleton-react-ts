import * as React from 'react';

export interface ICounterState {
  counter: number;
}

export class Counter extends React.Component<void, ICounterState> {
  private interval: number;

  constructor(props: void) {
    super(props);
    this.state = { counter: 0 };
  }

  private tick() {
    this.setState({
      counter: this.state.counter + 1
    });
  }

  public componentDidMount() {
    this.interval = setInterval(this.tick.bind(this), 1000);
  }

  public componentWillUnmount() {
    clearInterval(this.interval);
  }

  public render() {
    return (
      <h2>Counter: {this.state.counter}</h2>
   );
  }
}
