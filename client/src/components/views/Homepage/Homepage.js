import React from 'react'
import './Homepage.scss';
import Events from '../../features/Events/Events';
import Form from '../../features/Form/Form';

const Homepage = () => {
  return (
    <div className='container'>
        <div className='container__left'>
            <Events/>
        </div>
        <div className='container__right'>
            <Form />
        </div>
    </div>
  )
}

export default Homepage