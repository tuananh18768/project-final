import React, { useEffect } from 'react'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { dispatchTutorialUserLike, fetchTutorialUserLike, } from '../../../redux/actions/tutorialAction'
import { fetchDiscovery, dispatchDiscovery } from '../../../redux/actions/discoveryAction'
import style from '../course.module.css'

export default function Favorite() {
    const tutorialUserLike = useSelector(state => state.tutorials)
    const token = useSelector(state => state.token)
    const discoverys = useSelector(state => state.discovery)

    const { listLikeTutorial } = tutorialUserLike
    const { tokenUser } = token
    const { listDiscovery } = discoverys

    const dispatch = useDispatch()

    useEffect(() => {
        if (tokenUser) {
            fetchTutorialUserLike(tokenUser).then(res => dispatch(dispatchTutorialUserLike(res)))
        }
    }, [tokenUser, dispatch])

    useEffect(() => {
        if (tokenUser) {
            fetchDiscovery(tokenUser).then(res => dispatch(dispatchDiscovery(res)))
        }
    }, [tokenUser, dispatch])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])


    console.log(listDiscovery)
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
                </div>
            </div>
            <div className="favorite__content col-11" style={{ padding: 0 }}>
                <div className="favorite__tittle">
                    <h3>??ang quan t??m</h3>
                </div>
                <div className="row mt-3" style={{ margin: 0 }}>
                    <div className="col-6 item__left text-center">
                        <h4>Kh??m Ph??</h4>
                        <div className="item__left__dis">
                            {listDiscovery.map((current, index) => {
                                return current?.tutorials?.map((e, index) => {
                                    return <div className="borderFavorite" style={{ border: '1px solid black', padding: '10px', marginRight: 10, marginTop: 20 }} key={index}>
                                        <div className="row text-left">
                                            <div className="col-3">
                                                <img src={e.avatar_couses} style={{ width: 120, height: 120, objectFit: 'cover' }} alt="" />
                                            </div>
                                            <div className="col-9">
                                                <h4>{e.name}</h4>
                                                <p>{e?.description?.length > 30 ? e?.description.slice(0, 50) + "..." : e?.description}</p>
                                                <Link to={`courses/${e.linkName}`}>
                                                    <button style={{ margin: 0 }} className={style.course__join}>Tham gia kho?? h???c</button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                })
                            })}
                        </div>

                    </div>
                    <div className="col-6 item__right text-center">
                        <h4>???? quan t??m</h4>
                        <div className="item__left__dis">
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
                                                <button style={{ margin: 0 }} className={style.course__join}>Tham gia kho?? h???c</button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
