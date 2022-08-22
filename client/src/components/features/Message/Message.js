import React from 'react';
import './Message.scss'; 

const Message = ({error, success}) => {
  return (
    <div className='message__container'>
        <span className="error__message">{error && error}{success&&success}</span>
    </div>
  )
}

export default Message