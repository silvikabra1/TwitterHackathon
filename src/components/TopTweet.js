import React, { Component }  from 'react';

const TopTweet = ({ num, virality, tweet, date, business, stockchanges }) => {
  return (
    <div>
      <h1 className="twitter-header"> {num} </h1>
      <div className="top10">
        {tweet} ({date})
        <br /> <br />
        {virality} responses
        <br/> <br/>
        {business}: {stockchanges}% change that week
        <br/>
      </div>
    </div>
  );
};

export default TopTweet;
