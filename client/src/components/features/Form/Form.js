import React, {useState} from 'react'
import './Form.scss'; 
import { API_URL } from '../../../config';
import axios from 'axios';
import Message from '../Message/Message';

const Form = () => {
  const [newEvent, setNewEvent] = useState(
    {
      firstName: '',
      lastName: '',
      email: '',
      date: null,
    }
  );
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('')
  const [passValidation, setPassValidation] = useState(false);
  const handleChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };
  const validateFormFields = () => {
    const {firstName, lastName, email, date} = newEvent;
    const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const correctEmail = email.match(emailPattern);
    if(firstName && lastName && email && date) {
      setPassValidation(true);
    } else {
      setPassValidation(false);
      if(!firstName) {
        setError('Please provide firstname')
          setTimeout(() => {
            setError('')
          }, 3000);
      } else if(!lastName)  {
          setError('Please provide last name')
          setTimeout(() => {
            setError('')
          }, 3000);
          return;
      }  else if(!email) {
          setError('Please provide email')
          setTimeout(() => {
            setError('')
          }, 3000);
        return;
      } else if(!correctEmail) {
        setError('Please provide valid email')
        setTimeout(() => {
          setError('')
        }, 3000);
      } else if(!date) {
          setError('Please provide date');
          setTimeout(() => {
            setError('')
          }, 3000);
        }
      } 
  }
  const submitForm = async (e) => {
    e.preventDefault();
    validateFormFields()
      if(passValidation) {
        try {
          await axios.post(`${API_URL}/events`, newEvent);
          setNewEvent({
            firstName: '',
            lastName: '',
            email: '',
            date: null,
          })
          setSuccess('Event successfully saved');
          setTimeout(() => {
            setSuccess('')
          }, 3000);
        } catch (err) {
          setError(err.response.data.message || 'Network error')
          setTimeout(() => {
            setError('')
          }, 3000);
        }
        setPassValidation(false);
      }
    }
  return (
    <div className='form__container'>
          <div className='error__container'>
            {error && <Message error={error}/>}
            {success && <Message success={success}/>}
          </div>
          <form className='form' onSubmit={submitForm}>
            <label>Name</label>
            <input className='form__input' type="text" name="firstName" onChange={handleChange}></input>
            <label>Surname</label>
            <input className='form__input' type="text" name="lastName" onChange={handleChange}></input>
            <label>Email</label>
            <input className='form__input' type="email" name="email" onChange={handleChange}></input>
            <label>Date</label>
            <input className='form__input' type="date" name="date" onChange={handleChange}></input>
            <button className='form__submit__btn' type="submit">Save Event</button>
          </form>
    </div>
  )
}

export default Form;