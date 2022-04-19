import ACTIONS from '../actions/index'

const courses = {
    coursesUser: [],
    coursesTrainer: []
}


const coursesReducer = (state = courses, action) => {
    switch (action.type) {
        case ACTIONS.GET_ALL_COURSES_TRAINER:
            {
                return {
                    coursesTrainer: action.payload
                }
            }
        case ACTIONS.GET_ALL_COURSES_USER:
            {
                // console.log(action.payload)
                return {
                    coursesUser: action.payload
                }
            }
        default:
            {
                return state
            }
    }
}

export default coursesReducer