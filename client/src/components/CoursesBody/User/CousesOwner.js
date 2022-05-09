import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { fetchTutorialUserRegisted, dispatchTutorialUserRegisted } from '../../../redux/actions/tutorialAction'
// import {fetchAllCoursesUser,dispatchAllCoursesUser} from '../../../redux/actions/coursesAction'
import style from '../course.module.css'

export default function CousesOwner() {
  const auth = useSelector((state) => state.auth);
  const tutorialUserLike = useSelector(state => state.tutorials)
  const token = useSelector(state => state.token)
  const { listRegistedUser } = tutorialUserLike
  const { tokenUser } = token
  const { user } = auth;

  const dispatch = useDispatch()
  console.log(listRegistedUser)
  console.log(user)

  useEffect(() => {
    if (tokenUser) {
      fetchTutorialUserRegisted(tokenUser).then(res => dispatch(dispatchTutorialUserRegisted(res)))
    }
  }, [tokenUser, dispatch])


  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <div id="coursesOwner">
      <div className="backGoundCourses row">
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
              <Link to="/favorite">
                <i class="fa-solid fa-heart"></i>
              </Link>
            </div>
            <div className="chat__icon">
              <Link to="/discovery">
                <i className="fa fa-search-plus" />
              </Link>
            </div>
            <div className="chat__icon">
              <Link to="/checkBody">
                <i className="fa fa-plus" />
              </Link>
            </div>
            <div className="chat__icon">
              <Link to="messenger">
                <i class="fa-brands fa-facebook-messenger"></i>
              </Link>
            </div>
          </div>
        </div>
        <div className="courses__owner_content col-11">
          <div className="search">
            <input type="text" />
            <button className="btn btn-primary">Tìm kiếm</button>
          </div>
          <div className="content__main">
            <div className="row">
              {listRegistedUser.map((course, index) => {
                return <div className="col-3" key={index}>
                  <div className="card" style={{ width: "18rem", marginBottom: "155px", borderRadius: "5px 5px 10px 10px" }}>
                    <img
                      style={{ height: "190px", objectFit: "cover" }}
                      src={course.avatarCourse}
                      className="card-img-top"
                      alt="..."
                    />
                    <div className="card-body" style={{ padding: "10px" }}>
                      <h5 className="card-title">{course.nameCourse}</h5>
                      <p style={{ minHeight: "75px" }} className="card-text">{course?.desCourse?.length > 30 ? course?.desCourse.slice(0, 80) + "..." : course?.desCourse}</p>
                      <Link to={`courses/${course.courseLinkName}`}>
                        {

                          course.courseObj[course.courseObj.length - 1].userLearn.find(e => e.users.toString() === user._id.toString()) ?
                            <button className={style.course__join}>Đã hoàn thành khoá học</button> :
                            <button className={style.course__join}>Tham gia khoá học</button>

                        }
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
  );
}
