import { authService } from "fbase";
import React from "react";
import { useNavigate } from "react-router-dom";


const Profile = () => {
  const navigate = useNavigate();
  const onLogOutClick = () => {
    authService.signOut();
    navigate('/')
  }
  return (
    <>
      <p>profile</p>
      <button onClick={onLogOutClick}>Log Out</button >
    </>
  )
}

export default Profile;