import { XMarkIcon } from 'assets/icons'
import { useStyles } from 'hooks'
import React, { createContext, useState } from 'react'

import styles from 'styles/Toaster.module.css'

export const ToastContext = createContext()

const Toaster = ({ children }) => {
  const s = useStyles(styles)

  const [toastList, setToastList] = useState([])

  const addToast = (type, text, { time } = {}) => {
    const id = Date.now()
    setToastList(prev => [...prev, { id, type, text }])

    setTimeout(() => {
      deleteToast(id)
    }, time ?? 5000)

    return id
  }

  const deleteToast = id => {
    setToastList(prev => prev.filter(toast => toast.id !== id))
  }

  return (
    <ToastContext.Provider
      value={{
        deleteToast,
        showError: text => addToast('error', text),
        showInfo: text => addToast('info', text),
        showSuccess: text => addToast('success', text)
      }}>
      {children}
      {toastList.length > 0 && (
        <div className={s('toaster')}>
          {toastList.map(toast => (
            <p className={s('toast')} data-role={toast.type} key={toast.id}>
              {toast.text}
              <button
                className='icon-btn'
                onClick={() => deleteToast(toast.id)}>
                <XMarkIcon />
              </button>
            </p>
          ))}
        </div>
      )}
    </ToastContext.Provider>
  )
}

export default Toaster
