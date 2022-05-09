import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import { errorNotifi } from '../../utils/Notification/Notification'
import { fetchAllCoursesTrainer, dispatchAllCoursesTrainer } from '../../../redux/actions/coursesAction'
import { fetchTutorialCouses, dispatchTutorialCourses } from '../../../redux/actions/tutorialAction'

const data = {
    name: '',
    description: '',
    videoUrl: ''
}
export default function CoursesManager() {
    const auth = useSelector(state => state.auth)
    // const coursesAll = useSelector(state => state.courses)
    const token = useSelector(state => state.token)
    const tutorials = useSelector(state => state.tutorials)

    const { tutorialCourses } = tutorials
    const { id } = useParams()
    const { trainer } = auth
    const { tokenTrainer } = token
    const dispatch = useDispatch()

    const [modal, setModal] = useState(data)

    const { name, description, videoUrl } = modal

    useEffect(() => {
        if (tokenTrainer) {
            fetchTutorialCouses(tokenTrainer, id).then(res => dispatch(dispatchTutorialCourses(res)))
        }
    }, [tokenTrainer, id, dispatch])

    const handleChange = (e) => {
        const { name, value } = e.target
        setModal({ ...modal, [name]: value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (name === '' || videoUrl === '') {
            errorNotifi('Please enter full !!!')
            return
        }
        try {
            const res = await axios.post(`/trainer/add_courses/${id}`, { name, description, videoUrl }, { headers: { Authorization: tokenTrainer } })
            Swal.fire({
                title: 'success!',
                html: res.data.msg,
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(confirm => {
                if (confirm.isConfirmed) {
                    window.location.href = `/tutorial/${id}`
                }
            })
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                html: error.response.data.msg,
                icon: 'error',
                confirmButtonText: 'OK'
            }).then(confirm => {
                if (confirm.isConfirmed) {
                    window.location.href = `/tutorial/${id}`
                }
            })
        }
    }
    const handleChangeUpdate = (id) => {
        const objCourses = tutorialCourses.find(e => e._id === id)
        setModal(objCourses)
    }
    const handleDelete = (ids) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axios.delete(`/trainer/delete_courses/${ids}`, { headers: { Authorization: tokenTrainer } })
                    Swal.fire(
                        'Deleted!',
                        res.data.msg,
                        'success'
                    ).then(confirm => {
                        if (confirm.isConfirmed) {
                            window.location.href = `/tutorial/${id}`
                        }
                    })
                } catch (error) {
                    Swal.fire({
                        title: 'Error!',
                        html: error.response.data.msg,
                        icon: 'error',
                        confirmButtonText: 'OK'
                    }).then(confirm => {
                        if (confirm.isConfirmed) {
                            window.location.href = `/tutorial/${id}`
                        }
                    })
                }

            }
        })
    }

    const handleSubmitUpdate = (e, ids) => {
        e.preventDefault()
        Swal.fire({
            title: 'Do you want to save the changes?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Save',
            denyButtonText: `Don't save`,
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axios.put(`/trainer/update_courses/${ids}`, { name, description, videoUrl }, { headers: { Authorization: tokenTrainer } })
                    Swal.fire(res.data.msg, '', 'success').then(confirm => {
                        if (confirm.isConfirmed) {
                            window.location.href = `/tutorial/${id}`
                        }
                    })
                } catch (error) {
                    Swal.fire(error.response.data.msg, '', 'error').then(confirm => {
                        if (confirm.isConfirmed) {
                            window.location.href = `/tutorial/${id}`
                        }
                    })
                }
            } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info')
            }
        })
    }
    console.log(modal)
    return (
        <div>
            <div className="trainer_top">
                <div className="name-user">
                    <span>Trainner: {trainer.name}</span>
                </div>
                <div className="trainer_content">
                    <div className="coure-item">
                        <i className="fa fa-book" />
                        <Link to="/tutorial">Tutorial</Link>
                    </div>
                    <div className="coure-item">
                        <i className="fa fa-user" />
                        <Link to="/profile/trainer">Hồ sơ cá nhân</Link>
                    </div>
                    <div className="coure-item">
                        <i className="fa fa-book" />
                        <Link to="/courses">Quản lý khóa học</Link>
                    </div>
                </div>
            </div>
            {/* Content */}
            <div className="ct ">
                <div className="mt-4 justify-content-between border border-info  formm">
                    <form className="form-inline">
                        <div className="form-group mb-2">
                            <input type="text" className="form-control border-info " id="inputPassword2" placeholder="Enter to search..." />
                        </div>
                        <button type="submit" className="btn btn-info mb-2"><i className="fa-solid fa-magnifying-glass" /></button>
                    </form>
                    <button type="button" className="btn btn-info mb-2" data-toggle="modal" data-target="#exampleModal">Create</button>
                </div>
                <div className="mt-4 tbl border border-info">
                    <table className="table table-bordered table-hover ">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Name</th>
                                <th scope="col">Tutorial</th>
                                <th scope="col">Description</th>
                                <th scope="col">Video Url</th>
                                <th scope="col">Update</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tutorialCourses.map((current, index) => {
                                return <tr>
                                    {/* <td scope="row">1</td> */}
                                    <td>{index + 1}</td>
                                    <td>{current.name}</td>
                                    <td>{current.tutorials}</td>
                                    <td>{current.description}</td>
                                    <td>{current.videoUrl}</td>
                                    <td><button type="button" className="btn btn-outline-info" data-toggle="modal" data-target="#updateCourses" onClick={() => { handleChangeUpdate(current._id) }}><i className="fa-solid fa-pen-to-square" />Update</button></td>
                                    <td><button type="button" className="btn btn-outline-danger" onClick={() => { handleDelete(current._id) }}><i className="fa-solid fa-trash" />Delete</button></td>
                                </tr>
                            })}

                        </tbody>
                    </table>
                </div>
            </div>
            {/* Modal */}
            <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" style={{ maxWidth: 1200 }}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Create learn Courses</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <form action>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="cat">Name courses</label>
                                    <input type="text" name="name" onChange={handleChange} className="form-control" id="cat" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="cat">Description</label>
                                    <input type="text" name="description" onChange={handleChange} className="form-control" id="cat" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="cat">Video Url</label>
                                    <input type="text" name="videoUrl" onChange={handleChange} className="form-control" id="cat" />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Save changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Update Courses */}
            <div className="modal fade" id="updateCourses" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" style={{ maxWidth: 1200 }}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Update learn Courses</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <form action>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="cat">Name courses</label>
                                    <input type="text" name="name" defaultValue={name} onChange={handleChange} className="form-control" id="cat" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="cat">Description</label>
                                    <input type="text" name="description" defaultValue={description} onChange={handleChange} className="form-control" id="cat" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="cat">Video Url</label>
                                    <input type="text" name="videoUrl" defaultValue={videoUrl} onChange={handleChange} className="form-control" id="cat" />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary" onClick={(e) => { handleSubmitUpdate(e, modal._id) }}>Save changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
