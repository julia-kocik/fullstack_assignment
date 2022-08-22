import React, {useState, useEffect} from 'react'
import './Events.scss'; 
import { API_URL } from '../../../config';
import axios from 'axios';

const Events = () => {
  const [events, setEvents] = useState([]); 
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchEvents = async () => {  
        try {
          const {data} = await axios.get(`${API_URL}/events`);
          setLoading(false);
          setEvents(data.data)
          console.log(data.data)
        } catch (error) {
          setLoading(false);
          setError(error.message)
          console.log(error)
        }
      }
      fetchEvents();
  }, [])
  
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