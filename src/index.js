import React, { Component } from 'react';
import { merge, isEmpty, orderBy } from 'lodash';
import classNames from 'classnames';

class DataTable extends Component {
  constructor(props) {
    super(props);
    this.state = this.updateStateFromProps(props);
  }

  updateStateFromProps(props) {
    return {
      headers: props.headers,
      rowData: props.rowData,
      specialRowData: props.specialRowData,
      columnSorts: {},
      transformations: merge(props.transformations, { headers: {}, rows: {}, specialRow: {} }),
      actions: merge(props.actions, { headers: {}, rows: {}, specialRow: {} }),
      selectors: merge(props.selectors, { headers: {}, rows: {}, specialRow: {} }),
    };
  }

  componentWillReceiveProps(props) {
    this.setState(this.updateStateFromProps(props));
  }

  sortColumn(col) {
    const order = this.state.columnSorts[col];
    if (order) {
      this.state.columnSorts[col] = false;
      this.setState({ rowData: orderBy(this.state.rowData, [col], ['asc']) });
    } else {
      this.state.columnSorts[col] = true;
      this.setState({ rowData: orderBy(this.state.rowData, [col], ['desc']) });
    }
  }

  onClickHandler(type, row, header, rowIndex) {
    const { actions } = this.state;

    if (actions[type][header]) {
      return actions[type][header](row, header, rowIndex);
    } else if (type === 'headers') {
      return this.sortColumn(header);
    }

    return {};
  }

  transformCell(type, row, header, rowIndex) {
    const { transformations } = this.state;

    if (transformations[type][header]) {
      return transformations[type][header](row, header, rowIndex);
    } else if (type === 'headers') {
      return header;
    }

    return row[header];
  }

  appendSelectors(type, row, header, rowIndex) {
    const { selectors } = this.state;
    if (selectors[type][header]) {
      return selectors[type][header](row, header, rowIndex);
    }

    return '';
  }

  render() {
    const { rowData, specialRowData, headers } = this.state;

    return (
      <div className="react-data-table">
        <table>
          <thead>
            <tr className="header-row">
              {headers.map((header, i) =>
                <td
                  key={i}
                  onClick={() => this.onClickHandler('headers', headers, header)}
                  className={classNames('header-cell', header, this.appendSelectors('headers', headers, header))}
                >
                  {this.transformCell('headers', headers, header)}
                </td>
              )}
            </tr>
          </thead>
          <tbody>
            {!isEmpty(rowData) && rowData.map((row, rowIndex) =>
              <tr
                key={rowIndex}
                className={classNames('row', this.appendSelectors('rows', row, 'all', rowIndex))}
              >
                {headers.map((header, i) =>
                  <td
                    key={i}
                    onClick={() => this.onClickHandler('rows', row, header, rowIndex)}
                    className={classNames('row-cell', header, this.appendSelectors('rows', row, header, rowIndex))}
                  >
                    {this.transformCell('rows', row, header, rowIndex)}
                  </td>
                )}
              </tr>
            )}
            {!isEmpty(specialRowData) &&
              <tr className="special-row">
                {headers.map((header, i) =>
                  <td
                    key={i}
                    onClick={() => this.onClickHandler('specialRow', specialRowData, header)}
                    className={classNames('special-row-cell', header, this.appendSelectors('specialRow', specialRowData, header))}
                  >
                    {this.transformCell('specialRow', specialRowData, header)}
                  </td>
                )}
              </tr>
            }
          </tbody>
        </table>
      </div>
    );
  }
}

export default DataTable;
