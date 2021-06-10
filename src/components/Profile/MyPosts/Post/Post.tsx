import { FC } from "react";
import s from "./Post.module.css";

type PropsType = {
  message: string
  likesCount: number
}

const Post: FC<PropsType> = (props) => {
  return (
    <div className={s.item}>
      <img src="https://www.meme-arsenal.com/memes/3d3bc634cc23f6176e9aead00cd7f790.jpg" />
      {props.message}
      <div>
        <span>likes - {props.likesCount}</span>
      </div>
    </div>
  );
}

export default Post;
