import React from 'react'
import { Route, Switch } from 'react-router-dom'
import ActivationEmail from './auth/ActivationEmail'
import ActivationEmailTrainer from './auth/ActivationEmailTrainer'
import LoginUser from './auth/LoginUser'
import LoginTrainer from './auth/LoginTrainer'
import Login from './auth/Login'
import RegisterUser from './auth/RegisterUser'
import RegisterTrainer from './auth/RegisterTrainer'
import LoginAdmin from './auth/LoginAdmin'
import { useSelector } from 'react-redux'
import NotFound from '../utils/NotFound/NotFound'
import Content from '../utils/NotFound/Content'
import ForgotPassword from '../Body/auth/ForgotPassword'
import ResertPassword from '../Body/auth/ResertPassword'
import ProfileUser from './Profile/ProfileUser'
import ProfileTrainer from './Profile/ProfileTrainer'
import EditUser from './Profile/EditUser'
import DetailCourses from '../CoursesBody/CoursesItem/CoursesDetail'
import TutorialManager from '../CoursesBody/Trainer/TutorialManager'
import CoursesManager from '../CoursesBody/Trainer/CoursesManager'
import TutorialDetail from '../CoursesBody/CoursesItem/TutorialDetail'
import DashBoardTrainer from '../CoursesBody/Trainer/Dashboard'
import CheckBody from '../CoursesBody/User/CheckBody'
import CoursesOwner from '../CoursesBody/User/CousesOwner'
import Favorite from '../CoursesBody/User/Favorite'
import Discovery from '../CoursesBody/User/Discovery'
import Messenger from '../Messenger/Messsenger'
import ProfileAdmin from './Profile/ProfileAdmin'
import ManagerTrainer from '../CoursesBody/Admin/ManagerTrainer'
import ManagerUser from '../CoursesBody/Admin/ManagerUser'
import ManagerCate from '../CoursesBody/Admin/ManagerCate'
import DashBoardAdmin from '../CoursesBody/Admin/DashBoardAdmin'
import Register from '../Body/auth/Register'
import ForgotPasswordTrainer from '../Body/auth/ForgotPasswordTrainer'
import ReserPasswordTrainer from '../Body/auth/ResertPasswordTrainer'


export default function Body() {
  const auth = useSelector(state => state.auth)
  const { isAdmin, isUser, isTrainer } = auth
  return (
    <main>
      <Switch>
        <Route path="/login" component={isUser || isTrainer ? NotFound : Login} exact />
        <Route path="/register" component={Register} exact />
        <Route path="/login/user" component={isUser ? NotFound : LoginUser} exact />
        <Route path="/login/trainer" component={isTrainer ? NotFound : LoginTrainer} exact />
        <Route path="/admin" component={isAdmin ? NotFound : LoginAdmin} exact />
        <Route path="/register/user" component={isUser ? NotFound : RegisterUser} exact />
        <Route path="/register/trainer" component={isUser ? NotFound : RegisterTrainer} exact />
        <Route path="/forgot_password_user" component={isUser ? NotFound : ForgotPassword} exact />
        <Route path="/forgot_password_trainer" component={isTrainer ? NotFound : ForgotPasswordTrainer} exact />
        <Route path="/user/activate/:activation_token" component={ActivationEmail} exact />
        <Route path="/admin/activate/:activation_token" component={ActivationEmailTrainer} exact />
        <Route path="/user/reset/:token" component={isUser ? NotFound : ResertPassword} exact />
        <Route path="/trainer/reset/:token" component={isTrainer ? NotFound : ReserPasswordTrainer} exact />
        <Route path="/edit_user/:id" component={isAdmin ? EditUser : ResertPassword} exact />
        <Route path="/profile/trainer" component={isTrainer ? ProfileTrainer : NotFound} exact />
        <Route path="/admin/profile" component={isAdmin ? ProfileAdmin : NotFound} exact />
        <Route path="/admin/managerTrainer" component={isAdmin ? ManagerTrainer : NotFound} exact />
        <Route path="/admin/dashboard" component={isAdmin ? DashBoardAdmin : NotFound} exact />
        <Route path="/admin/managerUser" component={isAdmin ? ManagerUser : NotFound} exact />
        <Route path="/admin/managerCate" component={isAdmin ? ManagerCate : NotFound} exact />
        <Route path="/tutorial" component={isTrainer ? TutorialManager : NotFound} exact />
        <Route path="/tutorial/:id" component={isTrainer ? CoursesManager : NotFound} exact />
        <Route path="/courses/" component={isTrainer ? DashBoardTrainer : NotFound} exact />
        <Route path="/courses/:name" component={isUser ? TutorialDetail : NotFound} exact />
        <Route path="/learning/:name" component={isUser ? DetailCourses : NotFound} exact />
        <Route path="/checkBody" component={isUser ? CheckBody : NotFound} exact />
        <Route path="/profile/user" component={isUser ? ProfileUser : NotFound} exact />
        <Route path="/courseOwner" component={isUser ? CoursesOwner : NotFound} exact />
        <Route path="/favorite" component={isUser ? Favorite : NotFound} exact />
        <Route path="/discovery" component={isUser ? Discovery : NotFound} exact />
        <Route path="/messenger" component={isUser || isTrainer ? Messenger : NotFound} exact />
        <Route path="/" component={Content} exact />
      </Switch>
    </main>


  )
}
