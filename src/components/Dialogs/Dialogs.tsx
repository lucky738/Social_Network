import React, { FC } from 'react'
import { InitialStateType } from '../../redux/dialogs-reducer'
import { AddMessageFormRedux } from './AddMessageForm/AddMessageForm'
import DialogItem from "./DialogItem/DialogItem"
import s from "./Dialogs.module.css"
import Message from "./Message/Message"

type PropsType = {
  dialogsPage: InitialStateType
  sendMessage: (newMessageBody: string) => void
}

export type NewMessageFormValuesType = {
  newMessageBody: string
}

const Dialogs: FC<PropsType> = ({ dialogsPage, sendMessage, ...props }) => {

  let state: InitialStateType = dialogsPage

  let dialogsElements = state.dialogs.map((d) => <DialogItem name={d.name} id={d.id} />)
  let messagesElements = state.messages.map((m) => <Message message={m.message} />)

  let addNewMessage = (values: NewMessageFormValuesType) => {
    console.log(values)
    sendMessage(values.newMessageBody)
  }


  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>
        {dialogsElements}
      </div>
      <div className={s.messages}>
        {messagesElements}
        <AddMessageFormRedux onSubmit={addNewMessage} />
      </div>
    </div>
  )
}

export default Dialogs