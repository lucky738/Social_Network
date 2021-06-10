import { UserOutlined } from '@ant-design/icons'
import { Button, Col, Layout, Menu, Row } from 'antd'
import 'antd/dist/antd.css'
import Avatar from 'antd/lib/avatar/avatar'
import React from "react"
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom"
import { logout } from '../../redux/auth-reducer'
import { selectCurrentUserLogin, selectIsAuth } from '../../redux/auth-selectors'

export type MapPropsType = {
}
export type DisaptchPropsType = {
}

export const Header: React.FC<MapPropsType & DisaptchPropsType> = (props) => {

  const isAuth = useSelector(selectIsAuth)
  const login = useSelector(selectCurrentUserLogin)

  const dispatch = useDispatch()

  const logoutCallback = () => {
    dispatch(logout())
  }
  const { Header } = Layout
  return (

    <Header className="header">
      <div className="logo" />

      <Row>
        <Col span={18}>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            <Menu.Item key="1"><Link to="/developers">Developers</Link></Menu.Item>
          </Menu>
        </Col>


        {isAuth
          ? <>
            <Col span={1}>
              <Avatar alt={login || ''} style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
            </Col>
            <Col span={5}>
              <Button onClick={logoutCallback} >Logout</Button>
            </Col>
          </>
          : <Col span={6}>
            <Button>
              <Link to={'/login'}>Login</Link>
            </Button>
          </Col>}

      </Row>

    </Header>
    // <header className={s.header}>
    //   <div className={s.header_logo}>
    //     <img src="https://i.pinimg.com/originals/3f/3d/d9/3f3dd9219f7bb1c9617cf4f154b70383.jpg" />
    //   </div>
    //   <div className={s.loginBlock}>
    //     {props.isAuth
    //       ? <div>{props.login} - <button onClick={props.logout} >Logout</button></div>
    //       : <NavLink to={'/login'}>Login</NavLink>}
    //   </div>
    // </header>
  )
}
