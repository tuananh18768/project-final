import { Link } from 'react-router-dom'
import ChatOnline from '../Body/chatOnline/ChatOnline'
import Conversations from '../Body/conversations/Conversations'
import Message from '../Body/message/Message'
import './messenger.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { io } from 'socket.io-client'
import Swal from "sweetalert2";

export default function Messsenger() {
    const [conversation, setConversation] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState("")
    const [arrivalMessage, setArrivalMessage] = useState(null)
    const [onlineUser, setOnlineUser] = useState([])
    const [loadData, setLoadData] = useState(0);
    const token = useSelector(state => state.token)
    const { tokenUser, tokenTrainer } = token


    const auth = useSelector(state => state.auth)
    const socket = useRef()
    const { user, trainer } = auth
    const scrollRef = useRef()

    useEffect(() => {
        socket.current = io("ws://localhost:8900")
        socket.current.on("getMesssage", (data) => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now()
            })
        })
    }, [])
    useEffect(() => {
        arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) && setMessages((prev) => [...prev, arrivalMessage])
    }, [arrivalMessage, currentChat])
    useEffect(() => {
        socket.current.emit("addUser", user._id || trainer._id)
        socket.current.on("getUsers", users => {
            console.log(users)
            setOnlineUser(users)
        })
    }, [user, trainer, currentChat])

    useEffect(() => {
        const getConversations = async () => {
            try {
                const res = await axios.get(`/api/conversations/${user._id || trainer._id}`)
                setConversation(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        getConversations()
    }, [user._id, trainer._id, loadData])
    useEffect(() => {
        const getMesssages = async () => {
            try {
                const res = await axios.get(`/api/messages/${currentChat?._id}`)
                setMessages(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        getMesssages()
    }, [currentChat])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const message = {
            sender: user._id,
            text: newMessage,
            conversationId: currentChat._id
        }
        let receiverId = ''
        if (user) {
            receiverId = currentChat.members.find((member) => member !== user._id)
        }
        else if (trainer) {
            receiverId = currentChat.members.find((member) => member !== trainer._id)
        }
        console.log(receiverId)
        socket.current.emit("sendMessage", {
            senderId: user._id || trainer._id,
            receiverId,
            text: newMessage
        })
        try {
            const res = await axios.post('/api/messages/', message)
            setMessages([...messages, res.data])
            setNewMessage("")
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
        console.log(scrollRef.current)
    }, [messages])

    useEffect(() => {
        scrollRef.current?.scrollTo(0, 0)
    }, [])
    const handleDelete = (id) => {
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
                    const res = await axios.delete(`/user/delete_chat/${id}`, {
                        headers: {
                            Authorization: tokenUser,
                            "Content-Type":
                                "multipart/form-data; boundary=<calculated when request is sent>",
                        },
                    });
                    Swal.fire("Deleted!", res.data.msg, "success").then((confirm) => {
                        if (confirm.isConfirmed) {
                            setLoadData(Date.now());
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
                            setLoadData(Date.now());
                        }
                    });
                }
            }
        });
    }

    return (
        <>
            <div className="chat " style={{ maxWidth: '100%' }}>
                <div className="row" style={{ margin: 0 }}>
                    <div className="col col-lg-1">
                        <div className="chat__wrapicon">
                            <div className="chat__icon" style={{ transform: 'translate(0 ,-140px)' }}>
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
                        </div>
                    </div>
                    <div className="col-9 mt-3">
                        <div className="chat__content">
                            <div className="chat__content__left">
                                <div className="chat__content__left_tt"><h2>Chat</h2><div><i className="fa-solid fa-ellipsis" /></div></div>
                                <div className="chat__content__left_search"><input type="text" placeholder="Search Name" /><button className="chat__content__left_search_btn"><i className="fa-solid fa-magnifying-glass" /></button></div>
                                <div className="chat__content__left_list">
                                    {conversation.map((c, index) => (
                                        <div key={index} onClick={() => setCurrentChat(c)}>
                                            <Conversations handleDelete={handleDelete} conversation={c} currentUser={user} />
                                        </div>
                                    ))}

                                </div>
                            </div>
                            {currentChat ?
                                <>
                                    <div className="chat__content__right_header">
                                        <div className="chat__content__right_header">
                                            <div className="chat__content__right_header_i">
                                                <div className="chat__content__right_header_i_img"><img className="messageImg" src="https://photo-cms-tpo.zadn.vn/600x315/Uploaded/2022/uug-onattvnat/2021_09_26/ava-1-8785.jpg" alt="chatBox" /></div>
                                                <div className="chat__content__right_header_i_n"><p>Justin Bieber</p></div>
                                            </div>
                                        </div>
                                        {/* <div className="chat__content__right_ct"> */}
                                        <div className="chatBoxTop" >
                                            {messages.map((m, index) => (
                                                <div key={index} ref={scrollRef}>
                                                    <Message message={m} own={m.sender === user._id ?? m.sender === trainer._id} />
                                                </div>
                                            ))}
                                            {/* <div className="chatBoxBottom">
                                                    <textarea value={newMessage} className="chatMessageInput" placeholder="write something..." onChange={(e) => { setNewMessage(e.target.value) }}></textarea>
                                                    <button className="chatSubmitButton" onClick={handleSubmit}>Send</button>
                                                </div> */}
                                        </div>
                                        <form onSubmit={handleSubmit} className="chat__content__right_typeChat">
                                            <input type="text" value={newMessage} className="chatMessageInput" onChange={(e) => { setNewMessage(e.target.value) }} placeholder="Type a message here..." />
                                            <button onClick={handleSubmit} ><i className="fa-solid fa-location-arrow" />Send</button>
                                        </form>
                                        {/* </div> */}

                                    </div>
                                </> : <span className="noCoversationText">Open conversation to start a chat.</span>}
                        </div>
                    </div>
                    <div className="col-2 mt-3">
                        <div className="chat__info">
                            <div className="chat__info_img"><img src={user.avatar ?? trainer.avatar} alt="avatarmaster" style={{ margin: "0 auto" }} /></div>
                            <p>{user.name ?? trainer.name}</p>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
