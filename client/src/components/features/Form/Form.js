import React, {useState} from 'react'
import './Form.scss'; 
import { API_URL } from '../../../config';
import axios from 'axios';

const Form = () => {
  const [newEvent, setNewEvent] = useState(
    {
      firstName: '',
      lastName: '',
      email: '',
      date: null,
    }
  );
  // const [passValidation, setPassValidation] = useState(false);
  const handleChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };
  // const validateFormFields = () => {
  //   const {firstName, lastName, email, date} = newEvent;
  //   if(firstName && lastName && email && date) {
  //     console.log(typeof date)
  //     setPassValidation(true);
  //   } else {
  //     setPassValidation(false);
  //     if(!firstName) {
  //       alert('Please provide first name');
  //     } else if(!lastName) {
  //       alert('Please provide last name');
  //       return;
  //     }  else if(!email) {
  //       alert('Please provide email');
  //       return;
  //     } else if(!date) {
  //       alert('Please provide date');
  //     }
  //   }
  // }
  const submitForm = async (e) => {
    e.preventDefault();
    // validateFormFields()
      // if(passValidation) {
        try {
          await axios.post(`${API_URL}/events`, newEvent);
          setNewEvent({
            firstName: '',
            lastName: '',
            email: '',
            date: null,
          })
        } catch (error) {
          console.log(error)
          console.log(newEvent)
        }
        // setPassValidation(false);
      // }
  }
  return (
    <div className='form__container'>
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

export default Form