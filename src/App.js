import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Home } from './pages/Home'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
  Link,
  Navigate,
  useLocation,
} from 'react-router-dom'
import { AuthContext } from './context/AuthContext'
import { useContext } from 'react'

function App() {
  const { currentUser } = useContext(AuthContext)
  const ProtectedRoute = ({ children }) => {
    console.log('currentUser', currentUser)
    if (!currentUser) return <Navigate to="/login"></Navigate>
    return children
  }
  return (
    <Router>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          ></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="register" element={<Register />}></Route>
        </Route>
      </Routes>
    </Router>
  )
}
export default App
