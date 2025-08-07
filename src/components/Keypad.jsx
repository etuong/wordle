import React, { useEffect, useState } from 'react'

export default function Keypad({ usedKeys }) {
  const letters = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(97 + i)
  );

  return (
    <div className="keypad">
      {letters.map(l => {
        const color = usedKeys[l.key]
        return (
          <div key={l.key} className={color}>{l.key}</div>
        )
      })}
    </div>
  )
}
