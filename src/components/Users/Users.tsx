
import * as queryString from 'querystring';
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { FilterType, follow, requestUsers, unfollow } from "../../redux/users-reducer";
import { getCurrentPage, getFollowingProgress, getPageSize, getTotalUsersCount, getUsers, getUsersFilter } from "../../redux/users-selectors";
import Paginator from "../common/paginator/Paginator";
import User from "./User";
import UsersSearchForm from "./UsersSearchForm";

type PropsType = {}

type QueryParamsType = { term?: string; page?: string; friend?: string }

export const Users: React.FC<PropsType> = (props) => {

    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const users = useSelector(getUsers)
    const followingInProgress = useSelector(getFollowingProgress)
    const filter = useSelector(getUsersFilter)

    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        const parsed = queryString.parse(history.location.search.substr(1)) as QueryParamsType

        let actualPage = currentPage
        let actualFilter = filter

        if (!!parsed.page) actualPage = Number(parsed.page)
        if (!!parsed.term) actualFilter = { ...actualFilter, term: parsed.term as string }

        switch (parsed.friend) {
            case 'null':
                actualFilter = { ...actualFilter, friend: null }
                break
            case 'false':
                actualFilter = { ...actualFilter, friend: false }
                break
            case 'true':
                actualFilter = { ...actualFilter, friend: true }
                break
        }
        dispatch(requestUsers(actualPage, pageSize, actualFilter))
    }, [])

    useEffect(() => {
        const query: QueryParamsType = {}

        if (!!filter.term) query.term = filter.term
        if (filter.friend !== null) query.friend = String(filter.friend)
        if (currentPage !== 1) query.page = String(currentPage)
        history.push({
            pathname: '/developers',
            search: queryString.stringify(query)
        })

    }, [filter, currentPage])

    const onPageChanged = (currentPage: number) => {
        dispatch(requestUsers(currentPage, pageSize, filter))
    }
    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestUsers(1, pageSize, filter))
    }

    const followCallback = (userId: number) => {
        dispatch(follow(userId))
    }
    const unfollowCallback = (userId: number) => {
        dispatch(unfollow(userId))
    }

    return <div>

        <UsersSearchForm onFilterChanged={onFilterChanged} />

        <Paginator currentPage={currentPage}
            totalItemsCount={totalUsersCount}
            pageSize={pageSize}
            onPageChanged={onPageChanged} />
        <div>
            {
                users.map(u => <User user={u}
                    key={u.id}
                    followingInProgress={followingInProgress}
                    unfollow={unfollowCallback}
                    follow={followCallback}
                />)
            }
        </div>
    </div>
}