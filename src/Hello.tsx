import * as React from 'react';

export interface HelloProps {
  compiler: string;
  framework: string;
}

export class Hello extends React.Component<HelloProps, void> {
  render() {
    return (
      <div>
        <h1>Hello from {this.props.compiler} and {this.props.framework}</h1>
        <button type="button" className="btn btn-primary">
          This button should be red if bootstrap overrides are working well
        </button>
      </div>
    );
  }
}
