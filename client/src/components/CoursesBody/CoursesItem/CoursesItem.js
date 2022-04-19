import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchAllTutorial, dispatchAllTutorial } from '../../../redux/actions/tutorialAction'

export default function CoursesItem() {
    const tutorials = useSelector(state => state.tutorials)
    const dispatch = useDispatch()

    const {tutorialsUser} = tutorials
    useEffect(() => {
        return fetchAllTutorial().then(res => dispatch(dispatchAllTutorial(res)))
    }, [dispatch])
    return (

     <>
            {
                tutorialsUser.map((current, index) => {
                return <div key={index} className="col-3">
                    <div className="card" style={{ width: '15rem', marginBottom: '20px' }}>
                        <img src={current.avatar_couses} className="card-img-top" style={{ height: '150px', objectFit: 'contain'}}alt="index" />
                        <div className="card-body">
                            <h5 className="card-title" style={{ fontSize: '14px' }}>{current.name}</h5>
                            <Link to={`courses/${current.linkName}`} style={{ fontSize: '12px', marginRight: '45px' }} className="btn btn-primary">Tham gia khóa học</Link>
                            <i class="fa fa-heart"></i>
                        </div>
                    </div>
                </div>
            })

        }
     </>

    )
}
