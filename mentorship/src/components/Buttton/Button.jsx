import React from 'react'
import "./Button.css"

function Button({text="click", btnClass, onClick}) {
  return (
    <button className={`btn ${btnClass}`} onClick={onClick}>
      {text}
    </button>
  )
}

export default Button