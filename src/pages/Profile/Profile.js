import React from 'react'
import {Redirect} from 'react-router-dom'
export default function Profile() {
  if (localStorage.getItem('userLogin')) {
    return (
      <div>Profile</div>
    )
  }else{
    alert('Vui lòng đăng nhập !')
    return(
      <Redirect to='/login'></Redirect>
    )
  }
}
