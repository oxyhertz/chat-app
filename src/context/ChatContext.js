import { onAuthStateChanged } from 'firebase/auth'
import { createContext, useState, useEffect } from 'react'
import { auth } from '../services/firebase'
import { AuthContext } from './AuthContext'
export const ChatContext = createContext()

export const ChatContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext)
  const INITIAL_STATE = {
    chatId: null,
    searchedUser: {},
  }
  const chatReducer = (state, action) => {
    switch (action.type) {
      case 'CHANGE_USER':
        return {
          searchedUser: action.payload,
          chatId:
            currentUser.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser.uid,
        }
      case 'SET_USER':
        return {
          ...state,
          user: action.payload,
        }
      default:
        return state
    }
  }
  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE)
  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  )
}
