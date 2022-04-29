import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { fetchTutorialUserRegisted, dispatchTutorialUserRegisted } from '../../../redux/actions/tutorialAction'
import style from '../course.module.css'

export default function CousesOwner() {
  const tutorialUserLike = useSelector(state => state.tutorials)
  const token = useSelector(state => state.token)
  const { listRegistedUser } = tutorialUserLike
  const { tokenUser } = token

  const dispatch = useDispatch()
  console.log(listRegistedUser)

  useEffect(() => {
    if (tokenUser) {
      fetchTutorialUserRegisted(tokenUser).then(res => dispatch(dispatchTutorialUserRegisted(res)))
    }
  }, [tokenUser, dispatch])

  return (
    <div id="coursesOwner">
      {/* <div className="user-top">
        <div className="name-user">
          <span>Thành viên: Bạch Tuấn Anh</span>
        </div>
        <div className="course">
          <div className="coure-item">
            <i className="fa fa-book" />
            <Link to="/courseOwner">Khóa Học</Link>
          </div>
          <div className="coure-item">
            <i className="fa fa-user" />
            <Link to="/profile/user">Hồ sơ cá nhân</Link>
          </div>
          <div className="coure-item">
            <i className="fa fa-book" />
            <Link to="/favorite">Yêu Thích</Link>
          </div>
          <div className="coure-item">
            <i className="fa fa-search-plus" />
            <Link to="/discovery">Khám Phá</Link>
          </div>
          <div className="coure-item">
            <i className="fa fa-plus" />
            <Link to="/checkBody">Tình trạng sức khỏe</Link>
          </div>
        </div>
      </div> */}
      <div className="backGoundCourses">
        <div className="courses__owner_content">
          <div className="search">
            <input type="text" />
            <button className="btn btn-primary">Tìm kiếm</button>
          </div>
          <div className="content__main">
            <div className="row">
              {listRegistedUser.map((course, index) => {
                return <div className="col-3" key={index}>
                  <div className="card" style={{ width: "18rem" }}>
                    <img
                      style={{ height: "190px", objectFit: "cover" }}
                      src={course.avatarCourse}
                      className="card-img-top"
                      alt="..."
                    />
                    <div className="card-body">
                      <h5 className="card-title">{course.nameCourse}</h5>
                      <p className="card-text">{course?.desCourse?.length > 30 ? course?.desCourse.slice(0, 80) + "..." : course?.desCourse}</p>
                      <Link to={`courses/${course.courseLinkName}`}>
                        <button className={style.course__join}>Tham gia khoá học</button>
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
