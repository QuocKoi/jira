import React from 'react'
import { NavLink } from 'react-router-dom'

export default function PageNotFound(props) {
  return (
    <div>
      <h1>Không tìm thấy Page</h1>
      <NavLink to='/'>Quay Lại Trang Chủ</NavLink>
    </div>
  )
}
