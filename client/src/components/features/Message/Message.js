import React from 'react';
import './Message.scss'; 

const Message = ({error, success, loading}) => {
  return (
    <div className='message__container'>
        <span className="error__message">
          {error && error}
          {success&&success}
          {loading&&loading}  
        </span>
    </div>
  )
}

export default Message