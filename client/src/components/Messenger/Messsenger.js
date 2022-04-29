import { Link } from 'react-router-dom'
import ChatOnline from '../Body/chatOnline/ChatOnline'
import Conversations from '../Body/conversations/Conversations'
import Message from '../Body/message/Message'
import './messenger.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { io } from 'socket.io-client'

export default function Messsenger() {
    const [conversation, setConversation] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState("")
    const [arrivalMessage, setArrivalMessage] = useState(null)
    const [onlineUser, setOnlineUser] = useState([])
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
    }, [user._id, trainer._id])
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
    }, [messages])
    return (
        <>
            <div className="user-top">
                <div className="name-user">
                    <span>Thành viên: Bạch Tuấn Anh</span>
                </div>
                <div className="course">
                    <div className="coure-item">
                        <i className="fa fa-book" />
                        <Link to="/courseOwner">Khóa Học</Link>
                    </div>
                    <div className="coure-item">
                        <i className="fa fa-user" />
                        <Link to="/profile/user">Hồ sơ cá nhân</Link>
                    </div>
                    <div className="coure-item">
                        <i className="fa fa-book" />
                        <Link to="/favorite">Yêu Thích</Link>
                    </div>
                    <div className="coure-item">
                        <i className="fa fa-search-plus" />
                        <Link to="/discovery">Khám Phá</Link>
                    </div>
                    <div className="coure-item">
                        <i className="fa fa-plus" />
                        <Link to="/checkBody">Tình trạng sức khỏe</Link>
                    </div>
                </div>
            </div>
            <div className="messenger">
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <input type="text" placeholder='Search for friends' className="chatMenuInput" />
                        {conversation.map((c, index) => (
                            <div key={index} onClick={() => setCurrentChat(c)}>
                                <Conversations conversation={c} currentUser={user} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="chatBox">
                    <div className="chatBoxWrapper">
                        {currentChat ?
                            <>
                                <div className="chatBoxTop">
                                    {messages.map((m, index) => (
                                        <div key={index} ref={scrollRef}>
                                            <Message message={m} own={m.sender === user._id ?? m.sender === trainer._id} />
                                        </div>
                                    ))}
                                </div>
                                <div className="chatBoxBottom">
                                    <textarea value={newMessage} className="chatMessageInput" placeholder="write something..." onChange={(e) => { setNewMessage(e.target.value) }}></textarea>
                                    <button className="chatSubmitButton" onClick={handleSubmit}>Send</button>
                                </div>
                            </> : <span className="noCoversationText">Open conversation to start a chat.</span>}
                    </div>
                </div>
                <div className="chatOnline">
                    <div className="chatOnlineWrapper">
                        <ChatOnline onlineUser={onlineUser} currentId={user._id || trainer._id} setCurrentChat={setCurrentChat} />
                    </div>
                </div>
            </div>
        </>
    )
}
