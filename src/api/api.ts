import axios, { AxiosResponse } from 'axios'
import { UserType } from '../types/types'

export enum ResultCodesEnum {
    Success = 0, 
    Error = 1
}

export enum ResultCodeForCaptchaEnum {
    CaptchaIsRequired = 10
}

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "e44a54ed-1483-416a-8970-fe2efac19dae"
    }
})

export type GetItemsType = {
    items: Array<UserType>
    totalCount: number
    error: null | string
}

export type APIResponseType<D = {}, RC = ResultCodesEnum> = {
    data: D
    messages: Array<string>
    resultCode: RC
}