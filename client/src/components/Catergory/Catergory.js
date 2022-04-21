import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchAllCategory, dispatchAllCategory } from '../../redux/actions/categoryAction'
import style from '../CoursesBody/course.module.css'

export default function Catergory() {
  const category = useSelector(state => state.category)
  const dispatch = useDispatch()
  useEffect(() => {
    return fetchAllCategory().then(res => dispatch(dispatchAllCategory(res)))
  }, [dispatch])
  return (
    <>
      <ul class={style.course__menu}>
        {category.map((current, index) => {
          return <li><Link key={index} to={current._id}>{current.name}</Link></li>
        })}
      </ul>
    </>
  )
}
