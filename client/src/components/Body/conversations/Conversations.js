import { useEffect, useState } from 'react'
import './conversations.css'
import axios from 'axios'
import { useSelector } from 'react-redux'
import Swal from "sweetalert2";

export default function Conversations({ conversation, currentUser, handleDelete }) {
    const [user, setUser] = useState(null)
    const [loadData, setLoadData] = useState(0);
    const token = useSelector(state => state.token)
    const { tokenUser, tokenTrainer } = token

    useEffect(() => {
        if (tokenUser) {
            const trainerId = conversation.members.find((m) => m !== currentUser?._id)
            const getTrainer = async () => {
                try {
                    const res = await axios.get(`/api/allTrainer/${trainerId}`)
                    setUser(res.data)
                } catch (error) {
                    console.log(error)
                }
            }
            getTrainer()
        }
        if (tokenTrainer) {
            const userId = conversation.members.find((m) => m !== currentUser?._id)
            const getUser = async () => {
                try {
                    const res = await axios.get(`/api/allUser/${userId}`)
                    setUser(res.data)
                } catch (error) {
                    console.log(error)
                }
            }
            getUser()
        }
    }, [currentUser, conversation, tokenUser, tokenTrainer, loadData])
    console.log(conversation._id)
    // const handleDelete = (id) => {
    //     Swal.fire({
    //         title: "Are you sure?",
    //         text: "You won't be able to revert this!",
    //         icon: "warning",
    //         showCancelButton: true,
    //         confirmButtonColor: "#3085d6",
    //         cancelButtonColor: "#d33",
    //         confirmButtonText: "Yes, delete it!",
    //     }).then(async (result) => {
    //         if (result.isConfirmed) {
    //             try {
    //                 const res = await axios.delete(`/user/delete_chat/${id}`, {
    //                     headers: {
    //                         Authorization: tokenUser,
    //                         "Content-Type":
    //                             "multipart/form-data; boundary=<calculated when request is sent>",
    //                     },
    //                 });
    //                 Swal.fire("Deleted!", res.data.msg, "success").then((confirm) => {
    //                     if (confirm.isConfirmed) {
    //                         setLoadData(Date.now());
    //                     }
    //                 });
    //             } catch (error) {
    //                 Swal.fire({
    //                     title: "Error!",
    //                     html: error.response.data.msg,
    //                     icon: "error",
    //                     confirmButtonText: "OK",
    //                 }).then((confirm) => {
    //                     if (confirm.isConfirmed) {
    //                         setLoadData(Date.now());
    //                     }
    //                 });
    //             }
    //         }
    //     });
    // }
    return (
        // <div className="conversation">
        //     <img className="conversationImg" src={user?.avatar} alt="avatar" />
        //     <span className="conversationName">{user?.name}</span>
        // </div>
        <>
            {tokenUser ?
                <div className="row chat__content__left_list_item" style={{ alignItems: 'center', paddingBottom: 25, textAlign: 'center' }}>
                    <div className="col-9" style={{ display: 'flex', alignItems: 'center' }}>
                        <div className="chat__content__left_list_item_img"><img src={user?.avatar} alt="friendChat" /></div>
                        <div className="chat__content__left_list_item_img_n"><p>{user?.name}</p></div>
                    </div>
                    <div className="col-3 chat__delete">
                        <button onClick={() => { handleDelete(conversation._id) }}><i className="fa-solid fa-trash-can"></i></button>
                    </div>
                </div> :
                <div className="chat__content__left_list_item">
                    <div className="chat__content__left_list_item_img"><img src={user?.avatar} alt="friendChat" /></div>
                    <div className="chat__content__left_list_item_img_n"><p>{user?.name}</p></div>
                </div>
            }
        </>
    )
}
