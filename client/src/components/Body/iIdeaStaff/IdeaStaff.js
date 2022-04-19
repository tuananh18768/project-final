import React from 'react'

export default function IdeaStaff() {
    return (
        <div>
            <div className="post__item">
                <div className="post__author">
                    <img src={require('./avatar.jpeg')} alt="avatar" className="post__author--img" />
                    <h6 className="post__author--name">Nguyễn Văn Bảo</h6>
                </div>
                <p className="post__title">Title</p>
                <p className="post__desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi
                    eligendi
                    perferendis sapiente ipsam nulla nam placeat temporibus ipsa quas eaque.</p>
                <div className="post__view">
                    <a href="http://facebook.com" className="post__detail btn btn-primary">Detail</a>
                    <div className="post__like">
                        <i className="fa fa-thumbs-up" />
                        <i className="fa fa-thumbs-down" />
                    </div>
                </div>
            </div>
        </div>
    )
}
