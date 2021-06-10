import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { sendMessage, startMessagesListening } from '../../redux/chat-reducer'
import { AppStateType } from '../../redux/redux-store'

type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}

const ChatPage: React.FC = () => {
    return <div>
        <Chat />
    </div>
}

const Chat: React.FC = () => {

    const status = useSelector((state: AppStateType) => state.chat.status)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(startMessagesListening())
        }
    }, [])
    debugger
    return <div>
        {status === 'error' && <div>Some error occured. Please refresh the page</div>}
        <>
            <Messages />
            <AddMessageForm />
        </>

    </div>
}

const Messages: React.FC = ({ ...props }) => {
    const messages = useSelector((state: AppStateType) => state.chat.messages)
    const messagesAnchorRef = useRef<HTMLDivElement>(null)

    const [isAutoScroll, setisAutoScroll] = useState(true)

    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = e.currentTarget
        
        if (Math.abs( (element.scrollHeight - element.scrollTop) - element.clientHeight) < 300) {
            !isAutoScroll && setisAutoScroll(true)
        } else {
            isAutoScroll && setisAutoScroll(false)
        }
    }

    useEffect(() => {
        if (isAutoScroll) {
            messagesAnchorRef.current?.scrollIntoView({ behavior: 'smooth' })
        }
    }, [messages])

    return <div style={{ height: '400px', overflowY: 'auto' }} onScroll={scrollHandler}>
        {messages.map((m) => <Message key={m.id} message={m} />)}
        <div ref={messagesAnchorRef}></div>
    </div>
}

type MessagePropsType = {
    message: ChatMessageType
}

const Message: React.FC<MessagePropsType> = React.memo(({ message, ...props }) => {
    return <div>
        <img src={message.photo} style={{ width: '30px' }} /> <b>{message.userName}</b> - {message.userId}
        <br />
        {message.message}
        <hr />
    </div>
})

const AddMessageForm: React.FC = ({ ...props }) => {

    const [message, setMessage] = useState('')
    const dispatch = useDispatch()

    const status = useSelector((state: AppStateType) => state.chat.status)

    const sendMessageHandler = () => {
        if (!message) {
            return
        }
        dispatch(sendMessage(message))
        setMessage('')
    }

    return <div>
        <div>
            <textarea onChange={e => setMessage(e.currentTarget.value)} value={message}></textarea>
        </div>
        <div>
            <button disabled={status !== 'ready'} onClick={sendMessageHandler}>send</button>
        </div>
    </div>
}


export default ChatPage