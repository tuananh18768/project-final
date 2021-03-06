import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory, useParams } from 'react-router-dom'
import { fetchAllTutorial, dispatchAllTutorial } from '../../../redux/actions/tutorialAction'
import axios from 'axios'
import { fetchCheckRegister, dispatchCheckRegister } from '../../../redux/actions/registerAction'
import { fetchAllCoursesUser, dispatchAllCoursesUser } from '../../../redux/actions/coursesAction'

export default function TutorialDetail() {
  const tutorialsUsers = useSelector(state => state.tutorials)
  const token = useSelector(state => state.token)
  const couses = useSelector(state => state.courses)
  const register = useSelector(state => state.registerCourses)
  const auth = useSelector((state) => state.auth);

  const { user } = auth;
  const { tokenUser } = token
  const { tutorialsUser } = tutorialsUsers
  const { coursesUser } = couses
  const { name } = useParams()

  const [modal, setModal] = useState()
  const dispatch = useDispatch()

  useEffect(() => {
    fetchAllTutorial().then(res => dispatch(dispatchAllTutorial(res)))
  }, [dispatch])
  const handleRegister = async () => {
    try {
      const res = await axios.post(`/user/register_courses/${name}`, {}, { headers: { Authorization: tokenUser } })
      console.log(res)
    } catch (error) {
      console.error(error)
    }
  }
  const getObj = () => {
    const obj = tutorialsUser.find(e => e.linkName === name)
    setModal(obj)
  }
  useEffect(() => {
    getObj()
  })
  useEffect(() => {
    if (tokenUser) {
      fetchCheckRegister(tokenUser).then(res => dispatch(dispatchCheckRegister(res)))
    }
  }, [tokenUser, dispatch])
  // const handleRigisterClick = ()=>{

  // }
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <div>
      <div className="row content_detailReigister" >
        <div className="col-8">
          <div className="title">
            <h2>{modal?.name}</h2>
            <p>{modal?.description}</p>
          </div>
          <div className="result">
            <h4>B???n s??? h???c ???????c g???</h4>
            {modal?.result.map((current, index) => {
              return <ul key={index}>
                <li>{current}</li>
              </ul>
            })}
          </div>
          <div className="content_couses">
            <h4>N???i dung kh??a h???c</h4>
            <p><span style={{ fontWeight: 'bold' }}>20</span> Ch????ng. <span style={{ fontWeight: 'bold' }}>
              142</span> B??i h???c. Th???i l?????ng<span style={{ fontWeight: 'bold' }}>24 gi??? 38 ph??t</span></p>
          </div>
        </div>
        <div className="col-4 registerLeft">
          <div className="register_img">
            <img src={modal?.avatar_couses} alt="img" />
          </div>
          <div className="rigister">
            <h2>Mi???n ph??</h2>
            {register?.filter(e => e.users?.toString() === user._id.toString()).find(element => element.courses === modal?._id) ? <Link to={`/learning/${name}`} onClick={handleRegister} className="btn btn-primary" name="alo">TI???P T???C H???C</Link> : <Link to={`/learning/${name}`} onClick={handleRegister} className="btn btn-primary" name="alo">????NG K?? H???C</Link>}
          </div>
        </div>
      </div>
    </div>
  )
}
