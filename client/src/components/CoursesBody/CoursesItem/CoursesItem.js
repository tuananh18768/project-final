import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchAllTutorial, dispatchAllTutorial } from '../../../redux/actions/tutorialAction'
import style from '../course.module.css'
export default function CoursesItem() {
    const tutorials = useSelector(state => state.tutorials)
    const dispatch = useDispatch()

    const { tutorialsUser } = tutorials
    useEffect(() => {
        return fetchAllTutorial().then(res => dispatch(dispatchAllTutorial(res)))
    }, [dispatch])
    return (

        <>
            {
                tutorialsUser.map((current, index) => {
                    return <div className="col-3">
                        <div className={style.course__item}>
                            <img src={current.avatar_couses} alt />
                            <div className={style.course__body}>
                                <span className={style.course__topic}>Thiết kế</span>
                                <h5 className={style.course__title}>{current.name}</h5>
                                <p className={style.course__description}>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                    Odio facilis cumque vel eum dicta</p>
                                <Link to={`courses/${current.linkName}`}>
                                    <button className={style.course__join}>Tham gia khoá học</button>
                                </Link>
                            </div>
                        </div>
                    </div>

                })

            }
        </>

    )
}
