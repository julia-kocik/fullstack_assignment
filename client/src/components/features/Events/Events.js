import React from 'react'
import './Events.scss'; 
import axios from 'axios';
import { API_URL } from '../../../config';

const Events = ({error, loading, events, setShouldDelEvents}) => {
  const deleteEvents = async () => {  
      try {
        await axios.delete(`${API_URL}/events`);
        setShouldDelEvents(true)
      } catch (error) {
        console.log(error)
      }
  }  
  if(loading) {
    return <div className='loading__container'>
        <span className='info__message'>Loading...</span>
    </div>
  }
  if (error) {
    return <div className='loading__container'>
        <span className="error__message">{error}</span>
    </div>
  } 
  return (
    <div className='events__container'>
    <div className='events__section__title'>
        <h4>Events</h4>
        <button className='form__submit__btn' onClick={deleteEvents}>Clear All</button>
    </div> 
    {events?.length  
    ? events.map(item => (
        <div key={item._id} className='events__event__container'>
          <div className='events__event__item'>
                <p>{item.firstName}</p>
            </div>
            <div className='events__event__item'>
                <p>{item.lastName}</p>
            </div>
            <div className='events__event__item events__event__item__email'>                
                <p>{item.email}</p>
            </div>
            <div className='events__event__item events__event__item__date'>                
                <p>{item.date.substring(0,10)}</p>
            </div>
        </div>
    )) 
    : (
        <div className='events__event__container'>
            <h2 className='events__section__subtitle'>You have no saved events yet</h2> 
        </div>
    )}
  </div>
)}

export default Events