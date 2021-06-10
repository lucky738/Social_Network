import { FC } from "react";
import s from "./../Dialogs.module.css";

type PropsType = {
  message: string
}

const Message: FC<PropsType> = ({message, ...props}) => {
  return <div className={s.dialog}>{message}</div>;
};

export default Message;
