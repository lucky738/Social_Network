import { FC } from "react";
import { NavLink } from "react-router-dom";
import s from "./../Dialogs.module.css";

type PropsType = {
  id: number
  name: string
}

const DialogItem: FC<PropsType> = ({id, name, ...props}) => {
  let path = "/dialogs/" + id;
  return (
    <NavLink to={path} activeClassName={s.activeLink}>
      <div className={`${s.chats} ${s.activeLink}`}>
        <img src="https://static01.nyt.com/images/2019/11/05/science/28TB-SUNSET1/merlin_163473282_fe17fc6b-78b6-4cdd-b301-6f63e6ebdd7a-superJumbo.jpg" alt="image" className={s.chatsImage}/>
        <p>{name}</p>
      </div>
    </NavLink>
  );
};

export default DialogItem;
