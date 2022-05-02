import React from 'react'
import CoursesItem from './CoursesItem/CoursesItem'
import FeedBackUser from './FeedBackUser/FeedBackUser'
import Trainer from './Trainer/Trainer'
import style from "./Trainer/trainer.module.css"

export default function CoursesBody() {
    return (
        <>
            {/* <div className="row">
                <CoursesItem />
            </div> */}
            <div className={style.trainer}>
                <h4>Giảng viên tiêu biểu</h4>
                <div className="row">
                    <Trainer />
                    <Trainer />
                    <Trainer />
                    <Trainer />
                    <Trainer />
                    <Trainer />
                    <Trainer />
                </div>
            </div>
            <div className={style.trainer__feedback}>
                <h4>Kết quả sau khi tập</h4>
                <div className="row" >
                    <FeedBackUser />
                    <FeedBackUser />
                    <FeedBackUser />
                    <FeedBackUser />
                </div>
            </div>
        </>
    )
}
