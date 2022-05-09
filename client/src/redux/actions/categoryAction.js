import ACTIONS from "./index";
import axios from "axios";

export const fetchAllCategory = async() => {
    const res = await axios.get("/user/getALl_cate");
    return res;
};
export const fetchAllCategoryAdmin = async(token) => {
    const res = await axios.get("/admin/get_allCate", {
        headers: { authorization: token },
    });
    return res;
};
export const dispatchAllCategory = (res) => {
    return {
        type: ACTIONS.GET_ALL_CATE,
        payload: res.data,
    };
};
export const dispatchAllCategoryAdmin = (res) => {
    return {
        type: ACTIONS.GET_ALL_CATE_ADMIN,
        payload: res.data,
    };
};