import React, { useEffect, useState } from "react";
import {
  fetchAllUsers,
  dispatchGetAllUsers,
} from "../../../redux/actions/userAction";
import axios from "axios";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/Notification/Notification";
import { isPassword, isCf_pass } from "../../utils/validation/validation";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const initialState = {
  name: "",
  password: "",
  cf_password: "",
  err: "",
  success: "",
};

export default function ProfileUser() {
  const auth = useSelector((state) => state.auth);
  const token = useSelector((state) => state.token);
  const users = useSelector((state) => state.users);

  const { user, isAdmin } = auth;
  const [data, setData] = useState(initialState);
  const [avatar, setAvatar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [callback, setCallback] = useState(false);

  const dispatch = useDispatch();

  const { name, password, cf_password, err, success } = data;
  useEffect(() => {
    if (isAdmin) {
      fetchAllUsers(token.tokenUser).then((res) =>
        dispatch(dispatchGetAllUsers(res))
      );
    }
  }, [token.tokenUser, isAdmin, dispatch, callback]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, err: "", success: "" });
  };
  const updateInfor = () => {
    try {
      axios.patch(
        "/user/update_infor",
        {
          name: name ? name : user.name,
          avatar: avatar ? avatar : user.avatar,
        },
        {
          headers: { Authorization: token.tokenUser },
        }
      );
      setData({ ...data, err: "", success: "Update success" });
    } catch (error) {
      setData({ ...data, err: error.response.data.msg, success: "" });
    }
  };
  const updatePassword = () => {
    if (!isPassword(password)) {
      return setData({
        ...data,
        err: "Password must be at least 6 characters",
        success: "",
      });
    }
    if (!isCf_pass(password, cf_password)) {
      return setData({ ...data, err: "Password is not match!!", success: "" });
    }
    try {
      axios.post(
        "/user/reset",
        { password },
        { headers: { Authorization: token.tokenUser } }
      );
      setData({ ...data, err: "", success: "Update success" });
    } catch (error) {
      setData({ ...data, err: error.response.data.msg, success: "" });
    }
  };
  const handleUpdate = () => {
    if (name || avatar) updateInfor();
    if (password) updatePassword();
  };
  const changeAvatar = async (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];
      if (!file)
        return setData({ ...data, err: "not file upload", success: "" });
      if (file.size > 1024 * 1024) {
        return setData({ ...data, err: "Size to large", success: "" });
      }
      if (file.type !== "image/jpeg" && file.type !== "image/png") {
        return setData({ ...data, err: "file is not format", success: "" });
      }
      let formData = new FormData();
      formData.append("file", file);

      setLoading(true);
      const res = await axios.post("/api/upload_avatar", formData, {
        headers: {
          "contetn-type": "multipart/form-data",
          Authorization: token.tokenUser,
        },
      });
      setLoading(false);
      setAvatar(res.data.url);
    } catch (error) {
      setData({ ...data, err: error.response.data.msg, success: "" });
    }
  };
  const handleRemove = async (id) => {
    try {
      if ((user._id = id)) {
        if (window.confirm("Are you sure you want to delete this account?")) {
          setLoading(true);
          await axios.delete(`/user/delete_user/${id}`, {
            headers: { Authorization: token.tokenUser },
          });
          setLoading(false);
          setCallback(!callback);
        }
      }
    } catch (err) {
      setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };
  const renderData = () => {
    return users.map((current, index) => {
      return (
        <tr key={index}>
          <td>{index}</td>
          <td>{current.name}</td>
          <td>{current.email}</td>
          <td>
            {current.role === 1 ? (
              <i className="fas fa-check" title="Admin"></i>
            ) : (
              <i className="fas fa-times" title="User"></i>
            )}
          </td>
          <td>
            <Link to={`/edit_user/${current._id}`}>
              <i className="fas fa-edit" title="Edit"></i>
            </Link>
            <i
              className="fas fa-trash-alt"
              title="Remove"
              style={{ cursor: "pointer", marginLeft: 30 }}
              onClick={() => {
                handleRemove(current._id);
              }}
            ></i>
          </td>
        </tr>
      );
    });
  };
  return (
    <>
      <div>
        {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}
        {loading && <h3>Loadding ....</h3>}
      </div>
      <div className="row profile__user__main" >
        <div className="col col-lg-1">
          <div className="chat__wrapicon">
            <div className="chat__icon" style={{ transform: 'translate(0 ,-30px)' }}>
              <Link to="/">
                <i class="fa-solid fa-house-chimney"></i>
              </Link>
            </div>
            <div className="chat__icon">
              <Link to="/courseOwner">
                <i className="fa fa-book" />
              </Link>
            </div>
            <div className="chat__icon">
              <Link to="favorite">
                <i class="fa-solid fa-heart"></i>
              </Link>
            </div>
            <div className="chat__icon">
              <Link to="discovery">
                <i className="fa fa-search-plus" />
              </Link>
            </div>
            <div className="chat__icon">
              <Link to="checkBody">
                <i className="fa fa-plus" />
              </Link>
            </div>
            <div className="chat__icon">
              <Link to="/messenger">
                <i class="fa-brands fa-facebook-messenger"></i>
              </Link>
            </div>
            {/* <div className="chat__icon">
              <Link>
              <i className="fa fa-plus" />
              </Link>
            </div> */}
          </div>
        </div>
        <div className="user-bottom col-11">
          <div className="logo-user">
            <i className="fa fa-user" />
            <span>Thông tin cá nhân</span>
          </div>
          <div className="user-content">
            <div className="user-left">
              {/* <h2>{isAdmin ? "Admin Profile" : "User Profile"}</h2> */}
              <div
                className="parent__file"
                style={{
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: "50%",
                }}
              >
                <img
                  className="img_profile"
                  src={avatar ? avatar : user.avatar}
                  width="200px"
                  height="200px"
                  alt="helo"
                />
                <div className="span__chooseFile">
                  <i className="fa fa-camera-retro"></i>
                  <p style={{ margin: 0 }}>Change</p>
                  <input
                    type="file"
                    name="file"
                    id="file_up"
                    onChange={changeAvatar}
                  />
                </div>
              </div>
              <div className="mt-3">
                <h3>{user.name}</h3>
                <p>{user.email}</p>
              </div>
              <div className="user-address">
                <div className="address-item">
                  <label htmlFor>Thành phố</label>
                  <select type="text" id="tp" placeholder>
                    <option value />
                    <option value>Ha noi</option>
                    <option value>Ha noi</option>
                    <option value>Ha noi</option>
                    <option value>Ha noi</option>
                  </select>
                </div>
                <div className="address-item">
                  <label htmlFor>Địa chỉ</label>
                  <input type="text" id="tp" placeholder />
                </div>
              </div>
            </div>
            <div className="user-right">
              <div className="right-content">
                <h3>
                  User name: <strong>{user.name}</strong>
                </h3>
                <div className="form-register">
                  <form action className="form">
                    <div className="address-item">
                      <label htmlFor="name">Name</label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Your name"
                        defaultValue={user.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="address-item">
                      <label htmlFor="email">Email</label>
                      <input
                        type="text"
                        name="email"
                        id="email"
                        placeholder="Email address"
                        defaultValue={user.email}
                        disabled
                      />
                    </div>
                    <div className="address-item">
                      <label htmlFor="password">New password</label>
                      <input
                        type="pass"
                        name="password"
                        id="password"
                        placeholder="New password address"
                        value={password}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="address-item">
                      <label htmlFor="cf_password">Confirm password</label>
                      <input
                        type="pass"
                        name="cf_password"
                        id="cf_password"
                        placeholder="Confirm password address"
                        value={cf_password}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="address-item">
                      <label htmlFor>Giới tính</label>
                      <select type="text" id="sex" placeholder>
                        <option value />
                        <option value="male">Nam</option>
                        <option value="female">Nữ</option>
                      </select>
                    </div>
                    <div className="text">
                      {" "}
                      <span>Kết nối facebook</span>
                    </div>
                    <div className="btn-button">
                      <button disabled={loading} onClick={handleUpdate}>
                        <i className="fa fa-save" /> Update
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
