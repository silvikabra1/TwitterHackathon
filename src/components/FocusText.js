import React, { Component }  from 'react';
import '../focus_text.css';

const FocusText = ({ content }) => {
  return (
      <div>
        <div class="pretext">
          Make what you say
        </div> <br/>
        <div class="focus">
          <div class="focus--mask">
            <div class="focus--mask-inner">{content}</div>
        </div>
      </div>
    </div>
  );
};

export default FocusText;
