import React, { useEffect, useState } from 'react'
import { useHistory, useParams, Link } from 'react-router-dom'
import axios from 'axios'
import { fetchAllCoursesUser, dispatchAllCoursesUser } from '../../../redux/actions/coursesAction'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllTutorial, dispatchAllTutorial } from '../../../redux/actions/tutorialAction'
import ReactPlayer from 'react-player';

export default function CoursesDetail() {
    const tutorialsUsers = useSelector(state => state.tutorials)
    const auth = useSelector((state) => state.auth);
    const token = useSelector(state => state.token)
    const couses = useSelector(state => state.courses)

    const history = useHistory()
    // const [hatutorial, setHaitutorial] = useState()
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

    const [paramId, setParamId] = useState()
    // const { id } = useParams()
    const dispatch = useDispatch()

    const getObj = async () => {
        const obj = await tutorialsUser.find(e => e.linkName === name)
        for (let item = 0; item < coursesUser.length; item++) {
            if (!coursesUser[item].userLearn?.find(e => e.users.toString() === user._id.toString())) {
                setObjCourses(coursesUser[item])
                history.push({
                    pathname: `/learning/${name}`,
                    search: `?id=${coursesUser[item]._id}`,
                })
                const paramCourse = new URLSearchParams(window.location.search)
                setParamId(paramCourse.get('id'))
                break
            }
        }
        setModal(obj)
    }
    useEffect(() => {
        fetchAllTutorial().then(res => dispatch(dispatchAllTutorial(res)))
    }, [dispatch])
    useEffect(() => {
        setObjCourses({})
        getObj()
    }, [coursesUser, date])
    useEffect(() => {
        if (tokenUser) {
            fetchAllCoursesUser(tokenUser, modal?._id).then(res => dispatch(dispatchAllCoursesUser(res)))
        }
    }, [tokenUser, dispatch, modal])

    const handleChangeCourses = (id) => {
        const courseItem = coursesUser.find(e => e._id === id)
        setObjCourses(courseItem)
    }
    const handleCheckDone = async () => {
        if (!check) {
            setCheck(true)
        }
        console.log(check)
        if (check) {
            try {
                await axios.put(`/user/done_courses/${paramId}`, {}, { headers: { authorization: tokenUser } })
                window.location.href = 'learning/Bi-kip-luyen-vo-than-chuong'
            } catch (error) {
                console.log(error)
            }
        }
    }
    const handleChangeComment = (e) => {
        const { value } = e.target
        setTextComment(value)
    }
    const handleComment = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`/user/comment_tutorial/${name}`, { text: textComment }, { headers: { Authorization: tokenUser } })
            setTextComment('')
            getObj()
            setDate(Date.now())
            console.log(res)
        } catch (error) {
            console.log(error);
        }
    }

    console.log(coursesUser)
    return (
        <div>
            <div>
                <div className="coursed">
                    <div aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href>Thiet ke</a></li>
                            <li className="breadcrumb-item"><a href="#">Phan mem thiet ke</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Phan mem pho to shop</li>
                        </ol>
                    </div>
                    <div className="videoandlist d-flex">
                        <div className="video">
                            <ReactPlayer
                                url={objCourses.videoUrl}
                                width="100%"
                                height="450px"
                                playing={true}
                                controls={false}
                            />
                            <div className="video_title">
                                <h3>{objCourses?.name}</h3>
                                <input type="checkbox" checked={objCourses?.userLearn?.find(e => e.users.toString() === user._id.toString()) ? true : false} id="vehicle1" name="check_video" onClick={handleCheckDone} />
                            </div>
                            <p>{objCourses?.description}</p>
                            <div className="additioninfo">
                                <span><i className="fa-solid fa-clock" />14:28:16</span>
                                <span><i className="fa-solid fa-caret-right" />71022</span>
                                <span><i className="fa-solid fa-star" />4.7 </span>
                                <span>Thời gian tạo: {objCourses?.createdAt}
                                </span>
                                <span>Thời gian cập nhật: {objCourses?.updatedAt}</span>
                                <span>Chia sẻ đánh giá của bạn
                                </span>
                            </div>
                            <div className="muitab">
                                <nav>
                                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                        <a className="nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Ve chung toi</a>
                                        <a className="nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">Thao luan</a>
                                    </div>
                                </nav>
                                <div className="tab-content" id="nav-tabContent">
                                    <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">Placeholder content for the tab panel. This one relates to
                                        the home tab. Takes you miles high, so high, 'cause she’s got that one international smile.
                                        There's a stranger in my bed, there's a pounding in my head. Oh, no. In another life I would
                                        make you stay. ‘Cause I, I’m capable of anything. Suiting up for my crowning battle. Used to
                                        steal your parents' liquor and climb to the roof. Tone, tan fit and ready, turn it up cause
                                        its gettin' heavy. Her love is like a drug. I guess that I forgot I had a choice.
                                    </div>
                                    <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
                                        <div className="div-commentItems">
                                            {modal?.commnets.map((comment, index) => {
                                                return <div key={index} className="commentItem d-flex mt-4">
                                                    <div><img className="imgC" src={comment.avatar} width="50px" height="50px" alt="index" /></div>
                                                    <div className="comment-content">
                                                        <p>{comment.name} :
                                                            {comment.text} </p>
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
                        <h1>Sau khoá học này...</h1>
                        <div className="d-flex mt-4">
                            <div className="card mr-4 shadow " style={{ width: '18rem' }}>
                                <img src className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">Card title</h5>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of
                                        the card's content.</p>
                                    <a href="#" className="btn btn-primary">Go somewhere</a>
                                </div>
                            </div>
                            <div className="card mr-4 shadow" style={{ width: '18rem' }}>
                                <img src="..." className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">Card title</h5>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of
                                        the card's content.</p>
                                    <a href="#" className="btn btn-primary">Go somewhere</a>
                                </div>
                            </div>
                            <div className="card mr-4 shadow" style={{ width: '18rem' }}>
                                <img src="..." className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">Card title</h5>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of
                                        the card's content.</p>
                                    <a href="#" className="btn btn-primary">Go somewhere</a>
                                </div>
                            </div>
                            <div className="card mr-4 shadow" style={{ width: '18rem' }}>
                                <img src="..." className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">Card title</h5>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of
                                        the card's content.</p>
                                    <a href="#" className="btn btn-primary">Go somewhere</a>
                                </div>
                            </div>
                            <div className="card mr-4 shadow" style={{ width: '18rem' }}>
                                <img src="..." className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">Card title</h5>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of
                                        the card's content.</p>
                                    <a href="#" className="btn btn-primary">Go somewhere</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <footer>
                    <p>© 2021 Công ty TNHH Công Nghệ Giáo Dục Topica Việt Nam</p>
                </footer>
            </div>

        </div>
    )
}
