import '../App.css';


import React, { Component }  from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';




function UserPage() {
  
  let { screenName } = useParams();
  

  console.log(screenName);
  return (
    <div>
      <h1 className="twitter-header">Twitter User: @{screenName}</h1>
        
    </div>
   
  );
}

export default UserPage;
