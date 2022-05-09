import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchAllCategory, dispatchAllCategory } from '../../redux/actions/categoryAction'
import style from '../CoursesBody/course.module.css'
import CoursesItem from '../CoursesBody/CoursesItem/CoursesItem'
import axios from 'axios'
// import { fetchAllTutorial, dispatchAllTutorial, fetchAllTutorialLogin, dispatchAllTutorialLogin } from '../../../redux/actions/tutorialAction'

export default function Catergory() {
  // const tutorials = useSelector(state => state.tutorials)
  // const token = useSelector(state => state.token)
  // const { tokenUser } = token
  // const { tutorialsUser, tutorialLoginUser } = tutorials
  const [objCate, setObjCate] = useState([])
  const [allCate, setAllCate] = useState([])
  const category = useSelector(state => state.category)
  const dispatch = useDispatch()
  useEffect(() => {
    return fetchAllCategory().then(res => dispatch(dispatchAllCategory(res)))
  }, [dispatch])
  const handleClick = async (id) => {
    try {
      const res = await axios.get(`user/getObj_cate/${id}`)
      setObjCate(res.data)
      setAllCate([])
    } catch (error) {
      console.log(error)
    }
  }
  const handleClickAll = async () => {
    try {
      const res = await axios.get("/user/getAll_tutorial");
      setAllCate(res.data)
      setObjCate([])
    } catch (error) {
      console.log(error)
    }

  }
  // console.log(allCate)
  return (
    <>
      <ul class={style.course__menu}>
        <li onClick={handleClickAll}>All</li>
        {category.map((current, index) => {
          return <li onClick={() => { handleClick(current._id) }}><Link key={index} to=''>{current.name}</Link></li>
        })}
      </ul>
      <div className="row">
        <CoursesItem objCate={objCate} allCate={allCate} handleClick={handleClick} handleClickAll={handleClickAll} />
      </div>
    </>
  )
}
