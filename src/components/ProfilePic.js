import React, { Component }  from 'react';
import '../profilepic.css';

const ProfilePic = ({ url, screen_name }) => {
  var ref = "./user/" + screen_name.toString();
  console.log(screen_name);
  console.log(ref);
  return (
      <div className="propic">
        <a href={ref}>
          <img src={url} />
        </a>
      </div>
  );
};

export default ProfilePic;
