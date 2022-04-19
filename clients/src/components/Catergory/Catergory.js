import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import {fetchAllCategory, dispatchAllCategory} from '../../redux/actions/categoryAction'


export default function Catergory() {
    const category =  useSelector(state => state.category)
    const dispatch = useDispatch()
    useEffect(()=>{
         return fetchAllCategory().then(res => dispatch(dispatchAllCategory(res)))
    }, [dispatch])
  return (
    <div>
            <div className="container">
                 <div className="catergory">
                {category.map((current, index)=>{
                    return <Link key={index} to={current._id}>{current.name}</Link>
                })}
                    </div>
            </div>
    </div>
  )
}
