import React from 'react'
import CoursesItem from './CoursesItem/CoursesItem'
import FeedBackUser from './FeedBackUser/FeedBackUser'
import Trainer from './Trainer/Trainer'

export default function CoursesBody() {
    return (
        <>
            <div className="row">
                <CoursesItem />
            </div>
            <div className="trainer">
                <h3 style={{ color: 'white' }}>Huấn Luyện Viên Tiêu Biểu</h3>
                <div className="row trainer__item">
                    <Trainer />
                    <Trainer />
                    <Trainer />
                    <Trainer />
                </div>
            </div>
            <div className="feedBack">
                <h3 style={{ color: 'white' }}>Kết Quả Của Mọi Người Sau Khi Tập</h3>
                <div className="row" style={{ padding: '20px' }}>
                    <FeedBackUser />
                    <FeedBackUser />
                    <FeedBackUser />
                </div>
            </div>
        </>
    )
}
