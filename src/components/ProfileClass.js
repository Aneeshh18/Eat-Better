import React from "react";
import ProfileUserClass from "./ProfileUserClass";
import { Github_API_User, Github_UserName, options } from "../config";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {
        name: "",
        bio: "",
      },
    };
  }

  async componentDidMount() {
    const response = await fetch(Github_API_User + Github_UserName, options);
    const json = await response.json();
    this.setState({
      userInfo: json,
    });
  }

  render() {
    const { userInfo } = this.state; // object destructuring for json data

    return (
      <div className="profile-class-container">
        <div className="profile-container">
          <h1 className="profile-title">About Me</h1>
          <ProfileUserClass data={userInfo} />
          {/* Passing props data (full json data) from parent to child */}
        </div>
      </div>
    );
  }
}

export default Profile;
