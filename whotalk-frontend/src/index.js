import React from 'react';
import ReactDOM from 'react-dom';
import { App } from 'containers';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

var a = {a:1, b:2};
var b = {...a};
