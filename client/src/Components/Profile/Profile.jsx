import React, { useEffect, useState } from "react";
import "./Profile.css";
import { toast } from "react-toastify";
import swal from "sweetalert";
import UpdateProfileModel from "../UpdateProfileModel/UpdateProfileModel";
import { useDispatch, useSelector } from 'react-redux';
import { deleteProfile, getUserProfile, uploadProfilePhoto } from "../../Redux/ApiCalls/ProfileApiCall";
import { useNavigate, useParams } from "react-router-dom";
import PostItem from "../Post List/PostItem";
import {Oval} from "react-loader-spinner"
import { logoutUser } from "../../Redux/ApiCalls/AuthApiCall";


export default function Profile() {

  const [file, setFile] = useState(null);
  const [updateProfile, setupdateProfile] = useState(false);

  const dispatch = useDispatch();
  const {id} = useParams();
  const { profile, loading, isProfileDeleted } = useSelector((state) => state.profile);
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();


  useEffect(() => {
    dispatch(getUserProfile(id));
    window.scrollTo(0,0)
  },[id])

  useEffect(() => {
    if (isProfileDeleted) {
      navigate("/");
    }
  }, [navigate, isProfileDeleted]);


  // Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();

    if(!file) return toast.warning("There is no file", {theme:"colored", position:"top-center"});

    //console.log("image uploaded")
    const formData = new FormData();
    formData.append("image", file); 

    dispatch(uploadProfilePhoto(formData))
    
   }

  // Delete Account Handler
  const deleteAccountHandler = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover Profile!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(deleteProfile(user?._id));
        dispatch(logoutUser())
      }
    });
  }; 

  // Loading
  if(loading){
    return (
      <div className="profile-loader">
        <Oval
          visible={true}
          height="120"
          width="120"
          color="#4fa94d"
          ariaLabel="oval-loading"
        />
      </div>
    );
  }

  return (
    <>
      <section className="profile">
        <div className="profile-header">
          <div className="profile-img-wrapper">
            <img
              src={file ? URL.createObjectURL(file) : profile?.profilePhoto.url}
              alt="Profile Image"
              className="profile-img"
            />
            {user?._id === profile?._id && (
              <form onSubmit={formSubmitHandler}>
                <abbr title="choose profile photo">
                  <label
                    htmlFor="file"
                    className="fa-solid fa-camera upload-profile-photo-icon"
                  ></label>
                </abbr>
                <input
                  style={{ display: "none" }}
                  type="file"
                  name="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <button type="submit" className="upload-profile-btn">
                  Upload
                </button>
              </form>
            )}
          </div>
          <h1 className="profile-username">{profile?.username}</h1>
          <p className="profile-bio">{profile?.bio}</p>
          <div className="user-date-join">
            <strong>Date Joined: </strong>
            <span>{new Date(profile?.createdAt).toDateString()}</span>
          </div>
          {user?._id === profile?._id && (
            <button
              onClick={() => setupdateProfile(true)}
              className="profile-update-btn"
            >
              <i className="fa-solid fa-upload"></i>
              Update Profile
            </button>
          )}
        </div>
        <div className="profile-posts-list">
          <h2 className="profile-posts-title">{profile?.username}'s Posts</h2>

          {profile?.posts?.map((post) => (
            <PostItem
              key={post._id}
              post={post}
              username={profile?.username}
              userId={profile?._id}
            />
          ))}
        </div>
        {user?._id === profile?._id && (
          <button onClick={deleteAccountHandler} className="delete-account-btn">
            Delete Your Account
          </button>
        )}

        {updateProfile && (
          <UpdateProfileModel
            profile={profile}
            setupdateProfile={setupdateProfile}
          />
        )}
      </section>
    </>
  );
}
