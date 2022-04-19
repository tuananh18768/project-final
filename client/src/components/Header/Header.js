import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import style from "./header.module.css"
export default function Header() {

  const auth = useSelector(state => state.auth)
  const { user, isLogged, trainer, isUser, isTrainer } = auth
  const handleLogout = async () => {
    try {
      await axios.get('/user/logout')
      localStorage.removeItem('firstLogin')
      await axios.get('/trainer/logout')
      localStorage.removeItem('secondLogin')
      window.location.href = '/'
    } catch (error) {
      window.location.href = "/"
    }
  }

  const userLink = () => {
    if (isUser) {
      return <li className="drop-nav">
        <Link to='/' className="avatar">
          <img src={user.avatar} alt="" style={{ width: 50, height: 50, borderRadius: '50%', display: 'inline' }} /> {user.name}<i className="fa-solid fa-angle-down"></i>
        </Link>
        <ul className="dropdown" style={{ zIndex: 10 }}>
          <li><Link to='/profile/user'>Profile</Link></li>
          <li><Link to='/' onClick={() => { handleLogout() }}>Logout</Link></li>
        </ul>
      </li>
    }
    if (isTrainer) {
      return <li className="drop-nav">
        <Link to='/' className="avatar">
          <img src={trainer.avatar} alt="" style={{ width: 50, height: 50, borderRadius: '50%', display: 'inline' }} /> {trainer.name}<i className="fa-solid fa-angle-down"></i>
        </Link>
        <ul className="dropdown" style={{ zIndex: 10 }}>
          <li><Link to='/profile/trainer'>Profile</Link></li>
          <li><Link to='/' onClick={() => { handleLogout() }}>Logout</Link></li>
        </ul>
      </li>
    }
  }
  return (
    // <header className="header">
    //         <div className="header__content">
    //             <div className="header__logo">
    //                 <Link to="/"><img src={require('./logo.png')} alt="logo" className="header__img" /></Link>
    //             </div>
    //             <div className="header__login">
    //             <ul style={{margin: 0}}>
    //             {
    //               isUser || isTrainer
    //                 ? userLink()
    //                 : <button className="btn btn-primary"><Link to="/login"  style={{color: 'white'}}><i className="fa fa-user"></i> Sign In</Link></button>
    //               }
    //             </ul>
    //             </div>
    //         </div>
    //     </header>
    <header className={style.header}>
      <div className={style.header__left}>
        <div className={style.header__logo}>
          <Link to="/"><img src={require("../../assets/logo.jpg")} alt="" /></Link>
        </div>
        <div className={style.header__categories}>
          <i className="fa-solid fa-bars" />
          <span>Danh Mục <i className="fa-solid fa-angle-down" /></span>
        </div>
        <div className={style.header__search}>
          <i className="fa-solid fa-magnifying-glass" />
          <input type="text" placeholder="Tìm kiếm khoá học" />
        </div>
        <button className={style.header__active}>Kích hoạt khoá học</button>
      </div>
      <div className={style.header__right}>
        <div className={style.header__login}>
          {
            isUser || isTrainer ?
              <div className={style.header__info}>
                <div className={style.header__avatar}>
                  <img src={trainer.avatar} alt="" />
                </div>
                <span className={style.header__name}>{trainer.name} <i className="fa-solid fa-angle-down" /></span>
                <ul className={style.header__dropdown}>
                  <li><i class="fa-solid fa-user"></i> Thông tin cá nhân</li>
                  <li><i class="fa-solid fa-heart"></i> Danh sách yêu thích</li>
                  <li><Link to='/' onClick={() => { handleLogout() }}><i class="fa-solid fa-heart"></i> Đăng xuất</Link></li>
                </ul>
              </div>
              :
              <>
                <Link to="/login"><button className={style["header__login--button"]}>Đăng nhập</button></Link>
                <button className={`${style["header__login--button"]} ${style["header__login--border"]}`}>Đăng ký</button>
              </>
          }
        </div>
      </div>
    </header>
  )
}
