import React, { useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Header from './components/Header/Header'
import Body from './components/Body/Body'
import axios from 'axios'
import ACTIONS from './redux/actions/index'
import { dispatchLoginUser, dispatchLoginTrainer, fetchUser, dispatchGetUser, fetchTrainer, dispatchGetTrainer } from './redux/actions/authAction'
import Footer from './components/Footer/Footer'

export default function App() {
  const dispatch = useDispatch()
  const token = useSelector(state => state.token)
  const auth = useSelector(state => state.auth)
  const { tokenUser, tokenTrainer } = token
  const { isUser, isTrainer } = auth
  useEffect(() => {
    const firstLogin = localStorage.getItem('firstLogin')
    const secondLogin = localStorage.getItem('secondLogin')
    if (firstLogin && !secondLogin) {
      // console.log('firstLogin', tokenUser);
      const getToken = async () => {
        const res = await axios.post('/user/refresh_token', null)
        dispatch({ type: ACTIONS.GET_TOKEN_USER, payload: res.data.access_token })
      }
      getToken()
    }
    if (secondLogin) {
      const getTokenTrainer = async () => {
        const res = await axios.post('/trainer/refresh_token', null)
        dispatch({ type: ACTIONS.GET_TOKEN_TRAINER, payload: res.data.access_token })
      }
      getTokenTrainer()
    }
  }, [dispatch, isUser, isTrainer])
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
  }, [token, dispatch, isUser, isTrainer])
  return (
    <Router>
      <div className="App">
        <Header />
        <div style={{ marginBottom: "70px" }} />
        <Body />
        {/* <Footer /> */}
      </div>
    </Router>
  )
}
