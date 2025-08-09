import React from 'react'

export default function Keypad({ usedKeys }) {
  const rows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
  ];

  return (
    <div className="keypad">
      <div className="keypad-row">{rows[0].map(l => {
        const color = usedKeys[l];
        return <div key={l} className={`key ${color || ''}`}>{l}</div>;
      })}</div>
      <div className="keypad-row row-offset-1">{rows[1].map(l => {
        const color = usedKeys[l];
        return <div key={l} className={`key ${color || ''}`}>{l}</div>;
      })}</div>
      <div className="keypad-row row-offset-2">{rows[2].map(l => {
        const color = usedKeys[l];
        return <div key={l} className={`key ${color || ''}`}>{l}</div>;
      })}</div>
    </div>
  );
}
