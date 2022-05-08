import React from 'react'
import {useSpring} from'react-spring'
export default function SlideDown(props) {
  const {Component}=props;
  return (
    <div>
      <Component/>
      <input type='color'></input>
    </div>
  )
}
