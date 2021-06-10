import React from 'react';
import { connect } from 'react-redux';
import Profile from "./Profile";
import { getUserProfile, getStatus, updateStatus, savePhoto, saveProfile } from '../../redux/profile-reducer'
import { Redirect, RouteComponentProps, withRouter } from 'react-router-dom';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import { AppStateType } from '../../redux/redux-store';
import { ProfileType } from '../../types/types';

type MapPropsType = ReturnType<typeof mapStateToProps>

type DispatchPropsType = {
  getUserProfile: (userId: number) => void
  getStatus: (userId: number) => void
  updateStatus: (status: string) => void
  savePhoto: (photo: File) => void
  saveProfile: (profile: ProfileType) => Promise<any>
}

type PathParamsType = {
  userId: string
}

type PropsType = MapPropsType & DispatchPropsType
  & RouteComponentProps<PathParamsType>

class ProfileContainer extends React.Component<PropsType> {

  refreshProfile() {
    let userId: number | null = +this.props.match.params.userId
    // match which analyzes url, came here because of withRouter 
    if (!userId) {
      debugger
      userId = this.props.authorizedUserId
      if (!userId) {
        this.props.history.push("/login")
      }
    }
    if (!userId) {
      console.error("ID should exist in URI params or in state('authorized')")
    } else {
      this.props.getUserProfile(userId as number)
      this.props.getStatus(userId as number)
    }
  }

  componentDidMount() {
    this.refreshProfile();
  }

  componentDidUpdate(prevProps: PropsType) {
    if (prevProps.match.params.userId !== this.props.match.params.userId) {
      this.refreshProfile();
    }
  }
  render() {
    // if (!this.props.isAuth) return <Redirect to='/login' />
    return (
      <Profile {...this.props}
        isOwner={!this.props.match.params.userId}
        profile={this.props.profile}
        status={this.props.status}
        updateStatus={this.props.updateStatus}
        savePhoto={this.props.savePhoto} />
    );
  }
};

let mapStateToProps = (state: AppStateType) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  isAuth: state.auth.isAuth,
  authorizedUserId: state.auth.userId
})

export default compose<React.ComponentType>(connect(mapStateToProps,
  { getUserProfile, getStatus, updateStatus, savePhoto, saveProfile }), withRouter)
  (ProfileContainer)