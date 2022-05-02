import React, { useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Header from './components/Header/Header'
import Body from './components/Body/Body'
import axios from 'axios'
import ACTIONS from './redux/actions/index'
import { dispatchLoginUser, dispatchLoginTrainer, dispatchLoginAdmin, fetchUser, fetchAdmin, dispatchGetUser, dispatchGetAdmin, fetchTrainer, dispatchGetTrainer } from './redux/actions/authAction'
import Footer from './components/Footer/Footer'

export default function App() {
  const dispatch = useDispatch()
  const token = useSelector(state => state.token)
  const auth = useSelector(state => state.auth)
  const { tokenUser, tokenTrainer, tokenAdmin } = token
  const { isUser, isTrainer, isAdmin } = auth
  useEffect(() => {
    const firstLogin = localStorage.getItem('firstLogin')
    const secondLogin = localStorage.getItem('secondLogin')
    const adminLogin = localStorage.getItem('admin')
    if (firstLogin && !secondLogin && !adminLogin) {
      // console.log('firstLogin', tokenUser);
      const getToken = async () => {
        const res = await axios.post('/user/refresh_token', null)
        dispatch({ type: ACTIONS.GET_TOKEN_USER, payload: res.data.access_token })
      }
      getToken()
    }
    if (secondLogin && !adminLogin) {
      const getTokenTrainer = async () => {
        const res = await axios.post('/trainer/refresh_token', null)
        dispatch({ type: ACTIONS.GET_TOKEN_TRAINER, payload: res.data.access_token })
      }
      getTokenTrainer()
    }
    if (adminLogin) {
      const getTokenAdmin = async () => {
        const res = await axios.post('/admin/refresh_token', null)
        dispatch({ type: ACTIONS.GET_TOKEN_ADMIN, payload: res.data.access_token })
      }
      getTokenAdmin()
    }
  }, [dispatch, isUser, isTrainer, isAdmin])

  useEffect(() => {
    if (tokenUser) {
      const getUser = () => {
        dispatch(dispatchLoginUser())
        return fetchUser(tokenUser).then(res => {
          dispatch(dispatchGetUser(res))
        })
      }
      getUser()
    }
    if (tokenTrainer) {
      const getTrainer = () => {
        dispatch(dispatchLoginTrainer())
        return fetchTrainer(tokenTrainer).then(res => {
          dispatch(dispatchGetTrainer(res))
        })
      }
      getTrainer()
    }
    if (tokenAdmin) {
      const getAdmin = () => {
        dispatch(dispatchLoginAdmin())
        return fetchAdmin(tokenAdmin).then(res => {
          dispatch(dispatchGetAdmin(res))
        })
      }
      getAdmin()
    }

  }, [token, dispatch, tokenUser, tokenTrainer, tokenAdmin])
  return (
    <Router>
      <div className="App">
        <Header />
        <div style={{ marginTop: "70px" }}>
          <Body />
          <Footer />
        </div>
      </div>
    </Router>
  )
}
