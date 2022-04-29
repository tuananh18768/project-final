import { useEffect, useState } from 'react'
import './conversations.css'
import axios from 'axios'
import { useSelector } from 'react-redux'

export default function Conversations({ conversation, currentUser }) {
    const [user, setUser] = useState(null)
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
    }, [currentUser, conversation, tokenUser, tokenTrainer])
    // console.log(user)
    return (
        <div className="conversation">
            <img className="conversationImg" src={user?.avatar} alt="avatar" />
            <span className="conversationName">{user?.name}</span>
        </div>
    )
}
