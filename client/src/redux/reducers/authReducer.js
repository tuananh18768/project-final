import ACTIONS from '../actions/index'

const initialState = {
    user: [],
    trainer: [],
    isLogged: false,
    isUser: false,
    isAdmin: false,
    isTrainer: false,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.LOGIN_USER:
            {
                return {
                    ...state,
                    isUser: true,
                }
            }
        case ACTIONS.LOGIN_TRAINER:
            {
                return {
                    ...state,
                    isTrainer: true,
                }
            }
        case ACTIONS.GET_USER:
            {
                return {
                    ...state,
                    user: action.payload.user,
                    isAdmin: action.payload.isAdmin,
                    isUser: action.payload.isUser
                }
            }
        case ACTIONS.GET_TRAINER:
            {
                return {
                    ...state,
                    trainer: action.payload.trainer,
                    isTrainer: action.payload.isTrainer,
                }
            }
        default:
            {
                return state;
            }
    }
}
export default authReducer