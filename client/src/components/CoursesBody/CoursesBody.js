import React, { useEffect } from 'react'
import CoursesItem from './CoursesItem/CoursesItem'
import FeedBackUser from './FeedBackUser/FeedBackUser'
import { useDispatch, useSelector } from 'react-redux'
import { fetchGetAllTrainer, dispatchGetAllTrainerView } from '../../redux/actions/authAction'
import Trainer from './Trainer/Trainer'
import style from "./Trainer/trainer.module.css"
import OwlCarousel from 'react-owl-carousel';

export default function CoursesBody() {
    const auth = useSelector(state => state.auth)
    const { allTrainerView } = auth
    const dispatch = useDispatch()
    useEffect(() => {
        fetchGetAllTrainer().then(res => dispatch(dispatchGetAllTrainerView(res)))
    }, [])
    console.log(allTrainerView)
    return (
        <>
            {/* <OwlCarousel className='owl-theme' items={4} loop margin={10} nav style={{ padding: "20px 0" }}>
                            {tutorialsUser?.map((current, index) => {
                                return <div className="item" key={index}>
                                    <div className={style.course__item} style={{ minHeight: "350px" }}>
                                        <img src={current.avatar_couses} alt="index" />
                                        <div className={style.course__body}>
                                            <h5 className={style.course__title}>{current.name}</h5>
                                            <p style={{ minHeight: "55px" }} className={style.course__description}>{current?.description?.length > 30 ? current?.description.slice(0, 80) : current?.description}</p>
                                            <Link to={`courses/${current.linkName}`}>
                                                <button className={style.course__join}>Tham gia khoá học</button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            })}
                        </OwlCarousel> */}
            <div className={style.trainer}>
                <h4>Giảng viên tiêu biểu</h4>
                <div className="row my-5 text-center">
                    {allTrainerView.map((current, index) => {
                        return <Trainer key={index} current={current} />
                    })}
                </div>
            </div>
        </>
    )
}
