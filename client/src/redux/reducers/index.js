import { combineReducers } from "redux";
import auth from "./authReducer";
import token from "./tokenReducer";
import users from "./userReducer";
import category from "./categoryReducer";
import tutorials from "./tutorialReducer";
import courses from "./coursesReducer";
import registerCourses from "./registerReducer";
import discovery from "./discoveryReducer";

export default combineReducers({
    auth,
    token,
    users,
    category,
    tutorials,
    courses,
    registerCourses,
    discovery,
});