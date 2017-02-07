import React from 'react';
import { Link } from 'react-router';

/**
* @delete-me: REPLACE WITH Blueprint.js TABLE
* debug only
*/
export const Results = () => (
  <div>
    {/* @delete-me */}
    @DEBUG RESULTS TABLE:
    <table>
      <tbody>
        <tr>
          <th>Name</th>
          <th>Universal Code</th>
        </tr>
        <tr>
            <td>
              <Link to={'/amoxicillin/am500'}>
                amoxicillin
              </Link>
            </td>
            <td>
              am500
            </td>
        </tr>
        <tr>
            <td>
              <Link to={'/hydrochlorothiazide/hy50'}>
                hydrochlorothiazide
              </Link>
            </td>
            <td>
              hy50
            </td>
        </tr>
        <tr>
            <td>
              <Link to={'/metaformin/me1000'}>
                metaformin
              </Link>
            </td>
            <td>
              me1000
            </td>
        </tr>
      </tbody>
    </table>
  </div>
);
