import React from 'react'

export default function FeedBackUser() {
  return (
    <div className="col-4 text-center">
        <img src={require('../../../assets/feedback1.jpg')} alt="feedback" style={{width: '80px', height: '80px', objectFit: 'cover', borderRadius: '50%'}} />
        <div className="feedback__descript">
            <p style={{fontSize: '12px', marginTop: '5px'}} className="text-warning">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet reiciendis voluptate similique esse deleniti itaque nam qui veritatis, perspiciatis totam vitae? Atque nobis cupiditate quidem. Officiis tenetur tempora facilis explicabo?</p>
        </div>
    </div>
  )
}
