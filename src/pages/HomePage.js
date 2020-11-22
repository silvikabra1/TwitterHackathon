import FocusText from "../components/FocusText";
import '../App.css';

import React, { Component }  from 'react';



function HomeFeedPage() {
  
  return (
    <div>
        <FocusText content={"matter"}/>
        <a href="./impact" className="styled_button">
          Launch Application
        </a>
        <p className="credits">
          By Silvi Kabra, Nick Gustafson, Mtsobol _. Check our work at <a href="https://github.com/silvikabra1/TwitterHackathon">https://github.com/silvikabra1/TwitterHackathon</a>
        </p>
    </div>
   
  );
}

export default HomeFeedPage;
