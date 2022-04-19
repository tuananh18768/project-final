import ACTIONS from './index'
import axios from 'axios'

export const fetchAllTutorial = async() => {
    const res = await axios.get('/user/getAll_tutorial')
    return res
}
export const fetchAllTutorialTrainer = async(token) => {
    const res = await axios.get('/trainer/getAll_tutorial', { headers: { authorization: token } })
    return res
}
export const fetchTutorialCouses = async(token, id) => {
    const res = await axios.get(`/trainer/getCourses_tutorial/${id}`, { headers: { authorization: token } })
    return res
}

export const dispatchAllTutorial = (res) => {
    return {
        type: ACTIONS.GET_ALL_TUTORIAL,
        payload: res.data
    }
}
export const dispatchAllTutorialTrainer = (res) => {
    return {
        type: ACTIONS.GET_ALL_TUTORIAL_TRAINER,
        payload: res.data
    }
}
export const dispatchTutorialCourses = (res) => {
    return {
        type: ACTIONS.GET_COURSES_TURORIAL,
        payload: res.data
    }
}