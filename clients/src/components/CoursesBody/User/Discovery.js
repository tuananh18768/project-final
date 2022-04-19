import React from 'react'
import { Link } from 'react-router-dom'

export default function Discovery() {
    return (
        <div className="discovery__main">
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
            <div className="discovery__content">
                <div className="discovery__tittle">
                    <h3>Đang quan tâm</h3>
                </div>
                <h4 className='discovery__ask'>Bạn quan tâm đến chủ đề nào? (Bấm để chọn)</h4>
                <div className="row mt-3 row__discovery">
                    <div className="col-4 discover__item text-center">
                        <button className="btn__discovery">Chế độ ăn uống giảm cân</button>
                    </div>
                    <div className="col-4 discovery__item text-center">
                        <button className="btn__discovery">Chế độ ăn uống tăng cân</button>
                    </div>
                    <div className="col-4 discovery__item text-center">
                        <button className="btn__discovery">Chăm sóc sức khỏe</button>
                    </div>
                    <div className="col-4 discovery__item text-center">
                        <button className="btn__discovery">Thực phẩm bổ sung cho tập gym</button>
                    </div>
                    <div className="col-4 discovery__item text-center">
                        <button className="btn__discovery">Phục hồi và trị liệu</button>
                    </div>
                    <div className="col-4 discovery__item text-center">
                        <button className="btn__discovery">Cải thiện vóc dáng</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
