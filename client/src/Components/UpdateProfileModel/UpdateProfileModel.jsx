import React, { useState } from 'react'
import './UpdateProfileModel.css'
import { useDispatch } from 'react-redux';
import { updateProfile } from '../../Redux/ApiCalls/ProfileApiCall';



export default function UpdateProfileModel({ setupdateProfile, profile }) {

    const [username, setUsername] = useState(profile.username);
    const [bio, setBio] = useState(profile.bio);
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();


   // Form Update Submit Handler
     const formUpdateSubmitHandler = (e) => {
       e.preventDefault();
       
      const updatedUser = { username , bio }

      if(password.trim() !== ""){
        updatedUser.password = password;
      }
   
       //console.log(updatedUser);
       dispatch(updateProfile(profile?._id, updatedUser));
       setupdateProfile(false);
     }


  return (
    <>
      <div className="update-profile">
        <form
          onSubmit={formUpdateSubmitHandler}
          className="update-profile-form"
        >
          <abbr title="close">
            <i
              onClick={() => setupdateProfile(false)}
              className="fa-solid fa-circle-xmark update-profile-close"
            ></i>
          </abbr>
          <h1 className="update-post-title">Update Your Profile</h1>
          <input
            type="text"
            className="update-profile-input"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            className="update-profile-input"
            placeholder="Boi"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
          <button type="submit" className="update-profile-btn">
            Update Profile
          </button>
        </form>
      </div>
    </>
  );
}
