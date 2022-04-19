import ACTIONS from '../actions/index'

const tutorials = {
    tutorialsUser: [],
    tutorialsTrainer: [],
    tutorialCourses: [],
}


const tutorialReducer = (state = tutorials, action) => {
    switch (action.type) {
        case ACTIONS.GET_ALL_TUTORIAL:
            {
                return {
                    ...state,
                    tutorialsUser: action.payload
                }
            }
        case ACTIONS.GET_ALL_TUTORIAL_TRAINER:
            {
                return {
                    ...state,
                    tutorialsTrainer: action.payload
                }
            }
        case ACTIONS.GET_COURSES_TURORIAL:
            {
                return {
                    ...state,
                    tutorialCourses: action.payload
                }
            }
        default:
            {
                return state
            }
    }
}

export default tutorialReducer