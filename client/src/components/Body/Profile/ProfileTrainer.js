import React, { useEffect, useState } from 'react'
import { fetchTrainer, dispatchGetTrainer } from '../../../redux/actions/authAction'
import axios from 'axios'
import { showErrMsg, showSuccessMsg } from '../../utils/Notification/Notification'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { isPassword, isCf_pass } from '../../utils/validation/validation'

const dataTrainer = {
    name: '',
    email: '',
    experience: '',
    skills: '',
    graduate: '',
    password: '',
    cf_password: '',
    error: '',
    success: '',
}

export default function ProfileTrainer() {
    const auth = useSelector(state => state.auth)
    const token = useSelector(state => state.token)
    const dispatch = useDispatch()

    const [data, setData] = useState(dataTrainer)
    const [loading, setLoading] = useState(false)
    const [avatar, setAvatar] = useState(false);
    const { trainer } = auth
    console.log(trainer)
    const { name, email, experience, skills, graduate, password, cf_password, error, success } = data

    useEffect(() => {
        return fetchTrainer(token.tokenTrainer).then(res => dispatch(dispatchGetTrainer(res)))
    }, [token.tokenTrainer, dispatch])
    const handleChange = (e) => {
        const { name, value } = e.target
        setData({ ...data, [name]: value, error: '', success: '' })
    }
    const updateInfor = () => {
        try {
            axios.patch('/trainer/update_infor', {
                name: name ? name : trainer.name,
                experience: experience ? experience : trainer.experience,
                skills: skills ? skills : trainer.skills,
                graduate: graduate ? graduate : trainer.graduate,
                avatar: avatar ? avatar : trainer.avatar
            }, {
                headers: { Authorization: token.tokenTrainer }
            })
            setData({ ...data, error: '', success: 'Update success' })
        } catch (error) {
            setData({ ...data, error: error.response.data.msg, success: '' })
        }
    }
    const updatePassword = () => {
        if (!isPassword(password)) {
            return setData({ ...data, error: 'Password must be at least 6 characters', success: '' })
        }
        if (!isCf_pass(password, cf_password)) {
            return setData({ ...data, error: 'Password is not match!!', success: '' })
        }
        try {
            axios.post('/trainer/reset', { password },
                { headers: { Authorization: token.tokenTrainer } })
            setData({ ...data, error: '', success: 'Update password success' })
        } catch (error) {
            setData({ ...data, error: error.response.data.msg, success: '' })
        }
    }

    const handleUpdate = (e) => {
        e.preventDefault()
        if (name || experience || skills || graduate || avatar) updateInfor()
        if (password) updatePassword()
    }
    return (
        <div>
            <div>
                {error && showErrMsg(error)}
                {success && showSuccessMsg(success)}
                {loading && <h3>Loadding ....</h3>}
            </div>
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
                            <i className="fa-solid fa-chart-line"></i>
                            <Link to="/courses">Dashboard</Link>
                        </div>

                    </div>
                </div>
                <div className="trainer_bottom">
                    <div className="logo_trainer">
                        <i className="fa fa-user" />
                        <span>Thông tin cá nhân</span>
                    </div>
                    <div className="trainer_contentBottom">
                        <div className="trainer_left">
                            <h3>User name: <strong>{trainer.name}</strong></h3>
                            <div className="form-register">
                                <form action className="form">
                                    <div className="infor_trainer">
                                        <label htmlFor>Name</label>
                                        <input type="text" id="userName" name="name" defaultValue={trainer.name} onChange={handleChange} />
                                    </div>
                                    <div className="infor_trainer">
                                        <label htmlFor>Email</label>
                                        <input type="text" id="userName" name="email" value={trainer.email} disabled />
                                    </div>
                                    <div className="infor_trainer">
                                        <label htmlFor>Experiences</label>
                                        <textarea type="text" id="exp" name="experience" defaultValue={trainer.experience} onChange={handleChange} />
                                    </div>
                                    <div className="infor_trainer">
                                        <label htmlFor>Skills</label>
                                        <textarea type="text" id="specialize" name="skills" defaultValue={trainer.skills} onChange={handleChange} />
                                    </div>
                                    <div className="infor_trainer">
                                        <label htmlFor>Graduate</label>
                                        <textarea type="text" id="trungTam" name="graduate" defaultValue={trainer.graduate} onChange={handleChange} />
                                    </div>
                                    <div className="infor_trainer">
                                        <label htmlFor>New password</label>
                                        <input type="text" id="userName" name="password" value={password} onChange={handleChange} />
                                    </div>
                                    <div className="infor_trainer">
                                        <label htmlFor>Confirm password</label>
                                        <input type="text" id="userName" name="cf_password" value={cf_password} onChange={handleChange} />
                                    </div>
                                    <div className="btn-button">
                                        <button disabled={loading} onClick={handleUpdate} >
                                            <i className="fa fa-save" /> Update
                                        </button>
                                    </div>
                                </form></div>
                        </div>
                        <div className="trainer_right">
                            <div className="trianer_contentRight">
                                <div className="profile_trainer">
                                    <div className="profile_contentTrainer">
                                        <div className="profile_itemTrainer">
                                            <div className="profile_imgTrainer">
                                                <img src={trainer.avatar} alt='trainer' />
                                            </div>
                                            <h3 className="profile_nameTrainer">{trainer.name}</h3>
                                            <button type="submit" className="btn_profileTrainer">My Profile</button>
                                            <div className="profile_linkTrainer">
                                                <i className="fab fa-facebook" />
                                                <i className="fab fa-instagram" />
                                                <i className="fab fa-youtube" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
