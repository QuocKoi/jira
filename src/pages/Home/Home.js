import React from 'react'
import { useSelector } from 'react-redux'
export default function Home(props) {
  const {email,avatar,phone}=useSelector(state=>state.UserReducer.userLogin);
 
  return (
    <div>
      <p>{email}</p>
      <img src={avatar}/>
    </div>
  )
}
