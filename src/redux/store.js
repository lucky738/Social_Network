import dialogsReducer from "./dialogs-reducer";
import navbarReducer from "./navbar-reducer";
import profileReducer from "./profile-reducer";

let store = {
    _state: {
        profilePage: {
            posts: [
                { id: 1, message: "Hi, how are you", likesCount: 0 },
                { id: 2, message: "It's  my first post", likesCount: 20 },
                { id: 3, message: "blabla", likesCount: 20 },
                { id: 4, message: "dasda", likesCount: 20 }
            ],
            newPostText: "lucky"
        },
        dialogsPage: {
            messages: [
                { id: 1, message: "Hi" },
                { id: 2, message: "How is your it-kamasutra?" },
                { id: 3, message: "Yo" },
                { id: 4, message: "Yo" },
                { id: 5, message: "Yo" }
            ],
            newMessageBody: "",
            dialogs: [
                { id: 1, name: "First" },
                { id: 2, name: "Second" },
                { id: 3, name: "Third" },
                { id: 4, name: "Fourth" },
                { id: 5, name: "Fifth" },
                { id: 6, name: "Sixth" }
            ],
        },
        navbar: {
            friends: [
                { id:1, name: "First", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-VXT0dnlBIoMrg9ZR3XE9ddKrcqXAzBXz0w&usqp=CAU" },
                { id:1, name: "Second", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-VXT0dnlBIoMrg9ZR3XE9ddKrcqXAzBXz0w&usqp=CAU" },
                { id:1, name: "Third", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-VXT0dnlBIoMrg9ZR3XE9ddKrcqXAzBXz0w&usqp=CAU" }
            ]
        }
    },
    _callSubscriber() {
        console.log('state changed')
    },

    getState() {
        return this._state;
    },
    subscribe (observer) {
        this._callSubscriber = observer;
    },

    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.navbar = navbarReducer(this._state.navbar, action);
         this._callSubscriber(this._state);
    }
}

window.store = store;
export default store;