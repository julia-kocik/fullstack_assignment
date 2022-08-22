import React, {useState, useEffect} from 'react'
import './Homepage.scss';
import Events from '../../features/Events/Events';
import Form from '../../features/Form/Form';
import { API_URL } from '../../../config';
import axios from 'axios';

const Homepage = () => {
  const [events, setEvents] = useState([]); 
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  // const [shouldFetchEvents, setShouldFetchEvents] = useState(true);
  useEffect(() => {
    // if(shouldFetchEvents) {
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
      // setShouldFetchEvents(true);
    // }
  }, [])

  return (
    <div className='container'>
        <div className='container__left'>
            <Events events={events} loading={loading} error={error} />
        </div>
        <div className='container__right'>
            <Form />
        </div>
    </div>
  )
}

export default Homepage