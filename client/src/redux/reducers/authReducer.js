import ACTIONS from "../actions/index";

const initialState = {
    user: [],
    trainer: [],
    admin: [],
    isLogged: false,
    isUser: false,
    isAdmin: false,
    isTrainer: false,
    allTrainerView: [],
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.LOGIN_USER:
            {
                return {
                    ...state,
                    isUser: true,
                };
            }
        case ACTIONS.LOGIN_TRAINER:
            {
                return {
                    ...state,
                    isTrainer: true,
                };
            }
        case ACTIONS.LOGIN_ADMIN:
            {
                return {
                    ...state,
                    isAdmin: true,
                };
            }
        case ACTIONS.GET_USER:
            {
                return {
                    ...state,
                    user: action.payload.user,
                    isAdmin: action.payload.isAdmin,
                    isUser: action.payload.isUser,
                };
            }
        case ACTIONS.GET_TRAINER:
            {
                return {
                    ...state,
                    trainer: action.payload.trainer,
                    isTrainer: action.payload.isTrainer,
                };
            }
        case ACTIONS.GET_ADMIN:
            {
                return {
                    ...state,
                    admin: action.payload.admin,
                };
            }
        case ACTIONS.GET_ALL_TRAINER_VIEW:
            {
                return {
                    ...state,
                    allTrainerView: action.payload,
                };
            }
        default:
            {
                return state;
            }
    }
};
export default authReducer;