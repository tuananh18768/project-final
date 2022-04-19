import ACTIONS from '../actions/index'

const token = {
    tokenUser: '',
    tokenTrainer: ''
}


const tokenReducer = (state = token, action) => {
    switch (action.type) {
        case ACTIONS.GET_TOKEN_USER:
            {
                return {
                    ...state,
                    tokenUser: action.payload
                }
            }
        case ACTIONS.GET_TOKEN_TRAINER:
            {
                return {
                    ...state,
                    tokenTrainer: action.payload
                }
            }
        default:
            {
                return state
            }
    }
}

export default tokenReducer