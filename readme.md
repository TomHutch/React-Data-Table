React Data Table
==============

A React Component that takes a collection and presents it as an un-opiniated table. Customisable with onClick actions, data transformations and className selectors via config passed as props. By default, allows for column sorting.

## Usage

```javascript
const headers = ['header1', 'header2', 'header3'];
const rowData = [
  { header1: 1, header2: 2, header3: 3 },
  { header1: 1, header2: 2, header3: 3 },
];

<DataTable
  headers={headers}
  rowData={rowData}
/>
```

## Properties

| Property | Description
:---|:---
| `headers` | Array of strings that can access key values in the rowData
| `rowData` | An array of objects containing the data
| `specialRowData` | Object containing an additional row of data to be displayed separately
| `transformations` | Config object that changes the displayed cell value without affecting the data.
| `actions` | Config object that attaches a given onClick handler to a cell
| `selectors` | Config object that assigns class names to the cell


### Config Object

A config object passed as a prop to the DataTable can allow special behaviour for any specified header for headers, rows and the specialRow. In the following example, if the header is `header1`, then special behaviour can be specified by the given function: 

```Javascript
const configObj = {
  headers: {
    header1: (headers, header) => {}
  },
  rows: {
    header1: (row, header, rowIndex) => {}
  },
  specialRow: {
    header1: (row, header) => {}
  }
}
```

### Transformations

A `transformations` prop can change the displayed cell value without affecting the data.
Useful for setting default fallback or threshold values.

```javascript
const transformations = {
  rows: {
    header1: row => !isNaN(row.header1) ? row.header1 : '-',
  },
};
```

### Actions

An `actions` prop can attach an onClick handler to a cell.

```javascript
const actions = {
  rows: {
    header1: (row, header) => { alert(`${row.header} has been clicked!`) },
  },
};
```

### Selectors

A `selectors` prop can assign a class name to a cell.
Useful for allowing conditional styling of cells containing particular values.

```javascript
const selectors = {
  rows: {
    header1: row => row.header1 > 1 ? 'greater-than-one' : '',
  },
};
```

To see a working example, build using `npm run example` then open `example/dist/template.html` in a browser.
