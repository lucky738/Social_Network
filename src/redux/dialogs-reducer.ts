import { InferActionsType } from "./redux-store"

type DialogType = {
    id: number
    name: string
}

type MessageType = {
    id: number
    message: string
}

let initialState = {
    dialogs: [
        { id: 1, name: "First" },
        { id: 2, name: "Second" },
        { id: 3, name: "Third" },
        { id: 4, name: "Fourth" },
        { id: 5, name: "Fifth" },
        { id: 6, name: "Sixth" }
    ] as Array<DialogType>,
    messages: [
        { id: 1, message: "Hi" },
        { id: 2, message: "How is your it-kamasutra?" },
        { id: 3, message: "Yo" },
        { id: 4, message: "Yo" },
        { id: 5, message: "Yo" }
    ] as Array<MessageType>
}

const dialogsReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SN/DIALOG/SEND_MESSAGE':
            let body = action.newMessageBody
            return {
                ...state,
                messages: [...state.messages, { id: 5, message: body }]
            };
        default:
            return state;
    }

}

export const actions = {
    sendMessage: (newMessageBody: string) => ({type: 'SN/DIALOG/SEND_MESSAGE', newMessageBody} as const)
}
type ActionsType = InferActionsType<typeof actions>

export default dialogsReducer;

export type InitialStateType = typeof initialState