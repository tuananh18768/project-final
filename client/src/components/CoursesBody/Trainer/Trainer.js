import React from 'react'
import style from "./trainer.module.css"

export default function Trainer() {
  return (
    <div className={`col ${style.trainer__item}`}>
      <img src={require('../../../assets/pt1.jpg')} alt="pt1" />
    </div>
  )
}
