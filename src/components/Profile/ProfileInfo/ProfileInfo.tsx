import Preloader from "../../common/preloader/Preloader";
import s from "./ProfileInfo.module.css";
import cat from '../../../assets/images/cat.jpg'
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import React, { ChangeEvent, FC, useState } from "react";
import ProfileDataForm from "./ProfileDataForm";
import { ContactsType, ProfileType } from "../../../types/types";

type ProfileInfoPropsType = {
  profile: ProfileType | null
  status: string
  updateStatus: (status: string) => void
  isOwner: boolean
  savePhoto: (photo: File) => void
  saveProfile: (profile: ProfileType) => Promise<any>
}

const ProfileInfo: FC<ProfileInfoPropsType> = ({ profile, status, updateStatus, isOwner, 
  savePhoto, saveProfile }) => {
  const [editMode, setEditMode] = useState(false)

  if (!profile) {
    return <Preloader />
  }

  const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      savePhoto(e.target.files[0])
    }
  }

  const onSubmit = (formData: ProfileType) => {
    saveProfile(formData).then(
      () => setEditMode(false)
    )
  }
  return (
    <div>
      <div className={s.descriptionBlock}>
        <img src={profile.photos.large || cat} className={s.mainPhoto} />
        {isOwner && <input type="file" onChange={onMainPhotoSelected} />}

        {editMode
          ? <ProfileDataForm profile={profile} onSubmit={onSubmit} />
          : <ProfileData goToEditMode={() => { setEditMode(true) }} profile={profile} isOwner={isOwner}
          />}

        <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
      </div>
    </div>
  );
};

type ProfileDataPropsType = {
  profile: ProfileType
  goToEditMode: () => void
  isOwner: boolean
}

const ProfileData: FC<ProfileDataPropsType> = ({ profile, goToEditMode, isOwner, ...props }) => {
  return <div>
    {isOwner && <div><button onClick={goToEditMode}>edit</button></div>}
    <div>
      <b>Full name:</b> {profile.fullName}
    </div>

    <div>
      <b>Looking for a job:</b> {profile.lookingForAJob ? "yes" : "no"}
    </div>

    {profile.lookingForAJob && <div>
      <b>My professional skill:</b> {profile.lookingForAJobDescription}
    </div>}

    <div>
      <b>About me:</b> {profile.aboutMe}
    </div>

    <div>
      <b>Contacts:</b>{Object.keys(profile.contacts).map(key => {
        return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key as keyof ContactsType]} />
      })}
    </div>

  </div>
}

type ContactPropsType = {
  contactTitle: string
  contactValue: string
}

const Contact: FC<ContactPropsType> = ({ contactTitle, contactValue }) => {
  return <div className={s.contact}><i><b>{contactTitle}: </b></i> {contactValue}</div>
}

export default ProfileInfo;