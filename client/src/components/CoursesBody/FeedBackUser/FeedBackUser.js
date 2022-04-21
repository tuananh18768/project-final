import React from 'react'
import style from "./feedback.module.css"
export default function FeedBackUser() {
  return (
    <div className={`col-3 text-center ${style.feedback__item}`}>
      <img src={require('../../../assets/feedback1.jpg')} alt="feedback" />
      <div className="feedback__descript">
        <p className={style.feedback__desc}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet reiciendis voluptate similique esse deleniti itaque nam qui veritatis, perspiciatis totam vitae? Atque nobis cupiditate quidem. Officiis tenetur tempora facilis explicabo?</p>
      </div>
    </div>
  )
}
