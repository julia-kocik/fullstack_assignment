import React from 'react'
import './Homepage.scss';
import Events from '../../features/Events/Events';
import Form from '../../features/Form/Form';

const Homepage = () => {
  return (
    <div className='container'>
        <div className='left'>
            <Events/>
        </div>
        <div className='right'>
            <Form />
        </div>
    </div>
  )
}

export default Homepage