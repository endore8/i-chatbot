import React from 'react'
import { CSSTransition } from 'react-transition-group'

const Animatable = ({ children, ...props }) => (
  <CSSTransition
    {...props}
    timeout={{ enter: 500, exit: 300 }}>
    {children}
  </CSSTransition>
)

export default Animatable
