import React, { Component }  from 'react';
import '../focus_text.css';

const FocusText = ({ content }) => {
  return (
      <div>
        <div className="pretext">
          Make what you say
        </div> <br/>
        <div className="focus">
          <div className="focus--mask">
            <div className="focus--mask-inner">{content}</div>
        </div>
      </div>
    </div>
  );
};

export default FocusText;
