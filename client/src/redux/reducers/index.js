import { combineReducers } from "redux";
import auth from "./authReducer";
import token from "./tokenReducer";
import users from "./userReducer";
import category from "./categoryReducer";
import tutorials from "./tutorialReducer";
import courses from "./coursesReducer";
import registerCourses from "./registerReducer";
import discovery from "./discoveryReducer";
import dashboard from "./dashboardReducer";

export default combineReducers({
    auth,
    token,
    users,
    category,
    tutorials,
    courses,
    registerCourses,
    discovery,
    dashboard,
});