import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { fetchDiscovery, dispatchDiscovery } from '../../../redux/actions/discoveryAction'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'

export default function Discovery() {
    const discoverys = useSelector(state => state.discovery)
    const token = useSelector(state => state.token)
    const { listDiscovery } = discoverys
    const { tokenUser } = token

    const dispatch = useDispatch()
    const [loading, setLoading] = useState(0);

    useEffect(() => {
        if (tokenUser) {
            fetchDiscovery(tokenUser).then(res => dispatch(dispatchDiscovery(res)))
        }
    }, [tokenUser, dispatch, loading])

    const handleClick = async (e, id) => {
        e.preventDefault();
        try {
            const res = await axios.put(`/user/add_likeDiscovery/${id}`, {}, { headers: { Authorization: tokenUser } })
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: res.data.msg,
                showConfirmButton: false,
                timer: 1500
            })
            setLoading(Date.now());
        } catch (error) {

        }
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    console.log(listDiscovery)
    return (
        <div className="discovery__main row">
            <div className="col col-lg-1">
                <div className="chat__wrapicon">
                    <div className="chat__icon" style={{ transform: 'translate(0 ,-30px)' }}>
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
                    {/* <div className="chat__icon">
              <Link>
              <i className="fa fa-plus" />
              </Link>
            </div> */}
                </div>
            </div>
            <div className="discovery__content col-11" style={{ padding: 0 }}>
                <div className="discovery__tittle" >
                    <h3 >Đang quan tâm</h3>
                </div>
                <h4 className='discovery__ask'>Bạn quan tâm đến chủ đề nào? (Bấm để chọn)</h4>
                <div className="row mt-3 row__discovery" style={{ margin: 0 }}>
                    {listDiscovery.map((current, index) => {
                        return <div key={index} className="col-4 discover__item text-center">
                            <button onClick={(e) => { handleClick(e, current._id) }} className="btn__discovery">
                                {current.name}
                                {current.userDis && <i class="fa-solid fa-check"></i>}
                            </button>
                        </div>
                    })}
                </div>
            </div>
        </div>
    )
}
