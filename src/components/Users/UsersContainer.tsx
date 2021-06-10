import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router'
import { selectIsAuth } from '../../redux/auth-selectors'
import { getIsFetching } from '../../redux/users-selectors'
import Preloader from '../common/preloader/Preloader'
import { Users } from './Users'


type UsersPagePropsType = {
    pageTitle: string
}

export const UsersPage: React.FC<UsersPagePropsType> = (props) => {

    const isFetching = useSelector(getIsFetching)
    const isAuth = useSelector(selectIsAuth)

    if (!isAuth) {
        return <Redirect to={'/profile'} />

    }
    return <>
        <h2>{props.pageTitle}</h2>

        {isFetching ? <Preloader /> : null}
        <Users />
    </>
}