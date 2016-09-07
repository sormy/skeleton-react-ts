import './bootstrap/bootstrap.less';
import 'font-awesome/less/font-awesome.less';
import 'open-sans-fontface/open-sans.less';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Hello } from './Hello';

ReactDOM.render(
  <Hello compiler="TypeScript" framework="React" />,
  document.getElementById('root')
);
