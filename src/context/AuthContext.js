import { onAuthStateChanged } from 'firebase/auth'
import { createContext, useState, useEffect } from 'react'
import { auth } from '../services/firebase'
export const AuthContext = createContext()
export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [pending, setPending] = useState(true)
  const pathname = window.location.pathname
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      setPending(false)
      console.log('user', user)
    })
    return () => {
      unsub()
    }
  }, [])

  if (pending && pathname === '/') return <>Loading....</>
  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  )
}
