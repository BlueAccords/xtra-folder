import React, { Fragment } from 'react';


const ChipList = ({chips = null}) => {
  return(
    <Fragment>
      {
      chips.map((chip) => {
        return (
          <div key={chip.id} className="card">
            <header className="card-header">
              <div className="card-header-title">
                <p className="">No. {chip.chip_number} - {chip.original_name}</p>
              </div>
            </header>
            <div className="card-content">
              <div className="content chip-body-info">
                <p>Element: {chip.element}</p>
                <p>Memory: {chip.memory}</p>
                <p>Rarity: {chip.rarity}</p>
                <p>Type: {chip.type}</p>
              </div>
            </div>
            <footer className="card-footer">
              <div href="#" className="card-footer-item">{chip.damage}</div>
              <a href="#" className="card-footer-item">Edit</a>
              <a href="#" className="card-footer-item">Delete</a>
            </footer>
            </div>
          );
        })
      }
    </Fragment>
  )
}

export default ChipList;