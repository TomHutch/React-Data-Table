import React from 'react';
import ReactDOM from 'react-dom';
import DataTable from './src';

const mountNode = document.getElementById('root');

const headers = ['header1', 'header2', 'header3'];
const rowData = [
  { header1: 1, header2: 2, header3: 3 },
  { header1: 1, header2: 2, header3: 3 },
];

ReactDOM.render(
  <DataTable
    headers={headers}
    rowData={rowData}
  />
  , mountNode);
