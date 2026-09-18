import { createContext, useContext, useState } from 'react'

const NotificationContext = createContext()

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState('')

  const notify = message => {
    setNotification(message)

    setTimeout(() => {
      setNotification('')
    }, 5000)
  }

  return (
    <NotificationContext.Provider value={{ notification, notify }}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotify = () => {
  const { notify } = useContext(NotificationContext)
  return notify
}

export const useNotification = () => {
  const { notification } = useContext(NotificationContext)
  return notification
}