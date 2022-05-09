import React, { useEffect, useState } from "react";
import './adminManager.css'
import {
    isEmpty,
    isEmail,
    isPassword,
    isCf_pass,
} from "../../utils/validation/validation";
import {
    errorNotifi,
    successNotifi,
} from "../../utils/Notification/Notification";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
    fetchAllUsers,
    dispatchGetAllUsers,
} from "../../../redux/actions/userAction";
import Swal from "sweetalert2";

const initialState = {
    name: "",
    email: "",
    password: "",
    cf_password: "",
    role: "3",
};
export default function ManagerUser() {
    const allUsers = useSelector((state) => state.users);
    const token = useSelector((state) => state.token);
    const auth = useSelector((state) => state.auth);

    const { isAdmin } = auth;
    const [register, setRegister] = useState(initialState);
    const [staffs, setStaffs] = useState([]);
    const [coordinator, setCoordinator] = useState([]);
    const [loading, setLoading] = useState(0);
    const [trainee, setTrainee] = useState([]);
    const [traineeUpdate, setTraineeUpdate] = useState({});

    const { name, email, password, cf_password, role } = register;

    const dispatch = useDispatch();

    const dataTrainer = async () => {
        try {
            const res = await axios.get('/admin/all_user', { headers: { Authorization: token.tokenAdmin } })
            setTrainee(res.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        dataTrainer()
    }, [])


    const handleChange = (e) => {
        const { name, value } = e.target;
        setRegister({ ...register, [name]: value });
    };
    useEffect(() => {
        if (token) {
            fetchAllUsers(token).then((res) => dispatch(dispatchGetAllUsers(res)));
        }
    }, [token, dispatch, loading]);

    const allUserStaff = () => {
        const staffsAll = allUsers.filter((user) => user.role === 3);
        setCoordinator(staffsAll);
    };
    useEffect(() => {
        allUserStaff();
    }, [allUsers, loading]);

    const handleUpdate = (id) => {
        const staffObj = trainee.find((user) => user._id === id);
        setTraineeUpdate(staffObj);
    };
    const updatePassword = async (e, id) => {
        e.preventDefault();
        if (!isPassword(password)) {
            errorNotifi("Password must be at least 6 characters");
            return false;
        }
        if (!isCf_pass(password, cf_password)) {
            errorNotifi("Password is not match!!");
            return false;
        }
        try {
            const res = await axios.patch(
                `/admin/update_passwordUser/${id}`,
                { password },
                { headers: { Authorization: token.tokenAdmin } }
            );
            successNotifi(res.data.msg);
            setLoading(Date.now());
        } catch (error) {
            errorNotifi(error.response.data.msg);
        }
    };
    const closeUpdate = () => {
        setRegister({ ...register, password: "", cf_password: "" });
    };
    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axios.delete(`/admin/delete_user/${id}`, {
                        headers: { Authorization: token.tokenAdmin },
                    });
                    Swal.fire("Deleted!", res.data.msg, "success").then((confirm) => {
                        if (confirm.isConfirmed) {
                            setLoading(Date.now());
                        }
                    });
                } catch (error) {
                    Swal.fire({
                        title: "Error!",
                        html: error.response.data.msg,
                        icon: "error",
                        confirmButtonText: "OK",
                    }).then((confirm) => {
                        if (confirm.isConfirmed) {
                            setLoading(Date.now());
                        }
                    });
                }
            }
        });
    };
    return (
        <div style={{ marginTop: 100 }}>
            <div>
                <div className="admnStaff">
                    <div className="admnStaff__header">
                        <h2 style={{ fontFamily: '"Handlee", cursive' }}>Trainee</h2>
                    </div>
                    <div className="admnStaff__content">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">Id</th>
                                    <th scope="col">Avatar</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {trainee.map((current, index) => {
                                    return (
                                        <tr key={index}>
                                            <th>{index + 1}</th>
                                            <td>
                                                <img className="anhdd" src={current.avatar} alt="anh" />
                                            </td>
                                            <td>{current.name}</td>
                                            <td>{current.email}</td>
                                            <td className="table__td">
                                                <i
                                                    data-toggle="modal"
                                                    data-target="#updateStaffs"
                                                    className="fa-solid fa-pen admns__icon1"
                                                    onClick={() => {
                                                        handleUpdate(current._id);
                                                    }}
                                                />{" "}
                                                <i
                                                    className="admns__icon2 fa-solid fa-trash"
                                                    onClick={() => {
                                                        handleDelete(current._id);
                                                    }}
                                                />{" "}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Update */}
                <div
                    className="modal fade"
                    id="updateStaffs"
                    tabIndex={-1}
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog" style={{ maxWidth: 1200 }}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">
                                    Information
                                </h5>
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                >
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <form action>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label className="col-12" htmlFor="cat">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            style={{ width: "100%" }}
                                            defaultValue={traineeUpdate.name}
                                            onChange={handleChange}
                                            name="name"
                                            className="form-control col-12"
                                            id="cat"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="age">Email</label>
                                        <input
                                            type="text"
                                            style={{ width: "100%" }}
                                            defaultValue={traineeUpdate.email}
                                            name="email"
                                            onChange={handleChange}
                                            className="form-control"
                                            id="age"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="address">Password</label>
                                        <input
                                            type="text"
                                            style={{ width: "100%" }}
                                            value={password}
                                            name="password"
                                            onChange={handleChange}
                                            className="form-control"
                                            id="address"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="address">Confirm Password</label>
                                        <input
                                            type="text"
                                            style={{ width: "100%" }}
                                            value={cf_password}
                                            name="cf_password"
                                            onChange={handleChange}
                                            className="form-control"
                                            id="address"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="address">Role</label>
                                        <input
                                            type="text"
                                            style={{ width: "100%" }}
                                            name="role"
                                            defaultValue="Trainee"
                                            disabled
                                            className="form-control"
                                            id="address"
                                        />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        data-dismiss="modal"
                                        onClick={closeUpdate}
                                    >
                                        Close
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn btn-success"
                                        onClick={(e) => {
                                            updatePassword(e, traineeUpdate._id);
                                        }}
                                    >
                                        Update
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
