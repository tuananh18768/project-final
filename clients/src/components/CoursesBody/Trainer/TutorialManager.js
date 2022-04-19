import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchAllTutorialTrainer, dispatchAllTutorialTrainer } from '../../../redux/actions/tutorialAction'
import axios from 'axios'
import Swal from 'sweetalert2'
import { errorNotifi } from '../../utils/Notification/Notification'
import { fetchAllCategory, dispatchAllCategory } from '../../../redux/actions/categoryAction'

const data = {
    name: '',
    description: '',
    avatar_couses: '',
    error: '',
    success: ''
}
export default function TutorialManager() {
    const auth = useSelector(state => state.auth)
    const tutorials = useSelector(state => state.tutorials)
    const token = useSelector(state => state.token)
    const categories = useSelector(state => state.category)
    const { trainer } = auth
    const { tokenTrainer } = token
    const { tutorialsTrainer } = tutorials

    const dispatch = useDispatch()

    const [dataTutorial, setDataTutorial] = useState(data)
    const [category, setCategory] = useState()
    const [arrayResult, setArrayResult] = useState([])

    const { name,description, avatar_couses, error, success } = dataTutorial

    const handleChange = (e) => {
        const { name, value } = e.target
        setDataTutorial({ ...dataTutorial, [name]: value, error: '', success: '' })
    }
    useEffect(() => {
        if (tokenTrainer) {
            fetchAllTutorialTrainer(tokenTrainer).then(res => dispatch(dispatchAllTutorialTrainer(res)))
        }
    }, [tokenTrainer, dispatch])

    useEffect(() => {
        fetchAllCategory().then(res => dispatch(dispatchAllCategory(res)))
    }, [dispatch])
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            setArrayResult(e.target.value.split('\n'));
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (name === '' || avatar_couses === '') {
            errorNotifi('Please enter full !!!')
            return
        }
        if (category === undefined || category === 'undefined' || category === '') {
            errorNotifi('Please chooses category !!!')
            return
        }
        try {
            const res = await axios.post('/trainer/add_toturial', { name,description, avatar_couses, category, result: arrayResult }, { headers: { Authorization: tokenTrainer } })
            Swal.fire({
                title: 'success!',
                html: res.data.msg,
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(confirm => {
                if (confirm.isConfirmed) {
                    window.location.href = "/tutorial"
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
                            window.location.href = "/tutorial"
                        }
                    })
        }
    }
    const handleChangeUpdate = (id) => {
        const objData = tutorialsTrainer.find(e => e._id === id)
        const objCate = categories.find(e => e.name === objData.category)
        setDataTutorial(objData)
        setCategory(objCate._id)
        setArrayResult(objData.result)
    }
    const handleSubmitUpdate = async (e, id) => {
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
                    const res = await axios.put(`/trainer/update_tutorial/${id}`, { name,description, avatar_couses, category, result: arrayResult }, { headers: { Authorization: tokenTrainer } })
                    Swal.fire(res.data.msg, '', 'success').then(confirm => {
                        if (confirm.isConfirmed) {
                            window.location.href = "/tutorial"
                        }
                    })
                } catch (error) {
                    Swal.fire(error.response.data.msg, '', 'error').then(confirm => {
                        if (confirm.isConfirmed) {
                            window.location.href = "/tutorial"
                        }
                    })
                }
            } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info')
            }
        })
    }
    const handleDelete = (id) => {
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
                    const res = await axios.delete(`/trainer/delete_tutorial/${id}`, { headers: { Authorization: tokenTrainer } })
                    Swal.fire(
                        'Deleted!',
                        res.data.msg,
                        'success'
                    ).then(confirm => {
                        if (confirm.isConfirmed) {
                            window.location.href = "/tutorial"
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
                            window.location.href = "/tutorial"
                        }
                    })
                }

            }
        })
    }

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
            {/* content manager */}
            <div>
                <div className="ct ">
                    <Link className="backHome" to="/">Go to home</Link>
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
                                    <th scope="col">Name Tutorial</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Avatar Tutorial</th>
                                    <th scope="col">Category Name</th>
                                    <th scope="col">Result</th>
                                    <th scope="col">Courses</th>
                                    <th scope="col">Create At</th>
                                    <th scope="col">Update</th>
                                    <th scope="col">Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tutorialsTrainer.map((current, index) => {
                                    return <tr key={index}>
                                        {/* <td scope="row">1</td> */}
                                        <td>{index + 1}</td>
                                        <td>{current.name}</td>
                                        <td>{current.description}</td>
                                        <td>{current.avatar_couses}</td>
                                        <td>{current.category}</td>
                                        <td>{current.result.map((element, keyIndex) => {
                                            return <ul key={keyIndex} className="formatResult">
                                                <li>{element}</li>
                                            </ul>
                                        })}</td>
                                        <td><Link id="tutorialCourses" to={`/tutorial/${current._id}`}>Courses</Link></td>
                                        <td>{current.createdAt}</td>
                                        <td><button type="button" data-toggle="modal" onClick={() => { handleChangeUpdate(current._id) }} data-target="#updateTutorial" className="btn btn-outline-info"><i className="fa-solid fa-pen-to-square" />Update</button></td>
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
                                <h5 className="modal-title" id="exampleModalLabel">Create Tutorial</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <form action>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label htmlFor="cat">Name</label>
                                        <input type="text" name="name" onChange={handleChange} className="form-control" id="cat" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="cat">Description</label>
                                        <textarea type="text" style={{height: 200 }} placeholder="Enter description..." name="description" onChange={handleChange} className="form-control" id="cat" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="cat">Avatar</label>
                                        <input type="text" name="avatar_couses" onChange={handleChange} className="form-control col-12" id="cat" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="cat">Category</label>
                                        <select className="col-12" name="category" id="category" value={category} onChange={(p) => setCategory(p.target.value)}>
                                            <option value="undefined">------Choose category------</option>
                                            {categories?.map((element, index) => {
                                                return <option key={index} value={element._id}>{element.name}</option>
                                            })
                                            }
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="cat">Result</label>
                                        <textarea type="date" name="result" onKeyDown={handleKeyDown} style={{ height: 200 }} placeholder="Enter text here..." className="form-control" id="cat" />
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

                {/* Update */}
                <div className="modal fade" id="updateTutorial" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" style={{ maxWidth: 1200 }}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Create Tutorial</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <form action>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label htmlFor="cat">Name</label>
                                        <input type="text" name="name" defaultValue={name} onChange={handleChange} className="form-control" id="cat" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="cat">Description</label>
                                        <textarea type="text" style={{height: 200}} placeholder="Enter description..." name="description" defaultValue={description} onChange={handleChange} className="form-control" id="cat" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="cat">Avatar</label>
                                        <input type="text" name="avatar_couses" defaultValue={avatar_couses} onChange={handleChange} className="form-control col-12" id="cat" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="cat">Category</label>
                                        <select className="col-12" name="category" id="category" value={category} onChange={(p) => setCategory(p.target.value)}>
                                            <option value="undefined">------Choose category------</option>
                                            {categories?.map((element, index) => {
                                                return <option key={index} value={element._id}>{element.name}</option>
                                            })
                                            }
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="cat">Result</label>
                                        <textarea type="date" name="result" defaultValue={arrayResult.join("\n")} onKeyDown={handleKeyDown} style={{ height: 200 }} placeholder="Enter text here..." className="form-control" id="cat" />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-primary" onClick={(e) => { handleSubmitUpdate(e, dataTutorial._id) }}>Save changes</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
