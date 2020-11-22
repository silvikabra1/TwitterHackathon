import '../App.css';

import TopTweet from '../components/TopTweet';
import React, { Component, useState, useEffect }  from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import ReactIdSwiper from 'react-id-swiper';




function UserPage() {
  const [popularTweets, setPopularTweets] = useState([[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]);

  const [stockChanges, setStockChanges] = useState([[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]);

  let { screenName } = useParams();

  useEffect(() => {
    fetch('http://localhost:5000/api/tweets/'+screenName).then(response => {return response.json()}).then(data=> 
    {
      setPopularTweets(data["most_popular"]);
      console.log(data["most_popular"])
    });
  }, [[]]);

  useEffect(() => {
    fetch('http://localhost:5000/api/stockchanges/'+screenName).then(response => {return response.json()}).then(data=> 
    {
      setStockChanges(data["changes"]);
      console.log(data["changes"])
    });
  }, [[]]);


  return (
    <div>
      <h1 className="twitter-header">@{screenName}</h1>
      <h1 className="twitter-header"> Top 10 Popular Tweets</h1>
      <ul className="tweet-table">
        <ol><TopTweet num="1" virality={popularTweets[0][0]} tweet={popularTweets[0][2]} date={popularTweets[0][3]} business={stockChanges[0][1]} stockchanges={stockChanges[0][2]}></TopTweet></ol>
        <ol><TopTweet num="2" virality={popularTweets[1][0]} tweet={popularTweets[1][2]} date={popularTweets[1][3]} business={stockChanges[1][1]} stockchanges={stockChanges[1][2]}></TopTweet></ol>
        <ol><TopTweet num="3" virality={popularTweets[2][0]} tweet={popularTweets[2][2]} date={popularTweets[2][3]} business={stockChanges[2][1]} stockchanges={stockChanges[2][2]}></TopTweet></ol>
        <ol><TopTweet num="4" virality={popularTweets[3][0]} tweet={popularTweets[3][2]} date={popularTweets[3][3]} business={stockChanges[3][1]} stockchanges={stockChanges[3][2]}></TopTweet></ol>
        <ol><TopTweet num="5" virality={popularTweets[4][0]} tweet={popularTweets[4][2]} date={popularTweets[4][3]} business={stockChanges[4][1]} stockchanges={stockChanges[4][2]}> </TopTweet></ol>
        <ol><TopTweet num="6" virality={popularTweets[5][0]} tweet={popularTweets[5][2]} date={popularTweets[5][3]} business={stockChanges[5][1]} stockchanges={stockChanges[5][2]}></TopTweet></ol>
        <ol><TopTweet num="7" virality={popularTweets[6][0]} tweet={popularTweets[6][2]} date={popularTweets[6][3]} business={stockChanges[6][1]} stockchanges={stockChanges[6][2]}></TopTweet></ol>
        <ol><TopTweet num="8" virality={popularTweets[7][0]} tweet={popularTweets[7][2]} date={popularTweets[7][3]} business={stockChanges[7][1]} stockchanges={stockChanges[7][2]}></TopTweet></ol>
        <ol><TopTweet num="9" virality={popularTweets[8][0]} tweet={popularTweets[8][2]} date={popularTweets[8][3]} business={stockChanges[8][1]} stockchanges={stockChanges[8][2]}></TopTweet></ol>
        <ol><TopTweet num="10" virality={popularTweets[9][0]} tweet={popularTweets[9][2]} date={popularTweets[9][3]} business={stockChanges[9][1]} stockchanges={stockChanges[9][2]}></TopTweet></ol>
      </ul>
      <a className="styled_button" href="../impact">Go Back</a>
    </div>
   
  );
}

export default UserPage;
