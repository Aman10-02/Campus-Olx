import React from 'react'

function Unauthorised() {
  return (
    <>
      <div className='bodyContainer' style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',

      }}>
        <h1>Unauthorised Access</h1>
        <h4>You are not Authorised </h4>
        <h4> Login to Continue</h4>
      </div>
    </>
  )
}

export default Unauthorised