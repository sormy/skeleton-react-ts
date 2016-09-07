import * as React from 'react';

export interface HelloProps {
  compiler: string;
  framework: string;
}

export class Hello extends React.Component<HelloProps, {}> {
  render() {
    return (
      <div style={{ margin: '20px' }}>
        <h1>Hello from {this.props.compiler} and {this.props.framework}</h1>
        <button type="button" className="btn btn-primary">
          This button should be red if bootstrap overrides work well
        </button>
      </div>
    );
  }
}
