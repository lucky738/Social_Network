import React, { FC } from 'react';
import { PostType } from '../../../types/types';
import AddNewPostFormRedux, { AddPostFormValuesType } from './AddPostForm/AddPostForm';
import s from "./MyPosts.module.css";
import Post from "./Post/Post";

export type DisaptchPropsType = {
  addPost: (newPostText: string) => void
}

export type MapPropsType = {
  posts: Array<PostType>
}

const MyPosts:FC<DisaptchPropsType & MapPropsType> = (props) => {
  let postsElements = props.posts.map(p => <Post key={p.id} message={p.message} likesCount={p.likesCount} />);

  let onAddPost = (values: AddPostFormValuesType) => {
    props.addPost(values.newPostText)
  }
  
  return (
    <div className={s.postsBlock}>
      <h3>My posts</h3>
      <AddNewPostFormRedux onSubmit={onAddPost} />
      <div className={s.posts}>
        {postsElements}
      </div>
    </div>
  )
}

const MyPostsMemorized = React.memo(MyPosts);

export default MyPostsMemorized;