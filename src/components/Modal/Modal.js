import React from 'react'

const Modal = ({ children, open, onClose }) => {
  if (!open) {
    return <></>
  }

  return (
    <div className='modal-overlay' onClick={() => onClose()}>
      <div className='modal' onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

export default Modal
