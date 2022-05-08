import React from 'react'

export default function DetailLogin(props) {
  return (
    <div>
        <h1>Tên Tài Khoản:{props.match.params.id}</h1>
    </div>
  )
}
