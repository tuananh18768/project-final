import ACTIONS from './index'
import axios from 'axios'

export const fetchAllCoursesTrainer = async(token) => {
    const res = await axios.get('/trainer/getAll_courses', { headers: { authorization: token } })
    return res
}
export const fetchAllCoursesUser = async(token, ids) => {
    const res = await axios.get(`/user/getAllCourses/${ids}`, { headers: { authorization: token } })
    return res
}

export const dispatchAllCoursesTrainer = (res) => {
    return {
        type: ACTIONS.GET_ALL_COURSES_TRAINER,
        payload: res.data
    }
}
export const dispatchAllCoursesUser = (res) => {
    return {
        type: ACTIONS.GET_ALL_COURSES_USER,
        payload: res.data
    }
}