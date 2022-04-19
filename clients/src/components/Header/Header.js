import React from 'react'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
import axios from 'axios'
export default function Header() {
 
    const auth = useSelector(state => state.auth)
    const {user, isLogged, trainer, isUser, isTrainer} = auth
    const handleLogout = async ()=>{
      try {
          await axios.get('/user/logout')
          localStorage.removeItem('firstLogin')
          await axios.get('/trainer/logout')
          localStorage.removeItem('secondLogin')
          window.location.href ='/'
      } catch (error) {
          window.location.href= "/"
      }
    }
    // const userLinkUser = () =>{
    //   return <li className="drop-nav"> 
    //         <Link to='/' className="avatar">
    //           <img src={user.avatar} alt="" style={{width:50, height:50, borderRadius: '50%', display: 'inline'}} /> {user.name}<i className="fa-solid fa-angle-down"></i>
    //         </Link>
    //       <ul className="dropdown">
    //             <li><Link to='/profile'>Profile</Link></li>
    //             <li><Link to='/' onClick={()=>{handleLogout()}}>Logout</Link></li>
    //         </ul>
    //   </li>
    // }
    // const userLinkTrainer = () =>{
    //   return <li className="drop-nav"> 
    //         <Link to='/' className="avatar">
    //           <img src={trainer.avatar} alt="" style={{width:50, height:50, borderRadius: '50%', display: 'inline'}} /> {user.name}<i className="fa-solid fa-angle-down"></i>
    //         </Link>
    //       <ul className="dropdown">
    //             <li><Link to='/profile'>Profile</Link></li>
    //             <li><Link to='/' onClick={()=>{handleLogout()}}>Logout</Link></li>
    //         </ul>
    //   </li>
    // }
    const userLink = ()=>{
      if(isUser){
        return <li className="drop-nav"> 
                 <Link to='/' className="avatar">
                   <img src={user.avatar} alt="" style={{width:50, height:50, borderRadius: '50%', display: 'inline'}} /> {user.name}<i className="fa-solid fa-angle-down"></i>
                 </Link>
               <ul className="dropdown" style={{zIndex: 10}}>
                     <li><Link to='/profile/user'>Profile</Link></li>
                     <li><Link to='/' onClick={()=>{handleLogout()}}>Logout</Link></li>
                 </ul>
           </li>
      }
      if(isTrainer){
        return <li className="drop-nav"> 
                 <Link to='/' className="avatar">
                   <img src={trainer.avatar} alt="" style={{width:50, height:50, borderRadius: '50%', display: 'inline'}} /> {trainer.name}<i className="fa-solid fa-angle-down"></i>
                 </Link>
               <ul className="dropdown" style={{zIndex: 10}}>
                     <li><Link to='/profile/trainer'>Profile</Link></li>
                     <li><Link to='/' onClick={()=>{handleLogout()}}>Logout</Link></li>
                 </ul>
           </li>
      }
    }
  return (
    <header className="header">
            <div className="header__content">
                <div className="header__logo">
                    <Link to="/"><img src={require('./logo.png')} alt="logo" className="header__img" /></Link>
                </div>
                <div className="header__login">
                <ul style={{margin: 0}}>
                {
                  isUser || isTrainer
                    ? userLink()
                    : <button className="btn btn-primary"><Link to="/login"  style={{color: 'white'}}><i className="fa fa-user"></i> Sign In</Link></button>
                  }
                </ul>
                </div>
            </div>
        </header>
    
  )
}
