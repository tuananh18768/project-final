import ACTIONS from './index'
import axios from 'axios'
export const dispatchLoginUser = () => {
    return {
        type: ACTIONS.LOGIN_USER
    }
}
export const dispatchLoginTrainer = () => {
    return {
        type: ACTIONS.LOGIN_TRAINER
    }
}
export const fetchUser = async(token) => {
    const res = await axios.get('/user/infor', { headers: { Authorization: token } })
    return res
}
export const dispatchGetUser = (res) => {
    return {
        type: ACTIONS.GET_USER,
        payload: {
            user: res.data,
            isAdmin: res.data.role === 1 ? true : false,
            isUser: res.data.role === 0 ? true : false
        }
    }
}
export const fetchTrainer = async(token) => {
    const res = await axios.get('/trainer/infor', { headers: { Authorization: token } })
    return res
}
export const dispatchGetTrainer = (res) => {
    return {
        type: ACTIONS.GET_TRAINER,
        payload: {
            trainer: res.data,
            isAdmin: res.data.role === 1 ? true : false,
            isTrainer: res.data.role === 2 ? true : false
        }
    }
}