import { actions } from '../../../redux/profile-reducer';
import { connect } from 'react-redux';
import { AppStateType } from '../../../redux/redux-store';
import MyPostsMemorized, { DisaptchPropsType, MapPropsType } from './MyPosts';

let mapStateToProps = (state: AppStateType) => {
  return {
    posts: state.profilePage.posts,
  }
}

const MyPostsContainer = connect<MapPropsType, DisaptchPropsType, {}, AppStateType>(mapStateToProps,
  { addPost: actions.addPostActionCreator })(MyPostsMemorized);

export default MyPostsContainer;