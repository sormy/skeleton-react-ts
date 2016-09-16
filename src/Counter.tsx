import React from 'react';

import moment from 'moment';

interface ICounterState {
  counter: number;
}

export default class Counter extends React.Component<void, ICounterState> {
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

  private getTime() {
    return moment().format('MM/DD/YYYY HH:mm:ss');
  }

  public componentDidMount() {
    this.interval = setInterval(this.tick.bind(this), 1000);
  }

  public componentWillUnmount() {
    clearInterval(this.interval);
  }

  public render() {
    return (
      <h2>Counter: {this.state.counter}; Time: { this.getTime() }</h2>
   );
  }
}
