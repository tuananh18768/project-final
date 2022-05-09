import React, { useEffect, useState } from 'react'
import { useHistory, useParams, Link } from 'react-router-dom'
import axios from 'axios'
import { fetchAllCoursesUser, dispatchAllCoursesUser } from '../../../redux/actions/coursesAction'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllTutorial, dispatchAllTutorial } from '../../../redux/actions/tutorialAction'
import ReactPlayer from 'react-player';
import style from '../course.module.css'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Swal from 'sweetalert2'

export default function CoursesDetail() {
    const tutorialsUsers = useSelector(state => state.tutorials)
    const auth = useSelector((state) => state.auth);
    const token = useSelector(state => state.token)
    const couses = useSelector(state => state.courses)


    const { tokenUser } = token
    const { coursesUser } = couses
    const { tutorialsUser } = tutorialsUsers

    const { user } = auth;
    const [objCourses, setObjCourses] = useState({})
    const [check, setCheck] = useState(true)
    const [modal, setModal] = useState()
    const { name } = useParams()
    const [textComment, setTextComment] = useState('')
    const [date, setDate] = useState(Date.now())
    const [finish, setFinish] = useState(false)
    const history = useHistory()

    const [paramId, setParamId] = useState()
    const dispatch = useDispatch()

    const getObj = async () => {
        const obj = await tutorialsUser.find(e => e.linkName === name)
        for (let item = 0; item < coursesUser.length; item++) {
            if (!coursesUser[item].userLearn?.find(e => e.users.toString() === user._id.toString())) {
                setObjCourses(coursesUser[item])
                break
            }
            if (coursesUser[coursesUser.length - 1].userLearn?.find(e => e.users.toString() === user._id.toString())) {
                setFinish(true)
            }
        }
        setModal(obj)
    }
    useEffect(() => {
        fetchAllTutorial().then(res => dispatch(dispatchAllTutorial(res)))
    }, [dispatch, date])


    useEffect(() => {
        if (tokenUser) {
            fetchAllCoursesUser(tokenUser, modal?._id).then(res => dispatch(dispatchAllCoursesUser(res)))
        }
    }, [tokenUser, dispatch, modal, date])

    const handleChangeCourses = (id) => {
        const courseItem = coursesUser.find(e => e._id === id)
        setObjCourses(courseItem)
    }
    const handleCheckDone = async (id) => {
        if (!check) {
            setCheck(true)
        }
        if (check) {
            try {
                await axios.put(`/user/done_courses/${id}`, {}, { headers: { authorization: tokenUser } })

                // window.location.href = '/learning/Tap-co-tay-trong-30-ngay'
                await getObj()
                setDate(Date.now())
            } catch (error) {
                console.log(error)
            }
        }
    }
    useEffect(() => {
        setObjCourses({})
        getObj()
        console.log('alo')
    }, [coursesUser, date])
    const handleChangeComment = (e) => {
        const { value } = e.target
        setTextComment(value)
    }
    const handleComment = async (e) => {
        e.preventDefault()
        try {
            await axios.post(`/user/comment_tutorial/${name}`, { text: textComment }, { headers: { Authorization: tokenUser } })
            setTextComment('')
            getObj()
            setDate(Date.now())
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    console.log(objCourses)
    console.log(modal)
    return (
        <div>

            <div>
                <div className="coursed">
                    <div aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="">Danh mục</Link></li>
                            <li className="breadcrumb-item"><Link to="">{modal?.category}</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">{objCourses?.name}</li>
                        </ol>
                    </div>
                    <div className="videoandlist d-flex">
                        <div className="video">
                            {objCourses.videoUrl ? <ReactPlayer
                                url={objCourses.videoUrl}
                                width="100%"
                                height="450px"
                                playing={true}
                                controls={false}
                            /> :
                                <div className="finishCourses">
                                    <img src="https://e7.pngegg.com/pngimages/296/544/png-clipart-multicolored-congratulations-dunottar-school-youtube-competition-s-congratulations-icon-miscellaneous-text.png" alt="finish" />
                                </div>
                            }

                            <div className="video_title">
                                {objCourses?.name ?
                                    <h3>{objCourses?.name}</h3>
                                    :
                                    <h3 style={{ color: 'rgba(33, 216, 22, 0.8)' }}>Chúc mừng bạn đã hoàn thành xong khóa học</h3>
                                }
                                {objCourses?.userLearn &&
                                    <input type="checkbox" checked={objCourses?.userLearn?.find(e => e.users.toString() === user._id.toString()) ? true : false} id="vehicle1" name="check_video" onClick={() => { handleCheckDone(objCourses._id) }} />
                                }

                            </div>
                            <p>{objCourses?.description}</p>
                            <div className="additioninfo">
                                <span><i className="fa-solid fa-clock" />14:28:16</span>
                                <span><i className="fa-solid fa-caret-right" />71022</span>
                                <span><i className="fa-solid fa-star" />4.7 </span>
                                <p>Thời gian tạo: {objCourses?.createdAt}
                                </p>
                                <span>Thời gian cập nhật: {objCourses?.updatedAt}</span>
                                <p>Chia sẻ đánh giá của bạn
                                </p>
                            </div>
                            <div className="muitab">
                                <nav>
                                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                        <a className="nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Ve chung toi</a>
                                        <a className="nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">Thao luan</a>
                                    </div>
                                </nav>
                                <div className="tab-content" id="nav-tabContent">
                                    <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                                        <p className="my-4" style={{ fontWeight: "500" }}>{modal?.description}</p>
                                        <h4>Lợi ích từ khóa học</h4>
                                        {modal?.result?.map((current, index) => {
                                            return <ul key={index}>
                                                <li>
                                                    <i className="fa-solid fa-circle-check mx-2"></i>
                                                    {current}
                                                </li>
                                            </ul>
                                        })}
                                        <div className="my-5">
                                            <h4>Giảng viên</h4>
                                            <div className="inforTrainer">
                                                <img src={modal?.trainer_id.avatar} alt="avatarTrainer" />
                                                <div className="skill">
                                                    <p className="name">{modal?.trainer_id.name}</p>
                                                    <p className="flow"><i className="fa-solid fa-user-group"></i> {modal?.trainer_id.followings.length} Số người theo học</p>
                                                    <p className="cetificate">{modal?.trainer_id.skills}</p>
                                                    <p className="experience">{modal?.trainer_id.experience}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
                                        <div className="div-commentItems">
                                            {modal?.commnets.map((comment, index) => {
                                                return <div key={index} className="commentItem d-flex mt-4">
                                                    <div><img className="imgC" src={comment.avatar} width="50px" height="50px" alt="index" /></div>
                                                    <div className="comment-content">
                                                        <p style={{ fontSize: 18, color: 'rgba(4, 59, 187, 0.8)' }}>{comment.name}: <span style={{ fontSize: 16, color: 'black' }}>{comment.text} </span></p>
                                                        {/* <p>TRẢ LỜI</p> */}
                                                    </div>
                                                </div>
                                            })}


                                        </div>
                                        <div className="divForm mt-4">
                                            <form onSubmit={handleComment} className="form-inline">
                                                <div className="form-group mb-2">
                                                    <input style={{ width: 858 }} type="text" className="form-control" id="inputPassword2" placeholder="Hay de lại y kien cua ban" name="textComment" value={textComment} onChange={handleChangeComment} />
                                                </div>
                                                <Link to='' onClick={handleComment} type="submit" className="btn btn-primary mb-2"><i className="fa-solid fa-location-arrow" /></Link>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="listlesson" disabled>
                            {coursesUser?.map((current, index) => {
                                return <ul className="list-group" key={index}>
                                    {current.userLearn.find(e => e.users.toString() === user._id.toString()) ?
                                        <li>
                                            <button onClick={() => handleChangeCourses(current._id)} className="list-group-item justify-content-between list-group-item-action ">
                                                <div className="title">
                                                    <p>{index + 1}) {current.name}</p>
                                                    <span>{current.userLearn.find(e => e.users.toString() === user._id.toString()) ? <i className="fa fa-check"></i> : ''}</span>
                                                </div>
                                            </button>
                                        </li>
                                        :
                                        <li>
                                            <button disabled={current._id === paramId ? false : true} onClick={() => handleChangeCourses(current._id)} className="list-group-item justify-content-between list-group-item-action ">
                                                <div className="title">
                                                    <p>{index + 1}) {current.name}</p>
                                                    <span>{current.userLearn.find(e => e.users.toString() === user._id.toString()) ? <i className="fa fa-check"></i> : ''}</span>
                                                </div>
                                            </button>
                                        </li>
                                    }
                                </ul>
                            })}

                        </div>
                    </div>
                    <div className="coursesNext  mt-5">
                        <h4>Sau khoá học này...</h4>

                        <OwlCarousel className='owl-theme' items={4} loop margin={10} nav style={{ padding: "20px 0" }}>
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
                        </OwlCarousel>
                    </div>
                </div>
            </div>
        </div>
    )
}
