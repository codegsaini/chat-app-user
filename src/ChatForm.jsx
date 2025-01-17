import { useState } from "react";
import css from "./chat-form.module.css";
export const ChatForm = ({onSubmit}) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const handleSubmit = () => {
        onSubmit(name, email, phone);
    }
    return <div className={css.container}>
        <div className={css.header_container}>
            <h3>Chat Support</h3>
            <img src={""} alt={"Close icon"} />
        </div>
        <div className={css.form_container}>
            <p className={css.description}>We can't wait to talk to you. But first, please take a couple moments to tell us a bit about yourself.</p>
            <input onChange={(e) => setName(e.target.value)} className={css.input} type={"text"} placeholder={"Name"} />
            <input onChange={(e) => setEmail(e.target.value)} className={css.input} type={"text"} placeholder={"Email"} />
            <input onChange={(e) => setPhone(e.target.value)} className={css.input} type={"text"} placeholder={"Phone"} />
            <button onClick={handleSubmit} className={css.submit_button}>Start Chat</button>
        </div>
    </div>
}