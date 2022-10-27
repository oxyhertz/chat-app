import React from 'react'
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
export const Search = () => {
  const [user, setUser] = useState(null)
  const [err, setErr] = useState(false)
  const [username, setUsername] = useState('')
  const handleSearch = async () => {
    const q = query(
      collection(db, 'users'),
      where('displayName', '==', username)
    )

    try {
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        setUser(doc.data())
      })
    } catch (err) {
      setErr(true)
    }
  }

  return (
    <div className="search">
      <div className="search-form">
        <input placeholder="Find a user" type="text" name="" id="" />
      </div>
      <div className="user-chat">
        <img
          src="https://images.pexels.com/photos/10306256/pexels-photo-10306256.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
        />
        <div className="user-chat-info">
          <span>Jannet</span>
        </div>
      </div>
    </div>
  )
}
