import { FC } from "react";
import { NavLink } from "react-router-dom";
import s from "./Navbar.module.css";

type PropsType = {}

const Navbar:FC<PropsType> = (props ) => {

  return (
    <nav className={s.nav}>
      <NavLink to="/profile" activeClassName={s.activeLink}>
        <div className={s.item}>
          Profile
        </div>
      </NavLink>
      <NavLink to="/dialogs" activeClassName={s.activeLink}>
        <div className={`${s.item} ${s.activeLink}`}>
          Messages
        </div>
      </NavLink>
      <NavLink to="/users" activeClassName={s.activeLink}>
        <div className={`${s.item} ${s.activeLink}`}>
          Users
        </div>
      </NavLink>
      <NavLink to="/news" activeClassName={s.activeLink}>
        <div className={s.item}>
          News
        </div>
      </NavLink>
      <NavLink to="/music" activeClassName={s.activeLink}>
        <div className={s.item}>
          Music
        </div>
      </NavLink>
      <NavLink to="/settings" activeClassName={s.activeLink}>
        <div className={s.item}>
          Settings
        </div>
      </NavLink>
    </nav>


  );
};
export default Navbar
