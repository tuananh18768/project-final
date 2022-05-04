import React, { useEffect } from 'react'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { dispatchTutorialUserLike, fetchTutorialUserLike } from '../../../redux/actions/tutorialAction'
import style from '../course.module.css'

export default function Favorite() {
    const tutorialUserLike = useSelector(state => state.tutorials)
    const token = useSelector(state => state.token)
    const { listLikeTutorial } = tutorialUserLike
    const { tokenUser } = token

    const dispatch = useDispatch()
    console.log(listLikeTutorial)

    useEffect(() => {
        if (tokenUser) {
            fetchTutorialUserLike(tokenUser).then(res => dispatch(dispatchTutorialUserLike(res)))
        }
    }, [tokenUser, dispatch])
    return (
        <div className="favorite__main row">
            <div className="col col-lg-1">
                <div className="chat__wrapicon">
                    <div className="chat__icon" style={{ transform: 'translate(0 ,-140px)' }}>
                        <Link to="/">
                            <i class="fa-solid fa-house-chimney"></i>
                        </Link>
                    </div>
                    <div className="chat__icon">
                        <Link to="/courseOwner">
                            <i className="fa fa-book" />
                        </Link>
                    </div>
                    <div className="chat__icon">
                        <Link to="favorite">
                            <i class="fa-solid fa-heart"></i>
                        </Link>
                    </div>
                    <div className="chat__icon">
                        <Link to="discovery">
                            <i className="fa fa-search-plus" />
                        </Link>
                    </div>
                    <div className="chat__icon">
                        <Link to="checkBody">
                            <i className="fa fa-plus" />
                        </Link>
                    </div>
                    <div className="chat__icon">
                        <Link to="/messenger">
                            <i class="fa-brands fa-facebook-messenger"></i>
                        </Link>
                    </div>
                    {/* <div className="chat__icon">
              <Link>
              <i className="fa fa-plus" />
              </Link>
            </div> */}
                </div>
            </div>
            <div className="favorite__content col-11" style={{ padding: 0 }}>
                <div className="favorite__tittle">
                    <h3>Đang quan tâm</h3>
                </div>
                <div className="row mt-3" style={{ margin: 0 }}>
                    <div className="col-4 item__left text-center">
                        <h4>Khám Phá</h4>
                    </div>
                    <div className="col-8 item__right text-center">
                        <h4>Đã quan tâm</h4>
                        {listLikeTutorial.map((current, index) => {
                            return <div className="borderFavorite" style={{ border: '1px solid black', padding: '10px', marginRight: 10, marginTop: 20 }} key={index}>
                                <div className="row text-left">
                                    <div className="col-3">
                                        <img src={current.courseAvatar} style={{ width: 120, height: 120, objectFit: 'cover' }} alt="" />
                                    </div>
                                    <div className="col-9">
                                        <h4>{current.courseName}</h4>
                                        <p>{current?.courseDes?.length > 30 ? current?.courseDes.slice(0, 50) + "..." : current?.courseDes}</p>
                                        <Link to={`courses/${current.courseLinkName}`}>
                                            <button style={{ margin: 0 }} className={style.course__join}>Tham gia khoá học</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        })}

                    </div>
                </div>
            </div>
        </div>
    )
}
