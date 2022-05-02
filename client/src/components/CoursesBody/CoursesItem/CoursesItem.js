import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchAllTutorial, dispatchAllTutorial, fetchAllTutorialLogin, dispatchAllTutorialLogin } from '../../../redux/actions/tutorialAction'
import style from '../course.module.css'
import Swal from 'sweetalert2'
import axios from 'axios'

export default function CoursesItem({ allCate, objCate }) {
    const tutorials = useSelector(state => state.tutorials)
    const token = useSelector(state => state.token)
    const { tokenUser } = token
    const dispatch = useDispatch()

    const [heart, setHeart] = useState(false)
    const [loading, setLoading] = useState(0);
    const { tutorialsUser, tutorialLoginUser } = tutorials
    useEffect(() => {
        return fetchAllTutorial().then(res => dispatch(dispatchAllTutorial(res)))
    }, [dispatch])

    useEffect(() => {
        if (tokenUser) {
            fetchAllTutorialLogin(tokenUser).then(res => dispatch(dispatchAllTutorialLogin(res)))
        }
    }, [dispatch, tokenUser, loading])
    const handleLike = async (e, linkName) => {
        e.preventDefault()
        try {
            const res = await axios.put(`/user/add_listLike/${linkName}`, {}, { headers: { Authorization: tokenUser } })
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: res.data.msg,
                showConfirmButton: false,
                timer: 1500
            })
            setLoading(Date.now());
        } catch (error) {
            console.log(error)
        }
    }
    console.log(allCate)
    console.log(objCate)
    console.log(tutorialLoginUser)
    return (
        <>
            {allCate.length > 0 && objCate.length <= 0 ?
                allCate.map((current, index) => {
                    return <div className="col-3" key={index}>
                        <div className={style.course__item} style={{ minHeight: "350px" }}>
                            <img src={current.avatar_couses} alt="index" />
                            <div className={style.course__body}>
                                <span className={style.course__topic}>Thiết kế</span>
                                <h5 className={style.course__title}>{current.name}</h5>
                                <p style={{ minHeight: "55px" }} className={style.course__description}>{current?.description?.length > 30 ? current?.description.slice(0, 80) : current?.description}</p>
                                <Link to={`courses/${current.linkName}`}>
                                    <button className={style.course__join}>Tham gia khoá học</button>
                                </Link>
                                <button onClick={(e) => { handleLike(e, current._id) }} className={style.course__btnHeart}>{current.userLikes ? <i class="fa-solid fa-heart"></i> : <i class="fa-regular fa-heart"></i>}</button>
                            </div>
                        </div>
                    </div>

                })

                :
                allCate.length <= 0 && objCate.length > 0 ?
                    objCate.map((current, index) => {
                        return <div className="col-3" key={index}>
                            <div className={style.course__item} style={{ minHeight: "350px" }}>
                                <img src={current.avatar_couses} alt="index" />
                                <div className={style.course__body}>
                                    <span className={style.course__topic}>Thiết kế</span>
                                    <h5 className={style.course__title}>{current.name}</h5>
                                    <p style={{ minHeight: "55px" }} className={style.course__description}>{current?.description?.length > 30 ? current?.description.slice(0, 80) : current?.description}</p>
                                    <Link to={`courses/${current.linkName}`}>
                                        <button className={style.course__join}>Tham gia khoá học</button>
                                    </Link>
                                    <button onClick={(e) => { handleLike(e, current._id) }} className={style.course__btnHeart}>{current.userLikes ? <i class="fa-solid fa-heart"></i> : <i class="fa-regular fa-heart"></i>}</button>
                                </div>
                            </div>
                        </div>

                    })
                    :
                    !tokenUser ?
                        tutorialsUser.map((current, index) => {
                            return <div className="col-3" key={index}>
                                <div className={style.course__item} style={{ minHeight: "350px" }}>
                                    <img src={current.avatar_couses} alt="index" />
                                    <div className={style.course__body}>
                                        <span className={style.course__topic}>Thiết kế</span>
                                        <h5 className={style.course__title}>{current.name}</h5>
                                        <p style={{ minHeight: "55px" }} className={style.course__description}>{current?.description?.length > 30 ? current?.description.slice(0, 80) : current?.description}</p>
                                        <Link to={`courses/${current.linkName}`}>
                                            <button className={style.course__join}>Tham gia khoá học</button>
                                        </Link>
                                        <button className={style.course__btnHeart}>{heart ? <i class="fa-solid fa-heart"></i> : <i class="fa-regular fa-heart"></i>}</button>
                                    </div>
                                </div>
                            </div>

                        })
                        :
                        tutorialLoginUser.map((current, index) => {
                            return <div className="col-3" key={index}>
                                <div className={style.course__item} style={{ minHeight: "350px" }}>
                                    <img src={current.avatar_couses} alt="index" />
                                    <div className={style.course__body}>
                                        <span className={style.course__topic}>Thiết kế</span>
                                        <h5 className={style.course__title}>{current.name}</h5>
                                        <p style={{ minHeight: "55px" }} className={style.course__description}>{current?.description?.length > 30 ? current?.description.slice(0, 80) : current?.description}</p>
                                        <Link to={`courses/${current.linkName}`}>
                                            <button className={style.course__join}>Tham gia khoá học</button>
                                        </Link>
                                        <button onClick={(e) => { handleLike(e, current._id) }} className={style.course__btnHeart}>{current.userLikes ? <i class="fa-solid fa-heart"></i> : <i class="fa-regular fa-heart"></i>}</button>
                                    </div>
                                </div>
                            </div>

                        })

            }

        </>

    )
}
