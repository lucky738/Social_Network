import React, { FC } from 'react'

type PropsType = {
  name: string
}

const News:FC<PropsType> = (props) => {
  return (
    <div>
      News
      <h2>{props.name}</h2>
    </div>
  );
};

export default News;