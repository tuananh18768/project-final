import ACTIONS from "../actions/index";

const categories = [];

const categoryReducer = (state = categories, action) => {
    switch (action.type) {
        case ACTIONS.GET_ALL_CATE:
            {
                return action.payload;
            }
        case ACTIONS.GET_ALL_CATE_ADMIN:
            {
                return action.payload;
            }
        default:
            {
                return state;
            }
    }
};

export default categoryReducer;