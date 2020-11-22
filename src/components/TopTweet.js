import React, { Component }  from 'react';

const TopTweet = ({ num, virality, tweet, date }) => {
  return (
    <div>
      <h1 className="twitter-header"> {num} </h1>
      <div className="top10">
        {tweet} ({date})
        <br />
        {virality} responses
        <br/>
      </div>
    </div>
  );
};

export default TopTweet;
