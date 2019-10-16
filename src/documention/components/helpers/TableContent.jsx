import React from 'react';
import { Badge } from '../../../lib';

const headerTitles = [
  'Name',
  'Side',
  'Status',
  'Price',
  'Filled Qty.',
  'Total',
  'Date',
];
const TableContent = ({ fixedColumns }) => ( // eslint-disable-line
  <>
    <thead>
      <tr>
        {headerTitles.map(title => (
          <th key={title} colSpan={fixedColumns && title === 'Date' ? 2 : 1}>
            {title}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Apple</td>
        <td>Buy</td>
        <td>
          <Badge type="danger">Rejected</Badge>
        </td>
        <td>$3.00</td>
        <td>0 / 3</td>
        <td>$9.00</td>
        <td colSpan={fixedColumns ? 2 : 1}>2019/05/10 2:16:00 PM</td>
      </tr>
      <tr>
        <td>Google</td>
        <td>Buy</td>
        <td>
          <Badge type="primary">Open</Badge>
        </td>
        <td>$5.00</td>
        <td>0 / 2</td>
        <td>$10.00</td>
        <td colSpan={fixedColumns ? 2 : 1}>2019/05/10 9:12:15 AM</td>
      </tr>
      <tr>
        <td>TRADE</td>
        <td>Sell</td>
        <td>
          <Badge type="danger">Canceled</Badge>
        </td>
        <td>$10.00</td>
        <td>0 / 2</td>
        <td>$20.00</td>
        <td colSpan={fixedColumns ? 2 : 1}>2019/04/29 9:46:15 AM</td>
      </tr>
      <tr>
        <td>Google</td>
        <td>Buy</td>
        <td>
          <Badge type="success">Filled</Badge>
        </td>
        <td>$100.00</td>
        <td>10 / 10</td>
        <td>$1000.00</td>
        <td colSpan={fixedColumns ? 2 : 1}>2019/05/13 12:34:01 PM</td>
      </tr>
    </tbody>
  </>
);

export default TableContent;
