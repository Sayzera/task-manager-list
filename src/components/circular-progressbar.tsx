import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import React from 'react'

type Props = {
    percentage: number
    text: number
}

function CircularProgressItem({
    percentage = 0,
    text=0
}: Props) {
  return (
    <div style={{ width: 90, height: 90 }}>
      <CircularProgressbar value={percentage} text={`${text}`} 
      styles={buildStyles({
         pathColor: `rgba(34, 139, 34)`,
         textColor: `black`,
         textSize: '25px',
        })}
      />
    </div>

  )
}

export default CircularProgressItem