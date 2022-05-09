import ACTIONS from "./index";
import axios from "axios";
export const dispatchLoginUser = () => {
    return {
        type: ACTIONS.LOGIN_USER,
    };
};
export const dispatchLoginTrainer = () => {
    return {
        type: ACTIONS.LOGIN_TRAINER,
    };
};
export const dispatchLoginAdmin = () => {
    return {
        type: ACTIONS.LOGIN_ADMIN,
    };
};
export const fetchGetAllTrainer = async(token) => {
    const res = await axios.get("/api/getallTrainer");
    return res;
};
export const fetchUser = async(token) => {
    const res = await axios.get("/user/infor", {
        headers: { Authorization: token },
    });
    return res;
};
export const dispatchGetUser = (res) => {
    return {
        type: ACTIONS.GET_USER,
        payload: {
            user: res.data,
            isAdmin: res.data.role === 1 ? true : false,
            isUser: res.data.role === 0 ? true : false,
        },
    };
};
export const dispatchGetAllTrainerView = (res) => {
    return {
        type: ACTIONS.GET_ALL_TRAINER_VIEW,
        payload: res.data,
    };
};
export const fetchTrainer = async(token) => {
    const res = await axios.get("/trainer/infor", {
        headers: { Authorization: token },
    });
    return res;
};
export const dispatchGetTrainer = (res) => {
    return {
        type: ACTIONS.GET_TRAINER,
        payload: {
            trainer: res.data,
            isAdmin: res.data.role === 1 ? true : false,
            isTrainer: res.data.role === 2 ? true : false,
        },
    };
};
export const fetchAdmin = async(token) => {
    const res = await axios.get("/admin/infor", {
        headers: { Authorization: token },
    });
    return res;
};
export const dispatchGetAdmin = (res) => {
    return {
        type: ACTIONS.GET_ADMIN,
        payload: {
            admin: res.data,
        },
    };
};