import React from 'react'
import { Link } from 'react-router-dom'

export default function Favorite() {
    return (
        <div className="favorite__main">
            <div className="user-top">
                <div className="name-user">
                    <span>Thành viên: Bạch Tuấn Anh</span>
                </div>
                <div className="course">
                    <div className="coure-item">
                        <i className="fa fa-book" />
                        <Link to="/courseOwner">Khóa Học</Link>
                    </div>
                    <div className="coure-item">
                        <i className="fa fa-user" />
                        <Link to="/profile/user">Hồ sơ cá nhân</Link>
                    </div>
                    <div className="coure-item">
                        <i className="fa fa-book" />
                        <Link to="/favorite">Yêu Thích</Link>
                    </div>
                    <div className="coure-item">
                        <i className="fa fa-search-plus" />
                        <Link to="/discovery">Khám Phá</Link>
                    </div>
                    <div className="coure-item">
                        <i className="fa fa-plus" />
                        <Link to="/checkBody">Tình trạng sức khỏe</Link>
                    </div>
                </div>
            </div>
            <div className="favorite__content">
                <div className="favorite__tittle">
                    <h3>Đang quan tâm</h3>
                </div>
                <div className="row mt-3">
                    <div className="col-4 item__left text-center">
                        <h4>Khám Phá</h4>
                    </div>
                    <div className="col-8 item__right text-center">
                        <h4>Đã quan tâm</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}
