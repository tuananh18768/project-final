// import './message.css'
import '../message/message.css'
import { format } from "timeago.js"

export default function Message({ message, own }) {
    return (
        // <div className={own ? "message own" : "message"}>
        //     <div className="messageTop">
        //         <img className="messageImg" src="https://photo-cms-tpo.zadn.vn/600x315/Uploaded/2022/uug-onattvnat/2021_09_26/ava-1-8785.jpg" alt="img1" />
        //         <p className="messageText">
        //             {message.text}
        //         </p>
        //     </div>
        //     <div className="messageBottom">{format(message.createdAt)}</div>
        // </div>


        <>
            {own ?
                <div className="me">
                    <div className="me_ct" >
                        <p style={{ marginBottom: 0 }}>{message.text}</p>
                        <span>{format(message.createdAt)}</span>
                    </div>
                    <div className="me_img"><img className="messageImg" src="https://photo-cms-tpo.zadn.vn/600x315/Uploaded/2022/uug-onattvnat/2021_09_26/ava-1-8785.jpg" alt="other1" /></div>
                </div>
                :
                <div className="other">
                    <div className="other_img"><img className="messageImg" src="https://photo-cms-tpo.zadn.vn/600x315/Uploaded/2022/uug-onattvnat/2021_09_26/ava-1-8785.jpg" alt="other2" /></div>
                    <div className="other_ct">
                        <p style={{ marginBottom: 0 }}>{message.text}</p>
                        <span>{format(message.createdAt)}</span>
                    </div>
                </div>
            }
        </>
    )
}
