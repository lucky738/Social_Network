import profileReducer, { actions } from './profile-reducer'

let state = {
    posts: [
        { id: 1, message: "Hi, how are you", likesCount: 0 },
        { id: 2, message: "It's  my first post", likesCount: 20 },
        { id: 3, message: "blabla", likesCount: 20 },
        { id: 4, message: "dasda", likesCount: 20 }
    ],
    profile: null,
    status: "",
    newPostText: ""
} 

test('length of posts should be incremented', () => {
    let action = actions.addPostActionCreator("lucky");
    let newState = profileReducer(state, action)
    expect(newState.posts.length).toBe(5)
  });
test('message of new post should be correct', () => {
    let action = actions.addPostActionCreator("lucky");
    let newState = profileReducer(state, action)
    expect(newState.posts[4].message).toBe("lucky")
  });
test('after deleting lenthg of messages should be decrement', () => {
    // 1. test data
    let action = actions.deletePost(1);
    // 2. action
    let newState = profileReducer(state, action)
    // 3. expectation
    expect(newState.posts.length).toBe(3)
  });
  