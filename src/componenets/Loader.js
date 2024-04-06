import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = () => {
  return (
    <>
    <div  style={{
       textAlign:'center',
       marginBottom:'20px'
      }} >It can take Maximum 50 seconds! It's deployed on Free hosting service.</div>
    <Spinner
      animation='border'
      role='status'
      style={{
        width: '100px',
        height: '100px',
        display: 'block',
        margin: 'auto',
      }}
    >
      <span className='sr-only'>Loading...</span>
    </Spinner>
    </>
  );
};

export default Loader;
