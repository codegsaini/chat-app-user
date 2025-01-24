import { useEffect, useState } from 'react';
import css from './chat-widget.module.css';
import { ChatBox } from './ChatBox';
import { ChatForm } from './ChatForm';
import axios from 'axios';
import io from 'socket.io-client';
const defaultMessage = {
	receiverId: 'org1',
	senderId: 'cm60n1gq90000qbgqqxf853bo',
	ticketId: 'cm60n1gyt0001qbgqnmdq3ly7',
	message:
		"Hello there! Need help? Reach out to us right here, and we'll get back to you as soon as we can!",
	createdAt: '2025-01-17T11:54:02.450Z',
};

const BASE_URL = 'https://chat-app-backend-9i97.onrender.com';

const ChatWidget = () => {
	const [socket, setSocket] = useState(null);
	const [showChatBox, setShowChatBox] = useState(false);
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [messages, setMessages] = useState(() => [defaultMessage]);
	const [loading, setLoading] = useState(false);
	const [uid, setUid] = useState('');
	const [ticketId, setTicketId] = useState('');
	const [connectedToChat, setConnectedToSocketChat] = useState(false);
	const [resolved, setResolved] = useState(false);
	const [firstReply, setFirstReply] = useState(null);

	useEffect(() => {
		socket?.on('connected', async () => {
			setConnectedToSocketChat(true);
			if (firstReply) {
				emitChat(firstReply);
				setFirstReply(null);
			}
		});
		socket?.on('error', async (data) => {
			console.log(data);
		});
		socket?.on('resolved', async (data) => {
			setResolved(true);
		});
		socket?.on('reply', async (data) => {
			onMessageReceive(data);
		});
		return () => {
			socket?.off('connected');
			socket?.off('error');
			socket?.off('resolved');
			socket?.off('reply');
		};
	}, [socket, ticketId, uid, connectedToChat]);

	const onMessageReceive = (data) => {
		setMessages((prev) => [...prev, data]);
	};

	const emitChat = (message) => {
		const data = {
			uid: uid,
			receiverId: 'org1',
			ticketId: ticketId,
			reply: message,
		};
		socket?.emit('chat', data);
	};
	const onMessageSend = async (message) => {
		if (!connectedToChat) {
			setFirstReply(message);
			connectToChat(message);
		} else emitChat(message);
	};

	const connectToChat = async (message) => {
		try {
			setLoading(true);
			const socketIo = io(BASE_URL, {
				transports: ['websocket'],
			});
			setSocket(socketIo);
			const response = await createUser();
			if (!response) return console.log('Something went wrong');
			setUid(response.data.uid);
			setTicketId(response.data.ticketId);
			socketIo?.emit('connectChat', { ticketId: response.data.ticketId });
			socketIo?.emit('informNewChat', {
				ticketId: response.data?.ticketId,
				orgId: response.data?.orgId,
				latestChat: message,
			});
		} catch (e) {
			console.log(e);
		} finally {
			if (loading) setLoading(false);
		}
	};

	const createUser = async () => {
		const data = {
			name: name,
			email: email,
			phone: phone,
			pageTitle: document.title,
		};
		return await axios.post(`${BASE_URL}/api/v1/user/create`, data);
	};

	const onFormSubmit = (name, email, phone) => {
		setName(name);
		setEmail(email);
		setPhone(phone);
		setShowChatBox(true);
	};

	return (
		<div className={css.container}>
			{showChatBox ? (
				<ChatBox
					resolved={resolved}
					uid={uid}
					messages={messages}
					onMessageSend={onMessageSend}
				/>
			) : (
				<ChatForm
					onSubmit={(name, email, phone) => onFormSubmit(name, email, phone)}
				/>
			)}
		</div>
	);
};

export default ChatWidget;
