import React, {useState} from 'react'
import './Form.scss'; 
import { API_URL } from '../../../config';
import axios from 'axios';
import Message from '../Message/Message';


const Form = ({setShouldFetchEvents}) => {
  const [newEvent, setNewEvent] = useState(
    {
      firstName: '',
      lastName: '',
      email: '',
      date: '',
    }
  );
  const [loading, setLoading] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('')
  const [passValidation, setPassValidation] = useState(false);
  const handleChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };
  const {firstName, lastName, email, date} = newEvent;
  const validateFormFields = () => {
    const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const correctEmail = email.match(emailPattern);
    if(firstName && lastName && email && date) {
      setPassValidation(true);
    } else {
      setPassValidation(false);
      if(!firstName) {
        alert('Please provide firstname')
          // setTimeout(() => {
          //   alert('')
          // }, 3000);
      } else if(!lastName)  {
          alert('Please provide last name')
          // setTimeout(() => {
          //   alert('')
          // }, 3000);
      }  else if(!email) {
          alert('Please provide email')
          // setTimeout(() => {
          //   alert('')
          // }, 3000);
      } else if(!correctEmail) {
        alert('Please provide valid email')
        // setTimeout(() => {
        //   alert('')
        // }, 3000);
      } else if(!date) {
          alert('Please provide date');
          // setTimeout(() => {
          //   alert('')
          // }, 3000);
        }
      } 
  }
  
  const submitForm = async (e) => {
    e.preventDefault();
      if(passValidation && !loading) {
        try {
          setLoading('Loading...')
          await axios.post(`${API_URL}/events`, newEvent);
          setLoading('');
          alert('Event successfully saved');
          // setTimeout(() => {
          //   setSuccess('')
          // }, 3000);
          // setFetchEvents(true);
          setNewEvent({
            firstName: '',
            lastName: '',
            email: '',
            date: '',
          })
          setShouldFetchEvents(true);
        } catch (err) {
          setLoading('')
          alert(err.response.data.message || 'Network error')
          // setTimeout(() => {
          //   alert('')
          // }, 3000);
        }
        setPassValidation(false);
      } 
    }
  return (
    <div className='form__container'>
          <div className='error__container'>
            {loading && <Message loading={loading}/>}
            {error && <Message error={error}/>}
            {success && <Message success={success}/>}
          </div>
          <form className='form' onSubmit={submitForm}>
            <label>Name</label>
            <input className='form__input' type="text" value={firstName} name="firstName" onChange={handleChange}></input>
            <label>Surname</label>
            <input className='form__input' type="text" value={lastName} name="lastName" onChange={handleChange}></input>
            <label>Email</label>
            <input className='form__input' type="email" value={email} name="email" onChange={handleChange}></input>
            <label>Date</label>
            <input className='form__input' type="date" value={date} name="date" onChange={handleChange}></input>
            <button className='form__submit__btn' type="submit" onClick={validateFormFields}>Save Event</button>
          </form>
    </div>
  )
}

export default Form;