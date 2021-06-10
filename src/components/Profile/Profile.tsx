import { FC } from "react";
import { ProfileType } from "../../types/types";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

type PropsType = {
  savePhoto: (photo: File) => void
  isOwner: boolean
  profile: ProfileType | null
  saveProfile: (profile: ProfileType) => Promise<any>
  status: string
  updateStatus: (status: string) => void
}

const Profile: FC<PropsType> = (props) => {
  return (
    <div>
      <ProfileInfo savePhoto={props.savePhoto} 
                   isOwner={props.isOwner} 
                   profile={props.profile} 
                   saveProfile={props.saveProfile}
                   status={props.status} 
                   updateStatus={props.updateStatus} />
      <MyPostsContainer/>
    </div>
  );
};

export default Profile;