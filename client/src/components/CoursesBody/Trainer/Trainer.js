import React from 'react'
import style from "./trainer.module.css"

export default function Trainer({ current }) {
  return (
    <div className={`col ${style.trainer__item}`}>
      <img style={{ margin: '0 auto', marginBottom: '10px' }} src={current.avatar} alt="pt1" />
      <p>{current.name}</p>
      <p style={{ padding: '0 40px' }}>{current.experience}</p>
    </div>
  )
}
