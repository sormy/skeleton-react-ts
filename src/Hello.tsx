import React from 'react';

interface IHelloProps {
  compiler: string;
  framework: string;
}

export default class Hello extends React.Component<IHelloProps, void> {
  public render() {
    return (
      <div>
        <h1>Hello from {this.props.compiler} and {this.props.framework}</h1>
        <div style={{ margin: '10px' }}>
          <button className="btn btn-primary">
            This button should be red if Bootstrap overrides are working well
          </button>
        </div>
        <div style={{ margin: '10px' }}>
          <button className="ui button">
            This button should be red if Semantic UI overrides are working well
          </button>
        </div>
      </div>
    );
  }
}
