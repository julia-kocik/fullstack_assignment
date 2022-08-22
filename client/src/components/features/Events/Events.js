import React from 'react'
import './Events.scss'; 


const Events = ({error, loading, events}) => {  
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
    <h2 className='events__section__title'>Events</h2> 
    {events && events.length  
    ? events.map(item => (
        <div key={item._id} className='events__event__container'>
          <div className='events__event__item'>
                <p>{item.firstName}</p>
            </div>
            <div className='events__event__item'>
                <p>{item.lastName}</p>
            </div>
            <div className='events__event__item'>                
                <p>{item.email}</p>
            </div>
            <div className='events__event__item'>                
                <p>{item.date}</p>
            </div>
        </div>
    )) 
    : (
        <div className='events__event__container'>
            <h2 className='events__section__subtitle'>You have no saved events yet</h2> 
        </div>
    )}
</div>
  )
}

export default Events