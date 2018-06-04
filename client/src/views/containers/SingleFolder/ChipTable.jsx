import React, { Fragment } from 'react';
import PT from 'prop-types';

const ChipTable = ({chips}) => {
  return(
    <div className="table-container">
    <table className='table is-fullwidth is-striped'>
      <thead>
        <tr>
          <th>No.</th>
          <th>Name</th>
          <th>Element</th>
          <th>Damage</th>
          <th>Code</th>
          <th>Memory</th>
          <th>Rarity</th>
        </tr>
      </thead>
      <tbody>
        {
          chips.map((chip) => {
            return (
            <tr key={chip.id}>
              <td>{chip.chip_number}</td>
              <td>{chip.original_name}</td>
              <td>{chip.element || 'null'}</td>
              <td>{chip.damage}</td>
              <td>{chip.code}</td>
              <td>{chip.memory}</td>
              <td>{chip.rarity}</td>
            </tr>)
          })
        }
      </tbody>
    </table>
    </div>
  )
}

export default ChipTable;