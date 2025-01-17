import { useEffect, useRef, useState } from "react";
import css from "./chat-box.module.css";


export const ChatBox = ({uid, messages, onMessageSend, resolved}) => {
    const endMessageRef = useRef(null);
    
    const [reply, setReply] = useState("");
    
    const sendMessage = () => {
        onMessageSend(reply);
        setReply("");
    }

    useEffect(() => {
        endMessageRef?.current?.scrollIntoView({behavior: "smooth"})
    }, [messages])

    const handleKeyDown = (e) => {
        if (e.key == "Enter") {
            sendMessage();
        }
    }

    return <div className={css.container}>
        <div className={css.header_container}>
            <h4>Chat with us</h4>
            <p>Typically replies within few hours</p>
        </div>
        <div className={css.chat_container}>
            <div className={css.chat_wrapper}>
                {
                    messages?.map((chat, index) =>{
                        if (chat?.senderId === uid)
                            return <ChatItemMe key={index} chat={chat}/>
                        else
                            return <ChatItem key={index} chat={chat}/>
                    })
                }
                <div ref={endMessageRef} className={css.dummy_end_message}></div>
                {
                    resolved && (
                        <p className={css.resolved_message}>Ticket Resolved</p>
                    )
                }
            </div>
        </div>
        {
            !resolved && (
                <div className={css.input_container}>
                    <input onKeyDown={handleKeyDown} value={reply} onChange={(e) => setReply(e.target.value)} type={"text"} placeholder={"Reply here..."}/>
                    <img src={""} alt={"Attachement icon"} />
                    <img src={""} alt={"Emoji icon"} />
                </div>
            )
        }
    </div>
}

const ChatItem = ({chat}) => {
    return (
        <div className={css.chat_item}>
            <img src={"https://static-00.iconduck.com/assets.00/profile-default-icon-1024x1023-4u5mrj2v.png"} alt={"Profile pic"} />
            <div className={css.message_container}>
                <p className={css.username}>Support</p>
                <p className={css.message_text}>{chat?.message}</p>
            </div>
        </div>);
}
const ChatItemMe = ({chat}) => {
    return (
        <div className={[css.chat_item, css.chat_item_me].join(' ')}>
            <div className={css.message_container}>
                <p className={css.message_text}>{chat?.message}</p>
            </div>
        </div>);
}