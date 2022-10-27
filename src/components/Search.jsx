import React, { useContext, useState } from 'react'
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from 'firebase/firestore'
import { db } from '../services/firebase'
import { AuthContext } from '../context/AuthContext'
export const Search = () => {
  const [searchedUser, setUser] = useState(null)
  const [err, setErr] = useState(false)
  const [username, setUsername] = useState('')
  const { currentUser } = useContext(AuthContext)

  const handleKey = (e) => {
    //If user press on enter
    e.code === 'Enter' && handleSearch()
  }

  const handleSearch = async () => {
    //Getting the searched user
    const q = query(
      collection(db, 'users'),
      where('displayName', '==', username)
    )

    try {
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        setUser(doc.data())
        console.log('doc.data())', doc.data())
      })
    } catch (err) {
      setErr(true)
    }
  }
  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > searchedUser.uid
        ? currentUser.uid + searchedUser.uid
        : searchedUser.uid + currentUser.uid
    try {
      const res = await getDoc(doc(db, 'chats', combinedId))

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, 'chats', combinedId), { messages: [] })

        //create user chats
        await updateDoc(doc(db, 'userChats', currentUser.uid), {
          [combinedId + '.userInfo']: {
            uid: searchedUser.uid,
            displayName: searchedUser.displayName,
            photoURL: searchedUser.photoURL,
          },
          [combinedId + '.date']: serverTimestamp(),
        })

        await updateDoc(doc(db, 'userChats', searchedUser.uid), {
          [combinedId + '.userInfo']: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + '.date']: serverTimestamp(),
        })
      }
    } catch (err) {}

    setUser(null)
    setUsername('')
  }
  return (
    <div className="search">
      <div className="search-form">
        <input
          placeholder="Find a user"
          type="text"
          name=""
          id=""
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>
      {err && <span>User not found!</span>}
      {searchedUser && (
        <div className="user-chat" onClick={handleSelect}>
          <img src={searchedUser.photoURL} alt="" />
          <div className="user-chat-info">
            <span>{searchedUser.displayName}</span>
          </div>
        </div>
      )}
    </div>
  )
}
