import React from "react";
import ShareVideo from "../assets/share.mp4";
import logo from "../assets/logowhite.png";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import client from "../client";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const responseGoogle = (response) => {
    const userObject = jwtDecode(response.credential);

    const { email, name, picture, sub } = userObject;

    const doc = {
      _id: sub,
      _type: "user",
      email,
      userName: name,
      image: picture,
    };

    localStorage.setItem("user", JSON.stringify(doc));

    client.createIfNotExists(doc).then(() => {
      navigate("/", { replace: true });
    });
  };

  return (
    <div className="flex justify-start items-center h-screen w-full">
      <div className="relative w-full h-full">
        <video
          src={ShareVideo}
          loop
          controls={false}
          autoPlay
          muted
          className="object-cover w-full h-full"
        ></video>
      </div>

      <div className="absolute flex flex-col justify-center items-center inset-0 bg-blackOverlay">
        <div className="p-5">
          <img src={logo} width="130px" alt="logo" />
        </div>

        <div className="shadow-2xl">
          <GoogleLogin
            onSuccess={responseGoogle}
            onError={responseGoogle}
            cookiePolicy="single_host_origin"
            scope="https://www.googleapis.com/auth/userinfo.profile"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
