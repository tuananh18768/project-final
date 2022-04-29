import { useEffect, useState } from 'react'
import './chatOnline.css'
import axios from 'axios'

export default function ChatOnline({ onlineUser, currentId, setCurrentChat }) {
    const [friends, setFriends] = useState([])
    const [onlineFriends, setOnlineFriends] = useState([])

    useEffect(() => {
        const getFriends = async () => {
            const res = await axios.get(`http://localhost:5000/api/friend/${currentId}`)
            setFriends(res.data)
        }
        getFriends()
    }, [currentId])
    useEffect(() => {
        setOnlineFriends(friends.filter((f) => {
            return onlineUser.map(e => e.userId === f.userId)
        }))
    }, [friends, onlineUser])
    console.log(onlineFriends)

    const handleClick = async (current) => {
        try {
            const res = await axios.get(`/api/conversations/find/${currentId}/${current.userId}`)
            setCurrentChat(res.data)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="chatOnline">
            {onlineFriends.map((current, index) => {
                return <div key={index} className="chatOnlineFriend" onClick={() => { handleClick(current) }}>
                    <div className="chatOnlineImgContainer">
                        <img className="chatOnlineImg" src={current.avatarUser} alt="okeAvatar" />
                        <div className="chatOnlineBadge">
                        </div>
                    </div>
                    <span className="chatOnlineName">{current.nameUser}</span>
                </div>
            })}
        </div>
    )
}
